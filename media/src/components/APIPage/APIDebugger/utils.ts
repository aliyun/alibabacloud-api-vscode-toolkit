export const getCustomWidget = (schema): string => {
  if (schema?.type === 'array') {
    console.log("array")
    // if (schema.items?.type === 'string' && schema?.widget === 'stringList') {
    //   return 'stringList';
    // }
    return 'list';
  }
  if (schema?.type === 'string') {
    if (schema?.isFileTransferUrl) {
      return 'fileTypeSelect';
    }
    if (schema?.format === 'binary') {
      return 'file';
    }
    if (schema?.enum || schema?.enumValueTitles) {
      return 'enum';
    }
    return 'string';
  } else if (schema?.type === 'boolean') {
    return 'booleanSwitch';
  } else if (schema?.type === 'object' && schema?.additionalProperties) {
    return 'map';
  } else if (schema?.type === 'object' && !schema?.properties) {
    return 'json';
  } else if (schema?.type === 'any') {
    return 'typeSelect';
  } else if ((schema?.ref || schema?.$ref) && !schema?.properties && !schema?.items) {
    return 'struct';
  }
  // else if (schema?.type === 'number' || (schema?.type === 'integer' && schema?.format === 'int64')){
  //   return "string"
  // }
  return '';
};