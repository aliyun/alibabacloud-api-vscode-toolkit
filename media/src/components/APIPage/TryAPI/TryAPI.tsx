/**
 * @author nianyi
 * @description API 试用
 */

import _ from "lodash";
import { getIsUploadApi, parseXml } from "../../utils";
import React from "react";
import { Alert, Empty, Spin, message } from "antd";
import CopyToClipboard from "react-copy-to-clipboard";
import { Button, Tab } from "@alicloud/console-components";
import Editor from "@monaco-editor/react";
import I18N from "../../../utils/I18N";
import { APIResponse } from "../../../types/WorkbenchAPI";
import { EditorLanguages } from "../../../types/EditorLanguages";
import { OpenAPIRequestResult } from "../../../types/openAPI";
import { WorkbenchIcon } from "../../../Icon/Icon";
import { APIPageContext } from "../context";
import { apiResponse } from "../../../mocks/openApiResponse";

export class TryAPIProps {

}

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
  const { openAPIResponses, isApiResultLoading,version,apiMeta, product } = APIPageContext.useContainer();
  const doc = `${product}::${version}::${apiMeta.name}`
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

  const copyBtn = (tab) => (
    <CopyToClipboard
      style={{ marginLeft: "8px" }}
      text={getTabValue(tab.value)}
      onCopy={() => message.success(I18N.main.explorer.copySuccess)}
    >
      <Button>{I18N.main.explorer.copy}</Button>
    </CopyToClipboard>
  );

  const getResponseSchema = (statusCode, responseSchema) => {
    if (!statusCode || _.isEmpty(responseSchema)) {
      return {};
    }
    if (!responseSchema[statusCode]?.schema) {
      return responseSchema[200]?.schema || {};
    }
    return responseSchema[statusCode]?.schema || {};
  };

  return (
    <div className="comp-try-api">
      <Alert
        message={
          I18N.main.explorer.AKTip
        }
        type="warning"
        showIcon
        closable
      />
      {apiResult?.result || isApiResultLoading ? (
        <div className="api-result">
          {isApiResultLoading ? (
            <Spin>
              <span></span>
            </Spin>
          ) : null}

          <div className="api-res-header">
            <div className="title">{I18N.main.explorer.overview}</div>
            {/* {apiResult?.result || props.isApiResultLoading ? ( */}
            <div className="res-info">
              <div className="item">
                <span className="label">
                  <WorkbenchIcon type={String(statusCode).startsWith("2") ? "success" : "error"}></WorkbenchIcon>
                </span>
                <span className="value">
                  {String(statusCode).startsWith("2") ? I18N.main.explorer.success : I18N.main.explorer.error}
                </span>
              </div>
              {apiResult && statusCode ? (
                <div className="item">
                  {/* {httpStatusMessageMap[statusCode] || statusCode} */}
                  <span className="label">{I18N.main.explorer.statusCode}</span>
                  <span className={`value result-status  ${String(statusCode).startsWith("2") ? "success" : "error"}`}>
                    {statusCode}
                  </span>
                </div>
              ) : null}
              {apiResult ? (
                <div className="item">
                  <span className="label">{I18N.main.explorer.time}</span>
                  {/* <span className="value">{apiResult.cost}ms</span> */}
                </div>
              ) : null}
            </div>
          </div>
          {!String(statusCode).startsWith("2") ? (
            <Alert
              type="error"
              message={
                <span>
                  {I18N.main.explorer.callFailCheck}
                  <a
                    target="_blank"
                    href={`https://api.aliyun.com/troubleshoot?q=${troubleshootQuery}&product=${product}`}
                  >
                    {I18N.main.explorer.troubleshootResult}
                  </a>
                </span>
              }
              style={{ marginTop: "16px", marginBottom: "-8px" }}
            ></Alert>
          ) : null}
          <div className="api-message">
            {!String(statusCode).startsWith("2") ? null : (
              <Alert
                type="info"
                message={
                  <span>
                    {I18N.main.explorer.callHasIssues}
                    <a
                      target="_blank"
                      href={`https://api.aliyun.com/troubleshoot?q=${troubleshootQuery}&product=${product}`}
                    >
                      {I18N.main.explorer.checkCallTroubleshoot}
                    </a>
                  </span>
                }
              ></Alert>
            )}
          </div>
          <div className="content">
            <Tab>
              {TAB_PANES.map((tab) => {
                return (
                  <Tab.Item key={tab.value} title={tab.text}>
                    <div key={tab.value} style={{ marginTop: "24px" }}>
                      <div
                        className="editor-container-box"
                        style={{
                          height: "100%",
                        }}
                      >
                        {!(tab.value === "preview" && noShowMonacoEditor.includes(apiResult?.format)) ? (
                          <Editor
                            height={400}
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
                            // operators={
                            //   props?.apiResult?.format === 'xml' && tab.value === 'preview' ? (
                            //     <>
                            //       {currentFormat === 'xml' ? (
                            //         <Button type="default" onClick={() => setFormat('json')}>
                            //           {I18N.explorer.apiExplorer.formatJson}
                            //         </Button>
                            //       ) : (
                            //         <Button type="default" onClick={() => setFormat('xml')}>
                            //           {I18N.explorer.apiExplorer.formatXml}
                            //         </Button>
                            //       )}
                            //       {copyBtn(tab)}
                            //     </>
                            //   ) : (
                            //     <CopyToClipboard
                            //       text={getTabValue(tab.value)}
                            //       onCopy={() => {
                            //         message.success(I18N.main.explorer.copySucc);
                            //       }}
                            //     >
                            //       <Button className="try-api-copy-button">
                            //         <WorkbenchIcon type="copy-line"></WorkbenchIcon>
                            //       </Button>
                            //     </CopyToClipboard>
                            //   )
                            // }
                          />
                        ) : (
                          <div>{I18N.main.explorer.specialresponsetip}</div>
                          //   <OnlineTrialResult
                          //     value={getTabValue(tab.value) as any as string[]}
                          //     format={props?.apiResult?.format}
                          //   />
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
              <div>{I18N.main.explorer.noResult}</div>
              <div>{I18N.main.explorer.startCallResult}</div>
            </>
          }
        ></Empty>
      )}
    </div>
  );
};

TryAPI.defaultProps = new TryAPIProps();
