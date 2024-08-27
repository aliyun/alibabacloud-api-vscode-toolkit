import { getSpecByName, PontManager } from "pontx-manager";
import { PontAPI, Mod, ObjectMap, PontJsonSchema, PontSpec, WithoutModsName } from "pontx-spec";
// import { diffPontSpecs, DiffResult } from "pontx-spec-diff";
import * as vscode from "vscode";
import { MetaType, PontSpecWithMods } from "./changes/utils";
import { alicloudAPIMessageService } from "./Service";
import { findAlicloudAPIConfig, getSpecInfoFromName, plugins, VSCodeLogger } from "./utils";
import { AlicloudApiCommands } from "./commands";
import { getProductRequestInstance } from "./productExplorer";
import { Product } from "./types";
import _ from "lodash";
import { getProfileInfoInstance } from "./profileManager";

type DiffResult<T> = T;

export class PontAPITreeItem extends vscode.TreeItem {
  specName?: string;
  modName?: string | Symbol;
  structName?: string;
  apiName?: string;
  isDefs?: boolean;
}

export class PontAPIExplorer {
  static getProductItems(element = null) {
    if (element.contextValue === "productGroup2") {
      const productGroups = _.groupBy(element.children, (item) => {
        if (item?.categoryName?.length) {
          return item.categoryName;
        } else {
          return "其他";
        }
      });
      return Object.keys(productGroups || {})?.map((group) => {
        return {
          specName: group,
          contextValue: "productGroup",
          label: `${group}`,
          modName: group,
          children: productGroups[group],
          collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
        };
      });
    }
    return element.children?.map((product) => {
      return {
        specName: product.code,
        modName: "",
        contextValue: "PRODUCT",
        label: `${product.name}`,
        iconPath: vscode.Uri.joinPath(alicloudAPIMessageService.context.extensionUri, `resources/product.svg`),
        description: product.code,
        collapsibleState: vscode.TreeItemCollapsibleState.None,
        command: {
          command: "alicloud.api.addSubscription",
          title: "subscribe",
          arguments: [
            {
              specName: product.code,
              modName: "clickItem",
              label: product.name,
            },
          ],
        },
      };
    });
  }
  static getDirItems(spec: PontSpec, element = null) {
    const dirs = element?.children || spec?.ext?.directories || [];

    const results = dirs.map((dir) => {
      const apiName = dir;
      const api = spec?.apis?.[apiName];
      if (typeof dir === "string" && spec?.name && api) {
        return {
          specName: spec?.name,
          modName: "",
          apiName: dir,
          contextValue: "API",
          resourceUri: vscode.Uri.parse(`pontx-manager://spec/${spec.name}/apis/${dir}`),
          label: `${apiName}`,
          iconPath: api.deprecated
            ? vscode.Uri.joinPath(alicloudAPIMessageService.context.extensionUri, "resources/deprecated.svg")
            : vscode.Uri.joinPath(alicloudAPIMessageService.context.extensionUri, "resources/api-outline.svg"),
          description: ` ${api?.title || api?.summary || ""}`,
          tooltip: `${api.deprecated ? `@deprecated\n\n` : ""}${api?.description || api?.summary || api.name}`,
          collapsibleState: vscode.TreeItemCollapsibleState.None,
          command: {
            command: "alicloud.api.openDocument",
            title: "open",
            arguments: [
              {
                specName: spec.name,
                modName: "",
                spec: api,
                name: api?.name,
                pageType: "document",
                schemaType: "api",
              },
            ],
          },
        };
      }

      return {
        specName: spec.name,
        isDir: dir?.children?.length,
        children: dir?.children,
        dirPath: dir.id,
        label: `${dir.title}(${dir.children?.length || 0})`,
        contextValue: "Dir",
        resourceUri: vscode.Uri.parse(`pontx-manager://spec/${spec.name}/dir/${dir.title}`),
        collapsibleState: vscode.TreeItemCollapsibleState.Expanded,
      } as PontAPITreeItem;
    });

    if (spec?.definitions && !element && Object.keys(spec.definitions).length) {
      const defs = {
        specName: spec.name,
        isDefs: true,
        contextValue: "Definitions",
        label: `definitions`,
        resourceUri: vscode.Uri.parse(`pontx-manager://spec/${spec.name}/definitions`),
        description: "数据结构",
        tooltip: "数据结构",
        collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
      };
      return [defs, ...results];
    }
    return results;
  }

  static getAPIItems(apis: PontAPI[], modName: string, specName: string) {
    return (apis || []).map((api) => {
      return {
        specName: specName,
        modName,
        apiName: api?.name,
        contextValue: "API",
        resourceUri: vscode.Uri.parse(`pontx-manager://spec/${specName}/apis/${api.name}`),
        label: `${api.name}`,
        iconPath: api.deprecated
          ? vscode.Uri.joinPath(alicloudAPIMessageService.context.extensionUri, "resources/deprecated.svg")
          : vscode.Uri.joinPath(alicloudAPIMessageService.context.extensionUri, "resources/api-outline.svg"),
        description: api?.title || api?.summary || "",
        tooltip: api?.description || api?.summary || api?.name,
        collapsibleState: vscode.TreeItemCollapsibleState.None,
        command: {
          command: "alicloud.api.openDocument",
          title: "open",
          arguments: [
            {
              specName: specName,
              modName: modName,
              spec: api,
              name: api?.name,
              pageType: "document",
              schemaType: "api",
            },
          ],
        },
      };
    });
  }
}

export class PontFileDecoration implements vscode.FileDecorationProvider, vscode.Disposable {
  private readonly disposable: vscode.Disposable;
  dispose() {
    this.disposable.dispose();
  }
  onDidChangeFileDecorations?: vscode.Event<vscode.Uri | vscode.Uri[]>;
  provideFileDecoration(
    uri: vscode.Uri,
    token: vscode.CancellationToken,
  ): vscode.ProviderResult<vscode.FileDecoration> {
    if (uri.scheme === "pontx-changes") {
      const textMap = {
        delete: "D",
        update: "M",
        create: "C",
        equal: "E",
        untracked: "U",
      };
      const labelMap = {
        delete: "传入的新元数据中已删除",
        update: "传入的新元数据中已更新",
        create: "传入的新元数据中已新增",
        equal: "与传入的新元数据等同，但子元数据存在不同",
        untracked: "Untracked",
      };
      const colorMap = {
        update: new vscode.ThemeColor("alicloud.api.decorations.modifiedForegroundColor"),
        delete: new vscode.ThemeColor("alicloud.api.decorations.deletedForegroundColor"),
        create: new vscode.ThemeColor("alicloud.api.decorations.addedForegroundColor"),
        untracked: new vscode.ThemeColor("alicloud.api.decorations.untrackedForegroundColor"),
      };
      const [contextValue, diffType] = uri.path.split("/");

      if (textMap[diffType]) {
        return {
          badge: textMap[diffType],
          color: colorMap[diffType],
          tooltip: labelMap[diffType],
        };
      }
    }

    return undefined;
  }
  constructor() {
    this.disposable = vscode.Disposable.from(
      // Register the current branch decorator separately (since we can only have 2 char's per decoration)
      // vscode.window.registerFileDecorationProvider({
      // 	provideFileDecoration: (uri, token) => {
      // 		return
      // 	},
      // }),
      vscode.window.registerFileDecorationProvider(this),
    );
  }
}

export class PontChangeTreeItem extends vscode.TreeItem {
  schema?: any;
  specName?: string;
  modName?: string | Symbol;
  apiName?: string;
  structName?: string;
}

function getMetaTypeByContextValue(contextValue: string) {
  if (contextValue.endsWith("ChangesAPI")) {
    return MetaType.API;
  } else if (contextValue.endsWith("ChangesStruct")) {
    return MetaType.Struct;
  } else if (contextValue.endsWith("ChangesSpec")) {
    return MetaType.Spec;
  } else if (contextValue.endsWith("ChangesDefinitions")) {
    return MetaType.Definitions;
  } else if (contextValue.endsWith("ChangesMod")) {
    return MetaType.Mod;
  } else if (contextValue.endsWith("Changes")) {
    return MetaType.All;
  }
}

export class AlicloudApiExplorer implements vscode.TreeDataProvider<PontChangeTreeItem | PontAPITreeItem> {
  /** changes: diff(staged, remote) */
  specsDiffs: any[] = [];
  stagedLocalSpecs = [] as PontSpec[];

  /** staged changes: diffs(local, staged) */
  stagedDiffs: any[] = [];
  allDiffs: any[] = [];

  getCNNameOfProduct(products: Array<Product>, code: string) {
    const findProduct = products?.find((product) => product.code === code);
    return `${findProduct?.name ? findProduct?.name : findProduct?.code}`;
  }

  getAPIManagerChildren(element?: PontAPITreeItem): vscode.ProviderResult<PontAPITreeItem[]> {
    if (element.contextValue === "alicloudProducts") {
      const productExplorer = getProductRequestInstance();
      const productGroups = _.groupBy(productExplorer?.products, (product) => {
        if (product?.category2Name?.length) {
          return product.category2Name;
        } else {
          return "其他";
        }
      });
      return Object.keys(productGroups || {})?.map((group) => {
        return {
          specName: group,
          contextValue: "productGroup2",
          label: `${group}`,
          modName: group,
          children: productGroups[group],
          collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
        };
      });
    }
    if (element.contextValue === "alicloudAPISubscriptions") {
      const hasSingleSpec = this.pontManager.localPontSpecs?.length <= 1 && !this.pontManager.localPontSpecs[0]?.name;
      if (hasSingleSpec) {
        return PontAPIExplorer.getDirItems(this.pontManager.localPontSpecs[0]);
      }

      const productExplorer = getProductRequestInstance();

      return this.pontManager.localPontSpecs.map((spec) => {
        const { product, version } = getSpecInfoFromName(spec.name || "");

        return {
          specName: spec.name,
          contextValue: "Spec",
          resourceUri: vscode.Uri.parse(`pontx-manager://spec/${spec.name}`),
          label: `${this.getCNNameOfProduct(productExplorer.products, product)} v${version}`,
          collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
        };
      });
    }

    if (element.apiName) {
      return [];
    } else if (element.structName) {
      return [];
    }
    const spec = this.pontManager?.localPontSpecs?.find((spec) => spec.name === element.specName);
    if (element.isDefs && spec) {
      return Object.keys(spec.definitions || {}).map((key) => {
        const schema = spec.definitions[key];

        return {
          specName: spec.name,
          structName: key,
          label: key,
          description: schema?.description || schema?.title,
          tooltip: schema?.title || schema?.description || "",
          contextValue: "Struct",
          iconPath: vscode.Uri.joinPath(this.context.extensionUri, "resources/struct-outline.svg"),
          collapsibleState: vscode.TreeItemCollapsibleState.None,
          command: {
            command: "alicloud.api.openDocument",
            title: "open",
            arguments: [
              {
                specName: spec.name,
                name: key,
                spec: schema,
                pageType: "document",
                schemaType: "struct",
              },
            ],
          },
        };
      });
    } else if (element.contextValue === "Dir" && spec) {
      return PontAPIExplorer.getDirItems(spec, element);
    }
    // else if (element.contextValue === "productGroup-1") {
    //   const productExplorer = getProductRequestInstance();
    //   const productGroups = _.groupBy(
    //     productExplorer?.products?.filter((item) => item.category2Name === element.modName),
    //     (product) => product.categoryName,
    //   );
    //   return this.getAPIManagerChildren(element);
    // }
    else if (element.contextValue === "productGroup" || element.contextValue === "productGroup2") {
      const productExplorer = getProductRequestInstance();
      // const productGroups = _.groupBy(productExplorer?.products, (product) => product.category2Name);
      return PontAPIExplorer.getProductItems(element);
    } else {
      return PontAPIExplorer.getDirItems(spec);
    }
  }
  resolveTreeItem?(
    item: vscode.TreeItem,
    element: vscode.TreeItem,
    token: vscode.CancellationToken,
  ): vscode.ProviderResult<vscode.TreeItem> {
    throw new Error("Method not implemented.");
  }

  updateDiffs() {
    // this.specsDiffs = diffPontSpecs(this.stagedLocalSpecs, this.pontManager.remotePontSpecs) || [];
    // this.stagedDiffs = diffPontSpecs(this.pontManager.localPontSpecs, this.stagedLocalSpecs) || [];
    // this.allDiffs = diffPontSpecs(this.pontManager.localPontSpecs, this.pontManager.remotePontSpecs) || [];
  }

  // 重写磁盘中的config
  async rewriteConfig(newConfig) {
    const configUri = vscode.Uri.joinPath(this.context.globalStorageUri, "/alicloud-api-toolkit-config.json");
    const configUint8Array = new Uint8Array(Buffer.from(JSON.stringify(newConfig), "utf-8"));
    await vscode.workspace.fs.writeFile(configUri, configUint8Array);
  }

  async subscribeProduct(product: string, version: string) {
    const pontxConfig = await findAlicloudAPIConfig(this.context);
    if (
      pontxConfig.origins?.filter(
        (item) =>
          getSpecInfoFromName(item.name || "").product === product &&
          getSpecInfoFromName(item.name || "").version === version,
      )?.length
    ) {
      vscode.window.showInformationMessage(
        "该产品及其版本号已订阅，您可以使用「mac: ctrl+cmd+l」，「win: ctrl+alt+l」来搜索该产品下的API。",
      );
    } else {
      pontxConfig.origins = [
        ...(pontxConfig.origins || []),
        {
          name: `${product}__${version}`,
          url: `https://api.aliyun.com/meta/v1/products/${product}/versions/${version}/api-docs.json`,
        },
      ];
      this.rewriteConfig(pontxConfig);
      const newPontManager = await PontManager.constructorFromPontConfigAndPlugins(
        pontxConfig,
        this.context.globalStorageUri.fsPath,
        plugins as any,
        new VSCodeLogger(),
      );
      if (newPontManager) {
        const newManager = {
          ...newPontManager,
          localPontSpecs: newPontManager.remotePontSpecs,
        };

        this.updatePontManager(newManager);
        this.updateDiffs();
        vscode.window.showInformationMessage("订阅成功");
        this.launchExperienceQuestionnaire();
      }
    }
  }

  async launchExperienceQuestionnaire() {
    const globalState = this.context.globalState;
    const lastPromptKey = "lastPromptTime";
    const experienceQuestionnaireKey = "questionnaireExpiration";
    const questionnaireExpiration = globalState.get(experienceQuestionnaireKey) as any;
    // 检查上次提示的时间
    const lastPromptTime = globalState.get(lastPromptKey) as any;
    // 选择关闭 1天 后执行订阅相关操作会再次触发，选择去反馈或30天内不再弹出则 30 天后才会再次触发
    if (!lastPromptTime || Date.now() - lastPromptTime > (questionnaireExpiration || 0) * 24 * 60 * 60 * 1000) {
      // 显示信息弹窗
      let result = await vscode.window.showInformationMessage(
        "您在使用插件期间是否遇到问题？欢迎吐槽或点赞，您的反馈对我们十分重要！",
        "去反馈",
        "关闭",
        "30天内不再弹出",
      );
      if (result === "去反馈") {
        vscode.env.openExternal(
          vscode.Uri.parse("https://g.alicdn.com/aes/tracker-survey-preview/0.0.13/survey.html?pid=fePxMy&id=3486"),
        );
        globalState.update(experienceQuestionnaireKey, 30);
      } else if (result === "30天内不再弹出") {
        globalState.update(experienceQuestionnaireKey, 30);
      } else {
        globalState.update(experienceQuestionnaireKey, 1);
      }
      globalState.update(lastPromptKey, Date.now());
    }
  }

  async removeSubscriptions(specName: string) {
    const pontxConfig = await findAlicloudAPIConfig(this.context);
    const newOrigins = pontxConfig?.origins?.filter((item) => item.name !== specName) || [];
    pontxConfig.origins = newOrigins;
    // 重写磁盘中的config
    this.rewriteConfig(pontxConfig);
    const newPontManager = await PontManager.constructorFromPontConfigAndPlugins(
      pontxConfig,
      this.context.globalStorageUri.fsPath,
      plugins as any,
      new VSCodeLogger(),
    );
    if (newPontManager) {
      const newManager = {
        ...newPontManager,
        localPontSpecs: newPontManager.remotePontSpecs,
      };

      await this.updatePontManager(newManager);
      vscode.window.showInformationMessage("取消订阅成功");
      this.launchExperienceQuestionnaire();
    }
  }

  async switchProfile() {
    const quickPick = vscode.window.createQuickPick();
    quickPick.placeholder = "Select a profile";

    const items = [];

    const profileInstance = await getProfileInfoInstance();

    const config = profileInstance?.getProfileInfo();
    const profiles = config?.profiles;

    for (const profile of profiles) {
      let label = `$(account) ${profile.name}`;
      if (profile.name === config.current) {
        label = `$(account) ${profile.name} $(check)`;
      }

      items.push({
        profile: profile.name,
        label: label,
        detail: `mode: ${profile.mode}, default region: ${profile.region_id}`,
      });
    }

    items.push({
      label: `新增 AK 凭证配置`,
      iconPath: new vscode.ThemeIcon("add"),
      id: "ADD_NEW_PROFILE",
    });

    quickPick.items = items;

    quickPick.onDidAccept(async () => {
      if ((quickPick.selectedItems[0] as any)?.profile) {
        vscode.window.showInformationMessage(
          `Switching profile to ${(quickPick.selectedItems[0] as any).profile}, done`,
        );
        config.current = (quickPick.selectedItems[0] as any).profile;
        await profileInstance.saveProfiles(config);
        await getProfileInfoInstance();
        vscode.commands.executeCommand("alicloud.api.restart");
        quickPick.dispose();
      } else if ((quickPick.selectedItems[0] as any)?.id === "ADD_NEW_PROFILE") {
        vscode.commands.executeCommand("alicloud.api.openDocument", {
          name: "配置 AK 凭证",
          specName: "profile",
          pageType: "profile",
          column: vscode.ViewColumn.Beside,
        });
      }
    });

    quickPick.show();
  }

  constructor(
    private pontManager: PontManager,
    private context: vscode.ExtensionContext,
    private updatePontManager: Function,
  ) {
    this.stagedLocalSpecs = pontManager.localPontSpecs;
    this.updateDiffs();

    if (this.allDiffs?.length) {
      const newManager = {
        ...this.pontManager,
        localPontSpecs: pontManager.remotePontSpecs,
      };

      this.updatePontManager(newManager);
      this.updateDiffs();
    }
    const service = alicloudAPIMessageService;
    vscode.commands.registerCommand("alicloud.api.addSubscription", async (element) => {
      if (element.modName === "clickItem") {
        // 取消订阅
        let result = await vscode.window.showInformationMessage(`是否订阅${element.label}?`, "Yes", "No");
        if (result === "No") {
          return;
        }
      }
      const productExplorer = getProductRequestInstance();
      const selectedProduct = productExplorer?.products?.find((item) => item?.code === element?.specName);
      const pickItem = AlicloudApiCommands.getPickProductItems(selectedProduct);
      if (pickItem.versions?.length > 1) {
        vscode.window
          .showQuickPick(pickItem.versions, {
            matchOnDescription: true,
            matchOnDetail: true,
          })
          .then(async (version: any) => {
            this.subscribeProduct(pickItem.code, version.key);
          });
      } else {
        this.subscribeProduct(pickItem.code, (pickItem.versions[0] as any).key);
      }
    });
    vscode.commands.registerCommand("alicloud.api.addSubscriptions", async () => {
      // 搜索+订阅功能
      const productExplorer = getProductRequestInstance();
      const items = productExplorer?.products
        ?.map((item) => {
          return AlicloudApiCommands.getPickProductItems(item);
        })
        .reduce((pre, next) => pre.concat(next), []);

      return vscode.window
        .showQuickPick(items, {
          matchOnDescription: true,
          matchOnDetail: true,
        })
        .then(async (item: any) => {
          if (!item) {
            return;
          }
          if (item.versions?.length > 1) {
            vscode.window
              .showQuickPick(item.versions, {
                matchOnDescription: true,
                matchOnDetail: true,
              })
              .then(async (version: any) => {
                this.subscribeProduct(item.code, version.key);
              });
          } else {
            this.subscribeProduct(item.code, item.versions[0].key);
          }
        });
    });

    vscode.commands.registerCommand("alicloud.api.searchProducts", async () => {
      // 搜索+订阅功能
      const productExplorer = getProductRequestInstance();
      const items = productExplorer?.products
        ?.map((item) => {
          return AlicloudApiCommands.getPickProductItems(item);
        })
        .reduce((pre, next) => pre.concat(next), []);

      return vscode.window
        .showQuickPick(items, {
          matchOnDescription: true,
          matchOnDetail: true,
        })
        .then(async (item: any) => {
          if (!item) {
            return;
          }
          if (item.versions?.length > 1) {
            vscode.window
              .showQuickPick(item.versions, {
                matchOnDescription: true,
                matchOnDetail: true,
              })
              .then(async (version: any) => {
                this.subscribeProduct(item.code, version.key);
              });
          } else {
            this.subscribeProduct(item.code, item.versions[0].key);
          }
        });
    });

    vscode.commands.registerCommand("alicloud.api.removeSubscriptions", async (meta) => {
      if (meta.specName) {
        // 取消订阅
        let result = await vscode.window.showInformationMessage("确定取消订阅?", "Yes", "No");
        if (result === "Yes") {
          this.removeSubscriptions(meta.specName);
        }
      }
    });

    vscode.commands.registerCommand("alicloud.api.switchProfiles", async (meta) => {
      this.switchProfile();
    });
  }
  private _onDidChangeTreeData = new vscode.EventEmitter<PontChangeTreeItem | PontAPITreeItem | void>();

  onDidChangeTreeData?: vscode.Event<
    void | PontChangeTreeItem | PontAPITreeItem | PontAPITreeItem[] | PontChangeTreeItem[]
  > = this._onDidChangeTreeData.event;

  refresh(pontManager: PontManager) {
    this.pontManager = pontManager;
    this.stagedLocalSpecs = pontManager.localPontSpecs;
    this.updateDiffs();
    this._onDidChangeTreeData.fire();
  }

  getTreeItem<T>(element: T): T | Thenable<T> {
    return element;
  }

  static getAPIChangesModItems(spec: PontSpecWithMods, contextValue: string): PontChangeTreeItem[] {
    // const withoutMods = spec?.mods?.length === 1 && spec.mods?.[0]?.name === WithoutModsName;

    // const mods = withoutMods
    //   ? PontExplorer.getApiItems(spec?.mods[0] as any, spec.name, contextValue)
    //   : (spec?.mods || []).map((mod: DiffResult<Mod>) => {
    //       if (mod.name === WithoutModsName) {
    //         return {
    //           label: `apis(${mod.interfaces.length})`,
    //           specName: spec.name,
    //           modName: "apis",
    //           resourceUri: vscode.Uri.parse(`pontx-changes://${contextValue}Mod/${mod.diffType}`),
    //           contextValue: contextValue + "Mod",
    //           collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
    //           schema: { ...(mod || {}), name: "apis" },
    //         };
    //       }
    //       return {
    //         label: `${mod.name}(${mod.interfaces.length})`,
    //         specName: spec.name,
    //         modName: mod.name,
    //         resourceUri: vscode.Uri.parse(`pontx-changes://${contextValue}Mod/${mod.diffType}`),
    //         contextValue: contextValue + "Mod",
    //         collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
    //         schema: mod,
    //       };
    //     });
    // if (spec?.definitions && Object.keys(spec.definitions).length) {
    //   const defs = {
    //     label: `数据结构(${Object.keys(spec.definitions).length})`,
    //     specName: spec.name,
    //     contextValue: contextValue + "Definitions",
    //     collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
    //     schema: spec.definitions,
    //   };
    //   return [defs, ...mods];
    // }
    return [];
  }

  static getApiItems(mod: DiffResult<Mod>, specName: string, contextValue: string): PontChangeTreeItem[] {
    const modName = typeof mod.name === "string" ? mod.name : "";
    const localSpec = getSpecByName(alicloudAPIMessageService.pontManager.localPontSpecs, specName);
    const remoteSpec = getSpecByName(alicloudAPIMessageService.pontManager.remotePontSpecs, specName);

    return (mod?.interfaces || []).map((api: DiffResult<PontAPI>) => {
      const apiKey = modName ? `${mod.name}/${api.name}` : api.name;
      const localApi = localSpec?.apis?.[apiKey];
      const remoteApi = remoteSpec?.apis?.[apiKey];

      return {
        label: api.name,
        specName,
        modName,
        apiName: api.name,
        description: api.title || api.summary,
        tooltip: api.description || api.summary || api?.name,
        contextValue: contextValue + "API",
        collapsibleState: vscode.TreeItemCollapsibleState.None,
        schema: api,
        // resourceUri: vscode.Uri.parse(`pontx-changes://${contextValue}API/`),
        iconPath: api.deprecated
          ? vscode.Uri.joinPath(alicloudAPIMessageService.context.extensionUri, "resources/deprecated.svg")
          : vscode.Uri.joinPath(alicloudAPIMessageService.context.extensionUri, "resources/api-outline.svg"),
        command: {
          command: "alicloud.api.openDocument",
          title: "open",
          arguments: [
            {
              specName,
              modName,
              spec: localApi,
              remoteSpec: remoteApi,
              name: api.name,
              pageType: "changes",
              schemaType: "api",
            },
          ],
        },
      } as PontChangeTreeItem;
    });
  }

  static getStructItems(
    extensionUri,
    definitions: DiffResult<ObjectMap<PontJsonSchema>>,
    specName: string,
    contextValue: string,
  ): PontChangeTreeItem[] {
    const localSpec = getSpecByName(alicloudAPIMessageService.pontManager.localPontSpecs, specName);
    const remoteSpec = getSpecByName(alicloudAPIMessageService.pontManager.remotePontSpecs, specName);

    return Object.keys(definitions || {}).map((name) => {
      const schema = definitions[name];
      const meta = localSpec?.definitions?.[name];
      const remoteMeta = remoteSpec?.definitions?.[name];

      return {
        label: name,
        specName,
        structName: name,
        description: schema.title || schema.description,
        tooltip: schema.description || schema.title,
        contextValue: contextValue + "Struct",
        iconPath: vscode.Uri.joinPath(extensionUri, "resources/struct-outline.svg"),
        resourceUri: vscode.Uri.parse(`pontx-changes://${contextValue}API/${schema.diffType}`),
        collapsibleState: vscode.TreeItemCollapsibleState.None,
        schema,
        command: {
          command: "alicloud.api.openDocument",
          title: "open",
          arguments: [
            {
              specName,
              name,
              spec: meta,
              remoteSpec: remoteMeta,
              pageType: "changes",
              schemaType: "struct",
            },
          ],
        },
      };
    });
  }

  static getSpecCnt(spec: any): number {
    if (!spec) {
      return 0;
    }
    return spec.mods?.length + Object.keys(spec.definitions || {}).length;
  }

  getAPIChangesChildren(element?: PontChangeTreeItem): vscode.ProviderResult<PontChangeTreeItem[]> {
    const hasSingleSpec = PontManager.checkIsSingleSpec(this.pontManager);

    return [];
  }

  getChildren(element?: PontAPITreeItem): vscode.ProviderResult<PontAPITreeItem[]> {
    if (!element) {
      const profileManager = getProfileInfoInstance();
      return [
        {
          label: `${profileManager?.profileInfo?.current?.length ? `当前: ${profileManager?.profileInfo?.current}` : "点击配置您的 AK 信息"}`,
          tooltip: "点击切换您的 AK 信息",
          contextValue: "alicloudProfiles",
          iconPath: new vscode.ThemeIcon("account"),
          command: {
            command: "alicloud.api.switchProfiles",
            title: "open",
          },
        },
        {
          label: "阿里云产品",
          contextValue: "alicloudProducts",
          resourceUri: vscode.Uri.parse(`pontx-manager://manager`),
          collapsibleState: vscode.TreeItemCollapsibleState.Collapsed,
          tooltip: "阿里云产品",
        },
        {
          label: "我的订阅",
          contextValue: "alicloudAPISubscriptions",
          resourceUri: vscode.Uri.parse(`pontx-manager://manager`),
          collapsibleState: vscode.TreeItemCollapsibleState.Expanded,
          tooltip: "我的订阅",
        },
      ];
    }

    return this.getAPIManagerChildren(element);
  }
}
