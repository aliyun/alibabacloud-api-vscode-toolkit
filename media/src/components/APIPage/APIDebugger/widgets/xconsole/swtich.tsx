/**
 * @author 念依
 * @description Switch
 */
import * as React from 'react';
// import { CommonWidgetProps } from '@ali/api-component';
import { Switch } from '@alicloud/console-components';
import { CommonWidgetProps } from '../types';

export class BooleanSwitchProps extends CommonWidgetProps {}

export const BooleanSwitch: React.FC<BooleanSwitchProps> = (props) => {
  const { schema, ...rest } = props;

  let switchDefault = props?.schema?.default;

  if (typeof switchDefault === 'string') {
    switchDefault = switchDefault === 'true';
  }

  return (
    <Switch
      className="jsonschema-form-widget switch"
      style={{width: '42px'}}
      checked={props?.value}
      size='small'
      checkedChildren={schema.checkedChildren || ''}
      unCheckedChildren={schema.unCheckedChildren || ''}
      onChange={(value) => {
        props.onChange(value);
      }}
    />
  );
};

BooleanSwitch.defaultProps = new BooleanSwitchProps();
