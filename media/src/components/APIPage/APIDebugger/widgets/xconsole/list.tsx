/**
 * @author 奇阳
 * @description
 */
// import { AmpIcon } from '@ali/amp-base';
// import { LinkButton } from '@alicloud/console-components-actions';
import * as React from 'react';
import './list.module.scss';
import { ListProps } from '../types';
import { Field } from '../../../../SemixFormRender/common/Field';
import { Button } from '@alicloud/console-components';

export class SimpleListProps extends ListProps {}

export const SimpleList: React.FC<SimpleListProps> = (props) => {
  const children = (props.displayList || []).map((value, index) => {
    return (
      <div className="list-item" key={index}>
        <div className="title-operator">
          {props.schema?.widget === 'typeSelect' ? null : (
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
        </div>
        <Field
          fieldName={props.fieldName ? props.fieldName + '.' + index : ''}
          key={index}
          isRequired={false}
          dataPath={props.dataPath ? props.dataPath + '.' + index : index + ''}
          schemaPath={props.schemaPath ? props.schemaPath + '.items' : '.items'}
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
            add
          </a>
        </div>
      </div>
    </div>
  );
};

SimpleList.defaultProps = new SimpleListProps();
