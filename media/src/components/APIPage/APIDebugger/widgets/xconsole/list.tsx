/**
 * @author 奇阳
 * @description
 */
// import { AmpIcon } from '@ali/amp-base';
// import { LinkButton } from '@alicloud/console-components-actions';
import * as React from "react";
import { Field } from "../../../../SemixFormRender/common/Field";
import { ListProps } from "../types";
import "./list.module.scss";

export class SimpleListProps extends ListProps {}

export const SimpleList: React.FC<SimpleListProps> = (props) => {
  const children = (props.displayList || []).map((value, index) => {
    return (
      <div className="list-item" key={index}>
        <div className="title-operator">
          {props.schema?.widget === "typeSelect" ? null : (
            <a
              href="javascript:;"
              className="op"
              onClick={() => {
                props.copyItem(index);
              }}
            >
              <div className="codicon codicon-copy"></div>
            </a>
          )}
          <a
            href="javascript:;"
            className="op"
            onClick={() => {
              props.deleteItem(index);
            }}
          >
            <div className="codicon codicon-trash"></div>
          </a>
        </div>
        <Field
          fieldName={props.fieldName ? props.fieldName + "." + index : ""}
          key={index}
          isRequired={false}
          dataPath={props.dataPath ? props.dataPath + "." + index : index + ""}
          schemaPath={props.schemaPath ? props.schemaPath + ".items" : ".items"}
          schema={props.schema as any}
        />
      </div>
    );
  });
  return (
    <div className="alicloud-schema-form-list">
      <div className="child-list">
        {children}
        <div className="operators">
          <a
            href="javascript:;"
            className="op"
            onClick={() => {
              props.addItem();
            }}
          >
            <div className="codicon codicon-add m-1 !text-xs"></div>
            添加
          </a>
        </div>
      </div>
    </div>
  );
};

SimpleList.defaultProps = new SimpleListProps();
