/**
 * @author yini-chen
 * @description
 */
import { Tab, Tag } from "@alicloud/console-components";
import { Segmented } from "antd";
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
              无出参定义
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
    { tab: "文档", key: "doc" },
    { tab: "调试", key: "debug" },
    { tab: "代码示例", key: "sdk" },
  ];

  const [pageEl, resizeObserverEntry] = useResizeObserver();

  const [boxWidth, setBoxWidth] = React.useState(0);
  const [isExpand, setIsExpand] = React.useState(true);
  // React.useEffect(() => {
  //   const { width = 0, height = 0 } = resizeObserverEntry?.contentRect || {};
  //   if (width !== boxWidth) {
  //     if (width < 650) {
  //       setIsExpand(false);
  //     }
  //     setBoxWidth(width);
  //   }
  // }, [boxWidth, resizeObserverEntry]);

  const renderContent = React.useMemo(() => {
    const documentComp = (
      <div>
        {selectedApi?.description ? (
          <div className="mb-4 bg-white p-4">
            <SemixMarkdown source={selectedApi?.description} />
          </div>
        ) : null}
        <div className="mb-4 bg-white">
          <div className="border-t border-gray-100 px-5 py-4 text-base font-medium">请求参数</div>
          <ApiParamsDoc parameters={selectedApi?.parameters} apiName={selectedApi?.name} schemas={definitions as any} />
        </div>
        <div className="mb-4 bg-white">
          <div className="border-t border-gray-100 px-5 py-4 text-base font-medium">出参</div>
          <div className="px-4 pb-4">
            <InnerSchemaTable
              name=""
              schema={selectedApi?.responses["200"]?.schema as any}
              renderEmpty={() => {
                return (
                  <tr>
                    <td
                      colSpan={2}
                      style={{
                        padding: "15px 0",
                        textAlign: "center",
                      }}
                    >
                      无出参定义
                    </td>
                  </tr>
                );
              }}
            />
          </div>
        </div>
        {props.renderMore?.()}
      </div>
    );
    const debugComp = (
      <div className="flex h-[calc(100vh_-_140px)] bg-white">
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
            <Tab.Item key="debug-doc" title="API 文档">
              <div className="grid h-[calc(100vh_-_177px)] w-full bg-white">
                <div className="overflow-scroll">{documentComp}</div>
              </div>
            </Tab.Item>
            <Tab.Item key="sdk" title="示例代码">
              <div className="content">
                <TrySDK isExpand={isExpand}></TrySDK>
              </div>
            </Tab.Item>
            <Tab.Item key="debug" title="调试结果">
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

  return (
    <div className="bg-gray-100 pb-4" ref={pageEl}>
      {/*  */}
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
              <div className="bg-white p-4">
                <div className="flex justify-between">
                  <div>
                    <div className="flex">
                      {/* {selectedApi.method ? (
                        <div className="h-6 w-16 rounded-sm border-2 border-solid border-emerald-100 bg-emerald-100 text-center text-base font-medium leading-5 text-teal-500 ">
                          {selectedApi.method?.toUpperCase()}
                        </div>
                      ) : null} */}
                      {selectedApi.deprecated ? (
                        <Tag className="my-auto ml-2">
                          <span className="text-gray-500">deprecated</span>
                        </Tag>
                      ) : null}
                      <div className="my-auto ml-2 text-base font-medium">
                        {apiNameEle}
                        {selectedApi?.title ? <span> - {selectedApi.title}</span> : null}
                      </div>
                    </div>
                    {selectedApi?.summary ? (
                      <div className="py-2 text-sm font-normal text-gray-500" style={{ width: "100%" }}>
                        {selectedApi?.summary}
                      </div>
                    ) : null}
                  </div>
                  <div className="my-auto">
                    <Segmented
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
  );
};

API.defaultProps = new APIProps();
