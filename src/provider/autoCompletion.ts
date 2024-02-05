import * as vscode from "vscode";
import { alicloudAPIMessageService } from "../Service";
import { AlicloudApiCommands } from "../commands";
import _ from "lodash";
import { fileSel } from "../utils";
import { codeSampleProvider } from "../plugins/generate";

class CompletionItemProvider {
  async provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext,
  ) {
    const language = vscode.window.activeTextEditor?.document.languageId;
    const service = alicloudAPIMessageService;
    const items = service.pontManager.localPontSpecs
      .map((pontSpec) => {
        return AlicloudApiCommands.getPickItems(pontSpec);
      })
      .reduce((pre, next) => pre.concat(next), []);

    // 支持换行 代码从起始位置到输入位置
    const text = document.getText(
      new vscode.Range(new vscode.Position(position.line, position.character - 1), position),
    );

    let completionItems = [];

    // 支持已订阅的API搜索
    if (items?.find((item) => item?.label?.toLocaleLowerCase()?.includes(text?.toLocaleLowerCase()))) {
      const searchAPIs = items?.filter((item) => item?.label?.toLocaleLowerCase().includes(text?.toLocaleLowerCase()));
      completionItems = searchAPIs?.map((api) => {
        let completionItem = new vscode.CompletionItem(api.label, vscode.CompletionItemKind["Interface"]);
        completionItem.detail = api.detail;
        completionItem.documentation = api.description;

        // 代码替换位置，查找位置会同步应用
        completionItem.range = new vscode.Range(
          new vscode.Position(position.line, position.character - text.length),
          new vscode.Position(position.line, position.character),
        );
        return completionItem;
      });
      if (language === "java") {
        const javaAsyncCompletionItems = searchAPIs?.map((api) => {
          let javaAsyncCompletionItem = new vscode.CompletionItem(
            api.label + "(java-async)",
            vscode.CompletionItemKind["Interface"],
          );
          javaAsyncCompletionItem.detail = api.detail;
          javaAsyncCompletionItem.documentation = api.description;

          // 代码替换位置，查找位置会同步应用
          javaAsyncCompletionItem.range = new vscode.Range(
            new vscode.Position(position.line, position.character - text.length),
            new vscode.Position(position.line, position.character),
          );
          return javaAsyncCompletionItem;
        });
        completionItems = [...completionItems, ...javaAsyncCompletionItems];
      }
      return completionItems;
    }
  }

  resolveCompletionItem?(
    item: vscode.CompletionItem,
    token: vscode.CancellationToken,
  ): vscode.ProviderResult<vscode.CompletionItem> {
    const language = vscode.window.activeTextEditor?.document.languageId;
    const [product, versionAPI] = item?.detail?.split("::");
    const [version, apiName] = versionAPI?.split("/");
    let asyncFetchedCode = "";
    if (product && apiName && version) {
      return new Promise<vscode.CompletionItem>(async (resolve) => {
        const snippets = await codeSampleProvider({
          language: language,
          product: product,
          version: version,
          apiName: apiName,
          simplify:true
        });
        
        if (item.label.toString().includes("(java-async)")) {
          asyncFetchedCode = snippets?.find((item) => item.language === "java-async")?.code;
        } else if(snippets?.find((item) => item.language === language)){
          asyncFetchedCode = snippets?.find((item) => item.language === language)?.code;
        }else{
          item.documentation = "暂不支持该语言的 SDK"
        }
        // 设置补全项的实际插入文本
        item.insertText = asyncFetchedCode;
        resolve(item);
      });
    }
    return item;
  }
}

export default function autoCompletion(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(fileSel, new CompletionItemProvider(), "", "."),
  );
}
