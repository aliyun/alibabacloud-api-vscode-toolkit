/**
 * @author yini-chen
 * @description 表单 Json 编辑器
 */

import * as React from "react";
import { CommonWidgetProps } from "../types";
import { Editor } from "@monaco-editor/react";

export class JsonEditProps extends CommonWidgetProps {}

export const JsonEdit: React.FC<JsonEditProps> = (props) => {
  const [curval, setCurval] = React.useState("");
  const [errMsg, setErrMsg] = React.useState("");
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
          setErrMsg("json 格式错误");
        }
      }}
    >
      <div className="editor-content" style={{padding:4,border: "1px #eee solid"}}><Editor
        height={200}
        language="json"
        value={curval || ""}
        onChange={(value) => {
          setCurval(value);
        }}
        options={{minimap:{
            enabled:false
        }}}
      ></Editor></div>
      {errMsg?.length ? <div style={{ color: "red" }}>{errMsg}</div> : null}
    </div>
  );
};

JsonEdit.defaultProps = new JsonEditProps();
