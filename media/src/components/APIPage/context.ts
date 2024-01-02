/**
 * @author yini-chen
 */
import { createContainer } from 'unstated-next';
import { SemixFormProps } from '../SemixFormRender';
import React from 'react';
import { PontUIService } from '../../service/UIService';
import { ExtensionResponse, OpenAPIRequestResult } from '../../types/openAPI';

export class APIPageState  {
  /**
   * apiMeta
   */
  apiMeta: any;
  /**
   * schemaForm
   */
  schemaForm: SemixFormProps['form'];
  product: string;
  version:string;
  /**
   * openapi sdk 响应组
   */
  openAPIResponses?= {};
  /**
   * 发起调试
   */
  onDebug?:(value:any)=>void;
  /**
   * 发起调用loading
   */
  isApiResultLoading? = false
}

export const useAPIPageContext = (initialState = {} as APIPageState): APIPageState => {
  const [openAPIResponses, setOpenAPIResponse] = React.useState(null);
  const [isApiResultLoading, setIsApiResultLoading] = React.useState(false);
  const onDebug = (value) =>{
    setIsApiResultLoading(true);
    PontUIService.openAPIRequest(value).then(res=>{
      console.log("webview 收到的信息", res)
      setIsApiResultLoading(false);
      const responses = {};
      // 根据文档名存储响应，切换API文档时展示对应的响应
      responses[res.doc] = res.response
      setOpenAPIResponse(responses);
    });
  }
  return { ...initialState, openAPIResponses, onDebug, isApiResultLoading };
};

export const APIPageContext = createContainer(useAPIPageContext);