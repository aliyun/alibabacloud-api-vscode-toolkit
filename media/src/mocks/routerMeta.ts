export const routerMeta = {
    "specName": "Oss::2019-05-17",
    "name": "PutObject",
    "spec": {
        "consumes": [
            "application/octet-stream"
        ],
        "deprecated": false,
        "description": "**注意事项**\n\n- 添加的Object大小不能超过5 GB。\n\n- 默认情况下，如果已存在同名Object且对该Object有访问权限，则新添加的Object将覆盖原有的Object，并返回200 OK。\n\n- OSS没有文件夹的概念，所有资源都是以文件来存储，但您可以通过创建一个以正斜线（/）结尾，大小为0的Object来创建模拟文件夹。\n\n**版本控制**\n\n- 在已开启版本控制的Bucket中，OSS会为新添加的Object自动生成唯一的版本ID，并在响应Header中通过x-oss-version-id形式返回。\n- 在暂停了版本控制的Bucket中，新添加的Object的版本ID为null。OSS会保证同一个Object仅有一个null的版本ID。",
        "ext": {
            "methods": [
                "put"
            ],
            "operationType": "write",
            "produces": [],
            "responseDemo": "[{\"errorExample\":\"\",\"example\":\"{}\",\"type\":\"json\"}]",
            "schemes": [
                "http",
                "https"
            ],
            "security": [
                {
                    "AK": []
                }
            ],
            "summary": "上传文件（Object）。",
            "systemTags": {
                "operationType": "create"
            },
            "title": "上传文件"
        },
        "externalDocs": {
            "description": "去调试",
            "url": "https://api.aliyun.com/api/Oss/2019-05-17/PutObject"
        },
        "method": "put",
        "name": "PutObject",
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
                "in": "path",
                "name": "key",
                "required": true,
                "schema": {
                    "description": "Object的完整路径。",
                    "example": "exampledir/exampleobject/txt",
                    "required": true,
                    "type": "string"
                }
            },
            {
                "in": "header",
                "name": "x-oss-forbid-overwrite",
                "required": false,
                "schema": {
                    "description": "指定PutObject操作时是否覆盖同名Object。 当目标Bucket处于已开启或已暂停的版本控制状态时，**x-oss-forbid-overwrite**请求Header设置无效，即允许覆盖同名Object。\n  - 不指定**x-oss-forbid-overwrite**或者指定**x-oss-forbid-overwrite**为**false**时，表示允许覆盖同名Object。\n  - 指定**x-oss-forbid-overwrite**为**true**时，表示禁止覆盖同名Object。\n\n设置**x-oss-forbid-overwrite**请求Header会导致QPS处理性能下降，如果您有大量的操作需要使用**x-oss-forbid-overwrite**请求Header（QPS>1000），请联系技术支持，避免影响您的业务。\n默认值：**false**",
                    "example": "false",
                    "required": false,
                    "type": "boolean"
                }
            },
            {
                "in": "header",
                "name": "x-oss-server-side-encryption",
                "required": false,
                "schema": {
                    "description": "创建Object时，指定服务器端加密方式。\n\n取值：**AES256**、**KMS****或**SM4****\n\n指定此选项后，在响应头中会返回此选项，OSS会对上传的Object进行加密编码存储。当下载该Object时，响应头中会包含**x-oss-server-side-encryption**，且该值会被设置成此Object的加密算法。",
                    "example": "AES256",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "header",
                "name": "x-oss-server-side-data-encryption",
                "required": false,
                "schema": {
                    "description": "创建Object时，指定服务器端加密方式。\n\n取值：**AES256**、**KMS**或**SM4**\n\n指定此选项后，在响应头中会返回此选项，OSS会对上传的Object进行加密编码存储。当下载该Object时，响应头中会包含**x-oss-server-side-encryption**，且该值会被设置成此Object的加密算法。",
                    "example": "AES256",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "header",
                "name": "x-oss-server-side-encryption-key-id",
                "required": false,
                "schema": {
                    "description": "KMS托管的用户主密钥。\n此选项仅在**x-oss-server-side-encryption**为KMS时有效。",
                    "example": "9468da86-3509-4f8d-a61e-6eab1eac****",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "header",
                "name": "x-oss-object-acl",
                "required": false,
                "schema": {
                    "$ref": "#/definitions/ObjectACL",
                    "description": "指定OSS创建Object时的访问权限。\n\n取值：\n\n- default（默认）：Object遵循所在存储空间的访问权限。\n- private：Object是私有资源。只有Object的拥有者和授权用户有该Object的读写权限，其他用户没有权限操作该Object。\n- public-read：Object是公共读资源。只有Object的拥有者和授权用户有该Object的读写权限，其他用户只有该Object的读权限。请谨慎使用该权限。\n- public-read-write：Object是公共读写资源。所有用户都有该Object的读写权限。请谨慎使用该权限。\n\n关于访问权限的更多信息，请参见**[读写权限ACL](https://help.aliyun.com/document_detail/100676.html)**。",
                    "isDefsType": true,
                    "required": false,
                    "typeName": "ObjectACL"
                }
            },
            {
                "in": "header",
                "name": "x-oss-storage-class",
                "required": false,
                "schema": {
                    "$ref": "#/definitions/StorageClass",
                    "description": "指定Object的存储类型。                               对于任意存储类型的Bucket，如果上传Object时指定此参数，则此次上传的Object将存储为指定的类型。例如在IA类型的Bucket中上传Object时，如果指定x-oss-storage-class为Standard，则该Object直接存储为Standard。                              取值：                                 Standard：标准存储                                    IA：低频访问                                    Archive：归档存储                                    ColdArchive：冷归档存储                                    关于存储类型的更多信息，请参见存储类型介绍。",
                    "isDefsType": true,
                    "required": false,
                    "typeName": "StorageClass"
                }
            },
            {
                "in": "header",
                "name": "x-oss-tagging",
                "required": false,
                "schema": {
                    "description": "指定Object的标签，可同时设置多个标签，例如TagA=A&TagB=B。\n> Key和Value需要先进行URL编码，如果某项没有”=“，则看作Value为空字符串。",
                    "example": "a:1",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "header",
                "name": "x-oss-meta-*",
                "required": false,
                "schema": {
                    "additionalProperties": {
                        "description": "使用PutObject接口时，如果配置以**x-oss-meta-***为前缀的参数，则该参数视为元数据，例如`x-oss-meta-location`。一个Object可以有多个类似的参数，但所有的元数据总大小不能超过8 KB。\n\n元数据支持短划线（-）、数字、英文字母（a~z）。英文字符的大写字母会被转成小写字母，不支持下划线（_）在内的其他字符。",
                        "example": "x-oss-meta-location",
                        "type": "string"
                    },
                    "description": "使用PutObject接口时，如果配置以**x-oss-meta-***为前缀的参数，则该参数视为元数据，例如`x-oss-meta-location`。一个Object可以有多个类似的参数，但所有的元数据总大小不能超过8 KB。\n\n元数据支持短划线（-）、数字、英文字母（a~z）。英文字符的大写字母会被转成小写字母，不支持下划线（_）在内的其他字符。",
                    "example": "x-oss-meta-location",
                    "required": false,
                    "type": "object"
                }
            },
            {
                "in": "body",
                "name": "body",
                "required": false,
                "schema": {
                    "description": "请求体。",
                    "example": "二进制内容",
                    "format": "binary",
                    "required": false,
                    "type": "string"
                }
            }
        ],
        "path": "/{key}",
        "responses": {
            "200": {
                "headers": {
                    "x-oss-hash-crc64ecma": {
                        "schema": {
                            "format": "int64",
                            "sdkPropertyName": "crc64",
                            "type": "integer"
                        }
                    },
                    "x-oss-version-id": {
                        "schema": {
                            "sdkPropertyName": "contentMD5",
                            "type": "string"
                        }
                    }
                }
            },
            "5XX": {}
        },
        "summary": "上传文件（Object）。",
        "title": "上传文件"
    },
    "pageType": "document",
    "schemaType": "api"
}