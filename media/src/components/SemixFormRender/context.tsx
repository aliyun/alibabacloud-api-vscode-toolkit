import { createContainer } from "unstated-next";
import * as React from "react";
import { baseValidate } from "./validate";
import { SemixUISchema, ErrorField } from "./type";
import { SemixJsonSchema, calcDynamicSchema } from "semix-core";
import _ from "lodash";
import I18N, { curLang } from "./I18N";
import { calcUiSchema, filterFormDataBySchema, immutableSet, semixifySchema } from "./utils";
import { defaultWidgets } from "./defaultWidgets";

export { ErrorField };

class FormProps {
  schema: SemixUISchema;
  formData: any;
  context? = {};
  getCustomWidget? = (schema: SemixUISchema): string => {
    if (
      schema.type === "array" &&
      schema.items?.type === "string" &&
      (schema.items?.enum || (schema.items as any)?.enumValueTitles)
    ) {
      return "checkbox";
    } else if (schema?.type === "string") {
      if (schema?.format === "binary") {
        return "binary";
      }
      if (schema?.enum || schema?.enumValueTitles) {
        if (schema?.enum?.length < 8) {
          return "radio";
        }
        if (Object.keys(schema?.enumValueTitles || {}).length < 8) {
          return "radio";
        }
        return "enum";
      }
      return "string";
    } else if (schema?.type === "boolean") {
      return "booleanSwitch";
    } else if (schema?.type === "object" && !_.isEmpty(schema?.additionalProperties)) {
      return "map";
    } else if (schema?.type === "object" && !schema?.properties) {
      return "string";
    }
    return "";
  };
}
export function useForm(initProps = new FormProps()) {
  const props = {
    ...new FormProps(),
    ...(initProps || {}),
  };
  const [originSchema, setOriginSchema] = React.useState(props.schema);
  const [formData, _setFormData] = React.useState({} as any);
  // 内部校验判断的错误
  const [internalErrorFields, setInternalErrorFields] = React.useState([] as ErrorField[]);
  // 外部额外判断的错误
  const [extraErrorFields, setExtraErrorFields] = React.useState([] as ErrorField[]);
  const [isValidating, setValidating] = React.useState(false);
  // const [context, setContext] = React.useState(props.context);
  const errorFields = React.useMemo(() => {
    return [...internalErrorFields, ...extraErrorFields];
  }, [internalErrorFields, extraErrorFields]);

  const _formData = React.useRef(formData);
  const _errorFields = React.useRef(errorFields);
  const _isValidating = React.useRef(isValidating);

  const _originSchema = React.useRef(originSchema);
  // const _context = React.useRef(context);

  _formData.current = formData;
  _errorFields.current = errorFields;
  _isValidating.current = isValidating;
  _originSchema.current = originSchema;
  // _context.current = context;

  React.useEffect(() => {
    if (!_.isEqual(props.schema, _originSchema.current)) {
      setOriginSchema(props.schema);
    }
  }, [props.schema]);

  const hasDynamicSchema = React.useMemo(() => {
    let hasDynamicSchemaResult = false;

    SemixJsonSchema.mapSchema(props.schema, (schema: any, prop) => {
      if (hasDynamicSchemaResult) {
        return schema;
      }
      if (schema?.visible && typeof schema?.visible === "string") {
        hasDynamicSchemaResult = true;
        return schema;
      }
      if (schema?.dynamic) {
        hasDynamicSchemaResult = true;
        return schema;
      }
      return schema;
    });
    return hasDynamicSchemaResult;
  }, [originSchema]);

  const uiSchema = React.useMemo(() => {
    return calcUiSchema(
      originSchema,
      hasDynamicSchema,
      props.context,
      _formData.current,
      props.getCustomWidget
    );
  }, [hasDynamicSchema ? formData : null, hasDynamicSchema ? props.context : null, originSchema]);

  const setFormData = React.useCallback(
    (setter: any) => {
      if (typeof setter === "function") {
        _setFormData((prevFormData) => {
          const newFormData = setter(prevFormData);
          const newSchema = calcUiSchema(
            originSchema,
            hasDynamicSchema,
            props.context,
            newFormData,
            props.getCustomWidget
          );
          const finalFormData = filterFormDataBySchema(newFormData, newSchema);
          return finalFormData;
        });
      } else {
        const newFormData = setter;
        const newSchema = calcUiSchema(
          originSchema,
          hasDynamicSchema,
          props.context,
          newFormData,
          props.getCustomWidget
        );
        const finalFormData = filterFormDataBySchema(newFormData, newSchema);
        _setFormData(finalFormData);
      }
    },
    [hasDynamicSchema]
  );

  return {
    isValidating: _isValidating.current,
    setValidating,
    formData: _formData.current,
    setFormData,
    errorFields: _errorFields.current,
    setExtraErrorFields,
    setInternalErrorFields,
    schema: uiSchema,
    // setContext,
    validateFields: () => {
      // const baseErrors = baseValidate(_schema.current!, _formData.current, _context.current, curLang);
      const errors: any[] = baseValidate(_formData.current, {
        schema: uiSchema,
        metaCtx: props.context,
        langs: curLang,
      });
      const errorsSetting = errors.map((error) => {
        return {
          dataPath: error.dataPath,
          message: error.message || "",
        };
      });
      setValidating(true);
      setInternalErrorFields(errorsSetting);

      return errors;
    },
  };
}

export type FormInstance = ReturnType<typeof useForm>;

export class FormStoreIntialState {
  widgets: { [key: string]: any } = {};
  renderTitle?: any;
  renderGroupArea = (groupProps: any) => {
    return <div className='area-title'>{groupProps.key}</div>;
  };
  uploadFile?: Function;
  errorFields: ErrorField[] = [];
  setInternalErrorFields: (errorFields: ErrorField[]) => void;
  setExtraErrorFields: (errorFields: ErrorField[]) => void;
  setFormData: (formData: any) => void;
  schema: SemixUISchema;
  setSchema: (schema: SemixUISchema) => void;
  formData: any;
  setValidating: (isValidating: boolean) => void;
  isValidating: boolean;
  readOnly: boolean = false;
  /** 数据结构 */
  components?: {
    [x: string]: SemixUISchema;
  };
  customIcon?: any;
  propsOnChange?: (formData: any) => any;
}

function useFormStoreContext(initialState = new FormStoreIntialState()) {
  const { propsOnChange, ...rest } = initialState;

  const onItemChange = (dataPath: string, value: any) => {
    const newFormData = immutableSet(dataPath, value);
    initialState.setFormData(newFormData);
  };

  React.useEffect(() => {
    propsOnChange && propsOnChange(initialState.formData);
  }, [initialState.formData]);

  const setNewSchema = (schemaPath: string, newSchema: SemixJsonSchema) => {
    initialState.setSchema(immutableSet(schemaPath, newSchema) as any);
  };

  return { ...rest, onItemChange, setNewSchema };
}

export const FormStoreContext = createContainer(useFormStoreContext);
