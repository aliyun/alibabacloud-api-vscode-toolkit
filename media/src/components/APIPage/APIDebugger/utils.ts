import _ from "lodash";
import { SemixUISchema } from "../../SemixFormRender";

export const getCustomWidget = (schema: SemixUISchema): string => {
    if (schema?.customWidget === 'conditionInfo') {
      return 'conditionInfo';
    }
    if (schema?.type === 'array') {
      if (schema.items?.type === 'string' && schema?.widget === 'stringList') {
        return 'stringList';
      }
      return 'list';
    }
  
    if (schema?.type === 'string') {
      if (schema?.format === 'binary') {
        return 'binary';
      }
      if (schema?.enumValueTitles && Object.keys(schema?.enumValueTitles || {}).length < 5) {
        return 'radio';
      } else if (schema?.enum && schema?.enum?.length < 5) {
        return 'radio';
      } else if (schema?.enum || schema?.enumValueTitles || schema?.assistSchema?.dynamicEnumConfig) {
        return 'enum';
      }
      return 'string';
    } else if (schema?.type === 'boolean') {
      return 'booleanSwitch';
    } else if (schema?.type === 'object' && !_.isEmpty(schema?.additionalProperties)) {
      return 'map';
    } else if (schema?.type === 'object' && !schema?.properties) {
      return 'json';
    }
    return '';
  };