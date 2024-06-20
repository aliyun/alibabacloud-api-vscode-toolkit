import { getSpecByName, PontManager } from "pontx-manager";
import * as vscode from "vscode";
import * as path from "path";
import { alicloudAPIToolbarUI } from "./UI";
import { PontSpec } from "pontx-spec";
import { PontAPIExplorer, AlicloudApiExplorer } from "./explorer";
import { AlicloudApiCommands } from "./commands";
import * as _ from "lodash";
import { batchDispose, getFormatValues, getUserAgent, showProgress, VSCodeLogger } from "./utils";
import { request } from "./openApiService/request/request";
import fs from "fs";
import fsx from "fs/promises";
import os from "os";
import fetch from "node-fetch";
import { getProfileInfoInstance } from "./profileManager";

export class AlicloudAPIService {
  pontManager: PontManager;
  context: vscode.ExtensionContext;

  configFileWatcherDisposes: vscode.Disposable[];
  lockFileWatcherDisposes: vscode.Disposable[];

  hasCommandsRegistered = false;
  hasTreeProviderRegistered = false;

  treeDataProvider: AlicloudApiExplorer;

  updatePontManger(pontManager: PontManager) {
    this.pontManager = pontManager;
    this.start();
    this.watchPontLock();
  }

  startup(pontManager: PontManager, context: vscode.ExtensionContext) {
    this.pontManager = pontManager;
    this.context = context;
    this.start();
    // this.watchPontConfig();
    this.watchPontLock();
  }

  start() {
    // if (!alicloudAPIToolbarUI.pontBar) {
    //   alicloudAPIToolbarUI.create(this.pontManager);
    // } else {
    //   alicloudAPIToolbarUI.update(this.pontManager);
    // }

    if (this.treeDataProvider) {
      this.treeDataProvider.refresh(this.pontManager);
    } else {
      this.treeDataProvider = new AlicloudApiExplorer(this.pontManager, this.context, (newManager: PontManager) => {
        this.updatePontManger(newManager);
        vscode.commands.executeCommand("alicloud.api.regenerate");
      });
    }

    if (!this.hasTreeProviderRegistered) {
      vscode.window.registerTreeDataProvider("alicloudApiExplorer", alicloudAPIMessageService.treeDataProvider);
      this.hasTreeProviderRegistered = true;
    }

    if (!this.hasCommandsRegistered) {
      AlicloudApiCommands.registerCommands(this.context);
      this.hasCommandsRegistered = true;
    }
  }

  watchPontLock() {
    const config = this.pontManager.innerManagerConfig;

    batchDispose(this.lockFileWatcherDisposes);

    const lockWatcher = vscode.workspace.createFileSystemWatcher(
      config.outDir + "/**/" + PontManager.lockFilename,
      true,
      false,
      true,
    );
    this.lockFileWatcherDisposes = [
      lockWatcher.onDidChange(this._watchPontLock.bind(this)),
      lockWatcher.onDidCreate(this._watchPontLock.bind(this)),
    ];
  }

  private async _watchPontLock(e) {
    await showProgress("本地数据源更新中", this.pontManager, async (report) => {
      // report("检测到 api-lock.json 文件变化，本地数据源已自动更新");
      // const pontManager = await PontManager.readLocalPontMeta(pontService.pontManager);
      // const equal = _.isEqual(pontManager.localPontSpecs, pontService.pontManager.localPontSpecs);
      // console.log(equal);
      // pontService.updatePontManger(pontManager);
      // report("本地数据源更新成功");
    });
  }

  watchPontConfig() {
    const fileWatcher = vscode.workspace.createFileSystemWatcher("**/alicloud-api-toolkit-config.json");
    batchDispose(this.configFileWatcherDisposes);

    this.configFileWatcherDisposes = [
      fileWatcher.onDidChange(async (uri) => this._watchPontConfig(uri, true)),
      fileWatcher.onDidCreate(async (uri) => this._watchPontConfig(uri, false)),
    ];
  }

  private async _watchPontConfig(uri: vscode.Uri, isChange = false) {
    const logger = this.pontManager ? this.pontManager.logger : new VSCodeLogger();
    const message = isChange
      ? "检测到 alicloud-api-toolkit-config.json 内容变化，Alibaba Cloud API Toolkit 重启中..."
      : "检测到 alicloud-api-toolkit-config.json 创建，Alibaba Cloud API Toolkit 重启中...";

    await showProgress("Alibaba Cloud API Toolkit 重启中", this.pontManager, async (report) => {
      report(message);
      const manager = await PontManager.constructorFromRootDir(path.join(uri.path, ".."), logger);

      if (manager) {
        this.updatePontManger(manager);
        report("Alibaba Cloud API Toolkit 启动成功");
      }
    });
  }

  /** 执行 webview 事件 */
  async exectService(message) {
    const result = await Promise.resolve(this[message.type](message.value));

    return { requestId: message.requestId, type: message.type, data: result };
  }

  async openMeta(meta: { name: string; spec: any; specName: string; type: "baseClass" | "api" }) {
    //
  }

  async requestDefinitions(specName: string) {
    const specs = this.pontManager.localPontSpecs;
    const spec = getSpecByName(specs, specName);
    if (spec) {
      return spec.definitions || {};
    }
    return {};
  }

  /**
   * @description 根据 API 查询是否有 CodeSample
   */
  async requestSamplesByAPI(product: string, version: string, api: string) {
    const resStr = await fetch(`https://api.aliyun.com/api/samples/product/${product}/version/${version}/api/${api}`, {
      headers: {
        "User-Agent": getUserAgent(),
      },
    }).then((res) => res.text());
    const res = JSON.parse(resStr);
    return res?.data || [];
  }

  async requestEndpoints(product: string) {
    const resStr = await fetch(`https://api.aliyun.com/meta/v1/products/${product}/endpoints.json?language=zh-CN`, {
      headers: {
        "User-Agent": getUserAgent(),
      },
    }).then((res) => res.text());
    const res = JSON.parse(resStr);
    return res?.data?.endpoints || [];
  }

  async openInCode(codeInfo: { code: string; language: string }) {
    const { language, code } = codeInfo;
    const getViewColumn = () => {
      if (vscode.window.visibleTextEditors.length > 0) {
        return vscode.ViewColumn.One;
      } else {
        return vscode.ViewColumn.Beside;
      }
    };
    const column = getViewColumn();

    // 创建新的文件
    vscode.workspace
      .openTextDocument({
        content: code,
        language: language?.toLocaleLowerCase(),
      })
      .then((newDocument) => {
        vscode.window.showTextDocument(newDocument, {
          viewColumn: column,
        });
      });
    return {};
  }

  async saveToFile(code: string) {
    const uri = await vscode.window.showSaveDialog();
    if (uri) {
      const buf = Buffer.from(code, "utf8");
      await vscode.workspace.fs.writeFile(uri, buf);
    }
    return {};
  }

  async loadProfiles() {
    const configFilePath = path.join(os.homedir(), ".aliyun/config.json");
    const { R_OK, W_OK } = fs.constants;
    try {
      await fsx.access(configFilePath, R_OK | W_OK);
      const content = await fsx.readFile(configFilePath, "utf-8");
      return JSON.parse(content);
    } catch (ex) {
      // empty profiles
      return { current: "", profiles: [] };
    }
  }

  async updateLocalLanguage(lang) {
    this.context.globalState.update("defaultLanguage", lang);
  }

  async getLocalLanguage() {
    return this.context.globalState.get("defaultLanguage");
  }

  async getNoticeFlag() {
    const globalState = this.context.globalState;
    const experienceQuestionnaireKey = "questionnaireExpiration";
    const lastPromptKey = "lastPromptTime";
    // 检查上次提示的时间
    const lastPromptTime = globalState.get(lastPromptKey) as any;
    const questionnaireExpiration = globalState.get(experienceQuestionnaireKey) as any;
    if (!lastPromptTime || Date.now() - lastPromptTime > (questionnaireExpiration || 0) * 24 * 60 * 60 * 1000) {
      return true;
    }
    return false;
  }

  async updateQuestionnaireExpiration(days: number) {
    const globalState = this.context.globalState;
    const experienceQuestionnaireKey = "questionnaireExpiration";
    const lastPromptKey = "lastPromptTime";
    globalState.update(experienceQuestionnaireKey, days);
    globalState.update(lastPromptKey, Date.now());
  }

  async makeCodeRequest(requestData) {
    const { apiMeta, paramsValue, product, version, endpoint, regionId } = requestData;
    const newParamsValue = getFormatValues(paramsValue, apiMeta?.parameters);
    const security = apiMeta?.ext?.security;
    const defaultCredentialType =
      security?.length > 0
        ? security.indexOf("AK") < 0
          ? security.indexOf("BearerToken") < 0
            ? "anonymous"
            : "bearer"
          : "ak"
        : "ak";
    const body = {
      apiName: apiMeta?.name,
      apiVersion: version,
      product: product,
      sdkType: "dara",
      params: newParamsValue || {},
      regionId: regionId,
      endpoint: endpoint,
      credential: { type: defaultCredentialType },
      runtimeOptions: {},
      useCommon: false,
    };
    const resStr = await fetch(`https://api.aliyun.com/api/product/makeCode`, {
      method: "post",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        "User-Agent": getUserAgent(),
      },
    }).then((res) => res.text());
    const res = JSON.parse(resStr);
    return res;
  }

  async openAPIRequest(requestData) {
    const { apiMeta, paramsValue, product, version, endpoint } = requestData;
    // const newParamsValue = getFormatValues(paramsValue, apiMeta?.parameters);
    let response = {} as any;
    let data;
    const profilesInfo = await this.loadProfiles();
    const profiles = profilesInfo?.profiles;
    // TODO：用户可以选择使用哪个profile
    const security = apiMeta?.ext?.security;
    const defaultCredentialType =
      security?.length > 0
        ? security.indexOf("AK") < 0
          ? security.indexOf("BearerToken") < 0
            ? "anonymous"
            : "bearer"
          : "ak"
        : "ak";
    if (profiles?.length) {
      const profile = profiles?.find((item) => item.name === profilesInfo.current);
      const start = Date.now();
      try {
        data = await request({
          accessKeyId: profile?.access_key_id,
          accessKeySecret: profile?.access_key_secret,
          endpoint: endpoint,
          action: apiMeta?.name,
          apiVersion: version,
          params: paramsValue || {},
          productName: product,
          meta: apiMeta,
          bodyStyle: undefined,
          credential: { type: defaultCredentialType },
        });
        response = data;
        // 设置状态码
        // res.writeHead(200);
        response.cost = Date.now() - start;
      } catch (error) {
        console.log("response error：", error);
        if (error && error.name === "RequesctTimeoutError") {
          data = {
            result: {
              code: "Workbench.RequestTimeoutError",
              message: error.message,
              notice: "This is API Workbench timeout(15000), The request may be executed successfully.",
            },
            entry: {
              url: "",
            },
          };
        } else {
          data = {
            result: {
              code: "Workbench.RequestError",
              message: error.message,
              notice: "The request has executed failed.",
            },
            cost: 300,
            entry: error.entry || {
              url: "",
            },
          };
        }
        response = data;
        response.cost = Date.now() - start;
        // 设置状态码
        // res.writeHead(500);
      }

      return {
        requestId: requestData.requestId,
        doc: `${product}::${version}::${apiMeta.name}`,
        type: "openAPIResponse",
        response,
      };
    } else {
      let result = await vscode.window.showErrorMessage("请完成AK/SK配置后，再发起调用", "查看配置方法", "取消");
      if (result === "查看配置方法") {
        vscode.env.openExternal(vscode.Uri.parse("https://github.com/aliyun/aliyun-cli?tab=readme-ov-file#configure"));
      }
    }
  }

  async requestPontSpecs(): Promise<{ localSpecs: PontSpec[]; remoteSpecs: PontSpec[]; currentOriginName: string }> {
    return {
      localSpecs: this.pontManager.localPontSpecs,
      remoteSpecs: this.pontManager.remotePontSpecs,
      currentOriginName: this.pontManager.currentOriginName,
    };
  }

  async syncRemoteSpec(specNames = "") {
    const manager = await PontManager.fetchRemotePontMeta(this.pontManager);
    this.updatePontManger(manager);
  }

  async updateLocalSpec(pontSpec: PontSpec) {
    const localPontSpecs = [...this.pontManager.localPontSpecs];
    const specIndex = this.pontManager.localPontSpecs.findIndex((spec) => spec.name == pontSpec.name) || 0;
    localPontSpecs[specIndex] = pontSpec;
    const newPontManager = {
      ...this.pontManager,
      localPontSpecs,
    };
    this.updatePontManger(newPontManager);
    // PontManager.generateCode(this.pontManager);
    return;
  }

  async addNewAKProfile(submitValue: {
    profileName: string;
    accessKey: string;
    secretKey: string;
    defaultRegionId: string;
  }) {
    const profileInfo = await getProfileInfoInstance();
    await profileInfo.addProfile(submitValue);
    await profileInfo.refreshProfiles();
    await vscode.commands.executeCommand("alicloud.api.restart");
    return { success: true };
  }

  async requestProfiles() {
    return await getProfileInfoInstance()?.profileInfo;
  }

  async closeCurrentTab() {
    vscode.commands.executeCommand("workbench.action.closeActiveEditor");
  }

  async requestGenerateSdk() {
    // await PontManager.generateCode(this.pontManager);
  }

  updateAPI = ({ modName, apiName, specName }) => {
    this.updatePontManger(PontManager.syncInterface(this.pontManager, apiName, modName, specName));
  };

  updateBaseClass = ({ baseClassName, specName = "" }) => {
    this.updatePontManger(PontManager.syncBaseClass(this.pontManager, baseClassName, specName));
  };
}

export const alicloudAPIMessageService = new AlicloudAPIService();
