/**
 * @author 念依
 * @description string类型
 */
// import { SwapOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

// import { AmpIcon } from '@ali/amp-base';
// import { CommonWidgetProps } from '@ali/api-component';
import { Input } from '@alicloud/console-components';
import * as React from 'react';
// import APIParamGenerate from 'viteSrc/pages/designAwesome/APIDesign/QuickTest/APIParams/APIParamGenerate';
// import APIParamGenerate from '../APIParamGenerate';
import './string.module.scss';
import { CommonWidgetProps } from '../types';
// import { onGetRandomValue } from './utils';

export class StringProps extends CommonWidgetProps {}

export const String: React.FC<StringProps> = (props) => {
  const { schema, ...rest } = props;
  const [curvalue, setCurvalue] = React.useState('');
  const [isToTextArea, setIsToTextArea] = React.useState(false);

  React.useEffect(() => {
    if (props.value !== curvalue) {
      if (props.value && typeof props.value !== 'string') {
        setCurvalue(props.value + '');
        props.onChange(props.value + '');
      } else {
        setCurvalue(props.value);
      }
    }
  }, [props.value]);

  React.useEffect(() => {
    if (schema.constant && curvalue !== schema.constant) {
      setCurvalue(schema.constant);
    }
  }, [schema.constant]);

  const ref = React.useRef();
  const textareaRef = React.useRef();

  const changeCurValue = React.useCallback((val: any) => {
    const value = val === '' ? (undefined as any) : val;
    if (value) {
      setCurvalue(value);
    } else {
      props.onChange(undefined);
      setCurvalue(undefined);
    }
  }, []);

  const emitvalues = React.useCallback(() => {
    if (props.value === curvalue) {
      return;
    }
    props.onChange(curvalue);
  }, [curvalue]);

  const getNewTextareaValueAndPosition = (newValue: string) => {
    if (!ref || !ref.current || isToTextArea) return { value: newValue, position: newValue.length };
    if (!curvalue) return { value: newValue, position: newValue.length };
    try {
      // @ts-ignore
      const { selectionStart } = ref.current.input;
      const startV = curvalue.substring(0, selectionStart);
      const endV = curvalue.substring(selectionStart, curvalue.length);
      return {
        value: `${startV}${newValue}${endV}`,
        position: selectionStart + (newValue?.length || 0),
      };
    } catch (error) {
      return { value: newValue, position: newValue.length };
    }
  };

  let formItem = null;
  let inputType = 'input';

  if ((isToTextArea || (typeof curvalue === 'string' && curvalue.includes('\n'))) && props.schema?.type !== 'number') {
    inputType = 'textarea';
  }

  const placeholder = React.useMemo(() => {
    if (curvalue === '') {
      return '空字符串';
    } else if (props.schema?.format === 'int64' || props.schema?.format === 'double') {
      return '请输入数值';
    } else {
      return schema?.placeholder || '请输入字符串';
    }
  }, [curvalue, props.schema]);

  const errorMsg = React.useMemo(() => {
    if (props.schema?.format === 'int64' || props.schema?.format === 'double') {
      return !curvalue || Number(curvalue) || Number(curvalue) === 0 ? null : '请输入数值';
    }
    return null;
  }, [props.schema, curvalue]);

  switch (inputType) {
    case 'textarea':
      formItem = (
        <div className="generate-form-text-area">
          <Input.TextArea
            style={{ resize: 'none' }}
            ref={textareaRef}
            rows={3}
            value={curvalue}
            disabled={schema.disabled}
            onBlur={emitvalues}
            onChange={changeCurValue}
          />

          <Tooltip title="转换为 Input，转换后将丢失换行符">
            <span
              className="generate-form-text-area-icon"
              onClick={() => {
                setCurvalue((curvalue || '').replace(/\n/gi, ''));
                setIsToTextArea(false);
              }}
            >
              {/* <SwapOutlined translate={undefined} /> */}
              transfer
            </span>
          </Tooltip>
        </div>
      );
      break;
    default:
    case 'input':
      formItem = (
        <div className="input-area">
          <Input
            style={{ width: schema?.inputWidth || '100%' }}
            placeholder={placeholder}
            // innerAfter={
            //   curvalue || curvalue === '' ? (
            //     <AmpIcon
            //       className="close-mini"
            //       type="close2"
            //       size={20}
            //       onClick={() => changeCurValue(undefined)}
            //     ></AmpIcon>
            //   ) : null
            // }
            value={curvalue}
            onBlur={emitvalues}
            disabled={schema.disabled}
            onChange={changeCurValue}
            ref={ref}
            onPaste={(e) => {
              const v = e.clipboardData.getData('text');
              if (typeof v === 'string' && v.includes('\n')) {
                setIsToTextArea(true);
                e.preventDefault();
                const { value: newValue, position } = getNewTextareaValueAndPosition(v);
                setCurvalue(newValue);
                Promise.resolve().then(() => {
                  // @ts-ignore
                  textareaRef?.current?.resizableTextArea?.textArea?.focus();
                  // @ts-ignore
                  textareaRef?.current?.resizableTextArea?.textArea?.setSelectionRange(position, position);
                });
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setIsToTextArea(true);
                e.preventDefault();
                const { value: newValue, position } = getNewTextareaValueAndPosition('\n');
                setCurvalue(newValue);
                Promise.resolve().then(() => {
                  // @ts-ignore
                  textareaRef?.current?.resizableTextArea?.textArea?.focus();
                  // @ts-ignore
                  textareaRef?.current?.resizableTextArea?.textArea?.setSelectionRange(position, position);
                });
              }
            }}
          ></Input>
        </div>
      );
      break;
  }

  return (
    <div className="jsonschema-form-widget workbench-string-item">
      <div>{formItem}</div>
        <div style={{ color: 'red' }}>{errorMsg}</div>
    </div>
  );
};

String.defaultProps = new StringProps();
