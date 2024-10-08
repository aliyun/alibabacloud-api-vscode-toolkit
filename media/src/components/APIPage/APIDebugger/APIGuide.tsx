/**
 * @author yini-chen
 * @description 参数Title
 */
import { Balloon, Tag } from "@alicloud/console-components";
import React from "react";
import { SemixMarkdown } from "semix-schema-table";
import I18N from "../../../utils/I18N";

export class APIGuideProps {
  schema?: any;
  isRequired?: boolean;
  fieldName?: string;
  dataPath?: string;
  collapsed?: boolean;
  setCollapsed?: (collapsed: boolean) => void;
  deleteHeader?: Function;
  changeValue?: (dataPath: string, value: string | number | boolean) => void;
  // titleOperator?: any;
  product: string;
  version: string;
}

export const APIGuide = React.memo((props: APIGuideProps) => {
  const description = props.schema?.description || props.schema?.title;

  const getShortName = (des: string) => {
    const endIndex = Math.min(
      ...["，", "\n", "。"].map((ch) => des.indexOf(ch)).map((num) => (num === -1 ? Number.MAX_VALUE : num)),
    );
    let shortName = des;

    if (endIndex !== -1) {
      shortName = des.slice(0, endIndex);
    }

    if (shortName.startsWith("<props")) {
      const repalceStrs = shortName.match(/\<(.+?)\>/g) || [];
      repalceStrs?.map((str) => {
        shortName = shortName.replace(str, "");
      });
    }

    if (shortName.length > 19) {
      return `${shortName.slice(0, 16)}...`;
    }
    return shortName;
  };
  const shortDesc = /[0-9]+$/.test(props.fieldName) ? "" : getShortName(description || "");

  let hasCollapsedIcon = ["object", "array"].includes(props.schema.type as any);
  if (props.schema?.type === "array" && ["string", "number", "integer"].includes(props.schema?.items?.type as any)) {
    hasCollapsedIcon = false;
  }

  const hasHelpTip = !!(
    description?.length > shortDesc.length ||
    props.schema?.example ||
    props.schema?.maximum ||
    props.schema?.minimum ||
    props.schema?.enum?.length ||
    props.schema?.pattern ||
    props.schema?.format
  );

  const paramTitle = /[0-9]+$/.test(props.fieldName)
    ? props.fieldName.substring(props.fieldName.lastIndexOf(".") + 1, props.fieldName.length)
    : props.fieldName;

  if (!paramTitle?.length) {
    return null;
  }

  return (
    <div className="api-debugger-guide-wrapper">
      {!props.schema?.isRoot ? (
        <div className="guide" style={{ display: "flex" }}>
          {hasCollapsedIcon ? (
            <div
              className="right-outlined"
              onClick={() => {
                props.setCollapsed(!props.collapsed);
              }}
              style={{ marginRight: 8, paddingTop: 2 }}
            >
              {props.collapsed ? (
                <div className="codicon codicon-chevron-right"></div>
              ) : (
                <div className="codicon codicon-chevron-down"></div>
              )}
            </div>
          ) : null}
          <div className="api-title" style={{ marginBottom: "8px" }}>
            <div className="api-title-left">
              {props.isRequired ? <span className="must"></span> : null}
              <span className="name">{paramTitle}</span>
              <span className="guide-info" style={{ whiteSpace: "pre" }}>
                {hasHelpTip && shortDesc?.length ? (
                  <span className="desc-box">
                    <span className="desc">{shortDesc}</span>
                    <Balloon
                      align="r"
                      triggerType="hover"
                      style={{ width: 500 }}
                      closable={false}
                      trigger={
                        <span style={{ lineHeight: "24px" }}>
                          <div className="codicon codicon-question !text-sm text-gray-500"></div>
                        </span>
                      }
                    >
                      <div className="api-debugger-param-desc !text-xs">
                        <span className="config-title-desc text-gray-500">{I18N.ide.main.explorer.description}</span>
                        <div className="!text-xs">
                          <SemixMarkdown source={description}></SemixMarkdown>
                        </div>
                        {props.schema?.example ? (
                          <>
                            <div className="config-title mt-2 text-gray-500">
                              <span>{I18N.ide.main.explorer.sampleValue}</span>
                            </div>

                            <div className="config-content">{props.schema?.example}</div>
                          </>
                        ) : null}
                        {props.schema?.maximum ? (
                          <>
                            <div className="config-title mt-2 text-gray-500">{I18N.ide.main.common.maximum}</div>
                            <div className="config-content">{props.schema?.maximum}</div>
                          </>
                        ) : null}
                        {props.schema?.minimum ? (
                          <>
                            <div className="config-title mt-2 text-gray-500">{I18N.ide.main.common.minimum}</div>
                            <div className="config-content">{props.schema?.minimum}</div>
                          </>
                        ) : null}
                        {props.schema?.format ? (
                          <>
                            <div className="config-title mt-2 text-gray-500">{I18N.ide.main.common.format}</div>
                            <div className="config-content">{props.schema?.format}</div>
                          </>
                        ) : null}
                        {props.schema?.enum?.length ? (
                          <>
                            <div className="config-title mt-2 text-gray-500">{I18N.ide.main.common.enum}</div>
                            {props.schema?.enum?.map((item) => (
                              <Tag size="small" type="normal" style={{ marginRight: "4px", borderRadius: "2px" }}>
                                {item.value || item}
                              </Tag>
                            ))}
                          </>
                        ) : null}
                        {props.schema?.pattern ? (
                          <>
                            <div className="config-title mt-2 text-gray-500">{I18N.ide.main.common.regular}</div>
                            <div className="config-content">{props.schema?.pattern}</div>
                          </>
                        ) : null}
                      </div>
                    </Balloon>
                  </span>
                ) : null}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
});
