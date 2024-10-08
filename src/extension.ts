"use strict";
import { PontManager } from "pontx-manager";
import PontMetaFetchPlugin from "pontx-meta-fetch-plugin";
import * as vscode from "vscode";
import { PontFileDecoration } from "./explorer";
import { AlicloudAPIPontParserPlugin } from "./plugins/parser";
import { alicloudAPIMessageService } from "./Service";
import { findAlicloudAPIConfig, pontConsole, VSCodeLogger } from "./utils";
import { AlicloudAPISerializer, AlicloudAPIWebview } from "./webview";

import { AlicloudApiMetaGeneratePlugin } from "./plugins/generate";
import { getProductRequestInstance } from "./productExplorer";
import autoCompletion from "./provider/autoCompletion";
import autofix from "./provider/autofix";
import hoverInfo from "./provider/hoverProvider";
import { getProfileInfoInstance } from "./profileManager";
import { registerLinter } from "./provider/linter";
import { registerConfiguration } from "./provider/configurationProvider";

export async function activate(context: vscode.ExtensionContext) {
  const pontxConfig = await findAlicloudAPIConfig(context);

  if (!pontxConfig) {
    return;
  }

  // 获取产品列表
  await getProductRequestInstance();
  // 获取用户的 profileInfo
  await getProfileInfoInstance();

  alicloudAPIMessageService.context = context;

  const plugins = {
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

  const globalState = context.globalState;
  const lastPromptKey = "lastPromptTime";
  const currentVersion = vscode.extensions.getExtension("alibabacloud-openapi.vscode-alicloud-api").packageJSON.version;
  const storedVersion = globalState.get("extensionVersion");
  const experienceQuestionnaireKey = "questionnaireExpiration";
  // 检查是否是第一次启动新版本，新版本更新后，需要重新开启问卷调查
  if (storedVersion !== currentVersion) {
    // 刷新问卷调查弹窗过期设置
    globalState.update(lastPromptKey, undefined);
    // 问卷调查弹窗弹出频率初始化为 1 天
    globalState.update(experienceQuestionnaireKey, 1);
    // 更新 globalState 中的版本号
    globalState.update("extensionVersion", currentVersion);
  }

  try {
    const pontManager = await PontManager.constructorFromPontConfigAndPlugins(
      pontxConfig,
      context.globalStorageUri.fsPath,
      plugins as any,
      new VSCodeLogger(),
    );

    if (pontManager) {
      console.log('Congratulations, your extension "Alibaba Cloud API Toolkit" is now active!');
      alicloudAPIMessageService.startup(
        {
          ...pontManager,
          localPontSpecs: pontManager.remotePontSpecs,
        },
        context,
      );
      context.subscriptions.push(
        vscode.window.registerWebviewPanelSerializer(AlicloudAPIWebview.viewType, new AlicloudAPISerializer()),
      );
      // 将命令注册到执行上下文中
      context.subscriptions.push(new PontFileDecoration());
      // 自动补全
      autoCompletion(context);
      // 自动修复
      autofix(context);
      // hover提示
      hoverInfo(context);
      // 代码诊断
      registerLinter(context);
      // 插件配置生效
      registerConfiguration(context);
    }
  } catch (e) {
    vscode.window.showErrorMessage(e.message);
    pontConsole.appendLine(e.message);
    pontConsole.appendLine(e.stack);
  }
}

export async function deactivate() {}
