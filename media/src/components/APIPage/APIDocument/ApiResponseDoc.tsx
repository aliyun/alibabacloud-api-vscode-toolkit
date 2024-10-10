/**
 * @author yini-chen
 * @description
 */
import React from "react";
import { InnerSchemaTable } from "semix-schema-table";
import useCustomFixScrollBar from "../../common/useCustomFixScrollBar";
import I18N from "../../../utils/I18N";

export class ApiResponseDocProps {
  selectedApi: any;
}

export const ApiResponseDoc: React.FC<ApiResponseDocProps> = (props) => {
  const tableRef = React.useRef(null);

  const CustomFixScrollBar = useCustomFixScrollBar(".response-doc-scroll-content", tableRef as any);

  return (
    <div className="response-doc-scroll-content scrollbar-custom overflow-x-scroll px-4 pb-4" ref={tableRef}>
      <InnerSchemaTable
        name=""
        schema={props.selectedApi?.responses["200"]?.schema as any}
        renderExpandIcon={(node, onExpand) => {
          return (
            <div
              className="hover:bg-darken-3 relative flex cursor-pointer items-center justify-center rounded"
              style={{
                marginLeft: -23.5,
                width: 20,
                height: 20,
                marginRight: 3,
                textAlign: "center",
              }}
              onClick={() => {
                onExpand(node);
              }}
            >
              <i className={node.isExpanded ? "codicon codicon-chevron-down" : "codicon codicon-chevron-right"}></i>
            </div>
          );
        }}
        renderEmpty={() => {
          return (
            <tr>
              <td
                colSpan={2}
                style={{
                  padding: "15px 0",
                  textAlign: "center",
                }}
              >
                {I18N.ide.main.common.noOutputParameterDefinition}
              </td>
            </tr>
          );
        }}
      />
      {CustomFixScrollBar}
    </div>
  );
};
ApiResponseDoc.defaultProps = new ApiResponseDocProps();
export default ApiResponseDoc;
