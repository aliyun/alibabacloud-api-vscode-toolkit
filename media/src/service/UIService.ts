import { PontSpec } from "pontx-spec";
import { MakeCodeResponse, OpenAPIResponse } from "../types/openAPI";

/** 不同使用场景，各自注册服务来源 */
const defaultSpecs: any[] = [];
export const PontUIService = {
  /** 获取本地元数据列表 */
  requestPontSpecs: async () => {
    return {
      localSpecs: defaultSpecs as any[] as PontSpec[],
      remoteSpecs: defaultSpecs as any[] as PontSpec[],
      currentOriginName: "",
    };
  },

  requestDefinitions: async (specName: string) => {
    return {} as any;
  },

  /** 获取 本地/远程 的diff信息 */
  requestDiffs: async () => {
    return [] as any;
  },

  /** 重新生成SDK */
  requestGenerateSdk: async (): Promise<void> => {},

  /** 重新拉取远程数据源 */
  syncRemoteSpec: async (specNames = ""): Promise<void> => {},

  updateLocalSpec: async (spec: PontSpec): Promise<void> => {},

  /** 更新本地数据源 */
  updateSpecBySpecNames: async (specNames = ""): Promise<void> => {},

  /** 更新本地模块  */
  updateMod: async (modName: string, specName = ""): Promise<void> => {},

  /** 更新本地 API */
  updateAPI: async (modName: string, apiName: string, specName = ""): Promise<void> => {},

  /** 更新类 */
  updateBaseClass: async (className: string, specName = ""): Promise<void> => {},

  openMeta: async (meta: {
    name: string;
    specName: string;
    modName?: string;
    type: string;
    spec: any;
  }): Promise<void> => {},

  /** request openapi */
  openAPIRequest: async (params = {}): Promise<OpenAPIResponse> => new OpenAPIResponse(),

  /** get endpoints list */
  requestEndpoints: async (product: string) => {
    return [] as any;
  },
  /** get sdk demo */
  makeCodeRequest: async (params = {}): Promise<MakeCodeResponse> => new MakeCodeResponse(),
  /** get local language */
  getLocalLanguage: async () => "",
  /** update local language */
  updateLocalLanguage: async (language: string) => "",
  /** open in ide */
  openInCode: async (codeInfo: { code: string; language: string }): Promise<void> => {},
  /** save to file */
  saveToFile: async (code: string): Promise<void> => {},
  /** 是否弹出通知框 */
  getNoticeFlag: async (): Promise<boolean> => true,
  /** 更新体验弹窗弹出的时间 */
  updateQuestionnaireExpiration: async (days: number): Promise<void> => {},
  /** get profiles */
  requestProfiles: async () => {
    return { current: "", profiles: [] };
  },
  /** 新增 AK 凭证 */
  addNewAKProfile: async (submitValue: {
    profileName: string;
    accessKey: string;
    secretKey: string;
    defaultRegionId: string;
  }) => {
    return { success: true };
  },
  /** 关闭当前tab页*/
  closeCurrentTab: async () => "",
  /** 删除 AK 凭证 */
  deleteAKProfile: async (submitValue: {
    profileName: string;
    accessKey: string;
    secretKey: string;
    defaultRegionId: string;
  }) => {
    return { success: true };
  },
  /** 打开 profile 配置 */
  openProfileManager: async () => {},
  /** 选择 profile */
  switchProfile: async () => {},
  /** 获取vscode主题 */
  getTheme: async () => "light",
  /** 执行cli代码 */
  executeCli: async (params: { code: string; language: string }) => {},
  /** 获取 SDK Info */
  requestSDKInfo: async (params: { product: string; version: string }) => {
    return null as any;
  },
};
