/**
 * @author jasonHzq
 * @description
 */
import * as React from "react";
import * as PontSpec from "pontx-spec";
import { Tab, Button, Tag } from "@alicloud/console-components";
import { ApiParamsDoc } from "./APIDocument/ApiParamsDoc";
import { getRefSchema } from "../utils";
import "styled-components";
import { RootContext } from "semix-schema-table";
import { SemixMarkdown } from "semix-schema-table";
import { InnerSchemaTable } from "semix-schema-table";
import { getCustomWidget } from "./APIDebugger/utils";
import { APIPageContext } from "./context";
import APIDebugger from "./APIDebugger/APIDebugger";
import { SemixForm } from "../SemixFormRender";
import { TryAPI } from "./TryAPI/TryAPI";
import TrySDK from "./TrySDK/TrySDK";
import { Dropdown, MenuProps } from "antd";
import { PontUIService } from "../../service/UIService";
import { getVSCode } from "../../utils/utils";
import { SemixJsonSchema } from "semix-core";
import _ from "lodash";
import { useResizeObserver } from 'react-use-observer';

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
    return SemixJsonSchema.mapSchema(schema as any, (schema)=>{
      if(schema?.$ref){
        schema = getSchema(schema?.$ref)
        if(schema?.properties){
          Object.keys(schema.properties)?.map((item=>{
            schema.properties[item] = mapSchema(schema.properties[item])
          }))
        }
        return schema;
      }
      return schema
    })
  };

  const pathEle = selectedApi?.path ? <div className="path">{selectedApi.path}</div> : null;
  const apiNameEle = selectedApi?.name ? <div className="title">{selectedApi?.name}</div> : null;
  let paramsSchema = _.cloneDeep(selectedApi?.parameters);
  const newParamsSchema = paramsSchema?.reduce(
    (result, param) => {
      if(param.schema?.$ref){
        param.schema = getSchema(param.schema?.$ref)
        param.schema = mapSchema(param.schema)
      }
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
    { tab: "调试结果", key: "debug" },
    { tab: "代码示例", key: "sdk" },
  ];

  const [pageEl, resizeObserverEntry] = useResizeObserver();

  const [boxWidth, setBoxWidth] = React.useState(0);
  React.useEffect(() => {
    const { width = 0, height = 0 } = resizeObserverEntry?.contentRect || {};
    if (width !== boxWidth) {
      setBoxWidth(width);
    }
  }, [boxWidth, resizeObserverEntry]);

  const renderContent = React.useMemo(() => {
    const documentComp = (
      <div className="content">
        {selectedApi?.description ? (
          <div className="mod desc-mod">
            <SemixMarkdown source={selectedApi?.description} />
          </div>
        ) : null}
        <div className="mod">
          <div className="mod-title">入参</div>
          <ApiParamsDoc parameters={selectedApi?.parameters} apiName={selectedApi?.name} schemas={definitions as any} />
        </div>
        <div className="mod">
          <div className="mod-title">出参</div>
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
        {props.renderMore?.()}
      </div>
    );
    const debugComp = (
      <div className={ `debug-comp-content ${boxWidth<850 ? "debug-comp-content-column":""}`}>
        <div className={`left-panel ${boxWidth<850 ? "left-panel-column":""}`} style={{width: boxWidth < 850 ? boxWidth : 368}}>
          <APIDebugger></APIDebugger>
        </div>
        <div className="right-panel" style={{width: boxWidth < 850 ? boxWidth : boxWidth - 400}}>
          <Tab
            activeKey={mode}
            onChange={(key) => {
              changeMode(key);
            }}
          >
            <Tab.Item key="debug-doc" title="API 文档">
              {documentComp}
            </Tab.Item>
            <Tab.Item key="sdk" title="示例代码">
              <div className="content">
                <TrySDK></TrySDK>
              </div>
            </Tab.Item>
            <Tab.Item key="debug" title="调试">
              <div className="content">
                <TryAPI></TryAPI>
              </div>
            </Tab.Item>
          </Tab>
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
  }, [mode, boxWidth]);

  return (
    <div className="pontx-ui-api" ref={pageEl}>
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
              <div className={"header " + (selectedApi?.deprecated ? "deprecated" : "")}>
                <div className="heading">
                  <div className="left">
                    {selectedApi.method ? <div className="method">{selectedApi.method?.toUpperCase()}</div> : null}
                    {selectedApi.deprecated ? (
                      <Tag className="deprecated" style={{ marginRight: 12, color: "#888" }}>
                        deprecated
                      </Tag>
                    ) : null}
                    {pathEle || apiNameEle}
                    {selectedApi?.title ? <div className="desc"> - {selectedApi.title}</div> : null}
                  </div>
                  <div className="right">
                    {pathEle ? apiNameEle : null}
                    <Tab shape="capsule" activeKey={mode} onChange={(val) => changeMode(val)}>
                      {tabs.map((tab) => (
                        <Tab.Item title={tab.tab} key={tab.key}></Tab.Item>
                      ))}
                    </Tab>
                  </div>
                </div>
                {selectedApi?.summary ? (
                  <div className="footer">
                    <div className="summary-mod" style={{ width: "100%" }}>
                      {selectedApi?.summary}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="api-page-content">{renderContent}</div>
            </>
          ) : null}
        </RootContext.Provider>
      </APIPageContext.Provider>
    </div>
  );
};

API.defaultProps = new APIProps();
