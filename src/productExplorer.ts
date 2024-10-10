import { Product } from "./types";
import fetch from "node-fetch";
import { getUserAgent } from "./utils";
import { getCurrentLang } from "./utils/I18N";

let productRequest = null;

export class ProductExplorer {
  products: Array<Product>;

  async requestProducts() {
    const productsResponse = await fetch(
      `https://api.aliyun.com/meta/v1/products${getCurrentLang() === "en_US" ? "?language=en_US" : ""}`,
      {
        headers: {
          "User-Agent": getUserAgent(),
        },
      },
    ).then((res) => res.text());
    this.products = JSON.parse(productsResponse);
    return JSON.parse(productsResponse);
  }

  async refreshProducts() {
    productRequest = createProductRequestInstance();
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

export function createProductRequestInstance() {
  var instance = new ProductExplorer();
  return instance;
}

export function getProductRequestInstance(): ProductExplorer {
  if (!productRequest) {
    productRequest = createProductRequestInstance();
  }
  return productRequest;
}
