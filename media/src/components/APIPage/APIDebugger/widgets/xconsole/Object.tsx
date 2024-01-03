/**
 * @author 念依
 * @description object，object回填value可能为string
 */
import * as _ from 'lodash';
import * as React from 'react';
import { AlicloudUISchema } from '../types';
import { FormStoreContext } from '../../../../SemixFormRender/context';
import { Field } from '../../../../SemixFormRender/common/Field';
import { getNextDataPath } from '../../../../SemixFormRender/utils';
import { getNextSchemaPath } from './utils';

export class RenderObjectProps {
  schema: AlicloudUISchema;
  dataPath: string;
  schemaPath: string;
  value: any;
  onChange: (value: any) => void;
}

export const RenderObject: React.FC<RenderObjectProps> = (props) => {
  console.log(props.dataPath)
  if (props.value && typeof props.value === 'string') {
    let value = {};
    try {
      const tmpValue = JSON.parse(props.value);
      if (typeof tmpValue === 'object') {
        value = tmpValue;
      }
    } catch {}
    props.onChange(value);
  }
  const [groupCollapsed, setGroupCollapsed] = React.useState({} as { [x: string]: boolean });
  const store = FormStoreContext.useContainer();

  return React.useMemo(() => {
    if (props.schema?.properties) {
      const propItems = Object.keys((props.schema?.properties as any) || {}).map((key) => {
        return { key, schema: props.schema?.properties[key] };
      });
      const propItemsGroups = _.groupBy(propItems, (item) => {
        return item.schema?.group || '';
      });
      const renderField = (key: string) => {
        return (
          <Field
            fieldName={key}
            key={key}
            isRequired={props.schema.required ? props.schema.required?.includes(key)! : false}
            dataPath={getNextDataPath(props.dataPath, key)}
            schemaPath={getNextSchemaPath(props.schemaPath, key)}
            schema={props.schema?.properties?.[key]!}
          />
        );
      };
      const noGroupPropItems = (propItemsGroups?.[''] || []).map((item) => {
        return renderField(item?.key);
      });
      const groups = _.map(propItemsGroups, (items, groupKey) => {
        if (groupKey) {
          const titleProps = {
            key: groupKey,
            index: items?.[0]?.schema?.groupIndex,
            collapsed: groupCollapsed[groupKey],
            setCollapsed: (newCollapsed: boolean) =>
              setGroupCollapsed((boolMap) => {
                return {
                  ...boolMap,
                  [groupKey]: newCollapsed,
                };
              }),
          };
          const title = store.renderGroupArea?.(titleProps) || <div className="area-title">{groupKey}</div>;

          return {
            dom: (
              <div className="group-area" key={groupKey}>
                {title}
                {groupCollapsed[groupKey] ? null : (
                  <div className="area-content">{(items || []).map((item) => renderField(item?.key))}</div>
                )}
              </div>
            ),
            index: items?.[0]?.schema?.groupIndex,
          };
        }
        return null;
      }).filter((id) => id);

      const result = [
        ...groups,
        {
          dom: noGroupPropItems,
          index: 0,
        },
      ]
        .sort((pre, next) => pre.index - next.index)
        .map((item) => {
          return item.dom;
        });

      return (
        <div className={`alicloud-schema-form-object${props.dataPath?.length? "" : "-root"}`}>
          <div className="child-list">{result}</div>
        </div>
      );
    }
    return null;
  }, [groupCollapsed, props.schema, props.dataPath]);
};

RenderObject.defaultProps = new RenderObjectProps();
