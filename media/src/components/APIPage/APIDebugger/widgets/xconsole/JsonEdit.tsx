// /**
//  * @author 念依
//  * @description 表单 Json 编辑器
//  */

// import { WhiteMonacoEditor } from '@ali/amp-base';
// import { CommonWidgetProps } from '@ali/api-component';
// import * as React from 'react';

// export class JsonEditProps extends CommonWidgetProps {}

// export const JsonEdit: React.FC<JsonEditProps> = (props) => {
//   const [curval, setCurval] = React.useState('');
//   const [errMsg, setErrMsg] = React.useState('');
//   React.useEffect(() => {
//     setErrMsg('');
//     if (typeof props.value !== 'string') {
//       try {
//         const obj = JSON.stringify(props.value, null, 2);
//         setCurval(obj);
//       } catch {}
//     }
//   }, [props.value]);

//   return (
//     <div
//       className="jsonschema-form-widget"
//       style={{ width: '100%', minHeight: 200 }}
//       onBlur={() => {
//         try {
//           const val = JSON.parse(curval);
//           props.onChange(val);
//         } catch {
//           setErrMsg('json 格式错误');
//         }
//       }}
//     >
//       <WhiteMonacoEditor
//         code={curval || ''}
//         // disabled={false}
//         copable={false}
//         operators={null}
//         onCodeChange={(value) => {
//           setCurval(value);
//         }}
//       ></WhiteMonacoEditor>
//       {errMsg?.length ? <div style={{ color: 'red' }}>{errMsg}</div> : null}
//     </div>
//   );
// };

// JsonEdit.defaultProps = new JsonEditProps();
