/**
 * @author
 * @description
 */

import * as PontSpec from "pontx-spec";
import * as React from "react";
import { SemixJsonSchema } from "semix-core";
import { InnerSchemaTable } from "semix-schema-table";
import { getRefSchema } from "../../utils";
import useCustomFixScrollBar from "../../common/useCustomFixScrollBar";

export class PontxParamsDocProps {
  parameters?: PontSpec.Parameter[];
  apiName?: string;
  schemas?: PontSpec.ObjectMap<SemixJsonSchema>;
}

export const ApiParamsDoc: React.FC<PontxParamsDocProps> = (props) => {
  const schema = React.useMemo(() => {
    const schema = {
      type: "object",
      properties: {},
    } as SemixJsonSchema;
    if (props.parameters) {
      props.parameters.forEach((param) => {
        if (param.schema?.enumValueTitles && param.schema?.enum) {
          delete param.schema.enumValueTitles;
        }
        if (schema.properties) {
          schema.properties[param.name] = {
            ...(param.schema || {}),
            in: param.in,
          };
        }
      });
    }
    return schema;
  }, [props.parameters]);
  const propSchemaCnt = Object.keys(props.schemas || {}).length;

  const getSchema = React.useCallback(
    ($ref: any) => {
      return getRefSchema(props.schemas)($ref);
    },
    [props.schemas],
  );

  const tableRef = React.useRef(null);

  const CustomFixScrollBar = useCustomFixScrollBar(".parameters-content", tableRef as any);

  return (
    <div className="parameters-content scrollbar-custom overflow-x-scroll px-4 pb-4">
      {props.parameters?.length ? (
        <div ref={tableRef}>
          {CustomFixScrollBar}
          <InnerSchemaTable
            name=""
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
                  <td colSpan={2} style={{ padding: "15px 0", textAlign: "center" }}>
                    无参数定义
                  </td>
                </tr>
              );
            }}
            schema={schema}
          />
        </div>
      ) : (
        <div style={{ padding: 20, fontSize: 14 }}>调用该 OpenAPI 无需参数。</div>
      )}
    </div>
  );
};

ApiParamsDoc.defaultProps = new PontxParamsDocProps();
