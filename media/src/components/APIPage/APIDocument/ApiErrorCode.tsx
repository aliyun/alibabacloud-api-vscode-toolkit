/**
 * @author
 * @description
 */
import { Table } from "@alicloud/console-components";
import * as React from "react";
// import isEmpty from 'lodash/isEmpty'

export class ApiErrorCodeProps {
  errorCodes?: any;
  popcode = "";
  version = "";
}

export const ApiErrorCode: React.FC<ApiErrorCodeProps> = (props) => {
  const errorCodes = props?.errorCodes;

  return React.useMemo(() => {
    const dataSource = Object.entries(errorCodes || {})
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map((v) => ({
            ...v,
            httpCode: key,
          }));
        }
        return {
          ...(value as any),
          httpCode: key,
        };
      })
      .flat();

    const columns = [
      {
        title: "Http Status Code",
        dataIndex: "httpCode",
      },
      {
        title: "Error Code",
        dataIndex: "errorCode",
        cell: (
          value:
            | string
            | number
            | boolean
            | React.ReactElement<any, string | React.JSXElementConstructor<any>>
            | Iterable<React.ReactNode> // import isEmpty from 'lodash/isEmpty'
            | React.ReactPortal
            | null
            | undefined,
          index: any,
          record: any,
        ) => {
          return <div>{value}</div>;
        },
      },
      {
        title: "Error Message",
        dataIndex: "errorMessage",
        cell: (value: any, index: any, record: any) => {
          return (
            <span dangerouslySetInnerHTML={{ __html: value }} style={{ maxWidth: 450, display: "inline-block" }}></span>
          );
        },
      },
      {
        title: "操作",
        dataIndex: "op",
        width: 100,
        cell: (_: any, index: any, record: { errorCode: any }) => {
          return (
            <a
              target="_blank"
              href={`https://api.aliyun.com/troubleshoot?q=${record.errorCode}&product=${props.popcode}&version=${props.version}`}
            >
              去诊断
            </a>
          );
        },
      },
    ];

    const errorCodeTable = (
      <Table primaryKey="name" size="small" className="error-code-table" dataSource={dataSource} columns={columns} />
    );

    return (
      <div className="mb-4 bg-white">
        <div className="flex justify-between border-t border-gray-100 ">
          <div className="px-5 py-4 text-base font-medium">错误码</div>
          <div className="my-auto mr-4 text-sm">
            <a href={`https://api.aliyun.com/document/${props.popcode}/${props.version}/errorCode`} target="_blank">
              所有错误码
            </a>
          </div>
        </div>
        <div className="px-4 pb-4">{errorCodeTable}</div>
      </div>
    );
  }, [errorCodes, props.popcode, props.version]);
};

ApiErrorCode.defaultProps = new ApiErrorCodeProps();
