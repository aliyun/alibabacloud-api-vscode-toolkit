import { getFilesBySpecs, snippetsProvider } from "pontx-sdk-plugin-core";
import { createPontxGeneratePlugin, SnippetsProvider, PontxGeneratorPlugin, GetFilesBySpecs } from "pontx-generate";
import { PontSpec } from "pontx-spec";
import { InnerOriginConfig, PontManager } from "pontx-manager";

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

export const AlicloudApiMetaGeneratePlugin: any = createPontxGeneratePlugin({
  snippetsProvider: mySnippetsProvider,
  getFilesBySpecs: myGetFilesBySpecs,
});
export { getFilesBySpecs, snippetsProvider };
