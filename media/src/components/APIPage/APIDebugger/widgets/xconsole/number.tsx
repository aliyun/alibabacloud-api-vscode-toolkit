/**
 * @author yini-chen
 * @description 输入数值
 */
import { NumberPicker } from "@alicloud/console-components";
import * as React from "react";
import { CommonWidgetProps } from "../types";
// import APIParamGenerate from "viteSrc/pages/designAwesome/APIDesign/QuickTest/APIParams/APIParamGenerate";

export class NumberInputProps extends CommonWidgetProps {}

export const NumberInput: React.FC<NumberInputProps> = (props) => {
  const { schema, ...rest } = props;
  const [curvalue, setCurvalue] = React.useState(undefined);

  // const numberProps = {} as any;
  // if (schema.maximum) {
  //   numberProps.max = schema.maximum;
  // }
  // if (schema.minimum) {
  //   numberProps.min = schema.minimum;
  // }

  const emitvalues = React.useCallback(() => {
    if (props.value === curvalue) {
      return;
    }
    props.onChange(curvalue);
  }, [curvalue]);

  const changeCurValue = (value) => {
    if (value || value === 0) {
      setCurvalue(Number(value));
    } else {
      props.onChange(undefined);
      setCurvalue(undefined);
    }
  };

  React.useEffect(() => {
    setCurvalue(props.value);
  }, [props.value]);

  const uischema = {
    ...props.schema,
    type: props.schema?.format?.includes("int") ? "integer" : props?.schema?.type,
  };

  return (
    <NumberPicker
      // {...numberProps}
      value={curvalue}
      style={{ width: "100%" }}
      onBlur={emitvalues}
      onChange={changeCurValue}
      stringMode={["double", "int64"].includes(schema.format!)}
      precision={["int64", "int32"].includes(schema.format!) ? undefined : 4}
      className="jsonschema-form-widget"
    ></NumberPicker>
  );
};

NumberInput.defaultProps = new NumberInputProps();
