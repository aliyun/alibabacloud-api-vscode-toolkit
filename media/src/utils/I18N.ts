/**
 * @file 多语言工具
 */
import IntlFormat from "intl-format";
import zhCNLangs from "../../../src/langs/zh_CN/index";
import * as _ from "lodash";
import mds from "../../../src/langs/mds.json";

function treegifyI18NLang(i18N: { [x: string]: string }) {
  if (!i18N) return {};

  const I18N = {};

  Object.keys(i18N).forEach((key) => {
    _.set(I18N, key, i18N[key]);
  });
  return I18N;
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

// mdsTexts是从美杜莎获取的文案
// const langs = {
//   zh_CN: zhCNLangs,
// };

export function treegifyI18N(i18N: { [lang: string]: any }) {
  if (!i18N) return {};

  const I18N = {};
  Object.keys(i18N).forEach((lang) => {
    _.set(I18N, lang, treegifyI18NLang(i18N[lang]));
  });
  return I18N;
}

const langs = treegifyI18N({ en_US: mds["en_US"], zh_CN: mds["zh_CN"], zh_HK: mds["zh_CN"], ja_JP: mds["en_US"] });

let curLang = "zh_CN";

// 初始化I18N，curLang 是当前语言
let I18N = IntlFormat.init(curLang, langs) as any as Langs;

export default I18N;
