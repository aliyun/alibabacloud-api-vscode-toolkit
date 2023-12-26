/**
 * @description 门户组件
 * 1、用于api-design-form
 * 2、用于api-debugger
 */

// import "./index.scss";
import { String } from "./string";
import { BooleanSwitch } from "./swtich";
import { NumberInput } from "./number";
import { SimpleList } from "./list";
import { EnumSelect } from "./enum";
import { SimpleMap } from "./map";
import { JsonEdit } from "./JsonEdit";
import { RenderObject } from "./Object";
import { RadioGroup } from "./radio";
import { CheckboxGroup } from "./checkbox";
import { Title } from "./Title";

export const xconsoleWidgets = {
  object: RenderObject,
  radio: RadioGroup,
  string: String,
  checkbox: CheckboxGroup,
  booleanSwitch: BooleanSwitch,
  number: NumberInput,
  integer: NumberInput,
  enum: EnumSelect,
  simpleMap: SimpleMap,
  list: SimpleList,
  json: JsonEdit,
  title: Title,
};
