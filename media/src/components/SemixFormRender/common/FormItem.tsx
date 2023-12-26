/**
 * @author
 * @description
 */
import * as React from "react";
import { FormInstance, FormStoreContext, useForm } from "../context";
import * as _ from "lodash";
import { Field } from "./Field";
import { getSchemaBySchemaPath, getSchemaPathByDataPath } from "../utils";

export class FormItemProps {
  /**
   * data path, constant, cannot change
   * dataPath 规范
   * apis[*].parameters[*].name.3
   * apis[*].responses[*]["schema"][3]
   */
  dataPath = "";
  fieldName? = "";
  widget? = "";
  children?: any;
  widgetStyle?: React.CSSProperties = {};
  schemaMapper? = (schema: any) => schema;
  valueMapper? = {
    dataToWidgetValue: (id) => id,
    widgetToDataValue: (id) => id,
  };
  valuePipe?: (value: any) => any = _.identity;
  onChangePipe?: (value: any) => any = _.identity;
}

export const FormItem: React.FC<FormItemProps> = (props) => {
  const form = FormStoreContext.useContainer();
  const schemaPath = getSchemaPathByDataPath(form.schema, props.dataPath);
  const currentSchema = getSchemaBySchemaPath(form.schema, schemaPath);
  const finalSchema = props.schemaMapper(currentSchema);

  if (!finalSchema.type && !finalSchema.$ref) {
    // dynamic visible is false
    return null;
  }

  return (
    <Field
      dataPath={props.dataPath}
      schema={finalSchema}
      schemaPath={schemaPath}
      fieldName={props.fieldName || props.dataPath}
      widget={props.widget}
      widgetStyle={props.widgetStyle}
    >
      {props.children}
    </Field>
  );
};

FormItem.defaultProps = new FormItemProps();
