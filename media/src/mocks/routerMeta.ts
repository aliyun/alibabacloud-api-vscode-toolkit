export const routerMeta = {
    "specName": "Oss::2019-05-17",
    "modName": "",
    "spec": {
        "consumes": [
            "application/xml"
        ],
        "deprecated": false,
        "description": "- GetBucket (ListObjects)接口已修订为GetBucketV2 (ListObjectsV2)。建议您在开发应用程序时使用较新的版本GetBucketV2 (ListObjectsV2)。为保证向后兼容性，OSS继续支持GetBucket (ListObjects)。有关GetBucketV2 (ListObjectsV2)的更多信息，请参见[GetBucketV2 (ListObjectsV2)](https://help.aliyun.com/document_detail/187544.html)。\n\n- 执行GetBucket (ListObjects)请求时不会返回Object中自定义的元信息。",
        "ext": {
            "methods": [
                "get"
            ],
            "operationType": "read",
            "produces": [
                "application/xml"
            ],
            "responseDemo": "[{\"errorExample\":\"\",\"example\":\"{\\n  \\\"Name\\\": \\\"examplebucket\\\",\\n  \\\"Prefix\\\": \\\"fun/\\\",\\n  \\\"Marker\\\": \\\"test1.txt\\\",\\n  \\\"MaxKeys\\\": 100,\\n  \\\"Delimiter\\\": \\\"/\\\",\\n  \\\"IsTruncated\\\": false,\\n  \\\"Contents\\\": [\\n    {\\n      \\\"Key\\\": \\\"fun/test.jpg\\\",\\n      \\\"LastModified\\\": \\\"2012-02-24T08:42:32.000Z\\\",\\n      \\\"ETag\\\": \\\"5B3C1A2E053D763E1B002CC607C5A0FE1****\\\",\\n      \\\"Type\\\": \\\"Normal\\\",\\n      \\\"Size\\\": 344606,\\n      \\\"Owner\\\": {\\n        \\\"ID\\\": \\\"\\\",\\n        \\\"DisplayName\\\": \\\"\\\"\\n      },\\n      \\\"ResoreInfo\\\": \\\"ongoing-request=\\\\\\\"true”\\\"\\n    }\\n  ],\\n  \\\"CommonPrefixes\\\": [\\n    {\\n      \\\"Prefix\\\": \\\"\\\"\\n    }\\n  ]\\n}\",\"type\":\"json\"}]",
            "schemes": [
                "http",
                "https"
            ],
            "security": [
                {
                    "AK": []
                }
            ],
            "summary": "列举存储空间（Bucket）中所有文件（Object）的信息。",
            "systemTags": {
                "operationType": "get"
            },
            "title": "列举存储空间中文件的信息"
        },
        "externalDocs": {
            "description": "去调试",
            "url": "https://api.aliyun.com/api/Oss/2019-05-17/GetBucket"
        },
        "method": "get",
        "name": "GetBucket",
        "parameters": [
            {
                "in": "host",
                "name": "bucket",
                "required": true,
                "schema": {
                    "description": "Bucket名称。",
                    "example": "examplebucket",
                    "required": true,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "delimiter",
                "required": false,
                "schema": {
                    "description": "对Object名字进行分组的字符。所有Object名字包含指定的前缀，第一次出现delimiter字符之间的Object作为一组元素（即CommonPrefixes）。<br>默认值：无",
                    "example": "/",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "marker",
                "required": false,
                "schema": {
                    "description": "设定从marker之后按字母排序开始返回Object。<br>\nmarker用来实现分页显示效果，参数的长度必须小于1024字节。<br>\n做条件查询时，即使marker在列表中不存在，也会从符合marker字母排序的下一个开始打印。<br>\n默认值：无",
                    "example": "test1.txt",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "max-keys",
                "required": false,
                "schema": {
                    "description": "指定返回Object的最大数。 如果因为max-keys的设定无法一次完成列举，返回结果会附加NextMarker元素作为下一次列举的marker。<br>\n取值：大于0小于1000<br>\n默认值：100",
                    "example": "200",
                    "format": "int64",
                    "required": false,
                    "type": "integer"
                }
            },
            {
                "in": "query",
                "name": "prefix",
                "required": false,
                "schema": {
                    "description": "限定返回文件的Key必须以prefix作为前缀。\n\n- prefix参数的长度必须小于1024字节。\n\n- 使用prefix查询时，返回的Key中仍会包含prefix。<br>\n\n如果把prefix设为某个文件夹名，则列举以此Prefix开头的文件，即该文件夹下递归的所有文件和子文件夹。<br>\n在设置prefix的基础上，将delimiter设置为正斜线（/）时，返回值中只列举该文件夹下的文件，文件夹下的子文件夹名返回在CommonPrefixes中，子文件夹下递归的所有文件和文件夹不显示。<br>\n例如，一个Bucket中有三个Object ，分别为fun/test.jpg、 fun/movie/001.avi和fun/movie/007.avi。如果设定prefix为fun/，则返回三个Object；如果在prefix设置为fun/的基础上，将delimiter设置为正斜线（/），则返回fun/test.jpg和fun/movie/。<br>\n默认值：无",
                    "example": "fun",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "encoding-type",
                "required": false,
                "schema": {
                    "$ref": "#/definitions/EncodeType",
                    "description": "对返回的内容进行编码并指定编码的类型。<br>\n默认值：无<br>\n可选值：URL<br> \n></notice>delimiter、marker、prefix、NextMarker以及Key使用UTF-8字符。如果delimiter、marker、prefix、NextMarker以及Key中包含XML 1.0标准不支持的控制字符，您可以通过指定encoding-type对返回结果中的Delimiter、Marker、Prefix、NextMarker以及Key进行编码。",
                    "isDefsType": true,
                    "required": false,
                    "typeName": "EncodeType"
                }
            }
        ],
        "path": "/",
        "responses": {
            "200": {
                "schema": {
                    "description": "保存每个返回Object元信息的容器。",
                    "properties": {
                        "CommonPrefixes": {
                            "description": "如果请求中指定了Delimiter参数，则会在返回的响应中包含CommonPrefixes元素。该元素表明以Delimiter结尾，并有共同前缀的Object名称的集合。",
                            "items": {
                                "$ref": "#/definitions/CommonPrefix",
                                "description": "如果请求中指定了delimiter参数，则OSS返回的响应中包含CommonPrefixes元素。该元素标明以delimiter结尾，并有共同前缀的Object名称的集合。",
                                "isDefsType": true,
                                "typeName": "CommonPrefix"
                            },
                            "title": "Objects whose names contain the same string that ranges from the prefix to the next occurrence of the delimiter are grouped as a single result element",
                            "type": "array"
                        },
                        "Contents": {
                            "description": "保存每个返回Object元信息的容器。",
                            "items": {
                                "$ref": "#/definitions/ObjectSummary",
                                "description": "返回的文件元信息。\n\n",
                                "isDefsType": true,
                                "typeName": "ObjectSummary"
                            },
                            "title": "The container that stores the returned object metadata",
                            "type": "array"
                        },
                        "Delimiter": {
                            "description": "对Object名字进行分组的字符。所有名字包含指定的前缀且第一次出现Delimiter字符之间的Object作为一组元素CommonPrefixes。",
                            "example": "/",
                            "title": "The character used to group objects by name",
                            "type": "string"
                        },
                        "IsTruncated": {
                            "description": "请求中返回的结果是否被截断。",
                            "example": "false",
                            "title": "Indicates whether the returned results are truncated",
                            "type": "boolean"
                        },
                        "Marker": {
                            "description": "标识此次GetBucket（ListObjects）的起点。",
                            "example": "test1.txt",
                            "title": "The name of the object from which the list operation begins",
                            "type": "string"
                        },
                        "MaxKeys": {
                            "description": "响应请求内返回结果的最大数目。",
                            "example": "\t100",
                            "format": "int32",
                            "title": "The maximum number of returned objects in the response",
                            "type": "integer"
                        },
                        "Name": {
                            "description": "Bucket名称。",
                            "example": "examplebucket",
                            "title": "The bucket name",
                            "type": "string"
                        },
                        "Prefix": {
                            "description": "本次查询结果的前缀。",
                            "example": "fun/",
                            "title": "The prefix that the names of returned objects contain",
                            "type": "string"
                        }
                    },
                    "type": "object"
                }
            },
            "4xx": {},
            "5xx": {}
        },
        "summary": "列举存储空间（Bucket）中所有文件（Object）的信息。",
        "title": "列举存储空间中文件的信息"
    },
    "name": "GetBucket",
    "pageType": "document",
    "schemaType": "api"
}