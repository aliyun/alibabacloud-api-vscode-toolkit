/**
 * @author yini-chen
 * @description API 试用
 */

import { Balloon, Tab } from "@alicloud/console-components";
import Editor from "@monaco-editor/react";
import { Alert, Button, Dropdown, Empty, Spin, message } from "antd";
import _ from "lodash";
import React from "react";
import { EditorLanguages } from "../../../types/EditorLanguages";
import I18N from "../../../utils/I18N";
import { getEditorMenuItems, getMonacoTheme, parseXml } from "../../utils";
import { APIPageContext } from "../context";
import { PontUIService } from "../../../service/UIService";

export class TryAPIProps {}

const TAB_PANES = [
  {
    text: "Response",
    value: "preview",
  },
  {
    text: "Request Header",
    value: "request-header",
  },
  {
    text: "Response Header",
    value: "response-header",
  },
];

export const TryAPI: React.FC<TryAPIProps> = (props) => {
  const { openAPIResponses, isApiResultLoading, version, apiMeta, product, mode, profileInfo, theme } =
    APIPageContext.useContainer();
  const doc = `${product}::${version}::${apiMeta.name}`;
  const [tab, setTab] = React.useState(TAB_PANES[0].value);
  const apiResult = openAPIResponses?.[doc];

  const noShowMonacoEditor = ["byte"];

  const resultCode = JSON.stringify(apiResult?.result || {}, null, 2);
  const responseHeaderCode = JSON.stringify(apiResult?.entry?.response?.headers || {}, null, 2);
  const requestHeaderCode = JSON.stringify(apiResult?.entry?.request?.headers || {}, null, 2);
  const statusCode = apiResult?.entry?.response?.statusCode || 0;
  // const isUploadApi = getIsUploadApi(props.response);

  const jsonContent = apiResult?.result || {};
  let urlContent = JSON.stringify(apiResult?.result || {});
  let troubleshootQuery = typeof apiResult?.result === "string" ? encodeURIComponent(apiResult?.result) : urlContent;
  if (jsonContent.RequestId) {
    if (urlContent.length > 1500) {
      const data = {
        RequestId: jsonContent.RequestId,
        Code: jsonContent.Code,
        Message: jsonContent.Message,
      };
      if (!data.Code) delete data.Code;
      if (!data.Message) delete data.Message;
      urlContent = JSON.stringify(data);

      if (urlContent.length > 1500) {
        delete data.Message;
        urlContent = JSON.stringify(data);
      }
    }

    troubleshootQuery = encodeURIComponent(urlContent);
  }

  // 记录当前选择浏览的是什么格式的数据
  const [currentFormat, setFormat] = React.useState(apiResult?.format);

  React.useEffect(() => {
    if (apiResult?.format === "xml") {
      setFormat("xml");
    }
    if (apiResult?.format === "byte") {
      setFormat("byte");
    }
  }, [apiResult?.format]);

  const getPreviewData = () => {
    let res = resultCode;
    if (apiResult?.format === "xml") {
      res = currentFormat === "xml" ? apiResult?.result : JSON.stringify(parseXml(apiResult?.result) || {}, null, 2);
    }
    if (apiResult?.format === "byte") {
      res = apiResult?.result?.data;
    }
    return res;
  };
  const getTabValue = (key) => {
    let res = "";
    switch (key) {
      case "preview":
        res = getPreviewData();
        break;
      case "request-header":
        res = requestHeaderCode;
        break;
      case "response-header":
        res = responseHeaderCode;
        break;
      default:
        break;
    }
    return res;
  };

  const getResponseSchema = (statusCode, responseSchema) => {
    if (!statusCode || _.isEmpty(responseSchema)) {
      return {};
    }
    if (!responseSchema[statusCode]?.schema) {
      return responseSchema[200]?.schema || {};
    }
    return responseSchema[statusCode]?.schema || {};
  };

  const items = [
    ...getEditorMenuItems(getTabValue(tab), "json"),
    {
      key: "gotoweb",
      label: (
        <a style={{ textDecoration: "none" }} href={apiMeta?.externalDocs?.url}>
          去门户网页版调试
        </a>
      ),
      codicon: "link-external",
      onClick: () => {
        // window.open(apiMeta?.externalDocs?.url, "_blank");
      },
    },
  ];

  return (
    <div className="comp-try-api">
      <Alert
        message={
          <div>
            {profileInfo?.current?.length ? null : (
              <span>
                调试需要配置您的 AK/SK 信息，
                <a onClick={() => PontUIService.openProfileManager()} className="text-blue-500">
                  点击配置。
                </a>
              </span>
            )}
            {I18N.ide.main.explorer.AKTip}
          </div>
        }
        type="warning"
        showIcon
        closable
      />
      {apiResult?.result || isApiResultLoading ? (
        <div className="api-result w-full">
          {isApiResultLoading ? (
            <Spin>
              <span></span>
            </Spin>
          ) : null}

          <div className="api-res-header">
            <div className="title mb-4 text-sm font-medium text-gray-900">{I18N.ide.main.explorer.overview}</div>
            {/* {apiResult?.result || props.isApiResultLoading ? ( */}
            <div className="res-info mb-4 flex">
              <div className="item mx-1 mr-6 inline-block">
                <div className="debug-res flex">
                  <div
                    className={`codicon codicon-${
                      String(statusCode).startsWith("2")
                        ? "pass-filled success text-green-600"
                        : "error error-red text-red-700"
                    }`}
                  ></div>
                  <div className="value">
                    {String(statusCode).startsWith("2") ? I18N.ide.main.explorer.success : I18N.ide.main.explorer.error}
                  </div>
                </div>
              </div>
              {apiResult && statusCode ? (
                <div className="item mx-1 mr-6">
                  {/* {httpStatusMessageMap[statusCode] || statusCode} */}
                  <span className="label mr-1 font-medium text-gray-500">{I18N.ide.main.explorer.statusCode}</span>
                  <span
                    className={`value result-status font-medium ${
                      String(statusCode).startsWith("2") ? "success text-green-600" : "error error-red text-red-700"
                    }`}
                  >
                    {statusCode}
                  </span>
                </div>
              ) : null}
              {apiResult ? (
                <div className="item mx-1 mr-6">
                  <span className="label mr-1 font-medium">{I18N.ide.main.explorer.time}</span>
                  <span className="value">{apiResult.cost}ms</span>
                </div>
              ) : null}
            </div>
          </div>
          {!String(statusCode).startsWith("2") ? (
            <Alert
              type="error"
              message={
                <span>
                  {I18N.ide.main.explorer.callFailCheck}
                  <a
                    target="_blank"
                    href={`https://api.aliyun.com/troubleshoot?q=${troubleshootQuery}&product=${product}`}
                  >
                    {I18N.ide.main.explorer.troubleshootResult}
                  </a>
                </span>
              }
            ></Alert>
          ) : null}
          <div className="api-message">
            {!String(statusCode).startsWith("2") ? null : (
              <Alert
                type="info"
                message={
                  <span>
                    {I18N.ide.main.explorer.callHasIssues}
                    <a
                      target="_blank"
                      href={`https://api.aliyun.com/troubleshoot?q=${troubleshootQuery}&product=${product}`}
                    >
                      {I18N.ide.main.explorer.checkCallTroubleshoot}
                    </a>
                  </span>
                }
              ></Alert>
            )}
          </div>
          <div className="content">
            <Tab
              extra={
                <>
                  <Balloon
                    closable={false}
                    align="t"
                    trigger={
                      <Button
                        className="copy-button"
                        onClick={() => {
                          if (navigator.clipboard) {
                            navigator.clipboard.writeText(getTabValue(tab));
                            message.success("复制成功");
                          }
                        }}
                      >
                        <div className="codicon codicon-copy" />
                      </Button>
                    }
                  >
                    复制
                  </Balloon>
                  <Dropdown menu={{ items }}>
                    <Button onClick={(e) => e.preventDefault()}>
                      <div className="codicon codicon-list-selection" />
                    </Button>
                  </Dropdown>
                </>
              }
              onChange={(t: any) => setTab(t)}
            >
              {TAB_PANES.map((tab) => {
                return (
                  <Tab.Item key={tab.value} title={tab.text}>
                    <div key={tab.value} className="mt-6">
                      <div className="editor-container-box">
                        {!(tab.value === "preview" && noShowMonacoEditor.includes(apiResult?.format)) ? (
                          <Editor
                            height={"calc(100vh - 450px)"}
                            theme={getMonacoTheme(theme)}
                            options={{
                              readOnly: true,
                            }}
                            // theme='vs-dark'
                            language={
                              apiResult?.format === "xml"
                                ? currentFormat === "xml" && tab.value === "preview"
                                  ? EditorLanguages?.XML
                                  : EditorLanguages?.JSON
                                : EditorLanguages?.JSON
                            }
                            value={getTabValue(tab.value)}
                            // schema={getResponseSchema(statusCode, props.responseSchema) || {}}
                          />
                        ) : (
                          <div>{I18N.ide.main.explorer.specialresponsetip}</div>
                        )}
                      </div>
                    </div>
                  </Tab.Item>
                );
              })}
            </Tab>
          </div>
        </div>
      ) : (
        // isUploadApi ? null :
        <Empty
          image="https://img.alicdn.com/imgextra/i4/O1CN01y9bYu51GxbjB4Iv4a_!!6000000000689-2-tps-3200-2560.png"
          imageStyle={{
            width: 200,
            height: 160,
          }}
          description={
            <>
              <div>{I18N.ide.main.explorer.noResult}</div>
              <div>{I18N.ide.main.explorer.startCallResult}</div>
            </>
          }
        ></Empty>
      )}
    </div>
  );
};

TryAPI.defaultProps = new TryAPIProps();
