import { PontManager } from "pontx-manager";
import * as _ from "lodash";
import * as vscode from "vscode";
import {
  AKHelperWithLanguage,
  findAlicloudAPIConfig,
  findInterface,
  getSpecInfoFromName,
  plugins,
  showProgress,
  viewMetaFile,
  VSCodeLogger,
  wait,
} from "./utils";
import { AlicloudAPIWebview } from "./webview";
import { alicloudAPIMessageService } from "./Service";
import { PontSpec } from "pontx-spec";
import * as fs from "fs-extra";
import { Product } from "./types";
import { codeSampleProvider } from "./plugins/generate";
import { generateImport } from "./common/generateImport";
import { getProfileInfoInstance } from "./profileManager";
import { getProductRequestInstance, ProductExplorer } from "./productExplorer";
import I18N from "./utils/I18N";

const path = require("path");

export const insertCode = (code: string, insertPosition?) => {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    editor.edit((builder) => {
      if (editor.selection.isEmpty) {
        const position = insertPosition ? insertPosition : editor.selection.active;

        builder.insert(position, code);
      } else {
        builder.replace(editor.selection, code);
      }
    });
  }
};

export class AlicloudApiCommands {
  static getPickItems(pontSpec: PontSpec) {
    const hasSingleMod = PontSpec.getMods(pontSpec).length <= 1;
    const items = PontSpec.getMods(pontSpec)
      .map((mod) => {
        return mod.interfaces.map((inter) => {
          return {
            tags: inter.deprecated ? [vscode.CompletionItemTag.Deprecated] : [],
            label: `${inter.name}`,
            detail: `${pontSpec.name?.split("__").join(" ")}`,
            info: `${pontSpec.name ? pontSpec.name + "/" : ""}${inter.name}`,
            description: `${inter.deprecated ? "@deprecated\n" : ""} ${inter.description || inter.summary || ""}`,
            summary: `${inter.summary || ""}`,
          };
        });
      })
      .reduce((pre, next) => pre.concat(next), []);

    return items;
  }

  static getPickProductItems(product: Product) {
    // const hasSingleMod = PontSpec.getMods(pontSpec).length <= 1;
    return {
      label: `[${product.code}]${product.name}`,
      code: product.code,
      detail: I18N.template(I18N.src.commands.recommandVersion, { val1: product.defaultVersion || "" }),
      description: `${product.description || ""}`,
      versions: product.versions?.map((version) => {
        return {
          label: I18N.template(I18N.src.commands.chooseAPIVersion, { val1: version }),
          key: version,
          description: version === product.defaultVersion ? I18N.src.commands.recmmandVersion2 : "",
        } as vscode.QuickPickItem;
      }),
    };
  }

  static registerCommands(context) {
    const service = alicloudAPIMessageService;

    vscode.commands.registerCommand("alicloud.api.githubIssue", async () => {
      vscode.env.openExternal(
        vscode.Uri.parse("https://github.com/aliyun/alibabacloud-api-vscode-toolkit/issues?q=is%3Aissue+is%3Aclosed"),
      );
    });

    vscode.commands.registerCommand("alicloud.api.feedback", async () => {
      vscode.env.openExternal(
        vscode.Uri.parse("https://g.alicdn.com/aes/tracker-survey-preview/0.0.13/survey.html?pid=fePxMy&id=3486"),
      );
    });

    vscode.commands.registerCommand("alicloud.api.openConfig", async () => {
      vscode.commands.executeCommand("workbench.action.openSettings", `@ext:alibabacloud-openapi.vscode-alicloud-api`);
    });

    vscode.commands.registerCommand("alicloud.api.findInterface", () => {
      const hasSpecName = service.pontManager.localPontSpecs.some((spec) => spec.name);
      const items = service.pontManager.localPontSpecs
        .map((pontSpec) => {
          return AlicloudApiCommands.getPickItems(pontSpec);
        })
        .reduce((pre, next) => pre.concat(next), []);

      return vscode.window
        .showQuickPick(items, {
          matchOnDescription: true,
          matchOnDetail: true,
        })
        .then((item: any) => {
          if (!item) {
            return;
          }
          let specName: string, modName: string, apiName: string;
          const detailItems = item.info.split("/");

          if (hasSpecName) {
            specName = detailItems[0];
            apiName = detailItems[1];
          }

          const pontSpec =
            service.pontManager.localPontSpecs.find((spec) => spec.name === specName) ||
            service.pontManager.localPontSpecs[0];

          const apiMeta = pontSpec?.apis[apiName];

          Promise.resolve(service.pontManager.innerManagerConfig.plugins.generate?.instance).then(
            async (generatePlugin) => {
              const { product, version } = getSpecInfoFromName(specName || "");
              const snippets = await codeSampleProvider({
                language: vscode.window.activeTextEditor?.document.languageId || "typescript",
                product: product,
                version: version,
                apiName: apiName,
                simplify: true,
              });
              const VIEW_API_DOC_ID = "VSCODE_PONTX_SHOW_PICK_ITEM_VIEW_API_DOC";
              let pickItems = [
                {
                  label: I18N.ide.main.explorer.seeDoc,
                  id: VIEW_API_DOC_ID,
                },
              ];
              if (snippets?.length && vscode.window.activeTextEditor) {
                pickItems = [
                  ...pickItems,
                  ...snippets.map((snippet) => {
                    return {
                      label: I18N.src.commands.insertCode + snippet.name,
                      id: snippet.name,
                      description: snippet.description,
                    };
                  }),
                ];
              }
              return vscode.window
                .showQuickPick(pickItems, {
                  matchOnDescription: true,
                  matchOnDetail: true,
                })
                .then((snippet) => {
                  const foundSnippet = snippets.find((inst) => inst.name === snippet?.id);
                  if (foundSnippet) {
                    insertCode(foundSnippet.code);
                  } else if (snippet.id === VIEW_API_DOC_ID) {
                    vscode.commands.executeCommand("alicloud.api.openDocument", {
                      specName,
                      modName,
                      name: apiName,
                      spec: apiMeta,
                      pageType: "document",
                      schemaType: "api",
                    });
                  }
                });
            },
          );
        });
    });

    vscode.commands.registerCommand("alicloud.api.autoImport", (...argus) => {
      const diagnostic = argus[0];
      const missingDep = argus[1];
      const range = argus[2];
      if (diagnostic.message === "importLists") {
        const importStr = generateImport(missingDep, range);
        insertCode(importStr, new vscode.Position(0, 0));
      }
    });

    vscode.commands.registerCommand("alicloud.api.akSecurityHelper", (...argus) => {
      const document = argus[0];
      if (AKHelperWithLanguage[document.languageId]) {
        vscode.env.openExternal(vscode.Uri.parse(AKHelperWithLanguage[document.languageId]));
      } else {
        vscode.env.openExternal(
          vscode.Uri.parse("https://help.aliyun.com/zh/sdk/developer-reference/ak-security-scheme"),
        );
      }
    });

    vscode.commands.registerCommand("alicloud.api.fetchRemote", (config) => {
      const pontManager = service.pontManager;

      showProgress(I18N.src.commands.pullRemoteMeta, pontManager, async (log) => {
        try {
          log(I18N.src.commands.pullingMeta);
          await wait(100);

          const manager = await PontManager.fetchRemotePontMeta(pontManager);
          service.updatePontManger(manager);

          log(I18N.src.commands.pullMetaSuccess);
        } catch (e) {
          vscode.window.showErrorMessage(I18N.src.commands.pullMetaFailed + e.message);
        }
      });
    });

    vscode.commands.registerCommand("alicloud.api.openDocument", (config) => {
      try {
        new AlicloudAPIWebview().openTab(context.extensionUri, config, context);
        return "ok";
      } catch (e) {
        return e;
      }
    });

    vscode.commands.registerCommand("alicloud.api.quickOpenDocument", async (arg) => {
      const { apiName, product, version } = arg;
      const specName = `${product}__${version}`;

      const pontSpec =
        service.pontManager.localPontSpecs.find((spec) => spec.name === specName) ||
        service.pontManager.localPontSpecs[0];

      const apiMeta = pontSpec?.apis[apiName];

      const result = await vscode.commands.executeCommand("alicloud.api.openDocument", {
        specName,
        apiName,
        name: apiName,
        spec: apiMeta,
        pageType: "document",
        schemaType: "api",
      });
      return result;
    });

    // 刷新问卷调查弹窗过期设置
    vscode.commands.registerCommand("alicloud.api.updateCloseQuestionnaire", () => {
      const lastPromptKey = "lastPromptTime";
      const globalState = context.globalState;
      globalState.update(lastPromptKey, undefined);
      console.log("update last prompt key to", globalState.get(lastPromptKey));
    });

    vscode.commands.registerCommand("alicloud.api.restart", async () => {
      const profileInfo = await getProfileInfoInstance();
      const product = await getProductRequestInstance();
      await product.refreshProducts();
      await profileInfo.refreshProfiles();
      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Window,
          cancellable: false,
          title: "Alibaba Cloud API Toolkit",
        },
        async (progress, token) => {
          progress.report({ message: I18N.src.commands.restarting, increment: 0 });
          try {
            const pontxConfig = await findAlicloudAPIConfig(context);
            const pontManager = await PontManager.constructorFromPontConfigAndPlugins(
              pontxConfig,
              context.globalStorageUri.fsPath,
              plugins as any,
              new VSCodeLogger(),
            );
            const newManager = {
              ...pontManager,
              localPontSpecs: pontManager.remotePontSpecs,
            };

            alicloudAPIMessageService.updatePontManger(newManager);
            progress.report({ message: I18N.src.commands.startSuccess, increment: 100 });
          } catch (e) {
            vscode.window.showErrorMessage(I18N.src.commands.startFailed + e.message);
          }
        },
      );
      return "ok";
    });
    vscode.commands.registerCommand("alicloud.api.openPontPanel", async () => {
      await vscode.commands.executeCommand("alicloudApiExplorer.focus");
    });
    vscode.commands.registerTextEditorCommand("alicloud.api.openMetaDocument", async (editor, edit) => {
      const isSingleSpec = PontManager.checkIsSingleSpec(service.pontManager);
      const result = (await findInterface(editor, !isSingleSpec, service.pontManager)) || ({} as any);
      const spec = PontManager.getSpec(service.pontManager, result.specName);

      if (!result.apiName) {
        vscode.window.showErrorMessage(I18N.src.commands.cannotFindOpenAPI);
        return;
      }

      vscode.commands.executeCommand("alicloud.api.openDocument", {
        specName: result.specName,
        modName: result.modName,
        name: result.apiName,
        pageType: "document",
        schemaType: "api",
        spec: spec?.apis?.[`${result.apiKey}`],
      });
    });
  }
}
