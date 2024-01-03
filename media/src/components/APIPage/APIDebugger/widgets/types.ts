import { SemixJsonSchema } from "semix-core";

export class ErrorField {
  dataPath: string;
  message: string;
}

export type AlicloudUISchema = SemixJsonSchema & {
  widget?: string;

  disabled?: boolean;

  hidden?: boolean;

  isRoot?: boolean;

  unCheckedChildren?: string;

  checkedChildren?: string;

  mode?: "simple" | "card";

  labelWidth?: number;

  placeholder?: string;

  /** 是否存在，一般用于条件式存在的表单项 */
  exists?: boolean;

  // properties?: SchemaMap<AlicloudUISchema>;
  properties?: any;
  additionalProperties?: AlicloudUISchema;
  items?: AlicloudUISchema;

  /** 枚举值为空时，下拉框展示内容，一般用于推荐枚举值为空时引导用户 */
  emptyEnumContent?: any;
};

export class CommonWidgetProps {
  value: any;
  schema = {} as AlicloudUISchema;
  onChange(value: any) {}
}

export class ListProps {
  addItem: () => any;
  copyItem: (index: number) => any;
  deleteItem: (index: number) => any;
  errorFields: ErrorField[];
  dataPath: string;
  schemaPath: string;
  schema: AlicloudUISchema;
  displayList: any[];
  fieldName: string;
  renderTitle?: Function;
}

export class MapProps {
  editItemKey: (index: number, newKey: string) => any;
  addItem: () => any;
  copyItem: (index: number) => any;
  deleteItem: (index: number) => any;
  errorFields: ErrorField[];
  dataPath: string;
  schema: AlicloudUISchema;
  displayList: any[];
  fieldName: string;
  renderTitle?: Function;
}

export class AnyProps {
  handleTypeChange: (type: string) => any;
  type: string;
  dataPath: string;
  schema: AlicloudUISchema;
  onChange(value: any) {}
  widgets: any;
  Icon: any;
}

export type SimpleTypes = "array" | "boolean" | "integer" | "null" | "number" | "object" | "string";
