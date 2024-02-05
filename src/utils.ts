import { lookForFiles, PontInnerManagerConfig, PontLogger, PontManager, PontxConfigPlugin } from "pontx-manager";
import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs-extra";
import { PontJsonPointer } from "pontx-spec";
import PontMetaFetchPlugin from "pontx-meta-fetch-plugin";
import { AlicloudAPIPontParserPlugin } from "./plugins/parser";
import { AlicloudApiMetaGeneratePlugin } from "./plugins/generate";
import _ from "lodash";
import { alicloudAPIMessageService } from "./Service";
import { AlicloudApiCommands } from "./commands";
import { AlicloudApiExplorer } from "./explorer";
const configSchema = require("pontx-spec/configSchema.json");

const { createServerContent } = require("../media/lib/index");

export const pontConsole = vscode.window.createOutputChannel("Alibaba Cloud API Toolkit");

export const plugins = {
  fetch: {
    instance: new PontMetaFetchPlugin(),
    options: {},
  },
  parser: {
    instance: new AlicloudAPIPontParserPlugin(),
    options: {},
  },
  generate: {
    instance: new AlicloudApiMetaGeneratePlugin(),
    options: {},
  },
};

export const findAlicloudAPIConfig = async (context: vscode.ExtensionContext) => {
  const pontxConfigUri = vscode.Uri.joinPath(context.globalStorageUri, "/alicloud-api-toolkit-config.json");

  let publicConfig = {
    // 拉取的meta存储的地方（这里改成配改成文件存储空间：ExtensionContext.globalStorageUri）
    outDir: "./alicloud-services",
    // 订阅的数据源
    origins: [
      {
        name: "Ecs::2014-05-26",
        url: "https://api.aliyun.com/meta/v1/products/Ecs/versions/2014-05-26/api-docs.json",
      },
    ],
  } as any;

  try {
    // 读文件
    const uint8Array = await vscode.workspace.fs.readFile(pontxConfigUri);
    publicConfig = JSON.parse(String.fromCharCode(...uint8Array));
  } catch (e) {
    // 写文件
    const publicConfigUint8Array = new Uint8Array(Buffer.from(JSON.stringify(publicConfig), "utf-8"));
    await vscode.workspace.fs.writeFile(pontxConfigUri, publicConfigUint8Array);
  }

  // publicConfig.rootDir = pontxConfigUri.path;

  return publicConfig;
};

export const registerConfigSchema = async (context: vscode.ExtensionContext) => {
  try {
    const myProvider = new (class implements vscode.TextDocumentContentProvider {
      onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
      onDidChange = this.onDidChangeEmitter.event;
      provideTextDocumentContent(uri: vscode.Uri): string {
        return this.schema;
      }

      async getPluginSchema() {
        try {
          const [configDir, pontPublicConfig] = await findAlicloudAPIConfig(context);
          const pontxConfig = PontInnerManagerConfig.constructorFromPublicConfig(
            pontPublicConfig,
            new PontLogger(),
            configDir,
          );
          const configPlugin = await pontxConfig.plugins.config?.instance;

          if (configPlugin) {
            this.registerCommand(configPlugin);
            return await configPlugin.getSchema();
          }
        } catch (e) {}
      }

      async registerCommand(configPlugin: PontxConfigPlugin) {
        try {
          const origins = await configPlugin.getOrigins();

          if (origins.length) {
            vscode.commands.executeCommand("setContext", "alicloud.api.hasPontxOrigins", true);
          }
        } catch (e) {}
      }

      schema = JSON.stringify(configSchema, null, 2);

      constructor() {
        this.getPluginSchema().then((value) => {
          if (value) {
            this.schema = value;
            // this.onDidChangeEmitter.fire();
            this.onDidChangeEmitter.fire(vscode.Uri.parse("pontx://schemas/config-plugin-schema"));
          }
        });
      }
    })();
    context.subscriptions.push(
      vscode.Disposable.from(vscode.workspace.registerTextDocumentContentProvider("pontx", myProvider)),
    );
  } catch (e) {}
};

export function showProgress(
  title: string,
  manager: PontManager,
  task: (report?: (info: string) => any) => Thenable<any>,
) {
  return vscode.window.withProgress(
    {
      title,
      location: vscode.ProgressLocation.Window,
    },
    async (p) => {
      try {
        manager.logger.log = (info) => {
          p.report({
            message: info,
          });
        };

        await task((info) => p.report({ message: info }));
      } catch (e) {
        vscode.window.showErrorMessage(e.toString());
      }
    },
  );
}

export function wait(ttl = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ttl);
  });
}

export class VSCodeLogger extends PontLogger {
  constructor(private attachLogger?: VSCodeLogger["log"]) {
    super();
  }

  log(message: string, logType?: string, stack?: any): void {
    if (logType === "error") {
      pontConsole.appendLine(message);
      pontConsole.appendLine(stack);
      vscode.window.showErrorMessage(message);
    } else {
      // vscode.window.showInformationMessage(message);
    }
    if (this.attachLogger) {
      this.attachLogger(message, logType, stack);
    }
  }

  static createFromProgress(progress: vscode.Progress<{ message?: string; increment?: number }>) {
    return new VSCodeLogger((message: string, logType?: string, stack?) => {
      // if (logType === "info") {
      //   progress.report({ message });
      // }

      progress.report({ message });
    });
  }
}

export const htmlTemplate = (context: { cspSource: string; getUri: (uri: string) => any }, pageConfig: any) => {
  // const initContent = createServerContent(pageConfig);

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Alibaba Cloud API Toolkit UI</title>
    <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'none'; img-src ${context.cspSource} https:;font-src ${context.cspSource}; script-src ${
    context.cspSource
  } https://cdn.jsdelivr.net; style-src ${context.cspSource} https://cdn.jsdelivr.net 'self' 'unsafe-inline';"
    />
    <input type="hidden" id="router-meta-data" value="${encodeURI(JSON.stringify(pageConfig))}"></input>
    </script>
    <link rel="stylesheet" href="${context.getUri("media/dist/assets/index.css")}">
  </head>
  <body>
    <div id="root"></div>
    <link href="${context.getUri("media/src/icon.css")}" rel="stylesheet" />
    <link href="${context.getUri("node_modules/@vscode/codicons/dist/codicon.css")}" rel="stylesheet" />
    <script defer type="module" crossorigin src="${context.getUri("media/dist/assets/index.js")}"></script>
  </body>
</html>`;
};

export function batchDispose(disposables: vscode.Disposable[]) {
  if (disposables?.length) {
    disposables.forEach((disposable) => {
      if (disposable && disposable.dispose) {
        disposable.dispose();
      }
    });
  }
}

export async function findInterface(editor: vscode.TextEditor, hasMultiOrigins: boolean, pontManager: PontManager) {
  const pos = editor.selection.start;
  const codeAtLine = editor.document.getText().split("\n")[pos.line];

  if (!codeAtLine) {
    return Promise.reject(new Error(`[findInterface]:找不到接口 ${codeAtLine}`));
  }

  const words = codeAtLine.split(".");

  if (words.length < 2) {
    return Promise.reject(new Error(`[findInterface]:找不到接口 ${words}`));
  }

  let wordIndex = 0;
  let chPos = 0;

  for (let index = 0; index < words.length; ++index) {
    const word = words[index];

    if (chPos + word.length > pos.character) {
      wordIndex = index;

      break;
    }

    chPos += word.length;
    // add . length
    chPos++;
  }

  if (wordIndex === 0) {
    return;
  }

  const wordsWithOrigin = [words[wordIndex - 2], words[wordIndex - 1], words[wordIndex]];
  const localSpecs = pontManager.localPontSpecs;

  let offsetIndex = 1;
  let specIndex = 0;
  if (hasMultiOrigins) {
    offsetIndex = 0;
    specIndex = localSpecs?.findIndex((spec) => spec.name === wordsWithOrigin[offsetIndex]);

    if (specIndex < 0) {
      offsetIndex = 1;
      specIndex = localSpecs?.findIndex((spec) => spec.name === wordsWithOrigin[offsetIndex]);
    }
    if (specIndex < 0) {
      offsetIndex = 1;
      specIndex = 0;
    }
  }

  const apiKey = wordsWithOrigin.slice(offsetIndex + 1).join("/");
  const nameWords = wordsWithOrigin.slice(offsetIndex + 1);
  const api = PontJsonPointer.get(localSpecs, `${specIndex}.apis.[${apiKey}]`);
  if (api) {
    return {
      specName: localSpecs[specIndex]?.name || "",
      apiName: api?.name,
      apiKey,
      modName: nameWords?.length > 1 ? nameWords[0] : "",
    };
  }
}

export async function viewMetaFile(meta: {
  specName: string;
  modName: string;
  specType: "Spec" | "Mod" | "API" | "Struct";
  apiName?: string;
  structName?: string;
  pontManager: PontManager;
}) {
  const innerConf = meta.pontManager.innerManagerConfig;
  const isSingleSpec = PontManager.checkIsSingleSpec(meta.pontManager);
  let outDir = path.join(innerConf.outDir, "sdk");
  let outFile;
  const specName = meta.specName;
  let lockPath = path.join(outDir, specName, PontManager.lockFilename);
  const hasLockPath = fs.existsSync(lockPath);

  if (!hasLockPath) {
    const newLockPath = path.join(outDir, PontManager.lockFilename);
    if (fs.existsSync(newLockPath)) {
      lockPath = newLockPath;
    }
  }

  outFile = lockPath;
  const textDocument = await vscode.workspace.openTextDocument(vscode.Uri.file(outFile));
  const activeEditor = await vscode.window.showTextDocument(textDocument);
  const textCode = textDocument.getText();
  if (meta.specType === "Mod" && meta.modName) {
    const beginOffset = textCode.indexOf(`"namespace": "${meta.modName}"`);
    const beginLine = textCode.slice(0, beginOffset).split("\n").length - 1;
    const beginCol = beginOffset - textCode.slice(0, beginOffset).lastIndexOf("\n");
    const startPos = new vscode.Position(beginLine, beginCol);
    const endPos = new vscode.Position(beginLine, beginCol + `"${meta.modName}": `.length);

    activeEditor.revealRange(new vscode.Range(startPos, endPos));
    activeEditor.selection = new vscode.Selection(startPos, endPos);
  } else if (meta.specType === "API" && meta.apiName) {
    const apiKey = meta.modName ? `${meta.modName}/${meta.apiName}` : meta.apiName;
    const beginOffset = textCode.indexOf(`"${apiKey}": {`);
    const beginLine = textCode.slice(0, beginOffset).split("\n").length - 1;
    const beginCol = beginOffset - textCode.slice(0, beginOffset).lastIndexOf("\n");
    const startPos = new vscode.Position(beginLine, beginCol);
    const endPos = new vscode.Position(beginLine, beginCol + `"${apiKey}": {`.length);
    activeEditor.revealRange(new vscode.Range(startPos, endPos));
    activeEditor.selection = new vscode.Selection(startPos, endPos);
  } else if (meta.specType === "Struct" && meta.structName) {
    const beginOffset = textCode.indexOf(`"${meta.structName}": {`);
    const beginLine = textCode.slice(0, beginOffset).split("\n").length - 1;
    const beginCol = beginOffset - textCode.slice(0, beginOffset).lastIndexOf("\n");
    const startPos = new vscode.Position(beginLine, beginCol);
    const endPos = new vscode.Position(beginLine, beginCol + `"${meta.structName}": {`.length);
    activeEditor.revealRange(new vscode.Range(startPos, endPos));
    activeEditor.selection = new vscode.Selection(startPos, endPos);
  }
}

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
            item.style === 'json' &&
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

export const getDefaultValue = (schema) => {
  switch(schema?.type){
    case 'string' : return "";
    case 'number' : return 0;
    case 'boolean': return false;
    case 'array': return [];
    case 'object': return {};
    default: return "";
  }
}

export const getRequiredParamsValue = (product:string,version:string, api:string) => {
  const service = alicloudAPIMessageService;
    let apis = [];
    const selectSpec = service.pontManager.localPontSpecs?.find((spec) => spec.name === `${product}::${version}`);
    const selectAPI = _.find(selectSpec?.apis || {}, item=>item.name === api);
    
    const paramsValue = {}
    const requiredParams = selectAPI?.parameters?.map(param=>{
      if(param?.schema?.required){
        paramsValue[param.name] = param.schema?.example || getDefaultValue(param.schema)
        return param
      }
    }) 

  return paramsValue
}

export const fileSel: vscode.DocumentSelector = [
  { scheme: "file", language: "typescript" },
  { scheme: "file", language: "go" },
  { scheme: "file", language: "java" },
  { scheme: "file", language: "csharp" },
  { scheme: "file", language: "python" },
  { scheme: "file", language: "php" },
];

 export const containsAnySubstring = (targetStr, substrings) => {
  const language = vscode.window.activeTextEditor?.document.languageId;
  if(language !== "typescript"){
    return false
  }
  for (let i = 0; i < substrings.length; i++) {
    if (targetStr.includes(substrings[i])) {
      return true;
    }
  }
  return false;
}