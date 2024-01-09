/**
 * @description 门户组件
 * 1、用于api-design-form
 * 2、用于api-debugger
 */

import "./index.module.scss";
import { String } from "./string";
import { BooleanSwitch } from "./swtich";
import { NumberInput } from "./number";
import { SimpleList } from "./list";
import { UploadFile } from "./UploadFile";
import { EnumSelect } from "./enum";
import { SimpleMap } from "./map";
import { TypeSelector } from "./any";
// import { JsonEdit } from "./JsonEdit";
// import { FileUploadType } from "./FileUploadType";
import { Struct } from "./Struct";
import { RenderObject } from "./Object";
import { RenderMap } from "./RenderMap";
import RenderList from "./base/List";

export const xconsoleWidgets = {
  object: RenderObject,
  map: RenderMap, 
  string: String,
  booleanSwitch: BooleanSwitch,
  number: NumberInput,
  integer: NumberInput,
  list: RenderList,
  // binary: UploadFile, // 文件上传，amp暂时不支持
  enum: EnumSelect,
  simpleMap: SimpleMap,
  typeSelect: TypeSelector, // any类型支持选择各种类型
  simpleList: SimpleList,
  // list: SimpleList,
  file: UploadFile,
  // json: JsonEdit,
  // fileTypeSelect: FileUploadType, // 文件上传切换，amp暂时不支持
  struct: Struct, // 数据结构
};
