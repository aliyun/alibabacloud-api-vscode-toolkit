// /**
//  * @author yini-chen
//  * @description 文件上传方式选择组件
//  */

// import React from 'react';
// import { Switch } from '@alicloud/console-components';
// import { xconsoleWidgets } from '.';
// import { CommonWidgetProps } from '../types';

// export class FileUploadTypeProps extends CommonWidgetProps {
//   dataPath?: string;
// }

// export const FileUploadType: React.FC<FileUploadTypeProps> = (props) => {
//   const { dataPath, schema, onChange } = props;
//   const [isFile, changeIsFile] = React.useState(false);
//   const curvalue = props.value || '';

//   const handleTypeChange = React.useCallback((value: boolean) => {
//     changeIsFile(value);
//   }, []);

//   const getUIType = (isFile: boolean) => {
//     if (isFile) return 'file';
//     return 'string';
//   };
//   const getText = (isFIle: boolean) => {
//     return isFIle ? '输入URL' : '上传文件';
//   };
//   const UIType = getUIType(isFile);
//   const text = getText(isFile);

//   // 变化的参数组件，默认为字符串
//   const ParamUI = React.useMemo(() => {
//     return ampWidgets[UIType] || ampWidgets['string'];
//   }, [UIType]);

//   return (
//     <div style={{ marginBottom: '10px' }}>
//       <Switch
//         onChange={(value) => {
//           handleTypeChange(value);
//         }}
//       />
//       <span style={{ marginLeft: '5px' }}>{text}</span>
//       <div style={{ marginTop: '10px' }}>
//         <ParamUI schema={schema} onChange={onChange} dataPath={dataPath} value={curvalue}></ParamUI>
//       </div>
//     </div>
//   );
// };

// FileUploadType.defaultProps = new FileUploadTypeProps();
