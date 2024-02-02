import { PontManager } from "pontx-manager";
import * as _ from "lodash";
import * as vscode from "vscode";
import { findAlicloudAPIConfig, findInterface, plugins, showProgress, viewMetaFile, VSCodeLogger, wait } from "./utils";
import { AlicloudAPIWebview } from "./webview";
import { alicloudAPIMessageService } from "./Service";
import { PontSpec } from "pontx-spec";
import * as fs from "fs-extra";
import { Product } from "./types";
import { codeSampleProvider } from "./plugins/generate";

const path = require("path");

export const insertCode = (code: string) => {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    editor.edit((builder) => {
      if (editor.selection.isEmpty) {
        const position = editor.selection.active;

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
            label: `${inter.method ? `[${inter.method}] ` : ""}${inter.path ? inter.path : inter.name}`,
            detail: `${pontSpec.name ? pontSpec.name + "/" : ""}${inter.name}`,
            description: `${inter.description || inter.summary || ""}`,
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
      detail: `推荐版本：${product.defaultVersion || ""}`,
      description: `${product.description || ""}`,
      versions: product.versions?.map((version) => {
        return {
          label: `选择 API 版本: ${version}`,
          key: version,
          description: version === product.defaultVersion ? "推荐版本" : "",
        } as vscode.QuickPickItem;
      }),
    };
  }

  static registerCommands(context) {
    const service = alicloudAPIMessageService;

    vscode.commands.registerCommand("alicloud.api.githubIssue", async () => {
      vscode.env.openExternal(vscode.Uri.parse("https://github.com/aliyun/alibabacloud-api-vscode-toolkit/issues"));
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
          const detailItems = item.detail.split("/");

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
              const snippets = await codeSampleProvider({
                language: vscode.window.activeTextEditor?.document.languageId || "typescript",
                product: specName?.split("::")[0],
                version: specName?.split("::")[1],
                apiName: apiName,
                simplify: true,
              });
              if (snippets?.length) {
                if (snippets.length === 1) {
                  insertCode[snippets[0].code];
                }
                const VIEW_API_DOC_ID = "VSCODE_PONTX_SHOW_PICK_ITEM_VIEW_API_DOC";
                const pickItems = [
                  {
                    label: "查看文档",
                    id: VIEW_API_DOC_ID,
                  },
                  ...snippets.map((snippet) => {
                    return {
                      label: "插入代码段: " + snippet.name,
                      id: snippet.name,
                      description: snippet.description,
                    };
                  }),
                ];
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
              }
            },
          );
        });
    });

    vscode.commands.registerCommand("alicloud.api.regenerate", () => {
      // const pontManager = service.pontManager;
      // showProgress("生成代码", pontManager, async (log) => {
      //   log("代码生成中...");
      //   await wait(100);
      //   await PontManager.generateCode(pontManager);
      //   log("代码生成成功！");
      //   vscode.window.showInformationMessage("文件生成成功！");
      // });
    });

    vscode.commands.registerCommand("alicloud.api.generateMocks", () => {
      const pontManager = service.pontManager;

      showProgress("生成Mocks", pontManager, async (log) => {
        log("代码生成中...");
        await wait(100);

        await PontManager.generateMocks(pontManager);

        log("mocks 生成成功！");
        vscode.window.showInformationMessage("Mocks生成成功！");
      });
    });

    // vscode.commands.registerCommand("alicloud.api.regenerateAPIMocks", async (event) => {
    //   const filePaths: string[] = (event.path || "")?.split("/");
    //   const lastMocksIndex = filePaths.lastIndexOf("mocks");
    //   const names = filePaths.slice(lastMocksIndex + 1);
    //   names.push(names.pop().replace(".ts", ""));

    //   if (service.pontManager.localPontSpecs?.[0]?.name) {
    //     showProgress("重新生成 API Mocks", service.pontManager, async (log) => {
    //       log("代码生成中...");
    //       await wait(100);

    //       let specName, modName, apiName;
    //       if (names.length === 3) {
    //         [specName, modName, apiName] = names;
    //       } else {
    //         [specName, apiName] = names;
    //       }
    //       const mocksPlugin = await service.pontManager.innerManagerConfig.plugins.mocks?.instance;
    //       const mocksOptions = await service.pontManager.innerManagerConfig.plugins.mocks?.options;
    //       const mocksCode = await mocksPlugin.getAPIMockCode(
    //         service.pontManager,
    //         mocksOptions,
    //         apiName,
    //         modName,
    //         specName,
    //       );
    //       fs.writeFileSync(event.path, mocksCode, "utf-8");

    //       log("API Mocks 生成成功！");
    //       vscode.window.showInformationMessage("API Mocks生成成功！");
    //     });
    //   }
    // });

    vscode.commands.registerCommand("alicloud.api.fetchRemote", (config) => {
      const pontManager = service.pontManager;

      showProgress("拉取远程元数据", pontManager, async (log) => {
        try {
          log("元数据拉取中...");
          await wait(100);

          const manager = await PontManager.fetchRemotePontMeta(pontManager);
          service.updatePontManger(manager);

          log("元数据拉取成功！");
          // vscode.window.showInformationMessage("元数据拉取成功！");
        } catch (e) {
          vscode.window.showErrorMessage("阿里云API元数据拉取失败：" + e.message);
        }
      });
    });

    vscode.commands.registerCommand("alicloud.api.openDocument", (config) => {
      new AlicloudAPIWebview().openTab(context.extensionUri, config);
    });

    vscode.commands.registerCommand("alicloud.api.restart", async () => {
      await vscode.window.withProgress(
        {
          location: vscode.ProgressLocation.Window,
          cancellable: false,
          title: "Alibaba Cloud API Toolkit",
        },
        async (progress, token) => {
          progress.report({ message: "重启中...", increment: 0 });
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
            progress.report({ message: "启动成功", increment: 100 });
          } catch (e) {
            vscode.window.showErrorMessage("启动失败: " + e.message);
          }
        },
      );
    });
    vscode.commands.registerCommand("alicloud.api.openPontPanel", async () => {
      await vscode.commands.executeCommand("alicloudApiExplorer.focus");
    });
    vscode.commands.registerTextEditorCommand("alicloud.api.openMetaDocument", async (editor, edit) => {
      const isSingleSpec = PontManager.checkIsSingleSpec(service.pontManager);
      const result = (await findInterface(editor, !isSingleSpec, service.pontManager)) || ({} as any);
      const spec = PontManager.getSpec(service.pontManager, result.specName);

      if (!result.apiName) {
        vscode.window.showErrorMessage("未找到该 OpenAPI");
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
    // vscode.commands.registerTextEditorCommand("alicloud.api.viewMocks", async (editor, edit) => {
    //   const isSingleSpec = PontManager.checkIsSingleSpec(service.pontManager);
    //   const result = (await findInterface(editor, !isSingleSpec, service.pontManager)) || ({} as any);
    //   const spec = PontManager.getSpec(service.pontManager, result.specName);

    //   if (!result.apiName) {
    //     vscode.window.showErrorMessage("未找到该 OpenAPI");
    //     return;
    //   }

    //   const namespace = [result.specName, result.modName, result.apiName].filter((id) => id).join("/");
    //   const mocksFilePath = path.join(service.pontManager.innerManagerConfig.outDir, "mocks", namespace + ".ts");
    //   vscode.commands.executeCommand("vscode.open", vscode.Uri.file(mocksFilePath));
    // });

    // vscode.commands.registerCommand('alicloud.api.refreshPontExplorer', () => {
    //   service.treeDataProvider.refresh();
    // });
  }
}
