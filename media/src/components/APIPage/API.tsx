/**
 * @author yini-chen
 * @description
 */
import { Tab, Tag } from "@alicloud/console-components";
import { Segmented, notification } from "antd";
import _ from "lodash";
import * as PontSpec from "pontx-spec";
import * as React from "react";
import { useResizeObserver } from "react-use-observer";
import { SemixJsonSchema } from "semix-core";
import { InnerSchemaTable, RootContext, SemixMarkdown } from "semix-schema-table";
import "styled-components";
import { SemixForm } from "../SemixFormRender";
import { getRefSchema } from "../utils";
import APIDebugger from "./APIDebugger/APIDebugger";
import { getCustomWidget } from "./APIDebugger/utils";
import { ApiParamsDoc } from "./APIDocument/ApiParamsDoc";
import { TryAPI } from "./TryAPI/TryAPI";
import TrySDK from "./TrySDK/TrySDK";
import { APIPageContext } from "./context";
import { PontUIService } from "../../service/UIService";
import ApiResponseDoc from "./APIDocument/ApiResponseDoc";
import Searcher from "../common/Searcher";
import I18N from "../../utils/I18N";
import { TableI18N } from "../../utils/utils";

export class APIProps {
  selectedApi?: PontSpec.PontAPI;
  product: string;
  version: string;
  definitions = {} as PontSpec.ObjectMap<PontSpec.PontJsonSchema>;
  onStructClick(struct: { type: string; name: string; spec: any }) {}
  renderMore?(): React.ReactNode {
    return null;
  }
}

export const API: React.FC<APIProps> = (props) => {
  const { selectedApi, definitions } = props;
  const [mode, changeMode] = React.useState("doc" as any);

  const getSchema = React.useCallback(
    ($ref: any) => {
      return getRefSchema(definitions)($ref);
    },
    [definitions],
  );

  const initValue = React.useMemo(() => {
    return {
      schemas: definitions as any,
      I18N: new TableI18N(),
      getRefSchema: getSchema,
      renderTypeColAppendix: (node: any) => {
        if (node?.nodeValue?.schema.in) {
          return (
            <div
              className="in"
              style={{
                color: "gray",
                fontFamily: "monospace",
                fontSize: 12,
                fontStyle: "italic",
                fontWeight: 600,
              }}
            >
              ({node.nodeValue?.schema.in})
            </div>
          );
        }
        return null;
      },
      renderEmpty: () => {
        return (
          <tr>
            <td colSpan={2} style={{ padding: "15px 0", textAlign: "center" }}>
              {I18N.ide.main.common.noOutputParameterDefinition}
            </td>
          </tr>
        );
      },
    };
  }, [definitions, getSchema]);

  const mapSchema = (schema) => {
    return SemixJsonSchema.mapSchema(schema as any, (schema) => {
      if (schema?.properties) {
        Object.keys(schema.properties)?.map((item) => {
          schema.properties[item] = mapSchema(schema.properties[item]);
        });
      }
      if (schema?.$ref) {
        schema = getSchema(schema?.$ref);
        schema = mapSchema(schema);
        return schema;
      }
      return schema;
    });
  };

  const pathEle = selectedApi?.path ? <div className="path">{selectedApi.path}</div> : null;
  const apiNameEle = selectedApi?.name ? <span>{selectedApi?.name}</span> : null;
  let paramsSchema = _.cloneDeep(selectedApi?.parameters);
  const newParamsSchema = paramsSchema?.reduce(
    (result, param) => {
      param.schema = mapSchema(param.schema);
      return {
        ...result,
        properties: {
          ...result.properties,
          [param.name]: param.schema,
        },
      };
    },
    { type: "object", properties: {}, isRoot: true },
  );

  const form = SemixForm.useForm({
    formData: {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schema: newParamsSchema as any,
    context: {},
    getCustomWidget: getCustomWidget,
  });

  const tabs = [
    { tab: I18N.ide.main.home.document, key: "doc" },
    { tab: I18N.ide.main.explorer.debug, key: "debug" },
    { tab: I18N.ide.main.common.codeSample, key: "sdk" },
  ];

  const [pageEl, resizeObserverEntry] = useResizeObserver();

  const [boxWidth, setBoxWidth] = React.useState(0);
  const [isExpand, setIsExpand] = React.useState(true);

  const renderContent = React.useMemo(() => {
    const documentComp = (
      <div>
        {selectedApi?.description && selectedApi?.description !== selectedApi?.summary ? (
          <div className="mb-4 bg-[var(--vscode-editor-background)] p-4">
            <SemixMarkdown source={selectedApi?.description} />
          </div>
        ) : null}
        <div className="mb-4 bg-[var(--vscode-editor-background)]">
          <div className="border-t border-gray-100 px-5 py-4 text-base font-medium text-[var(--vscode-foreground)]">
            {I18N.ide.main.explorer.requestParameter}
          </div>
          <ApiParamsDoc parameters={selectedApi?.parameters} apiName={selectedApi?.name} schemas={definitions as any} />
        </div>
        <div className="mb-4 bg-[var(--vscode-editor-background)]">
          <div className="border-t border-gray-100 px-5 py-4 text-base font-medium text-[var(--vscode-foreground)]">
            {I18N.ide.main.explorer.response}
          </div>
          <ApiResponseDoc selectedApi={selectedApi}></ApiResponseDoc>
        </div>
        {props.renderMore?.()}
      </div>
    );
    const debugComp = (
      <div className="debugComp flex h-[calc(100vh_-_140px)] overflow-y-hidden overflow-x-scroll bg-[var(--vscode-editor-background)]">
        <div className={`expand-arrow ${isExpand ? "" : "!left-1"}`} onClick={() => setIsExpand(!isExpand)}>
          {isExpand ? (
            <div className="codicon codicon-chevron-left relative right-0.5 top-6"></div>
          ) : (
            <div className="codicon codicon-chevron-right relative right-0.5 top-6"></div>
          )}
        </div>
        {isExpand && <div className="w-[25rem]">{isExpand && <APIDebugger></APIDebugger>}</div>}
        <div className="w-full">
          <Tab
            activeKey={mode}
            onChange={(key) => {
              changeMode(key);
            }}
          >
            <Tab.Item key="debug-doc" title={I18N.ide.main.notFound.APIDoc}>
              <div className="grid h-[calc(100vh_-_177px)] w-full bg-[var(--vscode-editor-background)]">
                <div className="scrollbar-custom overflow-scroll">{documentComp}</div>
              </div>
            </Tab.Item>
            <Tab.Item key="sdk" title={I18N.ide.main.common.codeSample}>
              <div className="content">
                <TrySDK isExpand={isExpand}></TrySDK>
              </div>
            </Tab.Item>
            <Tab.Item key="debug" title={I18N.ide.main.common.debugResult}>
              <div className="content">
                <TryAPI></TryAPI>
              </div>
            </Tab.Item>
          </Tab>
          {/* {renderTabContent()} */}
        </div>
      </div>
    );
    switch (mode) {
      case "doc":
        return documentComp;
      case "debug":
        return debugComp;
      case "sdk":
        return debugComp;
      default:
        return debugComp;
    }
  }, [mode, boxWidth, isExpand]);

  const openNotification = () => {
    notification.open({
      message: I18N.ide.main.common.experienceResearch,
      duration: null,
      description: (
        <span>
          {I18N.ide.main.common.noSatisfiedToClick}
          <a href="https://g.alicdn.com/aes/tracker-survey-preview/0.0.13/survey.html?pid=fePxMy&id=3486">
            {I18N.ide.main.common.experienceQuestionnaire}
          </a>
          {I18N.ide.main.common.feedbackIsImportant}
        </span>
      ),
      onClose: () => {
        PontUIService.updateQuestionnaireExpiration(14);
      },
    });
  };

  React.useEffect(() => {
    PontUIService.getNoticeFlag().then((res) => {
      if (res === true) {
        openNotification();
      }
    });
  }, []);

  const contentRef = React.useRef(null);

  const [isSearchVisible, setIsSearchVisible] = React.useState(false);

  const handleKeyDown = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "f") {
      setIsSearchVisible((prev) => !prev); // 切换 DOM 可见性
      const input = document.getElementById("page-search-input");
      input.focus();
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    // 清除事件监听器
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <Searcher
        contentRef={contentRef}
        isVisible={isSearchVisible}
        setIsVisible={setIsSearchVisible}
        mode={mode}
      ></Searcher>
      <div className="bg-[var(--vscode-editorWidget-background)] pb-4" ref={contentRef}>
        <APIPageContext.Provider
          initialState={{
            apiMeta: selectedApi,
            schemaForm: form,
            product: props.product,
            version: props.version,
            mode: mode,
            changeMode: changeMode,
          }}
        >
          <RootContext.Provider initialState={initValue}>
            {selectedApi ? (
              <>
                <div className="bg-[var(--vscode-editor-background)] p-4">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex">
                        {/* {selectedApi.method ? (
                        <div className="h-6 w-16 rounded-sm border-2 border-solid border-emerald-100 bg-emerald-100 text-center text-base font-medium leading-5 text-teal-500 ">
                          {selectedApi.method?.toUpperCase()}
                        </div>
                      ) : null} */}
                        {selectedApi.deprecated ? (
                          <Tag className="my-auto ml-2" color="var(--vscode-textSeparator-foreground)">
                            <span className="text-[$primary-2-font-color]">deprecated</span>
                          </Tag>
                        ) : null}
                        <div className="my-auto ml-2 text-base font-medium text-[var(--vscode-editorWidget-foreground)]">
                          {apiNameEle}
                          {selectedApi?.title ? <span> - {selectedApi.title}</span> : null}
                        </div>
                      </div>
                      {selectedApi?.summary ? (
                        <div
                          className="ml-2 py-2 text-sm font-normal text-[$primary-2-font-color] opacity-70"
                          style={{ width: "100%" }}
                        >
                          {selectedApi?.summary}
                        </div>
                      ) : null}
                    </div>
                    <div className="my-auto">
                      <Segmented
                        className="document-segmented"
                        value={mode}
                        onChange={(val) => changeMode(val)}
                        options={tabs.map((teb) => {
                          return {
                            label: teb.tab,
                            value: teb.key,
                          };
                        })}
                      ></Segmented>
                    </div>
                  </div>
                </div>
                <div className="m-4">{renderContent}</div>
              </>
            ) : null}
          </RootContext.Provider>
        </APIPageContext.Provider>
      </div>
    </div>
  );
};

API.defaultProps = new APIProps();
