/**
 * @author yini-chen
 * @description 枚举选择
 */

import * as React from "react";

// import "./checkbox.scss";
import { Button, Checkbox } from "@alicloud/console-components";
import { CommonWidgetProps } from "../../type";

export class CheckboxGroupProps extends CommonWidgetProps {}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = (props) => {
  const { schema, ...rest } = props;

  const [currValue, setCurrValue] = React.useState(undefined);

  let enumValueTitles = schema?.items?.enum ? [...schema?.items?.enum] : [];
  const itemTitles = schema?.items?.enumValueTitles;
  if (itemTitles) {
    Object.keys(itemTitles)?.map((key) => {
      if (
        enumValueTitles?.includes(key) &&
        enumValueTitles.indexOf(key) !== -1
      ) {
        enumValueTitles.splice(enumValueTitles.indexOf(key), 1);
      }
      enumValueTitles = [
        ...enumValueTitles,
        {
          value: key,
          title: itemTitles[key],
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
    setCurrValue(value);
    if (value !== props.value) {
      props.onChange(value);
    }
  }, []);

  React.useEffect(() => {
    setCurrValue(props.value);
  }, [props.value]);

  return (
    <div className='semix-form-widget checkbox'>
      <Checkbox.Group
        value={currValue}
        onChange={changeCurValue}
        dataSource={options}
      ></Checkbox.Group>
    </div>
  );
};

CheckboxGroup.defaultProps = new CheckboxGroupProps();
