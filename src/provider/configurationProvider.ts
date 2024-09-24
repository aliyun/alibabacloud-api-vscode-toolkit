import * as vscode from "vscode";
import I18N, { getI18NLang } from "../utils/I18N";

const mySettings = {
  displayLanguage: "displayLanguage",
};
const myPlugin = "alibabacloud-openapi.vscode-alicloud-api";
function initializeLanguage() {
  // 读取配置项
  const config = vscode.workspace.getConfiguration(myPlugin);
  const currentLanguage = config.get<string>(mySettings.displayLanguage);
  I18N.setLang(getI18NLang(currentLanguage));
}

export async function registerConfiguration(context: vscode.ExtensionContext) {
  // 初始化语言环境
  initializeLanguage();

  // 监听配置项变化
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((event) => {
      if (event.affectsConfiguration(`${myPlugin}.${mySettings.displayLanguage}`)) {
        initializeLanguage();
        vscode.commands.executeCommand("alicloud.api.restart");
      }
    }),
  );

  // 提供切换语言的命令
  context.subscriptions.push(
    vscode.commands.registerCommand("alicloud.api.changeLanguage", () => {
      //   const newLanguage = currentLanguage === "en" ? "zh" : "en";
      //   config.update(mySettings.displayLanguage, newLanguage, vscode.ConfigurationTarget.Global);
    }),
  );
}
