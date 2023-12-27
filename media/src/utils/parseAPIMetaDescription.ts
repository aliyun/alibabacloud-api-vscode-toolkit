import fp from 'lodash/fp';
import { SemixJsonSchema } from 'semix-core';

export const getPathname = (base = "https://api.aliyun.com/document", popcode: string, version: string, docName?: string) => {
  if (!version) {
    return `${base}/${popcode}`;
  }
  if (!docName) {
    return `${base}/${popcode}/${version}`;
  }
  return `${base}/${popcode}/${version}/${docName}`;
};

const helpOriginPath = "https://help.aliyun.com/document_detail";

const isAlibabaCloud = false;
const isEnLang = false;

export const parseDescription = (description: string, popcode: string, version: string) => {
  if (!description) {
    return description;
  }
  const replacements = [
    (str: string) => str?.replace(/\]\(\~\~([\d]+)\~\~\)/g, `](${helpOriginPath}/$1.html)`),
    (str: string) => str?.replace(/\]\(\~\~([\d]+)\~\~l\)/g, `](${helpOriginPath}/$1.html)`),
    (str: string) => str?.replace(/\]\(\~\~(https?\:\/\/.+)\~\~\)/g, `]($1)`),
    (str: string) => str?.replace(/\]\(\~\~([A-Z]+[A-Za-z]+)\~\~\)/g, `](/document/${popcode}/${version}/$1)`),
    (str: string) => str?.replace(/\]\(\~\~(\d+)#(.+)\~\~\)/g, `](${helpOriginPath}/$1.html#$2)`),
    (str: string) => str?.replace(/\]\(\~\~(\d+)\~\~\#(.+)\)/g, `](${helpOriginPath}/$1.html#$2)`),
    (str: string) => str?.replace(/\]\(\~\~([A-Z]+.+)\~\~\#(.+)\)/g, `](/document/${popcode}/${version}/$1#$2)`),

    (str: string) => str?.replace(/\]\(([\d]+)\)/g, `](${helpOriginPath}/$1.html)`),
    (str: string) => str?.replace(/\[(.+)\]\(\~\~\~\~\)/g, `[$1](/document/${popcode}/${version}/$1)`),
    (str: string) => str?.replace(/\[(.+)\]\(\~\~\~\)/g, `[$1](/document/${popcode}/${version}/$1)`),
    (str: string) =>
      str?.replace(/\[(.+)\]\(\~\~文档ID可在文档转正后补充\~\~\)/g, `[$1](/document/${popcode}/${version}/$1)`),
    (str: string) => str?.replace(/\]\(\~\~struct\:(.+)\~\~\)/g, `](/struct/${popcode}/${version}/$1)`),
    (str: string) => str?.replace(/(- <props="china">\n*([\s\S]+?)\n*<\/props>)/g, isAlibabaCloud ? '' : '$1'),
    (str: string) => str?.replace(/<props="china">\n*([\s\S]+?)\n*<\/props>/g, isAlibabaCloud ? '' : '$1'),
    (str: string) => str?.replace(/<props="partner">\n*[\s\S]+?\n*<\/props>(\n)*/g, ''),
    (str: string) => str?.replace(/(- <props="intl">\n*([\s\S]+?)\n*<\/props>)/g, isAlibabaCloud ? '$1' : ''),
    (str: string) => str?.replace(/<props="intl">\n*([\s\S]+?)\n*<\/props>/g, isAlibabaCloud ? '$1' : ''),
  ];

  if (isEnLang && /([\u4e00-\u9fa5]+)/g.test(description)) {
    return '';
  }

  return replacements.reduce((str, replacement) => {
    return replacement(str);
  }, description);
};

export function parseSchemaDescription(schema: SemixJsonSchema, popcode: string, version: string) {
  if (!schema) {
    return schema;
  }

  const newSchema = SemixJsonSchema.mapSchema(schema as any, (schema) => {
    if (schema?.description) {
      return {
        ...schema,
        description: parseDescription(schema.description, popcode, version),
      };
    }
    return schema;
  });

  return newSchema;
}

export function parseAPIMetaDescription (
  apiMeta: any,
  popcode: string,
  version: string,
) {
  const result = { ...(apiMeta || {}) };
  const mdFields = ['description', 'extraInfo', 'requestParamsDescription', 'responseParamsDescription'];
  mdFields.forEach((field) => {
    if (apiMeta[field]) {
      result[field] = parseDescription(apiMeta[field], popcode, version);
    }
  });

  result.parameters = (apiMeta.parameters || []).map((param) => {
    if (!param?.schema) {
      return param;
    }
    return {
      ...param,
      schema: parseSchemaDescription(param.schema as any as SemixJsonSchema, popcode, version),
    };
  }) as any[];

  const newResponseSchema = parseSchemaDescription(
    apiMeta.responses?.['200']?.schema as any as SemixJsonSchema,
    popcode,
    version,
  );

  return fp.set('responses.200.schema', newResponseSchema, result);
}

export const parseExample = (example: string) => {
  if (!example) {
    return example;
  }
  const replacements = [
    (str: string) => str?.replace(/<props="china">([\s\S]+?)<\/props>/g, isAlibabaCloud ? '' : '$1'),
    (str: string) => str?.replace(/<props="intl">([\s\S]+?)<\/props>/g, isAlibabaCloud ? '$1' : ''),
  ];
  return replacements.reduce((str, replacement) => {
    return replacement(str);
  }, example);
};

export function parseSchemaExample(schema: SemixJsonSchema) {
  if (!schema) {
    return schema;
  }
  const newSchema = SemixJsonSchema.mapSchema(schema as any, (schema) => {
    if (schema.example) {
      return {
        ...schema,
        example: parseExample(schema.example),
      };
    }
    return schema;
  });

  return newSchema;
}

export function parseAPIMetaExample (apiMeta) {
  const result = { ...(apiMeta || {}) };

  result.parameters = (apiMeta.parameters || []).map((param) => {
    if (!param?.schema) {
      return param;
    }
    return {
      ...param,
      schema: parseSchemaExample(param.schema as any as SemixJsonSchema),
    };
  }) as any[];

  const newResponseSchema = parseSchemaExample(apiMeta.responses?.['200']?.schema as any as SemixJsonSchema);

  return fp.set('responses.200.schema', newResponseSchema, result);
}
