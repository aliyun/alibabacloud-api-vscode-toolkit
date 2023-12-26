import _ from "lodash";
import { APIResponse } from "../types/WorkbenchAPI";
import { Parser } from 'xml2js';

export const getRefSchema = (schemas: any) => ($ref: string) => {
  const schemaName = $ref.split("/").pop();
  const schema = schemaName ? schemas?.[schemaName] : {};
  if (schema) {
    return schema;
  }
  return null;
};

export function getIsUploadApi(response: APIResponse | APIResponse[]) {
  return ((_.isArray(response) ? response : response) as any)?.type === 'Binary';
}

export const parseXml = (body: string): any => {
  let parser = new Parser({ explicitArray: false });
  let result: { [key: string]: any } = {};
  parser.parseString(body, function (err: any, output: any) {
    result.err = err;
    result.output = output;
  });
  if (result.err) {
    throw result.err;
  }
  return result.output;
};
