export declare class APIBo {
    id: number;
    body_style: string;
    formBody: boolean;
    product: string;
    name: string;
    version: string;
    parameter_type: string;
    params: string;
    method: string;
    protocol: string;
    path: string;
    response: string;
    timeout: number;
    hidden: number;
    resource_type_code: string;
    resource_type_title: string;
    createdAt: string;
    updatedAt: string;
    /** 一般为描述 */
    summary: string;
    /** 一般为注意事项 */
    description: string;
    /** 一般与 API 名相同 */
    title: string;
    response_demo?: string;
    response_headers?: string;
    responseHeadersDocs?: string;
    error_codes?: string;
    abc_id: number;
    record_version: string;
    request: string;
    responseDocs: string;
    content_html: string;
    bodyStyle: 'json';
    hostEnable: boolean;
}
export declare class APIParam {
    name: string;
    position: 'Query' | 'Body' | 'Host' | 'Path';
    required: boolean;
    visibility: 'Private' | 'Public' | 'cn' | 'jp' | 'intl';
    type: 'Integer' | 'String' | 'Long' | 'Boolean' | 'Double' | 'Float' | 'Json' | 'RepeatList' | 'Array' | 'Object' | 'Binary' | 'Map';
    style: 'json' | 'flat';
    keyType: 'Integer' | 'String' | 'Long' | 'Double' | 'Float';
    value: APIParam;
    checkBlank: boolean;
    subType: 'String' | 'Object' | 'Json' | 'Array';
    params: APIParam[];
    example: string;
    in: string;
    title: string;
    description: string;
    path: string;
    enumValueTitles: any;
    enum: string[];
    static parseDescription(description?: string): string;
    static filterBodyField(apiParams: APIParam[], bodyStyle: string): {
        in: string;
        name: string;
        position: "Query" | "Body" | "Host" | "Path";
        required: boolean;
        visibility: "cn" | "intl" | "jp" | "Private" | "Public";
        type: "RepeatList" | "Array" | "Integer" | "String" | "Long" | "Boolean" | "Double" | "Float" | "Json" | "Object" | "Binary" | "Map";
        style: "flat" | "json";
        keyType: "Integer" | "String" | "Long" | "Double" | "Float";
        value: APIParam;
        checkBlank: boolean;
        subType: "Array" | "String" | "Json" | "Object";
        params: APIParam[];
        example: string;
        title: string;
        description: string;
        path: string;
        enumValueTitles: any;
        enum: string[];
    }[];
    static filterPathField(apiParams: APIParam[], bodyStyle: string): APIParam[];
    static filterPrivateParams(apiParams: APIParam[]): APIParam[];
    static filterVisibilityParams(apiParams: APIParam[]): APIParam[];
    static joinParamDocs(apiParams: APIParam[], paramDocs: {
        [name: string]: {
            params: any[];
            example: string;
            description: string;
            title: string;
            name: string;
            position: string;
        };
    } | {
        example: string;
        description: string;
        title: string;
        name: string;
        position: string;
        params: any[];
    }[]): any;
}
export declare class APIResponse {
    name: string;
    structure: 'Member' | 'Array' | 'List';
    type: 'Integer' | 'String' | 'Long' | 'Boolean' | 'Double' | 'Float' | 'Json' | 'RepeatList' | 'Binary';
    itemName: string;
    showJsonItemName: boolean;
    children: APIResponse[];
    example: string;
    description: string;
    enum: [];
    enumValues: [];
    static joinResponseDocs(apiResponses: APIResponse[], responseDocs: APIResponse[]): APIResponse[];
}
export declare class APIHeadersReponseItem {
    name: string;
    type: string;
    visibility: string;
    children: APIHeadersReponseItem[];
    example: string;
    description: string;
}
export declare class WorkbenchAPI {
    id: number;
    product: string;
    bodyStyle: string;
    name: string;
    version: string;
    deprecated: any;
    staticInfo?: {
        substitutions?: string[];
        noSubstitutionReason?: string;
        returnType?: string;
        callback?: any;
        callbackInterval?: any;
        maxCallbackTimes?: any;
    };
    parameterType: 'Multi' | 'Single';
    params: APIParam[];
    paramsPath: APIParam[];
    methods: string[];
    protocols: string[];
    path: string;
    response: APIResponse[];
    responseHeaders: APIHeadersReponseItem[];
    timeout: number;
    isHidden: boolean;
    isIsvAPI: boolean;
    resourceTypeCode: string;
    resourceTypeTitle: string;
    createdAt: string;
    updatedAt: string;
    /** 一般为描述 */
    summary: string;
    /** 一般为注意事项 */
    description: string;
    /** 一般与 API 名相同 */
    title: string;
    request_header_desc?: string;
    request_demo?: string;
    response_demo?: any[];
    error_codes?: any;
    docId: number;
    recordVersion: string;
    contentHTML: string;
    contentMd: string;
    response_demo_desc?: string;
    request_params_desc?: string;
    api_type?: string;
    children?: WorkbenchAPI[];
    /** 运行时，该值用在 BearerToken 鉴权时 */
    runtime: string;
    /** 鉴权方式 */
    security: any[];
    /** 枚举值在request里 */
    request: APIParam[];
    apiStyle: string;
    /** 该值用在 文档页查找左侧目录时 */
    dir_id?: number;
    paramObject: {
        params: any;
        method: string;
        path: string;
        protocol: string;
    };
    hotCount?: string;
    constructor(bo: APIBo, apiStyle?: 'ROA' | 'RPC');
    static getAPISummary(api: WorkbenchAPI): string;
}
export type APIGroupNode = {
    title: string;
    summary: string;
    children: APINode[];
    dir_id?: number;
};
export type APINode = APIGroupNode | WorkbenchAPI;
