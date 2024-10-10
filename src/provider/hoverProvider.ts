/**
 * @author: yini-chen
 * @description: hover provider
 */

import * as vscode from "vscode";
import { fileSel, getSpecInfoFromName } from "../utils";
import { AlicloudAPIService, alicloudAPIMessageService } from "../Service";
import { AlicloudApiCommands } from "../commands";
import { getProductRequestInstance } from "../productExplorer";
import I18N from "../utils/I18N";

const getKeyWord = (word: string) => {
  if (/^[A-Za-z].*Request$/.test(word)) {
    return word.replace("Request", "");
  }
  return word;
};

const getProductsKeywords = (productCode: string, versions: Array<string>): Array<string> => {
  const keywords = versions?.map((version) => {
    const newVersion = version?.split("-")?.join("");
    return `${productCode}${newVersion}`.toLocaleLowerCase();
  });
  const pythonKeywords = keywords?.map((key) => {
    return `${key}client`;
  });
  keywords.push(productCode.toLocaleLowerCase());
  return [...keywords, ...pythonKeywords];
};

class HoverProvider {
  async provideHover(document: vscode.TextDocument, position: vscode.Position) {
    const service = alicloudAPIMessageService;
    const apis = service.pontManager.localPontSpecs
      .map((pontSpec) => {
        return AlicloudApiCommands.getPickItems(pontSpec);
      })
      .reduce((pre, next) => pre.concat(next), []);

    const wordRange = document.getWordRangeAtPosition(position);
    const word = document.getText(wordRange);
    const keyWord = getKeyWord(word);

    const hoverdAPI = apis?.find((item) => item?.label?.toLocaleLowerCase() === keyWord?.toLocaleLowerCase());
    const productInstance = await getProductRequestInstance();
    const hoverdProduct = productInstance?.products?.find((item) =>
      getProductsKeywords(item.code, item.versions)?.includes(keyWord?.toLocaleLowerCase()),
    );
    // 匹配关键字为 API 名称
    if (hoverdAPI) {
      const apiName = hoverdAPI?.label;
      const { product, version } = getSpecInfoFromName(hoverdAPI?.info?.split("/")[0]);
      const service = new AlicloudAPIService();
      const samples = await service.requestSamplesByAPI(product, version, keyWord);
      const args = [{ apiName, product, version }];
      const docCommandUri = vscode.Uri.parse(
        `command:alicloud.api.quickOpenDocument?${encodeURIComponent(JSON.stringify(args))}`,
      );
      const contents = new vscode.MarkdownString(
        I18N.template(I18N.provider.hoverProvider.checkDoc, { val1: apiName, val2: docCommandUri }),
      );
      contents.isTrusted = true;
      return new vscode.Hover([
        contents,
        samples?.length
          ? I18N.template(I18N.provider.hoverProvider.checkCodeSample, {
              val1: apiName,
              val2: product,
              val3: version,
              val4: apiName,
            })
          : I18N.template(I18N.provider.hoverProvider.checkCodeSampleProduct, { val1: product, val2: product }),
        hoverdAPI?.summary || "",
      ]);
    }
    // 匹配关键字为产品名称
    if (hoverdProduct) {
      return new vscode.Hover([
        I18N.template(I18N.provider.hoverProvider.checkCodeSampleProduct2, {
          val1: hoverdProduct?.name || hoverdProduct?.code,
          val2: hoverdProduct?.code,
        }),
        hoverdProduct?.description || hoverdProduct?.name,
      ]);
    }
  }
}

export default function (context: vscode.ExtensionContext) {
  context.subscriptions.push(vscode.languages.registerHoverProvider(fileSel, new HoverProvider()));
}
