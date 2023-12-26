/**
 * @file 多语言工具
 * @author 奇阳
 */
import IntlFormat from "intl-format";
import zhCNLangs from "./langs/zh_CN";
import enUsLangs from "./langs/en_US";

export const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";

export enum LangEnum {
  zh_CN = "zh_CN",
  en_US = "en_US",
}

/**
 * 获取所有语言
 */
export function getAllLangs() {
  return [LangEnum.zh_CN, LangEnum.en_US];
}

interface API {
  /**
   * 初始化对应语言
   * @param lang: 对应语言
   * @param metas: 所有语言的语言文件
   */
  init?: (lang: string, metas: object) => API;
  /**
   * 设置对应语言
   * @param lang: 切换的对应语言
   */

  setLang?: (lang: string) => void;

  /**
   * 模板填充, 获取对应语言的模板值
   * @param template: 对应语言的模板
   * @param args: 模板的参数
   */
  template?: (str: string, args: object) => string;
  /**
   * 获取对应语言的值
   * @param name: 对应语言的模板的 Key
   * @param options: 模板的参数
   */
  get: (name: string, args?: object) => string;
}

type Langs = typeof zhCNLangs & API;

const langs = {
  zh_CN: zhCNLangs,
  en_US: enUsLangs,
};

// 从 Cookie 中取语言值, 默认为 zh_CN
let curLang = LangEnum.zh_CN;

let I18N = IntlFormat.init(curLang, langs) as any as Langs;

export const setI18N = (lang: any) => {
  curLang = lang;
  I18N = IntlFormat.init(lang, langs) as any;
};

export default I18N;
export { I18N, curLang };
