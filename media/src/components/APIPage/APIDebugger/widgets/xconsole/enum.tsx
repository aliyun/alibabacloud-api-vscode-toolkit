/**
 * @author yini-chen
 * @description 枚举选择
 */

// import { CommonWidgetProps } from '@ali/api-component';
import { Select } from "@alicloud/console-components";
import * as React from "react";
import "./enum.module.scss";
import { CommonWidgetProps } from "../types";
import I18N from "../../../../../utils/I18N";

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
    <div className="workbench-enum-item">
      {/* <APIParamGenerate
        onGetRandomValue={() => onGetRandomValue(props.onChange, props.schema)}
        changeValue={changeCurValue}
        param={props.schema as any}> */}
      <Select
        style={{ width: "100%" }}
        className="jsonschema-form-widget"
        placeholder={schema?.placeholder || I18N.ide.main.explorer.inputString}
        hasClear
        value={curvalue}
        onBlur={emitvalues}
        onChange={changeCurValue}
        dataSource={options}
      ></Select>
      {/* </APIParamGenerate> */}
    </div>
  );
};

EnumSelect.defaultProps = new EnumSelectProps();
