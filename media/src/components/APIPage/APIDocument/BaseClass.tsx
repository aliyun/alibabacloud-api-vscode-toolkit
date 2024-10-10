/**
 * @author jasonHzq
 * @description BaseClass
 */
import classNames from "classnames";
import * as PontSpec from "pontx-spec";
import * as React from "react";
import { SemixSchemaTable } from "semix-schema-table";
import { getRefSchema } from "../../utils";
import I18N from "../../../utils/I18N";
import { TableI18N } from "../../../utils/utils";

export class BaseClassProps {
  name?: string;
  schema?: PontSpec.PontJsonSchema;
  definitions = {} as PontSpec.ObjectMap<PontSpec.PontJsonSchema>;
  onStructClick(struct: { type: string; name: string; spec: any }) {}
}

export const BaseClass: React.FC<BaseClassProps> = (props) => {
  const { name, schema } = props;

  return (
    <div className={classNames("pontx-ui-baseclass", (schema as any)?.type)}>
      <div className="header">
        <div className="title p-4 text-base">
          {I18N.ide.main.common.struct} - {name}
          {schema?.templateArgs?.length
            ? `<${schema?.templateArgs.map((arg, argIndex) => "T" + argIndex).join(", ")}>`
            : ""}
        </div>
      </div>
      <div className="baseclass-page-content">
        <div className="mod">
          <SemixSchemaTable
            name={name || ""}
            I18N={new TableI18N()}
            schema={schema as any}
            schemas={props.definitions as any}
            getRefSchema={getRefSchema(props.definitions)}
          />
        </div>
      </div>
    </div>
  );
};

BaseClass.defaultProps = new BaseClassProps();
