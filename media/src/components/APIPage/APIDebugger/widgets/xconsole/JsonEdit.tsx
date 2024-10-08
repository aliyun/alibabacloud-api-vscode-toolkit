/**
 * @author yini-chen
 * @description 表单 Json 编辑器
 */

import * as React from "react";
import { CommonWidgetProps } from "../types";
import { Editor } from "@monaco-editor/react";
import { APIPageContext } from "../../../context";
import { getMonacoTheme } from "../../../../utils";
import I18N from "../../../../../utils/I18N";

export class JsonEditProps extends CommonWidgetProps {}

export const JsonEdit: React.FC<JsonEditProps> = (props) => {
  const [curval, setCurval] = React.useState("");
  const [errMsg, setErrMsg] = React.useState("");
  const { theme } = APIPageContext.useContainer();
  React.useEffect(() => {
    setErrMsg("");
    if (typeof props.value !== "string") {
      try {
        const obj = JSON.stringify(props.value, null, 2);
        setCurval(obj);
      } catch {}
    }
  }, [props.value]);

  return (
    <div
      className="jsonschema-form-widget"
      style={{ width: "100%", minHeight: 200 }}
      onBlur={() => {
        try {
          const val = JSON.parse(curval);
          props.onChange(val);
        } catch {
          setErrMsg(I18N.xconsole.JsonEdit.formatError);
        }
      }}
    >
      <div className="editor-content" style={{ padding: 4, border: "1px #eee solid" }}>
        <Editor
          height={200}
          theme={getMonacoTheme(theme)}
          language="json"
          value={curval || ""}
          onChange={(value) => {
            setCurval(value);
          }}
          options={{
            minimap: {
              enabled: false,
            },
          }}
        ></Editor>
      </div>
      {errMsg?.length ? <div style={{ color: "red" }}>{errMsg}</div> : null}
    </div>
  );
};

JsonEdit.defaultProps = new JsonEditProps();
