import { Message } from "@alicloud/console-components";

export const simpleType: any[] = ["string", "boolean", "number", "array", "object"];

// export const onGetRandomValue = async (changeValue, schema) => {
//     try {
//       const randomValueData: any = await API.apiTest.popFlow.getRandomParameter.request({}, schema);
//       if(['number','integer'].includes(schema.type) && schema.format !== "int64"){
//         changeValue(Number(randomValueData.data));
//       }
//       else{
//         changeValue(randomValueData.data);
//       }
//       return randomValueData.data
//     } catch (err) {
//       Message.error(err?.message);
//       return null
//     }
//   };

  export const getTypeOfValue = (value)=>{
    if(Array.isArray(value)){
      return 'array';
    }
    return typeof value
  }

  export const getNextSchemaPath = (schemaPath: any, key: string) => {
    const next = key?.includes(".") ? `["${key}"]` : key;
    return schemaPath ? schemaPath + ".properties." + next : "properties." + next;
  };

  /**
 * @author 念依
 * @description ampDebugger 工具函数
 */
// import { emitter } from '@/utils/emitter';
// import { ErrorField } from '@ali/api-component';
import _ from 'lodash';
import { ErrorField } from "../../../../SemixFormRender/context";

export const schemaTraversal = (schema, parentPath?: string) => {
  if (!schema) return;
  schema.path = parentPath ? parentPath + '.' + schema?.name : schema?.name;
  // 删除空的enum
  if (Array.isArray(schema?.enum) && schema?.enum?.length === 0) {
    delete schema.enum;
  }
  if (schema.hasOwnProperty('exclusiveMaximum')) {
    delete schema.exclusiveMaximum;
  }
  if (schema.hasOwnProperty('exclusiveMinimum')) {
    delete schema.exclusiveMinimum;
  }
  if (schema?.format === 'int32' && !schema?.maximum) {
    schema.maximum = 2147483647;
  }
  if (
    schema?.type === 'number' ||
    (schema?.type === 'integer' && schema?.format === 'int64') ||
    schema?.format === 'double'
  ) {
    schema.type = 'string';
    schema.pattern = schema?.pattern?.length ? schema.pattern : '^(-|+)?d+(.d+)?$';
  }
  if (schema?.$ref) {
    schema.ref = schema.$ref;
    delete schema.$ref;
  }
  if (schema?.type && schema?.type === 'array' && schema?.items) {
    schema.items.name = 'items';
    schemaTraversal(schema?.items, schema.path);
  }
  if (schema?.type && schema?.type === 'object' && schema?.properties) {
    Object.keys(schema?.properties).map((key) => {
      schema.properties[key].name = key;
      schemaTraversal(schema?.properties[key], `${schema.path}.properties`);
    });
  }
  if (schema?.type && schema?.type === 'object' && schema?.additionalProperties) {
    schemaTraversal(schema?.additionalProperties, `${schema.path}.additionalProperties`);
  }
  if (!schema?.description && schema?.title) {
    schema['description'] = schema.title;
  }
  schemaTraversal(schema?.schema, schema.path);
};

export const getFormatParams = (meta, form) => {
  const newMeta = [...meta];
  newMeta?.map((param) => {
    // 请求参数有body的情况，如果body里的参数有必填，则body必填
    if (param.schema?.name === 'body') {
      const body = form?.schema?.current?.properties?.body || null;
      if (body?.required?.length) {
        param.schema.required = true;
      }
    }
    param.schema.name = param.name;
    // 参数分组
    // if (Object.keys(categoryObj || {})?.length) {
    //   Object.keys(categoryObj || {}).map((key, index) => {
    //     if (categoryObj[key].includes(param.name)) {
    //       param.schema.group = key;
    //       param.schema.groupIndex = index + 1;
    //     }
    //   });
    // }
    schemaTraversal(param.schema);
  });
  return newMeta;
};

// export const addParamStruct = (schemaPath, schema) => {
//   emitter.emit('addStruct', { schemaPath, schema });
// };

export const addNewStruct = (parameters, schemaPath, struct) => {
  // const _struct = {...struct}
  const _parameters = [...parameters];
  const travelSchema = (schema) => {
    if (!schema) return;
    if (`properties.${schema?.path}` === schemaPath && schema.ref) {
      Object.keys(struct)?.map((key) => {
        if (key !== 'path') {
          schema[key] = struct[key];
        }
      });
      schema.path = schema?.path + '.ref';
      delete schema.ref;
      return;
    }
    if (schema?.type && schema?.type === 'array' && schema?.items) {
      travelSchema(schema?.items);
    }
    if (schema?.type && schema?.type === 'object' && schema?.properties) {
      Object.keys(schema?.properties).map((key) => {
        travelSchema(schema?.properties[key]);
      });
    }
    travelSchema(schema?.schema);
  };

  _parameters?.map((param) => {
    travelSchema(param?.schema);
  });
  return _parameters;
};

export const getFormatValues = (paramValues: any, apiParams, purpose?: string) => {
  if (!apiParams?.length) {
    return {};
  }

  const newAPIParamValues = _.cloneDeep(paramValues || {});

  // 调试器校验前的valueformat不需要转换object(json)
  if (purpose !== 'validate') {
    Object.keys(newAPIParamValues || {})?.map((key) => {
      if (key !== 'endpoint' && !apiParams?.find((item) => item.name === key)) {
        delete newAPIParamValues?.[key];
      }
      // 处理object类型,但需要往后端传json string类型的参数值(不能仅仅用 style 为 json 进行判断)
      if (
        apiParams?.find(
          (item) =>
            item.name === key &&
            item.schema?.type === 'object' &&
            !item.schema?.properties &&
            !item.schema?.additionalProperties,
        )
      ) {
        try {
          newAPIParamValues[key] = JSON.stringify(newAPIParamValues[key]);
        } catch (e) {
          newAPIParamValues[key] = '';
        }
      }
    });
  } else {
    // 兼容校验问题
    Object.keys(newAPIParamValues || {})?.map((key) => {
      if (key !== 'endpoint' && !apiParams?.find((item) => item.name === key)) {
        delete newAPIParamValues?.[key];
      }
      // 处理object类型,但需要往后端传json string类型的参数值(不能仅仅用 style 为 json 进行判断)
      if (
        apiParams?.find(
          (item) =>
            item.name === key &&
            item.schema?.type === 'any' &&
            !item.schema?.properties &&
            !item.schema?.additionalProperties &&
            typeof newAPIParamValues[key] === 'string',
        )
      ) {
        try {
          console.log(newAPIParamValues[key], JSON.parse(newAPIParamValues[key]));
          newAPIParamValues[key] = JSON.parse(newAPIParamValues[key]);
        } catch (e) {
          newAPIParamValues[key] = {};
        }
      }
    });
  }

  const travelObj = (values) => {
    // 不再过滤空字符串
    Object.keys(values || {})?.map((key) => {
      if (values[key] === undefined) {
        delete values?.[key];
      }
      if (typeof values[key] === 'object' && !Array.isArray(values[key])) {
        if (isEmptyObj(values[key])) {
          delete values?.[key];
        }
        travelObj(values[key]);
      }
      if (Array.isArray(values[key])) {
        if (values[key]?.length === 0) {
          delete values?.[key];
        } else {
          values[key].map((item, index) => {
            if (item === undefined) {
              values[key].splice(index, 1);
            }
            if (typeof item === 'object') {
              if (isEmptyObj(item)) {
                values[key].splice(index, 1);
              }
              travelObj(item);
            }
          });
        }
      }
    });
  };

  const isEmptyObj = (obj) => {
    let isEmpty = true;

    Object.keys(obj || {}).forEach((key) => {
      if (obj[key] === '') {
        isEmpty = false;
      }
      if (key === '') {
        isEmpty = true;
      }
      if (obj[key] || key !== '') {
        if (Array.isArray(obj[key]) && obj[key].length) {
          isEmpty = false;
        }
        if (['string'].includes(typeof obj[key]) && !!obj[key]) {
          isEmpty = false;
        }
        if (['number', 'boolean'].includes(typeof obj[key])) {
          isEmpty = false;
        }
        if (_.isObject(obj[key]) && !_.isEmpty(obj[key])) {
          isEmpty = false;
        }
      }
    });
    return isEmpty;
  };

  travelObj(newAPIParamValues);
  return newAPIParamValues;
};

export const handleExample = (schema, example) => {
  if (['array', 'object', 'map'].includes(schema.type)) {
    return undefined;
  } else if (schema.type === 'number') {
    return Number(example);
  } else if (schema.type === 'boolean') {
    if (schema.example === 'true') {
      return true;
    } else {
      return false;
    }
  } else {
    return schema.example;
  }
};

export const stringToType = (type: string, value: string) => {
  switch (type) {
    case 'number':
      return Number(value);
    case 'boolean':
      if (value === 'true') {
        return true;
      }
      return false;
    default:
      return value;
  }
};

export const getErrorWarningTip = (errors: ErrorField[]) => {
  let errTip = '';
  errors?.map((error) => {
    const errorMsg = `${error.dataPath}${error.message}`;
    errTip = errTip?.length ? errTip + '，' + errorMsg : errorMsg;
  });
  return errTip;
};
