import * as vscode from "vscode";
import { getProductRequestInstance } from "./productExplorer";
// client/src/provider/autoCompletion.ts
class CommonCodeDoc {
  kind: string;
}

class CompletionItemProvider {
  async provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    token: vscode.CancellationToken,
    context: vscode.CompletionContext,
  ) {
    // 支持换行 代码从起始位置到输入位置
    const text = document.getText(new vscode.Range(new vscode.Position(0, 0), position));
    const firstDoc = [
      {
        kind: "Field",
        products: getProductRequestInstance().products || ["Ecs"],
      },
    ];

    const language = vscode.window.activeTextEditor?.document.languageId;

    if (/aliyunapi\.$/.test(text)) {
      vscode.window.setStatusBarMessage("AlibabaCloud API Toolkit: 正在加载代码补全建议...");
      return firstDoc
        .map((item) => {
          return item.products.map((product) => {
            let completionItem = new vscode.CompletionItem(product.code, vscode.CompletionItemKind[item.kind]);
            completionItem.detail = product.shortName || product.code;
            completionItem.documentation = product.name;
            // 代码替换位置，查找位置会同步应用
            completionItem.range = new vscode.Range(
              new vscode.Position(position.line, position.character),
              new vscode.Position(position.line, position.character),
            );
            vscode.window.setStatusBarMessage("");
            return completionItem;
          });
        })
        .flat();
    }
    if (/aliyunapi\.([^.]*)\.$/.test(text)) {
      vscode.window.setStatusBarMessage("AlibabaCloud API Toolkit: 正在加载代码补全建议...");
      let matches = text.match(/aliyunapi\.([^.]*)\./g);
      const selectedProduct = matches?.length ? matches[matches?.length - 1].slice(10, -1) : "Ecs";
      const products = getProductRequestInstance()?.products;
      if (products?.find((product) => product.code === selectedProduct)) {
        const product = products?.find((product) => product.code === selectedProduct);
        const overview = await fetch(
          `https://api.aliyun.com/meta/v1/products/${selectedProduct}/versions/${product.defaultVersion}/overview.json`,
          {},
        ).then((res) => res.text());
        const overviewAPIs = JSON.parse(overview)?.apis;
        const apis = Object.keys(overviewAPIs)?.map((key) => {
          return {
            name: key,
            ...overviewAPIs[key],
          };
        });

        const apiDemos = {};

        const getSdkDemos = async () => {
          await Promise.all(
            apis.map(async (api) => {
              const body = {
                apiName: api.name,
                apiVersion: product.defaultVersion,
                product: product.code,
                sdkType: "dara",
                params: {},
                regionId: "regionId",
                endpoint: "endpoint",
                useCommon: false,
              };

              // 补全的 code 来源：make code or 生成 common代码
              const makeCodeStr = await fetch(`https://api.aliyun.com/api/product/makeCode`, {
                method: "post",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
              }).then((res) => res.text());
              const sdkDemos = JSON.parse(makeCodeStr);
              apiDemos[api.name] = sdkDemos?.data?.demoSdk;
            }),
          );
        };

        await getSdkDemos();

        const lineOfPosition = document.lineAt(position);
        const range = new vscode.Range(lineOfPosition.range.start, lineOfPosition.range.end);

        return apis?.map((api) => {
          let completionItem = new vscode.CompletionItem(api.name, vscode.CompletionItemKind["Snippet"]);
          if (apiDemos[api.name]?.[language]) {
            completionItem.label = api.name;
            completionItem.detail = api.title;
            completionItem.documentation = api.summary;
            completionItem.insertText = apiDemos[api.name]?.[language];
          } else {
            completionItem.label = api.name;
            completionItem.detail = api.title + "\n" + "暂无该语言下的SdkDemo";
            completionItem.documentation = api.summary;
            completionItem.insertText = "";
          }
          console.log(position.line,position.character)

          // 代码替换位置，查找位置会同步应用
          // 替换整行代码？
          
            completionItem.range = new vscode.Range(
            new vscode.Position(position.line, position.character),
            new vscode.Position(position.line, position.character),
          );
          vscode.window.setStatusBarMessage("");
          return completionItem;
        });
      }
    }
  }
}

export default function autoCompletion(context: vscode.ExtensionContext) {
  let sel: vscode.DocumentSelector = [
    { scheme: "file", language: "typescript" },
    { scheme: "file", language: "json" },
  ];

  context.subscriptions.push(vscode.languages.registerCompletionItemProvider(sel, new CompletionItemProvider(), "."));
}
