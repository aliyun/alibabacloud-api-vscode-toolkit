/**
 * @author yini-chen
 * @description 上传文件
 */

import * as React from "react";
import { CommonWidgetProps } from "../types";
import { APIPageContext } from "../../../context";
import I18N from "../../../../../utils/I18N";
// import { CommonWidgetProps } from '@ali/api-component';
// import { useLocation } from 'react-router-dom';

export class UploadFileProps extends CommonWidgetProps {
  onChange: (value: any) => void;
}

export const UploadFile: React.FC<UploadFileProps> = (props) => {
  const [isUpload, changeIsUpload] = React.useState(false);
  const { apiMeta } = APIPageContext.useContainer();
  const [fileInfo, setFileInfo] = React.useState({ fileName: "", mime: "" } as FileInfo);

  type FileInfo = {
    fileName: string;
    mime: string;
  };

  const getUploadPath = (product: string, version: string, apiName: string, fileInfo: FileInfo) => {
    let path = `/api/auth/product/oss/file`;
    if (props.schema?.isFileTransferUrl) {
      path = `/api/auth/product/oss/file?product=${product}&apiName=${apiName}&apiVersion=${version}&name=${fileInfo.fileName}&mime=${fileInfo.mime}`;
    }
    return path;
  };

  return (
    <div>
      {I18N.xconsole.UploadFile.notSupportDebug}
      <a href={apiMeta?.externalDocs?.url} target="_blank">
        {I18N.xconsole.UploadFile.explorerWebsite}
      </a>
      {I18N.xconsole.UploadFile.processDebug}
    </div>
    // <Upload
    //   className="jsonschema-form-widget"
    //   action={getUploadPath(product, version, apiName, fileInfo)}
    //   onChange={(val: any) => {
    //     if (val?.file?.status === 'done') {
    //       props.onChange(val?.file?.response?.tmpId || '');
    //     }
    //   }}
    //   onRemove={() => {
    //     changeIsUpload(false);
    //     props.onChange('');
    //   }}
    //   maxCount={1}
    //   beforeUpload={(file) => {
    //     console.log(file)
    //     if (file.size > 52428800) {
    //       message.error('暂不支持上传超过50M的文件哦!');
    //       return Upload.LIST_IGNORE;
    //     }
    //     const nameArr = file?.name?.split('.');
    //     const mime = Array.isArray(nameArr) ? nameArr[nameArr.length - 1] : '';
    //     const fileName = file?.name?.replace('.' + mime, '');
    //     setFileInfo({ fileName: fileName, mime: mime });
    //     return true;
    //   }}
    // >
    //   <Button
    //     className="workbench-upload-btn"
    //     style={{ width: '250px', color: 'rgba(0,0,0,.3)' }}
    //     icon={<UploadOutlined translate={undefined} />}
    //   >
    //     {isUpload ? '重新上传' : '点击上传'}
    //   </Button>
    // </Upload>
  );
};

UploadFile.defaultProps = new UploadFileProps();
