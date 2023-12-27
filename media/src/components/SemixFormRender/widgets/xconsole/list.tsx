/**
 * @author 奇阳
 * @description
 */
import * as React from "react";
import { CommonWidgetProps, ListProps } from "../../type";
// import "./list.scss";
import { Icon, Button } from "@alicloud/console-components";
import { Field } from "../../common/Field";

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
              <Icon type="copy" />
            </a>
          )}
          <a
            href="javascript:;"
            className="op"
            onClick={() => {
              props.deleteItem(index);
            }}
          >
            <Icon type="delete" />
          </a>
        </div>
        <Field
          fieldName={props.fieldName ? props.fieldName + "." + index : ""}
          key={index}
          isRequired={false}
          dataPath={props.dataPath ? props.dataPath + "." + index : index + ""}
          schemaPath={props.schemaPath ? props.schemaPath + ".items" : ".items"}
          schema={props.schema}
        />
      </div>
    );
  });
  return (
    <div className="semix-form-list">
      <div className="child-list">
        {children}
        <div className="operators">
          <Button
            size="small"
            // href="javascript:;"
            style={{ textDecoration: "none" }}
            className="op"
            onClick={() => {
              props.addItem();
            }}
          >
            <Icon type="plus" style={{ marginRight: "5px", marginTop: "1px" }} />
            添加
          </Button>
        </div>
      </div>
    </div>
  );
};

SimpleList.defaultProps = new SimpleListProps();
