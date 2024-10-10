/**
 * @author yini-chen
 */
import { createContainer } from "unstated-next";
import { SemixFormProps } from "../SemixFormRender";
import React from "react";
import { PontUIService } from "../../service/UIService";
import { endpointsMocks } from "../../mocks/endpoints";
import { lastSdkInfo } from "../../mocks/allSdkInfo";
import I18N from "../../utils/I18N";

export class APIPageState {
  /**
   * apiMeta
   */
  apiMeta: any;
  /**
   * schemaForm
   */
  schemaForm: SemixFormProps["form"];
  product: string;
  version: string;
  /**
   * openapi sdk 响应组
   */
  openAPIResponses? = {};
  /**
   * 发起调试
   */
  onDebug?: (value: any) => void;
  /**
   * 发起调用loading
   */
  isApiResultLoading? = false;
  /**
   * 模式选择
   */
  mode: "debug" | "doc" | "sdk" = "debug";
  changeMode: (mode: "debug" | "doc" | "sdk") => void;
  /**
   * 服务地址
   */
  endpoints?: any[];
  /**
   * regionId
   */
  regionId? = "cn-hangzhou";
  setRegionId?: (regionId: string) => void;
  /**
   * profileInfo
   */
  profileInfo?: any;
  /**
   * vscode 主题
   */
  theme?: string;
  sdkInfo?: any;
}

export const useAPIPageContext = (initialState = {} as APIPageState): APIPageState => {
  const [openAPIResponses, setOpenAPIResponse] = React.useState(null);
  const [isApiResultLoading, setIsApiResultLoading] = React.useState(false);
  const [endpoints, setEndpoints] = React.useState([]);
  const [regionId, setRegionId] = React.useState<string>("cn-hangzhou");
  const [profileInfo, setProfileInfo] = React.useState({});
  const [theme, setTheme] = React.useState("light");
  const [sdkInfo, setSdkInfo] = React.useState(lastSdkInfo);

  React.useEffect(() => {
    PontUIService.getTheme()?.then((res) => {
      setTheme(res);
    });
  }, [initialState.product]);

  React.useEffect(() => {
    if (endpoints.length === 0) {
      // get endpoints list
      PontUIService.requestEndpoints(initialState.product).then((res) => {
        setEndpoints(res?.length ? res : endpointsMocks);
      });
    }
    if (initialState.product && initialState.version) {
      PontUIService.requestSDKInfo({
        product: initialState.product,
        version: initialState.version,
      }).then((res) => {
        setSdkInfo(res || lastSdkInfo);
      });
    }
  }, [initialState.product, initialState.version]);

  React.useEffect(() => {
    PontUIService.requestProfiles().then((res) => {
      setProfileInfo(res || {});
    });
  }, []);

  React.useEffect(() => {
    PontUIService.requestDisplayLanguage().then((res) => {
      I18N.setLang(res || "zh_CN");
    });
  }, []);

  const onDebug = (value) => {
    setIsApiResultLoading(true);
    PontUIService.openAPIRequest(value).then((res) => {
      setIsApiResultLoading(false);
      const responses = {};
      // 根据文档名存储响应，切换API文档时展示对应的响应
      responses[res.doc] = res.response;
      setOpenAPIResponse(responses);
    });
  };
  return {
    ...initialState,
    openAPIResponses,
    onDebug,
    isApiResultLoading,
    endpoints,
    regionId,
    setRegionId,
    profileInfo,
    theme,
    sdkInfo,
  };
};

export const APIPageContext = createContainer(useAPIPageContext);
