/**
 * @author yini-chen
 * @description 编辑器
 */
import { Editor } from "@monaco-editor/react";
import React from "react";
import { DARA_SDK_LANGUAGES, LanguageSwitcher } from "../APIPage/TrySDK/LanguageSwitcher";
import { Button, Dropdown, MenuProps, Tooltip, message } from "antd";
import { PontUIService } from "../../service/UIService";
import { Balloon } from "@alicloud/console-components";
import { getEditorLanguage, getEditorMenuItems } from "../utils";

export class MonacoEditorProps {
  languageTab?: string;
  setLanguageTab?: (lang) => void;
  languageSelector? = true;
  copyable? = true;
  header?: React.ReactNode;
  value? = "";
  readOnly? = true;
  height? = 800;
  languages? = DARA_SDK_LANGUAGES;
  menuItems?: Array<{ key: string; label: string; codicon?: string; onClick: () => void }> = [];
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
  } = props;

  const items: Array<{ key: string; label: string; codicon?: string; onClick: () => void }> = [
    ...getEditorMenuItems(value, getEditorLanguage(languageTab)),
    ...menuItems,
  ];

  const tabContent = React.useMemo(() => {
    return value?.length ? (
      <div className="tab-content">
        <Editor
          height={height}
          options={{
            readOnly: readOnly,
            tabCompletion: true,
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

  return (
    <div className="editor-content">
      <div className="operations">
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
        <div className="right-area">
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
              {/* <Dropdown menu={{ items }}>
                <Button onClick={(e) => e.preventDefault()}>
                  <div className="codicon codicon-list-selection" />
                </Button>
              </Dropdown> */}
              {items?.map((item) => {
                return (
                  <Balloon
                    closable={false}
                    align="t"
                    trigger={
                      <Button
                        // className="copy-button"

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
              {/* {(window as any).vscode ? (
                <Dropdown menu={{ items: menuItems }}>
                  <a onClick={(e) => e.preventDefault()}>
                    fff
                    <div className="codicon codicon-list-selection" />
                  </a>
                </Dropdown>
              ) : null} */}
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
