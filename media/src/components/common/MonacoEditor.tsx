/**
 * @author yini-chen
 * @description 编辑器
 */
import { Balloon } from "@alicloud/console-components";
import { Editor } from "@monaco-editor/react";
import { Button, message } from "antd";
import React, { ReactNode } from "react";
import { PontUIService } from "../../service/UIService";
import { DARA_SDK_LANGUAGES, LanguageSwitcher } from "../APIPage/TrySDK/LanguageSwitcher";
import { getEditorLanguage, getEditorMenuItems } from "../utils";

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
