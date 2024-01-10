/**
 * @author yini-chen
 * @description any类型
 */

import * as React from "react";
import _ from "lodash";
import { Select } from "@alicloud/console-components";
import { Tooltip } from "antd";
import { xconsoleWidgets } from ".";
import { getTypeOfValue, simpleType } from "./utils";
import { AnyProps } from "../types";


export class TypeSelectorProps extends AnyProps {
  value: any;
}

export const TypeSelector: React.FC<TypeSelectorProps> = (props) => {
  const { dataPath, onChange, schema, Icon, value } = props;

  const [type, handleTypeChange] = React.useState(value !== undefined ? getTypeOfValue(value) : "string" as any);

  React.useEffect(() => {
    props.onChange(undefined);
    schema.type = type
  }, [type]);
  

  const getUIType = (type: string) => {
    if (type === "boolean") return "booleanSwitch";
    if (type === "array") return "json";
    if (type === "object") return "json";
    return type;
  };
  const UIType = getUIType(type);

  // 变化的参数组件，默认为字符串
  const ParamUI = React.useMemo(() => {
    return xconsoleWidgets[UIType] || xconsoleWidgets["string"];
  }, [UIType]);

  // 可选择的数据类型
  const renderTypes = React.useMemo(() => {
    const typeList = simpleType;
    return typeList.map((item) => {
      return (
        <Select.Option value={item} key={item}>
          {item}
        </Select.Option>
      );
    });
  }, []);

  return (
    <div>
      参数类型
      {Icon ? (
        <Tooltip
          overlay="该参数值为 any 类型，调试时请先选择参数类型，再输入参数值。"
          placement="top"
          overlayStyle={{ background: "#FDF9F9", minWidth: 300 }}>
          <span>
            <Icon type="tips1" />
          </span>
        </Tooltip>
      ) : null}
      ：
      <Select
        value={value !== undefined? getTypeOfValue(value) : type}
        style={{ width: 150 }}
        onChange={(value) => {
          handleTypeChange(value);
        }}>
        {renderTypes}
      </Select>
      <div style={{ margin: "10px 0" }}>
        <ParamUI schema={{ ...schema, type: type }} onChange={onChange} dataPath={dataPath} value={value}></ParamUI>
      </div>
    </div>
  );
};

TypeSelector.defaultProps = new TypeSelectorProps();
