/**
 * @author yini-chen
 * @description 编辑器
 */
import { Balloon } from "@alicloud/console-components";
import { Editor } from "@monaco-editor/react";
import { Button, Dropdown, message } from "antd";
import React, { ReactNode } from "react";
import { PontUIService } from "../../service/UIService";
import { DARA_SDK_LANGUAGES, LanguageSwitcher } from "../APIPage/TrySDK/LanguageSwitcher";
import { getEditorLanguage, getEditorMenuItems, getMonacoTheme } from "../utils";

export class MonacoEditorProps {
  languageTab?: string;
  setLanguageTab?: (lang) => void;
  languageSelector? = true;
  copyable? = true;
  header?: React.ReactNode;
  value? = "";
  readOnly? = true;
  height? = 800 as string | number;
  languages? = DARA_SDK_LANGUAGES;
  theme?: string;
  menuItems?: Array<{
    key: string;
    label: ReactNode | string;
    codicon?: string;
    onClick: () => void;
    externalLink?: string;
  }> = [];
}

export const MonacoEditor: React.FC<MonacoEditorProps> = (props) => {
  const {
    languageTab,
    setLanguageTab,
    languageSelector,
    languages,
    copyable,
    header,
    value,
    readOnly,
    height,
    menuItems,
    theme,
  } = props;

  const items: Array<{
    key: string;
    label: ReactNode | string;
    codicon?: string;
    onClick: () => void;
    externalLink?: string;
  }> = [...getEditorMenuItems(value, getEditorLanguage(languageTab)), ...menuItems];

  const tabContent = React.useMemo(() => {
    return value?.length ? (
      <div className="tab-content">
        <Editor
          height={height}
          theme={getMonacoTheme(theme)}
          options={{
            readOnly: readOnly,
            tabCompletion: "on",
            minimap: {
              enabled: false,
            },
          }}
          // theme='vs-dark'
          language={getEditorLanguage(languageTab)}
          value={value}
        />
      </div>
    ) : null;
  }, [languageTab, value]);

  const divRef = React.useRef(null);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    const handleResize = (entries) => {
      for (let entry of entries) {
        setWidth(entry.contentRect.width);
      }
    };

    const observer = new ResizeObserver(handleResize);

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    // Clean up observer on unmount
    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);

  console.log(width);

  return (
    <div className="editor-content">
      <div className="operations" ref={divRef}>
        <div className="left-area">
          {languageSelector ? (
            <LanguageSwitcher
              language={languageTab}
              languages={languages}
              extra={null}
              onLanguageChange={(lang) => {
                setLanguageTab(lang);
                PontUIService.updateLocalLanguage(lang);
              }}
              tabContent={null}
            ></LanguageSwitcher>
          ) : null}
          {header || null}
        </div>
        <div className="right-area ml-2">
          {copyable ? (
            <Balloon
              closable={false}
              align="t"
              trigger={
                <Button
                  className="copy-button"
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(value);
                      message.success("复制成功");
                    }
                  }}
                >
                  <div className="codicon codicon-copy" />
                </Button>
              }
            >
              复制
            </Balloon>
          ) : null}
          {items?.length ? (
            <div className="menu-icon">
              {width < 400 ? (
                <Dropdown menu={{ items }}>
                  <Button onClick={(e) => e.preventDefault()}>
                    <div className="codicon codicon-list-selection" />
                  </Button>
                </Dropdown>
              ) : (
                <>
                  {items?.map((item) => {
                    return (
                      <Balloon
                        closable={false}
                        align="t"
                        trigger={
                          <Button
                            // className="copy-button"
                            href={item.externalLink ? item.externalLink : ""}
                            target="_blank"
                            onClick={item.onClick}
                          >
                            <div className={`codicon codicon-${item.codicon}`} />
                          </Button>
                        }
                      >
                        {item.label}
                      </Balloon>
                    );
                  })}
                </>
              )}
            </div>
          ) : null}
        </div>
      </div>
      {tabContent}
    </div>
  );
};
MonacoEditor.defaultProps = new MonacoEditorProps();
export default MonacoEditor;
