'use strict';
const $Credential = require('@alicloud/credentials');
const { default: Credential } = require('@alicloud/credentials');
const FILTER_METHOD = ['HEAD', 'TRACE', 'OPTIONS', 'PATCH', 'CONNECT'];
import {OpenAPIClient} from '../lib/client'

function _bodyType(types) {
  if (!types || types.length < 1) {
    return 'none';
  }

  const type = types[0];

  if (type === 'application/json') {
    return 'json';
  }

  if (type === 'application/xml') {
    return 'xml';
  }

  if (type === 'application/x-www-form-urlencoded') {
    return 'form';
  }

  if (type === 'application/octet-stream') {
    return 'binary';
  }

  return 'none';
}

function getMethod(method) {
  let methodArray;
  if (method.includes('|')) {
    methodArray = method.split('|');
  } else if (method.includes(',')) {
    methodArray = method.split(',');
  } else {
    return method;
  }
  if (methodArray.includes('POST')) {
    return 'POST';
  }
  const vaildMethod = methodArray.filter(item => FILTER_METHOD.indexOf(item) <= -1);
  if (vaildMethod.length > 0) {
    return vaildMethod[0];
  } 
  return methodArray[0];
  
}

export class OpenAPIOptions {
  /**
   * 服务地址
   */
  endpoint: string;
  /**
   * api名称
   */
  action: string;
  /**
   * api版本
   */
  apiVersion: string;
  /**
   * api参数
   */
  params: any;
  // paramObject: any;
  accessKeyId: string;
  accessKeySecret: string;
  /**
   * 产品名称
   */
  productName: string;
  /**
   * api元数据
   */
  meta: any;
  bodyStyle: string;
  /**
   * 鉴权
   */
  credential: any;
}

export const request = async function (options: OpenAPIOptions) {
  let {
    endpoint,
    action,
    apiVersion,
    params,
    accessKeyId,
    accessKeySecret,
    productName,
    meta,
    bodyStyle,
    credential
  } = options;
  let method = meta?.apis[action]?.method?.toUpperCase();
  let protocol = 'https';
  endpoint = endpoint ? endpoint.replace('http://', '').replace('https://', '') : `${productName.toLowerCase()}.cn-hangzhou.aliyuncs.com`;
  let pathname = '/';
  const schema = meta.apis[action].responses['200'] && meta.apis[action].responses['200'].schema;
  const requestType = bodyStyle === 'json' ? 'json' : 'formData';
  let responseType;
  if (!schema) {
    responseType = _bodyType(meta.apis[action] && meta.apis[action].produces);
  } else if (schema.xml) {
    responseType = 'xml';
  } else if (schema.type && schema.type !== 'object') {
    responseType = schema.format || schema.type;
  } else {
    responseType = 'json';
  }

  let request = {} as any;
  request.headers = {};
  if (productName === 'ROS' && params.RegionId) {
    request.headers['x-acs-region-id'] = params.RegionId;
  }

  // const newParams = {};
  // const oldParams = JSON.parse(paramObject.params);
  // oldParams.map(param => {
  //   newParams[param.name] = param;
  // });
  // paramObject.params = newParams;
  const parameters = {};
  meta.apis[action]?.parameters?.map(param=>{
    parameters[param.name] = param;
  })
  // paramObject.params = params;

  // eslint-disable-next-line guard-for-in
  for (let name in params) {
    let paramInfo = parameters[name];
    let value = params[name];
    if (paramInfo) {
      if (paramInfo.style
        && paramInfo.style === 'json'
        && typeof value !== 'string') {
        value = JSON.stringify(value);
      }
      if (paramInfo.style
        && Array.isArray(value)) {
        switch (paramInfo.style) {
          case 'simple':
            value = value.join(',');
            break;
          case 'spaceDelimited':
            value = value.join(' ');
            break;
          case 'pipeDelimited':
            value = value.join('|');
            break;
        }
      }

      switch (paramInfo.in) {
        case 'path':
          // path:"/repos/{RepoNamespace}/{RepoName}/build/[BuildId]/cancel"
          if (pathname.indexOf('*') !== -1 && name === 'requestPath') {
            pathname = value;
          } else if (pathname.includes(name)) {
            pathname = pathname.replace(`{${name}}`, value);
          }
          break;
        case 'host':
          // endpoint 已经在前端处理过了
          // host 一般是 regionId
          break;
        case 'query':
          if (!request.query) {
            request.query = {};
          }
          request.query[name] = value;
          break;
        case 'Body':
          if (!request.body) {
            request.body = {};
          }
          if (bodyStyle === 'json') {
            request.body = params[name];
          } else if (name === 'RequestBody' && paramInfo.type === 'RequestBody') {
            request.body = params[name];
          } else {
            request.body[name] = value;
          }
          if (paramInfo.type === 'Binary') {
            // TODO：上传文件
            // request.stream = await ossUtil.getStream(`tmpFile/${params[name]}`);
          }
          break;
        case 'Header':
          request.headers[name] = value;
          break;
      }
    } else if (bodyStyle === 'json' && name === 'body' && params.body) {
      // 兼容 bodyStyle 为 json，且不传 body 层的情况
      // 兼容 bodyStyle 为 json，且不传 body 层的情况
      if (typeof params.body === 'string') {
        request.body = JSON.parse(params.body);
      } else {
        request.body = params.body;
      }
    }
  }
  let _credential;
  if (credential && credential.type === 'bearer') {
    let credentialConfig = new $Credential.Config({
      type: 'bearer',
      bearerToken: credential.token,
    });
    _credential = new Credential(credentialConfig);
  }
  const client = new OpenAPIClient({
    endpoint: endpoint,
    accessKeyId,
    accessKeySecret,
    credential: _credential,
    protocol: protocol,
    readTimeout: 50000,
    connectTimeout: 50000
  });
  request.query = {};
  const data = {
    version: apiVersion,
    method,
    pathname,
    action,
    reqBodyType: requestType,
    bodyType: responseType,
    authType:'AK',
  };
  return await client.doRequest(data, request, {});
};