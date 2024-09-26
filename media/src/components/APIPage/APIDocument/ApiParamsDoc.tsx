/**
 * @author
 * @description
 */

import * as PontSpec from "pontx-spec";
import * as React from "react";
import { SemixJsonSchema } from "semix-core";
import { SemixSchemaTable } from "semix-schema-table";
import { getRefSchema } from "../../utils";
import useCustomFixScrollBar from "../../common/useCustomFixScrollBar";
import I18N from "../../../utils/I18N";
import { TableI18N } from "../../../utils/utils";

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
          <SemixSchemaTable
            I18N={new TableI18N()}
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
                    {I18N.ide.main.common.noParameterDefinition}
                  </td>
                </tr>
              );
            }}
            schema={schema}
          />
        </div>
      ) : (
        <div style={{ padding: 20, fontSize: 14 }}>{I18N.ide.main.common.notRequireParam}</div>
      )}
    </div>
  );
};

ApiParamsDoc.defaultProps = new PontxParamsDocProps();
