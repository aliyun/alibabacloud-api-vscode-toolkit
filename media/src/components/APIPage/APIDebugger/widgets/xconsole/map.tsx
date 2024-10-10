/**
 * @author yini-chen
 * @description workbench-map
 */
import { Input } from "@alicloud/console-components";
import * as React from "react";
import { getNextDataPath, immutableSet } from "../../../../SemixFormRender/utils";
import { MapProps } from "../types";
import { Field } from "../../../../SemixFormRender/common/Field";
import I18N from "../../../../../utils/I18N";

export class SimpleMapProps extends MapProps {}

export const SimpleMap: React.FC<SimpleMapProps> = (props) => {
  const [listKeys, changeListKeys] = React.useState((props.displayList || []).map(({ key }) => key));

  React.useEffect(() => {
    changeListKeys((props.displayList || []).map(({ key }) => key));
  }, [props.displayList]);

  const children = React.useMemo(() => {
    return (props.displayList || []).map(({ key, value }, index) => {
      const keyItem = (
        <>
          <Input
            style={{ width: 160 }}
            hasClear
            value={listKeys[index]}
            placeholder={I18N.ide.main.explorer.string}
            onChange={(newValue) => {
              changeListKeys(immutableSet(index, newValue, listKeys) as any);
            }}
            onBlur={() => {
              props.editItemKey(index, listKeys[index]);
            }}
          />
          <span style={{ float: "right" }}>
            {props.schema?.widget === "typeSelect" ? null : (
              <a
                href="javascript:;"
                className="op"
                onClick={() => {
                  props.copyItem(index);
                }}
              >
                copy
              </a>
            )}
            <a
              href="javascript:;"
              className="op"
              onClick={() => {
                props.deleteItem(index);
              }}
            >
              delete
            </a>
          </span>
        </>
      );
      const valueItem = (
        <div>
          <Field
            schema={props.schema as any}
            isRequired={false}
            key={key}
            dataPath={getNextDataPath(props.dataPath, key)}
          ></Field>
        </div>
      );

      return (
        <div className="list-item" key={index}>
          <span className="key-item">
            <div style={{ marginBottom: "8px" }}>
              {keyItem}
              <span className="sep" style={{ lineHeight: "30px" }}>
                {" "}
                :
              </span>
            </div>
            <div>{valueItem}</div>
          </span>
        </div>
      );
    });
  }, [props.displayList, listKeys]);
  return (
    <div className="alicloud-schema-form-list workbench-complex-type-item">
      <div className="child-list">
        {children}
        <div className="operators map">
          <a
            style={{ textDecoration: "none", cursor: "pointer" }}
            className="op"
            onClick={() => {
              props.addItem();
            }}
          >
            add
          </a>
        </div>
      </div>
    </div>
  );
};

SimpleMap.defaultProps = new SimpleMapProps();
