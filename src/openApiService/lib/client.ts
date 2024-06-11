"use strict";

const { default: OpenApiUtil } = require("@alicloud/openapi-util");
const { default: Util } = require("@alicloud/tea-util");
const $Credential = require("@alicloud/credentials");
const $tea = require("@alicloud/tea-typescript");
const { default: Credential } = require("@alicloud/credentials");
const vscode = require("vscode");
const os = require("os");

export class OpenAPIClient {
  private _credential: any;
  private _endpoint: any;
  private _endpointType: any;
  private _protocol: any;
  private _regionId: any;
  private _userAgent: any;
  private _readTimeout: any;
  private _connectTimeout: any;
  private _httpsProxy: any;
  private _httpProxy: any;
  private _noProxy: any;
  private _socks5Proxy: any;
  private _socks5NetWork: any;
  private _maxIdleConns: any;
  private _signatureAlgorithm: any;
  constructor(config) {
    if (Util.isUnset($tea.toMap(config))) {
      throw $tea.newError({
        code: "ParameterMissing",
        message: "'config' can not be unset",
      });
    }

    if (!Util.isUnset(config.credential)) {
      this._credential = config.credential;
    } else if (!Util.empty(config.accessKeyId) && !Util.empty(config.accessKeySecret)) {
      if (!Util.empty(config.securityToken)) {
        config.type = "sts";
      } else {
        config.type = "access_key";
      }

      let credentialConfig = new $Credential.Config({
        accessKeyId: config.accessKeyId,
        type: config.type,
        accessKeySecret: config.accessKeySecret,
        securityToken: config.securityToken,
      });
      this._credential = new Credential(credentialConfig);
    }

    this._endpoint = config.endpoint;
    this._endpointType = config.endpointType;
    this._protocol = config.protocol;
    this._regionId = config.regionId;
    this._userAgent = config.userAgent;
    this._readTimeout = config.readTimeout;
    this._connectTimeout = config.connectTimeout;
    this._httpProxy = config.httpProxy;
    this._httpsProxy = config.httpsProxy;
    this._noProxy = config.noProxy;
    this._socks5Proxy = config.socks5Proxy;
    this._socks5NetWork = config.socks5NetWork;
    this._maxIdleConns = config.maxIdleConns;
    this._signatureAlgorithm = config.signatureAlgorithm;
  }

  async getAccessKeyId() {
    if (Util.isUnset(this._credential)) {
      return "";
    }

    let accessKeyId = await this._credential.getAccessKeyId();
    return accessKeyId;
  }

  /**
   * Get accesskey secret by using credential
   * @return accesskey secret
   */
  async getAccessKeySecret() {
    if (Util.isUnset(this._credential)) {
      return "";
    }

    let secret = await this._credential.getAccessKeySecret();
    return secret;
  }

  async getSecurityToken() {
    if (Util.isUnset(this._credential)) {
      return "";
    }

    let token = await this._credential.getSecurityToken();
    return token;
  }

  defaultAny(inputValue, defaultValue) {
    if (Util.isUnset(inputValue)) {
      return defaultValue;
    }

    return inputValue;
  }

  async doRequest(params, request, runtime) {
    let _runtime = {
      timeouted: "retry",
      readTimeout: Util.defaultNumber(runtime.readTimeout, this._readTimeout),
      connectTimeout: Util.defaultNumber(runtime.connectTimeout, this._connectTimeout),
      httpProxy: Util.defaultString(runtime.httpProxy, this._httpProxy),
      httpsProxy: Util.defaultString(runtime.httpsProxy, this._httpsProxy),
      noProxy: Util.defaultString(runtime.noProxy, this._noProxy),
      maxIdleConns: Util.defaultNumber(runtime.maxIdleConns, this._maxIdleConns),
      retry: {
        retryable: runtime.autoretry,
        maxAttempts: Util.defaultNumber(runtime.maxAttempts, 3),
      },
      backoff: {
        policy: Util.defaultString(runtime.backoffPolicy, "no"),
        period: Util.defaultNumber(runtime.backoffPeriod, 1),
      },
      ignoreSSL: runtime.ignoreSSL,
    };

    let _lastRequest = null;
    let _now = Date.now();
    let _retryTimes = 0;
    while ($tea.allowRetry(_runtime["retry"], _retryTimes, _now)) {
      if (_retryTimes > 0) {
        let _backoffTime = $tea.getBackoffTime(_runtime["backoff"], _retryTimes);
        if (_backoffTime > 0) {
          await $tea.sleep(_backoffTime);
        }
      }

      _retryTimes = _retryTimes + 1;
      let entry;
      try {
        let request_ = new $tea.Request();
        request_.protocol = Util.defaultString(this._protocol, params.protocol);
        request_.method = params.method;
        request_.pathname = OpenApiUtil.getEncodePath(params.pathname);
        request_.query = OpenApiUtil.query(request.query);
        // endpoint is setted in product client
        request_.headers = {
          host: this._endpoint,
          "x-acs-version": params.version,
          "x-acs-action": params.action,
          "user-agent": `Toolkit (${os.type()}; ${os.release()}) alibababcloud-api-toolkit/${vscode.extensions.getExtension("alibabacloud-openapi.vscode-alicloud-api").packageJSON.version} VS Code/${vscode.version}`,
          "x-acs-date": OpenApiUtil.getTimestamp(),
          "x-acs-signature-nonce": Util.getNonce(),
          accept: "application/json",
          ...request.headers,
        };
        if (request.headers && request.headers["Host"]) {
          delete request_.headers["Host"];
          request_.headers["host"] = request.headers["Host"];
        }
        let signatureAlgorithm = Util.defaultString(this._signatureAlgorithm, "ACS3-HMAC-SHA256");
        let hashedRequestPayload = OpenApiUtil.hexEncode(OpenApiUtil.hash(Util.toBytes(""), signatureAlgorithm));
        if (!Util.isUnset(request.stream)) {
          let tmp = await Util.readAsBytes(request.stream);
          hashedRequestPayload = OpenApiUtil.hexEncode(OpenApiUtil.hash(tmp, signatureAlgorithm));
          request_.body = new $tea.BytesReadable(tmp);
          request_.headers["content-type"] = "application/octet-stream";
        } else {
          if (!Util.isUnset(request.body)) {
            if (Util.equalString(params.reqBodyType, "json")) {
              let jsonObj = Util.toJSONString(request.body);
              hashedRequestPayload = OpenApiUtil.hexEncode(OpenApiUtil.hash(Util.toBytes(jsonObj), signatureAlgorithm));
              request_.body = new $tea.BytesReadable(jsonObj);
              request_.headers["content-type"] = "application/json; charset=utf-8";
            } else {
              let m = Util.assertAsMap(request.body);
              let formObj = OpenApiUtil.toForm(m);
              hashedRequestPayload = OpenApiUtil.hexEncode(OpenApiUtil.hash(Util.toBytes(formObj), signatureAlgorithm));
              request_.body = new $tea.BytesReadable(formObj);
              request_.headers["content-type"] = "application/x-www-form-urlencoded";
            }
          }
        }

        request_.headers["x-acs-content-sha256"] = hashedRequestPayload;
        if (!Util.equalString(params.authType, "Anonymous")) {
          let accessKeyId = await this.getAccessKeyId();
          let accessKeySecret = await this.getAccessKeySecret();
          let securityToken = await this.getSecurityToken();
          if (!Util.empty(securityToken)) {
            request_.headers["x-acs-accesskey-id"] = accessKeyId;
            request_.headers["x-acs-security-token"] = securityToken;
          }

          request_.headers["Authorization"] = OpenApiUtil.getAuthorization(
            request_,
            signatureAlgorithm,
            hashedRequestPayload,
            accessKeyId,
            accessKeySecret,
          );
        }
        request_.headers["host"] = this._endpoint;
        if (request.headers && request.headers["Host"]) {
          request_.headers["Host"] = request.headers["Host"];
        }

        _lastRequest = request_;
        console.log("_lastRequest", _lastRequest);

        let response_ = await $tea.doAction(request_, _runtime);
        entry = {
          request: {
            headers: request_.headers,
          },
          response: {
            statusCode: response_.statusCode,
            headers: response_.headers,
          },
        };

        if (Util.is4xx(response_.statusCode) || Util.is5xx(response_.statusCode)) {
          let _res = await Util.readAsJSON(response_.body);
          let err = Util.assertAsMap(_res);
          return {
            format: "json",
            result: err,
            entry,
          };
        }

        if (
          response_.statusCode === 204 &&
          (Util.isUnset(response_.headers["content-type"]) || Util.isUnset(response_.headers["content-length"]))
        ) {
          let str = await Util.readAsString(response_.body);
          return {
            format: "string",
            result: str,
            entry,
          };
        }

        if (Util.equalString(params.bodyType, "binary")) {
          return {
            format: "binary",
            result: response_.body,
            entry,
          };
        } else if (Util.equalString(params.bodyType, "byte")) {
          let byt = await Util.readAsBytes(response_.body);
          return {
            format: "byte",
            result: byt,
            entry,
          };
        } else if (Util.equalString(params.bodyType, "string")) {
          let str = await Util.readAsString(response_.body);
          return {
            format: "string",
            result: str,
            entry,
          };
        } else if (Util.equalString(params.bodyType, "json")) {
          let obj = await Util.readAsJSON(response_.body);
          let res = Util.assertAsMap(obj);
          return {
            format: "json",
            result: res,
            entry,
          };
        } else if (Util.equalString(params.bodyType, "array")) {
          let arr = await Util.readAsJSON(response_.body);
          return {
            format: "json",
            result: arr,
            entry,
          };
        }
        let str = await Util.readAsString(response_.body);
        return {
          format: "string",
          result: str,
          entry,
        };
      } catch (ex) {
        if ($tea.isRetryable(ex)) {
          continue;
        }
        ex.entry = entry;
        throw ex;
      }
    }

    throw $tea.newUnretryableError(_lastRequest);
  }
}

exports.Client = OpenAPIClient;
export default OpenAPIClient;
