/**
 * @author nianyi
 * @description 枚举选择
 */

import * as React from "react";

// import "./enum.scss";
import { Button, Select } from "@alicloud/console-components";
import { CommonWidgetProps } from "../../type";

export class EnumSelectProps extends CommonWidgetProps {}

export const EnumSelect: React.FC<EnumSelectProps> = (props) => {
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
      label: (
        <div className="enum-item">
          <span className="enum-item-value">{item.value ? item.value : item}</span>
          <span className="enum-item-title">{item.title}</span>
        </div>
      ),
      value: item.value ? item.value : item,
      key: item.value ? item.value : item,
    };
  });

  const changeCurValue = React.useCallback((value) => {
    if (value) {
      setCurvalue(value);
    } else {
      props.onChange(undefined);
      setCurvalue(undefined);
    }
  }, []);

  const emitvalues = React.useCallback(() => {
    if (props.value === curvalue) {
      return;
    }
    props.onChange(curvalue);
  }, [curvalue]);

  React.useEffect(() => {
    setCurvalue(props.value);
  }, [props.value]);

  return (
    <Select
      className="semix-form-widget"
      placeholder={schema?.props?.placeholder || "请输入字符串"}
      hasClear
      value={curvalue}
      onBlur={emitvalues}
      onChange={changeCurValue}
      dataSource={options}
    ></Select>
  );
};

EnumSelect.defaultProps = new EnumSelectProps();
