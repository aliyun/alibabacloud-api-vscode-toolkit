import * as fs from "fs-extra";
import { ObjectMap } from "pontx-spec";
import * as vscode from "vscode";
import { alicloudAPIMessageService } from "./Service";
import { htmlTemplate } from "./utils";
import { getCurrentLang } from "./utils/I18N";
export type PanelConfig = {
  specName: string;
  modName: string;
  name: string;
  pageType: "document" | "changes" | "profile";
  schemaType: "api" | "struct" | "others";
  column?: number;
  displayLanguage?: string;
};

const getPanelKey = (panelConfig: PanelConfig) => {
  if (panelConfig.schemaType === "api") {
    return `${panelConfig.pageType}/${panelConfig.specName}/${panelConfig.modName}/${panelConfig.name}`;
  } else {
    return `${panelConfig.pageType}/${panelConfig.specName}/${panelConfig.name}`;
  }
};

const getPanelConfig = (panelKey: string) => {
  const [pageType, specName, name1, name2] = (panelKey || "").split("/");
  if (name2) {
    return {
      pageType,
      schemaType: "api",
      specName,
      modName: name1,
      name: name2,
    };
  } else {
    return {
      pageType,
      schemaType: "struct",
      specName,
      name: name2,
    };
  }
};

const webviewIconPath = {
  api: "resources/api-outline.svg",
  struct: "resources/struct-outline.svg",
  others: "resources/alibabacloud.svg",
};

export class AlicloudAPIWebview {
  static viewType = "alicloud-api-webview";
  static webviewPanels = {} as ObjectMap<vscode.WebviewPanel>;

  openTab(extensionUri: vscode.Uri, panelConfig: PanelConfig, context) {
    const panelKey = getPanelKey(panelConfig);
    const activeEditor = vscode.window.activeTextEditor;
    const getViewColumn = () => {
      if (activeEditor && vscode.window.visibleTextEditors.length > 1) {
        return activeEditor.viewColumn;
      } else {
        return activeEditor ? vscode.ViewColumn.Two : vscode.ViewColumn.Active;
      }
    };
    const column = getViewColumn();

    let webview = AlicloudAPIWebview.webviewPanels[panelKey];
    // If we already have a panel, show it.
    if (webview) {
      webview.reveal(column);
      return;
    }

    // Otherwise, create a new panel.
    AlicloudAPIWebview.webviewPanels[panelKey] = vscode.window.createWebviewPanel(
      AlicloudAPIWebview.viewType, // WebView 面板的标识符
      panelConfig.name, // WebView 面板的标题
      panelConfig.column || column || vscode.ViewColumn.One, // WebView 在编辑器中的显示位置
      {
        // Enable javascript in the webview
        enableScripts: true,
        retainContextWhenHidden: true,
      },
    );
    webview = AlicloudAPIWebview.webviewPanels[panelKey];
    webview.onDidDispose(() => {
      webview.dispose();
      webview = null;
      delete AlicloudAPIWebview.webviewPanels[panelKey];
    });
    webview.title = panelConfig.name;
    const iconPath = panelConfig?.schemaType
      ? vscode.Uri.joinPath(extensionUri, webviewIconPath[panelConfig.schemaType])
      : vscode.Uri.joinPath(extensionUri, webviewIconPath["others"]);
    webview.iconPath = iconPath;
    panelConfig.displayLanguage = getCurrentLang();
    webview.webview.html = htmlTemplate(
      {
        getUri: (assetUri) => webview.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, assetUri)),
        cspSource: webview.webview.cspSource,
      },
      panelConfig,
    );
    webview.webview.onDidReceiveMessage((message) => {
      if (message.type && message.requestId) {
        alicloudAPIMessageService.exectService(message).then((result) => {
          webview.webview.postMessage(result);
        });
      }
    });
  }

  openAPIPreviewTab(extensionUri: vscode.Uri, apiMeta, filePath) {
    const panelKey = filePath;
    const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

    let webview = AlicloudAPIWebview.webviewPanels[panelKey];
    // If we already have a panel, show it.
    if (webview) {
      webview.reveal(column);
      return;
    }

    // Otherwise, create a new panel.
    AlicloudAPIWebview.webviewPanels[panelKey] = vscode.window.createWebviewPanel(
      AlicloudAPIWebview.viewType,
      apiMeta.name,
      vscode.ViewColumn.Beside,
      {
        // Enable javascript in the webview
        enableScripts: true,
        retainContextWhenHidden: true,
      },
    );
    const filewatcher = vscode.workspace.createFileSystemWatcher(filePath, true, false, true);
    filewatcher.onDidChange(async (e) => {
      const newFileContent = await fs.readFile(filePath, "utf8");
      try {
        const meta = JSON.parse(newFileContent);
        webview.webview.postMessage({
          type: "updateItemMeta",
          data: meta,
        });
      } catch (e) {}
    });

    webview = AlicloudAPIWebview.webviewPanels[panelKey];
    webview.onDidDispose(() => {
      filewatcher.dispose();
      webview.dispose();
      webview = null;
      delete AlicloudAPIWebview.webviewPanels[panelKey];
    });
    webview.title = apiMeta.name;
    const iconPath = vscode.Uri.joinPath(extensionUri, "resources/api-outline.svg");
    webview.iconPath = iconPath;
    webview.webview.html = htmlTemplate(
      {
        getUri: (assetUri) => webview.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, assetUri)),
        cspSource: webview.webview.cspSource,
      },
      {
        specName: "",
        modName: "",
        name: apiMeta.name,
        spec: apiMeta,
        pageType: "document",
        schemaType: "api",
        displayLanguage: getCurrentLang(),
      },
    );
    webview.webview.onDidReceiveMessage((message) => {
      if (message.type && message.requestId) {
        alicloudAPIMessageService.exectService(message).then((result) => {
          webview.webview.postMessage(result);
        });
      }
    });
  }
}

export class AlicloudAPISerializer implements vscode.WebviewPanelSerializer {
  async deserializeWebviewPanel(webviewPanel: vscode.WebviewPanel, state: any) {
    // `state` is the state persisted using `setState` inside the webview
    console.log(`Got state: ${state}`);

    // Restore the content of our webview.
    //
    // Make sure we hold on to the `webviewPanel` passed in here and
    // also restore any event listeners we need on it.
    // webviewPanel.webview.html = getWebviewContent();

    webviewPanel.webview.html = htmlTemplate(
      {
        getUri: (assetUri) =>
          webviewPanel.webview.asWebviewUri(
            vscode.Uri.joinPath(alicloudAPIMessageService.context.extensionUri, assetUri),
          ),
        cspSource: webviewPanel.webview.cspSource,
      },
      state,
    );
    webviewPanel.webview.onDidReceiveMessage((message) => {
      if (message.type && message.requestId) {
        alicloudAPIMessageService.exectService(message).then((result) => {
          webviewPanel.webview.postMessage(result);
        });
      }
    });
  }
}
