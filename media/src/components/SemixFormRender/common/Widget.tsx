/**
 * @author 奇阳
 * @description
 */
import I18N from "../I18N";
import * as React from "react";
import { FormStoreContext } from "../context";
import * as _ from "lodash";
import { SemixUISchema } from "../type";

export class WidgetProps {
  schema: SemixUISchema;
  dataPath: string;
  schemaPath?: string;
  fieldName?: string;
  uploadFile: Function;
  renderTitle?: Function;
  style?: React.CSSProperties = {};
}

export const Widget: React.FC<WidgetProps> = (props) => {
  const { schema, ...rest } = props;
  const { formData, widgets, onItemChange } = FormStoreContext.useContainer();
  const widgetType: string = schema.widget || (schema.type as any);
  const WidgetComponent = widgets[widgetType];
  const value = _.get(formData, props.dataPath);

  if (!WidgetComponent) {
    return (
      <span>
        {I18N.base.Widget.unknownType}
        {schema.widget || schema.type}
      </span>
    );
  }

  return React.useMemo(() => {
    return React.createElement(WidgetComponent, {
      value,
      onChange: (val: any) => {
        onItemChange(props.dataPath, val);
      },
      ...props,
    });
  }, [props.dataPath, value, schema]);
};

Widget.defaultProps = new WidgetProps();
