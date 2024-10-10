/**
 * @author
 * @description 代码高亮组件
 */

import { message, Tooltip } from "antd";
import React, { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yLight, a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { APIPageContext } from "../APIPage/context";
import { getMonacoTheme } from "../utils";
import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import I18N from "../../utils/I18N";

export interface HighlightCodeProps {
  language: string;
  source: string;
  otherTag?: any;
  hideCopyTag?: boolean;
  isShowCopyIcon?: boolean;
}

export function copyToClipBoard(content: string, format: boolean = false): Promise<void> {
  return new Promise((resolve, reject) => {
    let inputEle = document.getElementById("clipboard") as HTMLTextAreaElement | HTMLInputElement;

    const createElement = format ? "textarea" : "input";
    if (!inputEle) {
      inputEle = document.createElement(createElement);
      inputEle.id = "clipboard";
      document.body.appendChild(inputEle);
    }
    inputEle.value = content;
    inputEle.style.display = "block";

    if (inputEle && inputEle.select) {
      inputEle.select();
      try {
        const isSuccessful = document.execCommand("copy");
        isSuccessful ? resolve() : reject();
      } catch (err) {
        reject(err);
      }
    }
    inputEle.style.display = "none";
  });
}

const HighlightCode: React.FC<HighlightCodeProps> = (props) => {
  const [isCopy, setIsCopy] = useState(false);
  const { theme } = APIPageContext.useContainer();

  return (
    <div
      className="workbench-code-copy flex"
      onMouseLeave={() => {
        setIsCopy(false);
      }}
    >
      <SyntaxHighlighter style={getMonacoTheme(theme) === "vs-dark" ? a11yDark : a11yLight} language={props?.language}>
        {props?.source}
      </SyntaxHighlighter>
      {props.otherTag ? props.otherTag : null}
      {props?.isShowCopyIcon && !isCopy ? (
        <Tooltip title={<span className="text-xs text-white">{I18N.ide.main.explorer.copy}</span>}>
          <CopyOutlined
            style={{
              fontSize: "12px",
              alignItems: props.language?.includes("java") ? "baseline" : "center",
              marginLeft: "4px",
            }}
            onClick={() => {
              copyToClipBoard(props?.source, true);
              message.success(I18N.ide.main.explorer.copySuccess);
              setIsCopy(true);
            }}
          />
        </Tooltip>
      ) : (
        <CheckOutlined style={{ fontSize: "14px" }} />
      )}
    </div>
  );
};

export default HighlightCode;
