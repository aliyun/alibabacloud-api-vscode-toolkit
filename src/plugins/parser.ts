import * as PontSpec from "pontx-spec";
import { PontxParserPlugin } from "pontx-manager";
import * as _ from "lodash";
import I18N from "../utils/I18N";

function mapObject<T, V>(obj: any, mapper: (val: T, key: string) => V) {
  if (!obj) {
    return obj;
  }

  return Object.keys(obj || {}).reduce((result, key) => {
    return {
      ...result,
      [key]: mapper(obj[key], key),
    };
  }, {} as V);
}

const getHelpOriginPath = (isAlibabaCloud: boolean, isEnLang: boolean) => {
  return isAlibabaCloud
    ? `https://www.alibabacloud.com/help/${isEnLang ? "en" : "zh"}/doc-detail`
    : "https://help.aliyun.com/document_detail";
};
type SimpleMeta = {
  popcode: string;
  version: string;
};

export const parseDescription = (description: string, meta: SimpleMeta) => {
  const { popcode, version } = meta;
  const options = {
    isAlibabaCloud: false,
    isEnLang: false,
  };
  if (!description) {
    return description;
  }
  const helpOriginPath = getHelpOriginPath(options.isAlibabaCloud, options.isEnLang);

  const workbenchReplacements = [
    (str: string) => str?.replace(/\]\(\~\~([A-Z]+.+)\~\~\)/g, `](/document/${popcode}/${version}/$1)`),
    (str: string) => str?.replace(/\]\(\~\~([A-Z]+.+)\~\~\#(.+)\)/g, `](/document/${popcode}/${version}/$1#$2)`),
    (str: string) => str?.replace(/\[(.+)\]\(\~\~\~\~\)/g, `[$1](/document/${popcode}/${version}/$1)`),
    (str: string) => str?.replace(/\[(.+)\]\(\~\~\~\)/g, `[$1](/document/${popcode}/${version}/$1)`),
    (str: string) =>
      str?.replace(/\[(.+)\]\(\~\~文档ID可在文档转正后补充\~\~\)/g, `[$1](/document/${popcode}/${version}/$1)`),
    (str: string) => str?.replace(/\]\(\~\~struct\:(.+)\~\~\)/g, `](/struct/${popcode}/${version}/$1)`),
  ];

  const commonReplacements = [
    (str: string) => str?.replace(/\]\(\~\~([\d]+)\~\~\)/g, `](${helpOriginPath}/$1.html)`),
    (str: string) => str?.replace(/\]\(\~\~([\d]+)\~\~l\)/g, `](${helpOriginPath}/$1.html)`),
    (str: string) => str?.replace(/\]\(\~\~(https?\:\/\/.+)\~\~\)/g, `]($1)`),
    (str: string) => str?.replace(/\]\(\~\~(\d+)#(.+)\~\~\)/g, `](${helpOriginPath}/$1.html#$2)`),
    (str: string) => str?.replace(/\]\(\~\~(\d+)\~\~\#(.+)\)/g, `](${helpOriginPath}/$1.html#$2)`),

    (str: string) => str?.replace(/\]\(([\d]+)\)/g, `](${helpOriginPath}/$1.html)`),
    (str: string) => str?.replace(/<props="china">\n*([\s\S]+?)\n*<\/props>(\n)*/g, options.isAlibabaCloud ? "" : "$1"),
    (str: string) => str?.replace(/<props="partner">\n*[\s\S]+?\n*<\/props>(\n)*/g, ""),
    (str: string) => str?.replace(/<props="intl">\n*([\s\S]+?)\n*<\/props>/g, options.isAlibabaCloud ? "$1" : ""),
  ];
  const isHelpOrigin = false;
  const replacements = isHelpOrigin ? commonReplacements : [...workbenchReplacements, ...commonReplacements];

  return replacements.reduce((str, replacement) => {
    return replacement(str);
  }, description);
};

function parseAlicloudStruct(alicloudStruct: PontSpec.PontJsonSchema, meta: SimpleMeta): PontSpec.PontJsonSchema {
  return PontSpec.PontJsonSchema.mapPontxSchema(alicloudStruct, (struct) => {
    if (!struct) {
      return struct as any as PontSpec.PontJsonSchema;
    }

    const newStruct = { ...struct };

    if (struct.description) {
      newStruct.description = parseDescription(struct.description, meta);
    }

    if (newStruct.$ref) {
      const { $ref, ...rest } = newStruct;
      const new$ref = $ref?.includes("#/components/schemas/")
        ? "#/definitions/" + $ref.slice("#/components/schemas/".length)
        : $ref;

      return {
        ...rest,
        $ref: new$ref,
        typeName: new$ref.slice("#/definitions/".length),
        isDefsType: true,
      } as any;
    }

    return {
      ...newStruct,
    } as any;
  });
}

function parseResponses(responses: PontSpec.PontAPI["responses"], meta: SimpleMeta): PontSpec.PontAPI["responses"] {
  return mapObject(responses, (response: any) => {
    return {
      ...(response as any),
      schema: parseAlicloudStruct(response.schema, meta),
    };
  });
}

function parseParameter(parameter: any, meta: SimpleMeta): PontSpec.Parameter {
  const { name, schema } = parameter;
  const resultSchema = parseAlicloudStruct(schema, meta) || {};
  if (parameter.style) {
    if (resultSchema.ext) {
      resultSchema.ext.style = parameter.style;
    } else {
      resultSchema.ext = { style: parameter.style };
    }
  }
  return {
    ["in"]: parameter.in as any,
    name,
    required: schema.required,
    schema: resultSchema,
  };
}

function parseAlicloudAPI(apiName: string, api: any, style = "RPC", meta: SimpleMeta): PontSpec.PontAPI | null {
  if (!api) {
    return null;
  }

  const { summary, description, consumes, deprecated, methods, path, parameters, responses, ext, ...rest } = api;
  const newParameters = (parameters || []).map(parseParameter).filter((param) => {
    if (style === "RPC") {
      if (
        ["Action", "OwnerId", "ResourceOwnerAccount", "ResourceOwnerId", "OwnerAccount", "AccessKeyId"].includes(
          param?.name,
        )
      ) {
        return false;
      }

      // if (param?.position === 'Host' && !hostEnable) {
      //   return false;
      // }

      if (["Domain", "System"].includes(param?.in)) {
        return false;
      }

      return true;
    }
    return true;
  });

  const desc = parseDescription(description || summary, meta);
  const apiLink = `https://api.aliyun.com/api/${meta.popcode}/${meta.version}/${apiName}`;

  return {
    consumes,
    summary,
    description: desc,
    deprecated,
    title: (api as any).title || summary,
    name: apiName,
    method: methods?.[0],
    methods: methods,
    path,
    parameters: _.unionBy<PontSpec.Parameter>(newParameters, "name"),
    responses: parseResponses(responses, meta),
    externalDocs: {
      description: I18N.plugins.parser.gotoDebug,
      url: apiLink,
    },
    ext: {
      summary,
      methods,
      ...rest,
      ...ext,
    },
  } as PontSpec.PontAPI;
}

function parseAlicloudSpec(
  alicloudSpec: any,
  meta: {
    specName: string;
    popcode: string;
    version: string;
  },
): PontSpec.PontSpec {
  const apis = _.mapValues(alicloudSpec.apis || {}, (api, apiName) => {
    return parseAlicloudAPI(apiName, alicloudSpec.apis[apiName], alicloudSpec.info?.style, meta);
  });

  return {
    name: meta.specName,
    ext: {
      ...(alicloudSpec.ext || {}),
      directories: alicloudSpec.directories,
      style: alicloudSpec.info.style,
      version: meta.version,
      popcode: meta.popcode,
    },
    apis: apis as any,
    directories: [],
    definitions: _.mapValues(alicloudSpec?.components?.schemas || {}, (schema, key) => {
      return parseAlicloudStruct(schema, meta) as PontSpec.PontJsonSchema;
    }),
  };
}

export class AlicloudAPIPontParserPlugin extends PontxParserPlugin {
  apply(metaStr: string, specName: string, options?: any): Promise<PontSpec.PontSpec> {
    const origin =
      this.innerConfig?.origins?.find((origin) => origin?.name === specName) || this.innerConfig?.origins?.[0];
    const popcode = origin?.url?.match(/\/products\/([^\/]+)/)?.[1];
    const version = origin?.url?.match(/\/versions\/([^\/]+)/)?.[1];

    try {
      let alicloudSpecData = null;

      try {
        alicloudSpecData = JSON.parse(metaStr);
      } catch (e) {
        this.logger.error(I18N.plugins.parser.specParseErrorTip + metaStr);
        return null;
      }

      return Promise.resolve(
        parseAlicloudSpec(alicloudSpecData || {}, {
          popcode,
          version,
          specName,
        }),
      );
    } catch (e) {
      console.log(e.stack);
      this.logger.error({
        message: e.message,
        processType: "parser",
      });
      return null;
    }
  }
}
