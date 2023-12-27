'use strict';

const _ = require('lodash');
const needle = require('needle');
const promisify = require('util').promisify;
const getAsync = promisify(needle.get);
const postAsync = promisify(needle.post);

const FILTER_METHOD = ['HEAD', 'TRACE', 'OPTIONS', 'PATCH', 'CONNECT'];

async function msleep(n) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, n);
  });
}

async function getRequestBody(params, paramsObject, requestKey) {
  if (
    params
    && params[requestKey]
    && _.get(paramsObject, `params.${requestKey}.position`) === 'Body'
    && _.get(paramsObject, `params.${requestKey}.type`) === 'RequestBody'
  ) {
    return params[requestKey];
  }
  return null;
}

exports.getMethod = async function (method) {
  if (/|/.test(method)) {
    const methodArray = method.split('|');
    const vaildMethod = methodArray.filter(item => FILTER_METHOD.indexOf(item) <= -1);
    if (vaildMethod.length > 0) {
      return vaildMethod[0];
    } 
    return methodArray[0];
    
  } 
  return method;
  
};

exports.getRequestBodyParams = async function (params, paramsObject) {
  return await getRequestBody(params, paramsObject, 'requestBody') || await getRequestBody(params, paramsObject, 'RequestBody');
};

exports.request = async function (url, options = {}) {
  let retry = 0;
  const retryTimes = 10;
  while (retry <= retryTimes) {
    try {
      const response = await postAsync(url, {
        headers: {
          'Content-Type': 'application/json'
        },
        ...options
      });
      return response;
    } catch (e) {
      retry++;
    }
    await msleep(1000);
  }
  throw new Error('Request Failed');
};
