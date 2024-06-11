import { Product } from "./types";
import fetch from "node-fetch";
import * as vscode from "vscode";
import os from "os";

let productRequest = null;

export class ProductExplorer {
  products: Array<Product>;

  async requestProducts() {
    const productsResponse = await fetch("https://api.aliyun.com/meta/v1/products", {
      headers: {
        "User-Agent": `Toolkit (${os.type()}; ${os.release()})  alibababcloud-api-toolkit/${vscode.extensions.getExtension("alibabacloud-openapi.vscode-alicloud-api").packageJSON.version} VS Code/${vscode.version}`,
      },
    }).then((res) => res.text());
    this.products = JSON.parse(productsResponse);
    return JSON.parse(productsResponse);
  }

  getProducts() {
    return this.products;
  }

  constructor() {
    this.requestProducts().then((products) => {
      this.products = products;
    });
  }
}

function createProductRequestInstance() {
  var instance = new ProductExplorer();
  return instance;
}

export function getProductRequestInstance(): ProductExplorer {
  if (!productRequest) {
    productRequest = createProductRequestInstance();
  }
  return productRequest;
}
