import { ResponseObject } from "oas-spec-ts/lib/oas2.0/swagger2.0";
import { PontJsonSchema } from "./dataType";

export class Parameter {
    schema: PontJsonSchema = new PontJsonSchema;
    name!: string;
    in: "query" | "body" | "path" | "formData" | "header" = "body";
    required: boolean = false;
    type:string
  }

export class PontAPI {
    consumes?: string[] = [];
    produces?: string[] = [];
    parameters?: Parameter[] = [];
    description?: string;
    responses!: {
        [key: string]: ResponseObject;
    };
    method!: string;
    name!: string;
    title?: string;
    summary?: string;
    path!: string;
    deprecated?: boolean;
    ext?: any;
    externalDocs?: {
      url?: string;
      description?: string;
    };
  }


  export class OpenAPIRequestResult {
    result = {} as any;
  
    cost = 200;
    format?: string;
  
    entry = {
      url: 'http://xx',
  
      request: {
        headers: {} as any,
      },
  
      response: {
        statusCode: 200,
        headers: {} as any,
      },
    };
  }

export class OpenAPIResponse {
  requestId : string;
  doc: string;
  response: OpenAPIRequestResult;
  type: string;
}

export class MakeCodeResponse {
  code: number;
  data: MakeCodeData;
}

export class MakeCodeData {
  demoSdk: any;
  apiInfo: APIInfo;
  cost:    number;
}

export class APIInfo {
  apiStyle:   string;
  product:    string;
  method:     string;
  apiVersion: Date;
  apiName:    string;
  regionId:   string;
}

