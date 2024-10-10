import { getFilesBySpecs, snippetsProvider } from "pontx-sdk-plugin-core";
import { createPontxGeneratePlugin, SnippetsProvider, PontxGeneratorPlugin, GetFilesBySpecs } from "pontx-generate";
import { PontSpec } from "pontx-spec";
import { InnerOriginConfig, PontManager } from "pontx-manager";
import { getRequiredParamsValue, getUserAgent } from "../utils";
import fetch from "node-fetch";
import { getCurrentLang } from "../utils/I18N";

const mySnippetsProvider: SnippetsProvider = (info) => {
  return [];
};

const myGetFilesBySpecs: GetFilesBySpecs = async (origins) => {
  const fileStructure = (origins || []).reduce((result, origin) => {
    return {
      ...result,
      [origin.name]: {
        [PontManager.lockFilename]: JSON.stringify(origin.spec, null, 2),
      },
    };
  }, {});

  return fileStructure;
};

const codeSampleProvider = async (info: {
  language: string;
  product: string;
  version: string;
  apiName: string;
  params?: any;
  simplify?: boolean;
}): Promise<any> => {
  const body = {
    apiName: info?.apiName,
    apiVersion: info?.version,
    product: info?.product,
    sdkType: "dara",
    params: info?.params || getRequiredParamsValue(info?.product, info?.version, info?.apiName),
    regionId: "regionId",
    endpoint: "endpoint",
    useCommon: false,
    simplify: info?.simplify,
    // language: item.label.toString().includes("(java-async)") ? "java-async" : language,
  };

  // 补全的 code 来源
  const makeCodeStr = await fetch(
    `https://api.aliyun.com/api/product/makeCode${getCurrentLang() === "en_US" ? "?language=EN_US" : ""}`,
    {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "User-Agent": getUserAgent(),
      },
    },
  ).then((res) => res.text());
  const sdkDemos = JSON.parse(makeCodeStr);

  const asyncFetchedCodes = Object.keys(sdkDemos?.data?.demoSdk || {})?.map((key) => {
    return {
      name: key,
      language: key,
      code: sdkDemos?.data?.demoSdk[key]?.codeSample,
      importList: sdkDemos?.data?.demoSdk[key]?.importList,
    };
  });
  return asyncFetchedCodes || [];
};

export const AlicloudApiMetaGeneratePlugin: any = createPontxGeneratePlugin({
  snippetsProvider: mySnippetsProvider,
  getFilesBySpecs: myGetFilesBySpecs,
});
export { getFilesBySpecs, snippetsProvider, codeSampleProvider };
