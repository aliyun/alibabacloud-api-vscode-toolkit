/**
 * @author yini-chen
 * @description Switch
 */
import * as React from "react";
import { CommonWidgetProps } from "../../type";
import { Switch } from "@alicloud/console-components";

export class BooleanSwitchProps extends CommonWidgetProps {}

export const BooleanSwitch: React.FC<BooleanSwitchProps> = (props) => {
  const { schema, ...rest } = props;

  let switchDefault = props?.schema?.default;

  if (typeof switchDefault === "string") {
    switchDefault = switchDefault === "true";
  }

  return (
    <div className="semix-form-widget switch">
      <Switch
        style={{ width: "fit-content" }}
        checked={props?.value}
        size="small"
        checkedChildren={schema?.props?.checkedChildren || ""}
        unCheckedChildren={schema.props?.unCheckedChildren || ""}
        onChange={(value) => {
          props.onChange(value);
        }}
      />
    </div>
  );
};

BooleanSwitch.defaultProps = new BooleanSwitchProps();
