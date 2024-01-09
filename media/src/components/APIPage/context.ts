/**
 * @author yini-chen
 */
import { createContainer } from 'unstated-next';
import { SemixFormProps } from '../SemixFormRender';
import React from 'react';
import { PontUIService } from '../../service/UIService';
import { OpenAPIResponse, OpenAPIRequestResult } from '../../types/openAPI';
import { endpointsMocks } from '../../mocks/endpoints';
import { getVSCode } from '../../utils/utils';

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
  /**
   * 模式选择
   */
  mode: 'debug' | 'doc' |'sdk' = 'debug';
  changeMode: (mode: 'debug' | 'doc' | 'sdk') => void;
  /**
   * 服务地址
   */
  endpoints?: any[];
  /**
   * regionId
   */
  regionId?: string;
  setRegionId?: (regionId: string) => void;
}

export const useAPIPageContext = (initialState = {} as APIPageState): APIPageState => {
  const [openAPIResponses, setOpenAPIResponse] = React.useState(null);
  const [isApiResultLoading, setIsApiResultLoading] = React.useState(false);
  const [endpoints, setEndpoints] = React.useState([]);
  const [regionId, setRegionId] = React.useState<string>("");

  React.useEffect(() => {
    if (endpoints.length === 0) {
      // get endpoints list
      PontUIService.requestEndpoints(initialState.product).then((res) => {
        setEndpoints(res?.length ? res : endpointsMocks);
      });
    }
  }, [initialState.product]);

  const onDebug = (value) =>{
    setIsApiResultLoading(true);
    PontUIService.openAPIRequest(value).then(res=>{
      setIsApiResultLoading(false);
      const responses = {};
      // 根据文档名存储响应，切换API文档时展示对应的响应
      responses[res.doc] = res.response
      setOpenAPIResponse(responses);
    });
  }
  return { ...initialState, openAPIResponses, onDebug, isApiResultLoading, endpoints, regionId, setRegionId };
};

export const APIPageContext = createContainer(useAPIPageContext);