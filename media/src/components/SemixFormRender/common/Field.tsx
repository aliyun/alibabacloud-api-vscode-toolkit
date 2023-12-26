/**
 * @author Field
 * @description
 */
import * as React from "react";
import { FormStoreContext } from "../context";
import { ErrorMessage } from "./ErrorMessage";
import { Title } from "./Title";
import { SemixUISchema } from "../type";
import { Widget } from "./Widget";
// import "./Field.scss";
import _ from "lodash";
import classNames from "classnames";
import { checkIsPathEqaul, getSchemaByRef, stringToPaths } from "../utils";

export class FieldProps {
  schema: SemixUISchema;
  dataPath: string;
  schemaPath?: string;
  fieldName? = "";
  isRequired?: boolean;
  titleOperator? = null as any;
  /** 数据结构 */
  components?: {
    [x: string]: SemixUISchema;
  };
  widget? = "";
  widgetStyle?: React.CSSProperties = {};
  children?: any;
}

export const Field: React.FC<FieldProps> = (props) => {
  let schema = props.schema;

  const [collapsed, setCollapsed] = React.useState(false);
  const store = FormStoreContext.useContainer();

  if (props.schema?.$ref) {
    schema = getSchemaByRef(props.schema, props.schema?.$ref);
  }
  if (props.widget) {
    schema = { ...schema, widget: props.widget };
  }

  const errorFields = React.useMemo(() => {
    if (store.isValidating) {
      return store.errorFields?.filter((errField) => {
        return checkIsPathEqaul(errField.dataPath, props.dataPath);
      });
    }
    return [];
  }, [props.dataPath, store.isValidating, store.errorFields]);

  return React.useMemo(() => {
    if (_.isEmpty(schema)) {
      return null;
    }
    const titleProps = {
      schema: schema,
      isRequired: props.isRequired || schema?.isRequired || false,
      fieldName: props.fieldName || "",
      collapsed: collapsed,
      setCollapsed: setCollapsed,
      titleOperator: props.titleOperator,
      dataPath: props.dataPath,
    };
    const schemaPathCx = stringToPaths(props.schemaPath).join("-");

    return (
      <div className={classNames("semix-form-field", schemaPathCx)}>
        {schema?.hidden === true ? null : (
          <>
            {store.renderTitle ? (
              store?.widgets?.isTreeWidgets ? (
                props.dataPath && schema.type !== "object" && schema.type !== "array" ? (
                  store.renderTitle(titleProps)
                ) : null
              ) : (
                store.renderTitle(titleProps)
              )
            ) : (
              <Title {...titleProps} />
            )}
            {collapsed ? null : (
              <div className='semix-form-widget-wrapper'>
                <Widget
                  fieldName={props.fieldName}
                  schema={schema}
                  dataPath={props.dataPath}
                  schemaPath={props.schemaPath}
                  uploadFile={store.uploadFile}
                  style={props.widgetStyle}
                  renderTitle={store.renderTitle ? store.renderTitle(titleProps) : null}
                />
                <ErrorMessage schema={schema} dataPath={props.dataPath} errorFields={errorFields} />
                {props.children}
              </div>
            )}
          </>
        )}
      </div>
    );
  }, [
    schema,
    props.dataPath,
    props.fieldName,
    props.isRequired,
    collapsed,
    JSON.stringify(errorFields),
    store.renderTitle,
  ]);
};

Field.defaultProps = new FieldProps();
