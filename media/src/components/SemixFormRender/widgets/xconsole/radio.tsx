/**
 * @author yini-chen
 * @description 枚举选择
 */

import * as React from "react";

import { Button, Radio } from "@alicloud/console-components";
// import "./radio.scss";
import { CommonWidgetProps } from "../../type";

export class RadioGroupProps extends CommonWidgetProps {}

export const RadioGroup: React.FC<RadioGroupProps> = (props) => {
  const { schema, ...rest } = props;

  const [curvalue, setCurvalue] = React.useState(undefined);

  let enumValueTitles = schema?.enum ? [...schema?.enum] : [];
  if (schema?.enumValueTitles) {
    Object.keys(schema?.enumValueTitles)?.map((key) => {
      if (schema?.enum?.includes(key) && enumValueTitles.indexOf(key) !== -1) {
        enumValueTitles.splice(enumValueTitles.indexOf(key), 1);
      }
      enumValueTitles = [
        ...enumValueTitles,
        {
          value: key,
          title: schema?.enumValueTitles[key],
        },
      ];
    });
  }
  const options = enumValueTitles?.map((item: any) => {
    if (item.value === "") {
      return;
    }
    return {
      label: item.title || item?.value || item,
      value: item.value ? item.value : item,
      key: item.value ? item.value : item,
    };
  });

  const changeCurValue = React.useCallback((value) => {
    setCurvalue(value);
    if (value !== props.value) {
      props.onChange(value);
    }
  }, []);

  React.useEffect(() => {
    setCurvalue(props.value);
  }, [props.value]);

  return (
    <div className="semix-form-widget radio">
      <Radio.Group
        value={curvalue}
        onChange={changeCurValue}
        dataSource={options}
      ></Radio.Group>
    </div>
  );
};

RadioGroup.defaultProps = new RadioGroupProps();
