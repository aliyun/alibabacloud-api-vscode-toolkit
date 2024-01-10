/**
 * @author yini-chen
 * @description 数据结构
 */
// import { AmpIcon } from '@ali/amp-base';
// import { CommonWidgetProps } from '@ali/api-component';
// import { LinkButton } from '@alicloud/console-components-actions';
import React from 'react';
import { CommonWidgetProps } from '../types';
// import { addParamStruct } from './utils';
// import { addParamStruct } from '../utils';

export class StructProps extends CommonWidgetProps {
  onChange: (value: any) => void;
  schemaPath: string;
}

export const Struct: React.FC<StructProps> = (props) => {
  if (props.value) {
    if (typeof props.value === 'string') {
      let value = props.value;
      try {
        value = JSON.parse(props.value);
      } catch {}
      props.onChange(value);
    }
    // addParamStruct(props.schemaPath, props.schema);
  }
  return (
    <div style={{ marginBottom: '16px' }}>
      <a
        // href="javascript:;"
        style={{ textDecoration: 'none' }}
        className="op"
        onClick={() => {
          // addParamStruct(props.schemaPath, props.schema);
        }}
      >
        <div className='codicon codicon-add' style={{ marginRight: '5px', marginTop: '1px' }}></div>
        添加数据结构
      </a>
    </div>
  );
};

Struct.defaultProps = new StructProps();
