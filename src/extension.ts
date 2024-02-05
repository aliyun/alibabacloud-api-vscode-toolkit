"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { PontManager } from "pontx-manager";
import PontMetaFetchPlugin from "pontx-meta-fetch-plugin";
import { alicloudAPIMessageService } from "./Service";
import { findAlicloudAPIConfig, pontConsole, VSCodeLogger } from "./utils";
import { AlicloudAPISerializer, AlicloudAPIWebview } from "./webview";
import { PontFileDecoration } from "./explorer";
import { AlicloudAPIPontParserPlugin } from "./plugins/parser";

import { AlicloudApiMetaGeneratePlugin } from "./plugins/generate";
import { getProductRequestInstance } from "./productExplorer";
import autoCompletion from './provider/autoCompletion'
import autofix from "./provider/autofix";

export async function activate(context: vscode.ExtensionContext) {
  // if (!vscode.workspace.rootPath) {
  //   return;
  // }
  // registerConfigSchema(context);
  const pontxConfig = await findAlicloudAPIConfig(context);

  if (!pontxConfig) {
    return;
  }

  // 获取产品列表
  await getProductRequestInstance();

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

  try {
    const pontManager = await PontManager.constructorFromPontConfigAndPlugins(
      pontxConfig,
      context.globalStorageUri.fsPath,
      plugins as any,
      new VSCodeLogger(),
    );

    if (pontManager) {
      console.log('Congratulations, your extension "Alibaba Cloud API Toolkit" is now active!');
      alicloudAPIMessageService.startup(pontManager, context);
      context.subscriptions.push(
        vscode.window.registerWebviewPanelSerializer(AlicloudAPIWebview.viewType, new AlicloudAPISerializer()),
      );
      // 将命令注册到执行上下文中
      context.subscriptions.push(new PontFileDecoration());
      // 自动补全
      autoCompletion(context);
      // 自动修复
	    autofix(context);
    }
  } catch (e) {
    vscode.window.showErrorMessage(e.message);
    pontConsole.appendLine(e.message);
    pontConsole.appendLine(e.stack);
  }
}

export async function deactivate() {}
