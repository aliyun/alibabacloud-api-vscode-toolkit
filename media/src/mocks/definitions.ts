export const definitions = {
    "AccessControlList": {
        "title": "A list of grants that control access to the staged results",
        "description": "存储ACL信息的容器。",
        "type": "object",
        "properties": {
            "Grant": {
                "description": "Bucket的读写权限ACL。",
                "enumValueTitles": {
                    "private": "private",
                    "public-read": "public-read",
                    "public-read-write": "public-read-write"
                },
                "example": "public-read",
                "$ref": "#/components/schemas/Grant"
            }
        }
    },
    "AccessControlPolicy": {
        "title": "Contains the elements that set the ACL permissions for an object",
        "description": "保存Get Object ACL结果的容器。",
        "type": "object",
        "properties": {
            "Owner": {
                "description": "保存Bucket拥有者信息的容器。\n\n",
                "$ref": "#/components/schemas/Owner"
            },
            "AccessControlList": {
                "description": "存储ACL信息的容器。",
                "$ref": "#/components/schemas/AccessControlList"
            }
        }
    },
    "AccessMonitorConfiguration": {
        "title": "A short description of struct",
        "description": "Bucket的访问跟踪状态配置信息。",
        "type": "object",
        "properties": {
            "Status": {
                "description": "Bucket的访问跟踪状态。",
                "$ref": "#/components/schemas/AccessMonitorStatus"
            }
        }
    },
    "AccessMonitorStatus": {
        "title": "A short description of struct",
        "description": "Bucket的访问跟踪状态。取值范围如下：\n\n- Enabled：已开启\n\n- Disabled：未开启",
        "type": "string",
        "example": "Enabled",
        "enum": [
            "Enabled",
            "Disabled"
        ]
    },
    "AccessPoint": {
        "title": "保存AccessPoint信息的容器",
        "description": "保存单个接入点信息的容器。",
        "type": "object",
        "properties": {
            "Bucket": {
                "title": "Bucket名称",
                "description": "配置接入点的Bucket名称。",
                "type": "string",
                "example": "oss-example"
            },
            "AccessPointName": {
                "title": "接入点名称",
                "description": "接入点名称。",
                "$ref": "#/components/schemas/AccessPointName"
            },
            "Alias": {
                "title": "接入点别名",
                "description": "接入点别名。",
                "$ref": "#/components/schemas/AccessPointAlias"
            },
            "NetworkOrigin": {
                "description": "接入点网络来源。",
                "$ref": "#/components/schemas/AccessPointNetworkOrigin"
            },
            "VpcConfiguration": {
                "description": "保存VPC网络来源信息的容器。",
                "$ref": "#/components/schemas/AccessPointVpcConfiguration"
            },
            "Status": {
                "description": "接入点所处状态。",
                "$ref": "#/components/schemas/AccessPointStatus"
            }
        }
    },
    "AccessPointAlias": {
        "title": "接入点别名",
        "description": "接入点别名。",
        "type": "string",
        "example": "ap-01-45ee7945007a2f0bcb595f63e2215c****-ossalias"
    },
    "AccessPointArn": {
        "title": "接入点ARN。",
        "description": "接入点ARN。",
        "type": "string",
        "example": "arn:acs:oss:ap-southeast-2:111933544165****:accesspoint/ap-01"
    },
    "AccessPointName": {
        "title": "接入点名称",
        "description": "接入点名称",
        "type": "string",
        "example": "ap-01"
    },
    "AccessPointNetworkOrigin": {
        "title": "接入点网络来源。返回值如下：  vpc：限制仅支持通过指定的VPC ID访问接入点。  internet：同时持通过外网和内网Endpoint互联网访问接入点。",
        "description": "接入点网络来源。返回值如下：  vpc：限制仅支持通过指定的VPC ID访问接入点。  internet：同时持通过外网和内网Endpoint互联网访问接入点。",
        "type": "string",
        "example": "vpc"
    },
    "AccessPointStatus": {
        "title": "接入点所处状态",
        "description": "接入点所处状态。\n\n- enable：接入点已创建完成。\n\n- disable：接入点已禁用。\n\n- creating：接入点正在创建中。\n\n- deleting：接入点已删除。",
        "type": "string",
        "example": "enable"
    },
    "AccessPointVpcConfiguration": {
        "title": "保存VPC网络来源信息的容器。",
        "description": "保存VPC网络来源信息的容器。",
        "type": "object",
        "properties": {
            "VpcId": {
                "title": "仅当NetworkOrigin取值为vpc时，需要指定VPC ID。",
                "description": "仅当NetworkOrigin取值为vpc时，需要指定VPC ID。",
                "type": "string",
                "example": "vpc-t4nlw426y44rd3iq4****"
            }
        }
    },
    "ApplyServerSideEncryptionByDefault": {
        "title": "A short description of struct",
        "description": "服务器端默认加密方式的容器。\n",
        "type": "object",
        "properties": {
            "SSEAlgorithm": {
                "title": "description",
                "description": "设置服务器端默认加密方式。\n取值：KMS、AES256、SM4\n使用KMS密钥功能时会产生少量的KMS密钥API调用费用，费用详情请参见**[KMS计费标准](~~52608~~)**。\n进行跨区域复制时，若目标Bucket启用了默认服务器端加密方式，且复制规则配置了ReplicaCMKID，有以下两种情况：\n  - 若源Bucket中的对象未加密，则使用目标Bucket的默认加密方式对跨区域复制过来的明文对象进行加密。\n  - 若源Bucket中的对象使用了SSE-KMS或SSE-OSS的加密方式，则目标Bucket针对这些对象仍然使用原加密方式进行加密。\n\n更多信息，请参见**[跨区域复制结合服务器端加密](~~177216~~)**。",
                "type": "string",
                "example": "AES256"
            },
            "KMSMasterKeyID": {
                "title": "description",
                "description": "当SSEAlgorithm值为KMS，且使用指定的密钥加密时，需输入KMSMasterKeyID。其他情况下，必须为空。",
                "type": "string",
                "enumValueTitles": {},
                "example": "9468da86-3509-4f8d-a61e-6eab1eac****"
            },
            "KMSDataEncryption": {
                "title": "description",
                "description": "指定Object的加密算法。若未指定此选项，表明Object使用AES256加密算法。此选项仅当SSEAlgorithm取值为KMS有效。\n取值：SM4",
                "type": "string",
                "enumValueTitles": {},
                "example": "SM4"
            }
        }
    },
    "Bucket": {
        "title": "Bucket信息",
        "description": "保存Bucket信息的容器。",
        "type": "object",
        "properties": {
            "CreationDate": {
                "title": "Bucket的创建时间，格式为UTC时间",
                "description": "Bucket创建时间。格式为`yyyy-mm-ddThh:mm:ss.timezone`。",
                "type": "string",
                "format": "iso8601",
                "example": "2014-05-15T11:18:32.000Z"
            },
            "ExtranetEndpoint": {
                "title": "Bucket的外网域名",
                "description": "Bucket访问的外网域名。",
                "type": "string",
                "example": "oss-cn-hangzhou.aliyuncs.com"
            },
            "IntranetEndpoint": {
                "title": "Bucket的内网域名",
                "description": "同地域ECS访问Bucket的内网域名。",
                "type": "string",
                "example": "oss-cn-hangzhou-internal.aliyuncs.com"
            },
            "Location": {
                "title": "Bucket所在的数据中心",
                "description": "Bucket所在的数据中心。",
                "type": "string",
                "example": "oss-cn-hangzhou"
            },
            "Name": {
                "title": "Bucket的名称",
                "description": "Bucket名称。",
                "type": "string",
                "example": "mybucket01"
            },
            "StorageClass": {
                "title": "Bucket的存储类型",
                "description": "Bucket存储类型，支持Standard、IA、Archive和ColdArchive四种存储类型。",
                "example": "Standard",
                "$ref": "#/components/schemas/StorageClass"
            },
            "Region": {
                "title": "Bucket所在地域",
                "description": "Bucket所在地域。",
                "type": "string",
                "example": "cn-hangzhou"
            }
        },
        "example": "examplebucket"
    },
    "BucketACL": {
        "title": "The access control list (ACL) for a bucket.",
        "description": "Bucket的访问权限ACL。取值范围如下：\n- public-read-write：公共读写\n- public-read：公共读\n- private（默认）：私有\n\n关于Bucket访问权限ACL的更多信息，请参见[设置存储空间访问权限ACL](~~31843~~)。",
        "type": "string",
        "example": "private",
        "default": "private",
        "enum": [
            "private",
            "public-read",
            "public-read-write"
        ]
    },
    "BucketAntiDDOSConfiguration": {
        "title": "A short description of struct",
        "description": "保存高防实例配置信息的容器。",
        "type": "object",
        "properties": {
            "Cnames": {
                "title": "域名信息列表的容器",
                "description": "保存域名信息列表的容器。",
                "type": "object",
                "properties": {
                    "Domain": {
                        "title": "待防护自定义域名",
                        "description": "待防护自定义域名。",
                        "type": "array",
                        "items": {
                            "description": "待防护自定义域名。每个Bucket最多支持5个待防护的自定义域名。",
                            "type": "string",
                            "example": "abc1.example.cn"
                        }
                    }
                }
            }
        }
    },
    "BucketAntiDDOSInfo": {
        "title": "A short description of struct",
        "description": "保存高防实例信息的容器。",
        "type": "object",
        "properties": {
            "InstanceId": {
                "title": "拥有者的UID",
                "description": "高防实例ID。",
                "type": "string",
                "example": "cbcac8d2-4f75-4d6d-9f2e-c3447f73****"
            },
            "Owner": {
                "title": "拥有者的UID",
                "description": "Bucket拥有者的UID。",
                "type": "string",
                "example": "114893010724****"
            },
            "Bucket": {
                "title": "高防实例ID",
                "description": "防护的Bucket名称。",
                "type": "string",
                "example": "examplebucket"
            },
            "Ctime": {
                "title": "高防实例创建时间",
                "description": "高防实例创建时间，格式为时间戳。",
                "type": "integer",
                "format": "int64",
                "example": "1626769503"
            },
            "Mtime": {
                "title": "高防实例更新时间",
                "description": "高防实例更新时间，格式为时间戳。",
                "type": "integer",
                "format": "int64",
                "example": "1626769840"
            },
            "ActiveTime": {
                "title": "高防实例激活时间",
                "description": "高防实例激活时间，格式为时间戳。",
                "type": "integer",
                "format": "int64",
                "example": "1626769845"
            },
            "Status": {
                "title": "高防实的状态",
                "description": "高防实例所处状态。\n\n- Init：初始化防护状态。\n\n- Defending：防护中状态。\n\n- HaltDefending：解除防护状态。",
                "type": "string",
                "example": "Defending"
            },
            "Type": {
                "title": "高防实的类型",
                "description": "高防实例类型。固定值为AntiDDosPremimum。",
                "type": "string",
                "example": "AntiDDosPremimum"
            },
            "Cnames": {
                "title": "自定义域名容器",
                "description": "保存自定义域名的容器。",
                "type": "object",
                "properties": {
                    "Domain": {
                        "title": "自定义域名",
                        "description": "自定义域名。",
                        "type": "array",
                        "items": {
                            "description": "自定义域名。",
                            "type": "string",
                            "example": "abc1.example.cn"
                        }
                    }
                }
            }
        }
    },
    "BucketCnameConfiguration": {
        "title": "Cname配置的容器",
        "description": "Cname配置的容器。",
        "type": "object",
        "properties": {
            "Cname": {
                "title": "Cname信息的容器",
                "description": "Cname信息的容器。",
                "type": "object",
                "properties": {
                    "Domain": {
                        "title": "自定义域名",
                        "description": "自定义域名。",
                        "type": "string",
                        "example": "example.com"
                    }
                }
            }
        }
    },
    "BucketInfo": {
        "title": "保存Bucket信息的容器",
        "description": "保存Bucket信息的容器",
        "type": "object",
        "properties": {
            "Bucket": {
                "title": "保存Bucket信息的容器",
                "description": "保存Bucket信息的容器",
                "type": "object",
                "properties": {
                    "AccessMonitor": {
                        "title": "Bucket是否开启访问追踪",
                        "description": "Bucket是否开启访问追踪",
                        "type": "string",
                        "enumValueTitles": {
                            "Enabled": "Enabled",
                            "Disabled": "Disabled"
                        },
                        "example": "Disabled"
                    },
                    "CreationDate": {
                        "title": "Bucket的创建时间",
                        "description": "Bucket的创建时间",
                        "type": "string",
                        "format": "iso8601",
                        "example": "2022-01-06T08:20:09.000Z"
                    },
                    "CrossRegionReplication": {
                        "title": "Bucket是否开启跨区域复制",
                        "description": "Bucket是否开启跨区域复制",
                        "type": "string",
                        "enumValueTitles": {
                            "Enabled": "Enabled",
                            "Disabled": "Disabled"
                        },
                        "example": "Disabled"
                    },
                    "DataRedundancyType": {
                        "description": "Bucket的数据容灾类型",
                        "$ref": "#/components/schemas/DataRedundancyType"
                    },
                    "ExtranetEndpoint": {
                        "title": "Bucket外网访问域名",
                        "description": "Bucket外网访问域名",
                        "$ref": "#/components/schemas/Endpoint"
                    },
                    "IntranetEndpoint": {
                        "title": "Bucket内网访问域名",
                        "description": "Bucket内网访问域名",
                        "$ref": "#/components/schemas/Endpoint"
                    },
                    "Location": {
                        "title": "Bucket所在地域",
                        "description": "Bucket所在地域",
                        "type": "string",
                        "example": "oss-cn-hangzhou"
                    },
                    "Name": {
                        "title": "Bucket名称",
                        "description": "Bucket名称",
                        "type": "string",
                        "example": "test-bucket"
                    },
                    "ResourceGroupId": {
                        "title": "Bucket所在的资源组ID",
                        "description": "Bucket所在的资源组ID",
                        "$ref": "#/components/schemas/ResourceGroupId"
                    },
                    "StorageClass": {
                        "title": "Bucket的存储类型",
                        "description": "Bucket的存储类型",
                        "$ref": "#/components/schemas/StorageClass"
                    },
                    "TransferAcceleration": {
                        "title": "Bucket传输",
                        "description": "Bucket传输",
                        "type": "string",
                        "enumValueTitles": {
                            "Enabled": "Enabled",
                            "Disabled": "Disabled"
                        },
                        "example": "Disabled"
                    },
                    "Versioning": {
                        "title": "Bucket多版本状态",
                        "description": "Bucket多版本状态",
                        "$ref": "#/components/schemas/BucketVersioningStatus"
                    },
                    "Owner": {
                        "title": "Bucket所有者",
                        "description": "Bucket所有者",
                        "$ref": "#/components/schemas/Owner"
                    },
                    "AccessControlList": {
                        "title": "Bucket权限",
                        "description": "Bucket权限",
                        "$ref": "#/components/schemas/AccessControlList"
                    },
                    "ServerSideEncryptionRule": {
                        "title": "Bucket服务端加密配置",
                        "description": "Bucket服务端加密配置",
                        "type": "object",
                        "properties": {
                            "SSEAlgorithm": {
                                "title": "服务端加密类型",
                                "description": "设置服务器端默认加密方式。\n\n取值：KMS、AES256、SM4。",
                                "type": "string",
                                "example": "KMS"
                            },
                            "KMSMasterKeyID": {
                                "title": "服务端加密KMS密钥",
                                "description": "服务端加密KMS密钥",
                                "type": "string",
                                "example": "\t\n9468da86-3509-4f8d-a61e-6eab1eac****"
                            },
                            "KMSDataEncryption": {
                                "title": "服务端加密KMS加密算法",
                                "description": "指定Object的加密算法。如果未指定此选项，表明Object使用AES256加密算法。此选项仅当SSEAlgorithm取值为KMS有效。\n\n取值：SM4",
                                "type": "string",
                                "example": "SM4"
                            }
                        }
                    },
                    "BucketPolicy": {
                        "title": "Bucket日志配置",
                        "description": "Bucket日志配置",
                        "$ref": "#/components/schemas/LoggingEnabled"
                    }
                }
            }
        }
    },
    "BucketLoggingStatus": {
        "title": "A short description of struct",
        "description": "存储访问日志状态信息的容器。\n",
        "type": "object",
        "properties": {
            "LoggingEnabled": {
                "description": "访问日志信息的容器。\n",
                "required": true,
                "$ref": "#/components/schemas/LoggingEnabled"
            }
        }
    },
    "BucketResourceGroupConfiguration": {
        "title": "Bucket资源组配置",
        "description": "Bucket资源组配置",
        "type": "object",
        "properties": {
            "ResourceGroupId": {
                "title": "所属资源组ID",
                "description": "所属资源组ID",
                "$ref": "#/components/schemas/ResourceGroupId"
            }
        }
    },
    "BucketStat": {
        "title": "BucketStat结构的容器。",
        "description": "BucketStat结构的容器。",
        "type": "object",
        "properties": {
            "StandardStorage": {
                "title": "标准存储类型的存储量，单位字节。",
                "description": "标准存储类型的存储量，单位字节。",
                "type": "integer",
                "format": "int64",
                "example": "1600"
            },
            "ColdArchiveObjectCount": {
                "title": "冷归档存储类型的Object数量。",
                "description": "冷归档存储类型的Object数量。",
                "type": "integer",
                "format": "int64",
                "example": "230"
            },
            "ArchiveObjectCount": {
                "title": "归档存储类型的Object数量。",
                "description": "归档存储类型的Object数量。",
                "type": "integer",
                "format": "int64",
                "example": "40"
            },
            "InfrequentAccessStorage": {
                "title": "低频存储类型的计费存储量，单位字节。",
                "description": "低频存储类型的计费存储量，单位字节。",
                "type": "integer",
                "format": "int64",
                "example": "1250"
            },
            "ArchiveRealStorage": {
                "title": "归档存储类型的实际存储量，单位字节。",
                "description": "归档存储类型的实际存储量，单位字节。",
                "type": "integer",
                "format": "int64",
                "example": "5990"
            },
            "StandardObjectCount": {
                "title": "标准存储类型的Object数量。",
                "description": "标准存储类型的Object数量。",
                "type": "integer",
                "format": "int64",
                "example": "12323"
            },
            "ObjectCount": {
                "title": "Bucket中总的Object数量。",
                "description": "Bucket中总的Object数量。",
                "type": "integer",
                "format": "int64",
                "example": "2034903"
            },
            "Storage": {
                "title": "Bucket的总存储量，单位字节。",
                "description": "Bucket的总存储量，单位字节。",
                "type": "integer",
                "format": "int64",
                "example": "39182324"
            },
            "ArchiveStorage": {
                "title": "归档存储类型的计费存储量，单位字节。",
                "description": "归档存储类型的计费存储量，单位字节。",
                "type": "integer",
                "format": "int64",
                "example": "30423"
            },
            "LastModifiedTime": {
                "title": "获取到的存储信息的时间点，格式为时间戳，单位为秒。",
                "description": "获取到的存储信息的时间点，格式为时间戳，单位为秒。",
                "type": "integer",
                "format": "int64",
                "example": "1643341269"
            },
            "MultipartUploadCount": {
                "title": "Bucket中已经初始化但还未完成（Complete）或者还未中止（Abort）的Multipart Upload数量。",
                "description": "Bucket中已经初始化但还未完成（Complete）或者还未中止（Abort）的Multipart Upload数量。",
                "type": "integer",
                "format": "int64",
                "example": "223"
            },
            "LiveChannelCount": {
                "title": "Bucket中Live Channel的数量。",
                "description": "Bucket中Live Channel的数量。",
                "type": "integer",
                "format": "int64",
                "example": "12"
            },
            "ColdArchiveRealStorage": {
                "title": "冷归档存储类型的实际存储量，单位字节。",
                "description": "冷归档存储类型的实际存储量，单位字节。",
                "type": "integer",
                "format": "int64",
                "example": "2312"
            },
            "InfrequentAccessObjectCount": {
                "title": "低频存储类型的Object数量。",
                "description": "低频存储类型的Object数量。",
                "type": "integer",
                "format": "int64",
                "example": "23"
            },
            "ColdArchiveStorage": {
                "title": "冷归档存储类型的计费存储量，单位字节。",
                "description": "冷归档存储类型的计费存储量，单位字节。",
                "type": "integer",
                "format": "int64",
                "example": "342"
            },
            "InfrequentAccessRealStorage": {
                "title": "低频存储类型的实际存储量，单位字节。",
                "description": "低频存储类型的实际存储量，单位字节。",
                "type": "integer",
                "format": "int64",
                "example": "65754"
            }
        }
    },
    "BucketVersioningStatus": {
        "description": "版本控制状态。取值如下：\n- Enabled：开启版本控制状态。\n- Suspended：暂停版本控制状态。",
        "type": "string",
        "example": "Enabled",
        "enum": [
            "Enabled",
            "Suspended"
        ]
    },
    "BucketWormState": {
        "title": "The status of the retention policy",
        "description": "合规保留策略所处的状态。\n\n可选值：\n\n- InProgress：合规保留策略创建后，该策略默认处于“InProgress”状态，且该状态的有效期为24小时。\n- Locked：合规保留策略处于锁定状态。",
        "type": "string",
        "example": "Locked",
        "enum": [
            "InProgress",
            "Locked"
        ]
    },
    "CORSConfiguration": {
        "title": "A short description of struct",
        "description": "Bucket的CORS规则容器。",
        "type": "object",
        "properties": {
            "CORSRule": {
                "title": "description",
                "description": "CORS规则的容器。\n\n每个Bucket最多允许10条CORS规则。上传的XML文档最大允许16 KB。",
                "type": "array",
                "items": {
                    "description": "CORS规则的信息。",
                    "$ref": "#/components/schemas/CORSRule"
                }
            },
            "ResponseVary": {
                "title": "description",
                "description": "是否返回Vary: Origin头。取值范围如下：\n\n- true：不管发送的是否是跨域请求或跨域请求是否成功，均会返回Vary: Origin头。\n- false（默认值）：任何情况下均不返回Vary: Origin头。\n\n> 此字段不能单独配置，必须至少配置一项跨域规则才能生效。",
                "type": "boolean",
                "enumValueTitles": {
                    "true": "true",
                    "false": "false"
                },
                "example": "false"
            }
        }
    },
    "CORSRule": {
        "title": "A short description of struct",
        "description": "CORS规则的容器。\n\n每个Bucket最多允许10条CORS规则。上传的XML文档最大允许16 KB。",
        "type": "object",
        "properties": {
            "AllowedOrigin": {
                "title": "description",
                "description": "指定允许的跨域请求来源。",
                "type": "array",
                "items": {
                    "description": "指定允许的跨域请求来源。\n\nOSS允许使用多个元素来指定多个允许的来源。多个元素之间用英文逗号(,)分隔。\n\nOSS仅允许使用一个星号（\\*）通配符。如果指定为星号（\\*），则表示允许所有来源的跨域请求。",
                    "type": "string",
                    "example": "*"
                }
            },
            "AllowedMethod": {
                "title": "description",
                "description": "指定允许的跨域请求方法。",
                "type": "array",
                "items": {
                    "description": "指定允许的跨域请求方法。\n\n取值范围为GET、PUT、DELETE、POST、HEAD。",
                    "type": "string",
                    "example": "GET"
                }
            },
            "AllowedHeader": {
                "title": "description",
                "description": "控制OPTIONS预取指令Access-Control-Request-Headers中指定的Header是否被允许。在Access-Control-Request-Headers中指定的每个Header都必须在AllowedHeader中有对应的项。\n\n> 仅允许使用一个星号（*）通配符。",
                "type": "string",
                "example": "Authorization"
            },
            "ExposeHeader": {
                "title": "description",
                "description": "指定允许用户从应用程序中访问的响应头。例如一个JavaScript的XMLHttpRequest对象。\n\n> 不允许使用星号（*）通配符。",
                "type": "array",
                "items": {
                    "description": "指定允许用户从应用程序中访问的响应头。例如一个JavaScript的XMLHttpRequest对象。\n\n> 不允许使用星号（*）通配符。",
                    "type": "string",
                    "example": "x-oss-test"
                }
            },
            "MaxAgeSeconds": {
                "title": "description",
                "description": "指定浏览器对特定资源的预取（OPTIONS）请求返回结果的缓存时间。单位为秒。\n\n单条CORS规则仅允许一个MaxAgeSeconds。",
                "type": "integer",
                "format": "int64",
                "example": "100"
            }
        }
    },
    "CSVInput": {
        "title": "A short description of struct",
        "description": "保存Select请求的容器。",
        "type": "object",
        "properties": {
            "FileHeaderInfo": {
                "description": "指定CSV文件头信息。\n\n- Use：该CSV文件有头信息，可以用CSV列名作为Select中的列名。\n\n- Ignore：该CSV文件有头信息，但不可用CSV列名作为Select中的列名。\n\n- None：该文件没有头信息，为默认值。",
                "enumValueTitles": {
                    "Ignore": "Ignore",
                    "Use": "Use",
                    "None": "None"
                },
                "example": "Use",
                "$ref": "#/components/schemas/FileHeaderInfo"
            },
            "RecordDelimiter": {
                "title": "description",
                "description": "指定换行符，以Base64编码。默认值为\\n（可选）。未编码前的值最多为两个字符，以字符的ANSI值表示，例如在Java中使用\\n表示换行。",
                "type": "string",
                "example": "\\n"
            },
            "FieldDelimiter": {
                "title": "description",
                "description": "指定CSV列分隔符，以Base64编码。默认值为`,`（可选）。未编码前的值必须为一个字符，以字符的ANSI值表示，例如在Java中使用`,`表示逗号。",
                "type": "string",
                "example": ","
            },
            "QuoteCharacter": {
                "title": "description",
                "description": "指定CSV的引号字符，以Base64编码。默认值为`\\”`（可选）。在CSV中引号内的换行符，列分隔符将被视作普通字符。未编码前的值必须为一个字符，以字符的ANSI值表示，例如在Java中使用`\\”`表示引号。",
                "type": "string",
                "example": "\\”"
            },
            "CommentCharacter": {
                "title": "description",
                "description": "指定CSV的注释符，以Base64编码。默认值为空（即没有注释符）。",
                "type": "string",
                "example": "#"
            },
            "Range": {
                "title": "description",
                "description": "指定查询文件的范围（可选）。支持两种格式：\n\n> 使用Range参数查询的文件需要有select meta。关于select meta的更多信息，请参见[CreateSelectObjectMeta](~~74054~~)。\n\n- 按行查询：line-range=start-end。例如line-range=10-20表示扫描第10行到第20行。\n\n- 按Split查询：split-range=start-end。例如split-range=10-20表示扫描第10到第20个split。\n\n<br>其中start和end均为inclusive。其格式和range get中的range参数一致。\n<br>仅在文档是CSV或者JSON Type为LINES时使用。",
                "type": "string",
                "enumValueTitles": {
                    "line-range=start-end": "line-range=start-end",
                    "split-range=start-end": "split-range=start-end"
                },
                "example": "line-range=start-end"
            },
            "AllowQuotedRecordDelimiter": {
                "title": "description",
                "description": "指定CSV内容是否含有在引号中的换行符。\n<br>例如某一列值为`\"abc\\ndef\" `（此处`\\n`为换行）， 则该值需设置为true。当该值为false时，select支持header range的语义，可以更高效的进行分片查询。",
                "type": "boolean",
                "enumValueTitles": {
                    "true": "true",
                    "false": "false"
                },
                "example": "true"
            }
        }
    },
    "CSVOutput": {
        "title": "A short description of struct",
        "description": "保存Select请求的容器。",
        "type": "object",
        "properties": {
            "RecordDelimiter": {
                "title": "description",
                "description": "指定换行符，以Base64编码。未编码前的值最多为两个字符，以字符的ANSI值表示，例如在Java中使用`\\n`表示换行。\n<br>默认值：`\\n`",
                "type": "string",
                "example": "\\n"
            },
            "FieldDelimiter": {
                "title": "description",
                "description": "指定CSV列分隔符，以Base64编码。未编码前的值必须为一个字符，以字符的ANSI值表示，例如在Java中使用`,`表示逗号。\n<br>默认值：`,`",
                "type": "string",
                "example": ","
            }
        }
    },
    "CnameCertificate": {
        "title": "证书信息的容器",
        "description": "证书信息",
        "type": "object",
        "properties": {
            "Type": {
                "title": "证书来源",
                "description": "证书来源",
                "type": "string",
                "enumValueTitles": {
                    "CAS": "证书中心",
                    "Upload": "旧版证书托管中用户自主上传的证书"
                },
                "example": "CAS"
            },
            "CertId": {
                "title": "证书ID",
                "description": "证书ID",
                "type": "string",
                "example": "493****-cn-hangzhou"
            },
            "Status": {
                "title": "证书状态",
                "description": "证书状态",
                "type": "string",
                "enumValueTitles": {
                    "Enabled": "使用证书",
                    "Disabled": "未使用证书"
                },
                "example": "Enabled"
            },
            "CreationDate": {
                "title": "证书绑定时间",
                "description": "证书绑定时间",
                "type": "string",
                "example": "Wed, 15 Sep 2021 02:35:06 GMT"
            },
            "Fingerprint": {
                "title": "证书签名",
                "description": "证书签名",
                "type": "string",
                "example": "DE:01:CF:EC:7C:A7:98:CB:D8:6E:FB:1D:97:EB:A9:64:1D:4E:**:**"
            },
            "ValidStartDate": {
                "title": "证书有效期起始时间",
                "description": "证书有效期起始时间",
                "type": "string",
                "example": "Wed, 12 Apr 2023 10:14:51 GMT"
            },
            "ValidEndDate": {
                "title": "证书有效期终止时间",
                "description": "证书有效期终止时间",
                "type": "string",
                "example": "Mon, 4 May 2048 10:14:51 GMT"
            }
        }
    },
    "CnameInfo": {
        "title": "A short description of struct",
        "description": "Cname信息概况。",
        "type": "object",
        "properties": {
            "Domain": {
                "title": "自定义域名",
                "description": "自定义域名。",
                "type": "string",
                "example": "example.com"
            },
            "LastModified": {
                "title": "绑定自定义域名的时间",
                "description": "绑定自定义域名的时间。",
                "type": "string",
                "example": "2021-09-15T02:35:07.000Z"
            },
            "Status": {
                "title": "域名所处的状态",
                "description": "域名所处状态。取值为：\n\n- Enabled：：启用该域名。\n\n- Disabled：禁用该域名。",
                "type": "string",
                "example": "Enabled"
            },
            "Certificate": {
                "description": "证书信息的容器。",
                "$ref": "#/components/schemas/CnameCertificate"
            }
        }
    },
    "CnameSummary": {
        "title": "A short description of struct",
        "description": "Cname信息概况",
        "type": "object",
        "properties": {
            "Domain": {
                "title": "自定义域名",
                "description": "自定义域名",
                "type": "string",
                "example": "example.com"
            },
            "LastModified": {
                "title": "绑定自定义域名的时间",
                "description": "绑定自定义域名的时间",
                "type": "string",
                "example": "2021-09-15T02:35:07.000Z"
            },
            "Status": {
                "title": "域名所处的状态",
                "description": "域名所处的状态",
                "type": "string",
                "enumValueTitles": {
                    "Enabled": "启用该域名",
                    "Disabled": "禁用该域名"
                },
                "example": "Enabled"
            },
            "Certificate": {
                "description": "证书信息的容器",
                "$ref": "#/components/schemas/CnameCertificate"
            }
        }
    },
    "CnameToken": {
        "title": "A short description of struct",
        "description": "CnameToken的容器。",
        "type": "object",
        "properties": {
            "Bucket": {
                "title": "绑定Cname的Bucket名称",
                "description": "绑定Cname的Bucket名称。",
                "type": "string",
                "example": "examplebucket"
            },
            "Cname": {
                "title": "绑定的Cname名称",
                "description": "绑定的Cname名称。",
                "type": "string",
                "example": "example.com"
            },
            "Token": {
                "title": "Token 的内容",
                "description": "OSS返回的CnameToken。",
                "type": "string",
                "example": "be1d49d863dea9ffeff3df7d6455****"
            },
            "ExpireTime": {
                "title": "Token的有效期",
                "description": "CnameToken的过期时间。",
                "type": "string",
                "example": "Wed, 23 Feb 2022 21:16:37 GMT"
            }
        }
    },
    "CommonPrefix": {
        "title": "Objects whose names contain the same string that ranges from the prefix to the next occurrence of the delimiter are grouped as a single result",
        "description": "如果请求中指定了delimiter参数，则OSS返回的响应中包含CommonPrefixes元素。该元素标明以delimiter结尾，并有共同前缀的Object名称的集合。\n",
        "type": "object",
        "properties": {
            "Prefix": {
                "title": "The prefix that the names of returned objects contain",
                "description": "本次查询结果的前缀。",
                "type": "string",
                "example": "fun/"
            }
        }
    },
    "CompleteMultipartUpload": {
        "title": "A short description of struct",
        "description": "保存CompleteMultipartUpload请求内容的容器。",
        "type": "object",
        "properties": {
            "Part": {
                "title": "The information of all parts",
                "description": "保存已上传Part信息的容器。\n",
                "type": "array",
                "items": {
                    "description": "保存已上传Part信息的容器。\n",
                    "type": "object",
                    "properties": {
                        "PartNumber": {
                            "title": "Part number of the part",
                            "description": "Part数目。",
                            "type": "integer",
                            "format": "int64",
                            "example": "8"
                        },
                        "ETag": {
                            "title": "The ETag of the part.",
                            "description": "Object生成时会创建相应的ETag ，ETag用于标识一个Object的内容。\n\n通过CompleteMultipartUpload请求创建的Object，ETag值是基于一定计算规则生成的唯一值，但不是其内容的MD5值。\n\n> ETag值可以用于检查Object内容是否发生变化。不建议使用ETag作为Object内容的MD5来校验数据完整性。",
                            "type": "string",
                            "example": "3349DC700140D7F86A0784842780****"
                        }
                    }
                }
            }
        }
    },
    "CompressionType": {
        "title": "A short description of struct",
        "description": "指定文件压缩类型（可选）。",
        "type": "string",
        "example": "None",
        "enum": [
            "None",
            "GZIP"
        ]
    },
    "CopyObjectResult": {
        "title": "A short description of struct",
        "description": "CopyObject的结果。",
        "type": "object",
        "properties": {
            "ETag": {
                "title": "description",
                "description": "Object生成时会创建相应的ETag ，ETag用于标识一个Object的内容。\n  - 对于PutObject请求创建的Object，ETag值是其内容的MD5值。\n  - 对于其他方式创建的Object，ETag值是基于一定计算规则生成的唯一值，但不是其内容的MD5值。\n\n>ETag值可以用于检查Object内容是否发生变化。不建议使用ETag作为Object内容的MD5来校验数据完整性。\n默认值：无",
                "type": "string",
                "example": "\t\n5B3C1A2E053D763E1B002CC607C5****"
            },
            "LastModified": {
                "title": "description",
                "description": "最近一次修改的时间。\n",
                "type": "string",
                "example": "Fri, 24 Feb 2012 07:18:48 GMT"
            }
        }
    },
    "CopyPartResult": {
        "title": "A short description of struct",
        "description": "CopyObject的结果。",
        "type": "object",
        "properties": {
            "ETag": {
                "title": "A short description of ETag",
                "description": "Object生成时会创建相应的ETag ，ETag用于标识一个Object的内容。\n通过CompleteMultipartUpload请求创建的Object，ETag值是基于一定计算规则生成的唯一值，但不是其内容的MD5值。\n\n> ETag值可以用于检查Object内容是否发生变化。不建议使用ETag作为Object内容的MD5来校验数据完整性。\n",
                "type": "string",
                "example": "3349DC700140D7F86A0784842780****"
            },
            "LastModified": {
                "title": "A short description of LastModified",
                "description": "Part上传的时间。",
                "type": "string",
                "format": "iso8601",
                "example": "2012-02-23T07:01:34.000Z"
            }
        }
    },
    "CreateAccessPointConfiguration": {
        "title": "保存接入点信息的容器。",
        "description": "保存接入点信息的容器。",
        "type": "object",
        "properties": {
            "AccessPointName": {
                "title": "接入点名称",
                "description": "接入点名称。接入点命名规范如下：\n\n- 接入点名称在当前阿里云账号单个地域内唯一。\n\n- 不允许以-ossalias结尾。\n\n- 只能包括小写字母、数字和短划线（-），不能以短划线（-）开头或结尾。\n\n- 命名长度为3~19个字符。",
                "type": "string",
                "example": "ap-01"
            },
            "NetworkOrigin": {
                "title": "接入点网络来源。",
                "description": "接入点网络来源。",
                "$ref": "#/components/schemas/AccessPointNetworkOrigin"
            },
            "VpcConfiguration": {
                "title": "保存VPC网络来源信息的容器。",
                "description": "保存VPC网络来源信息的容器。",
                "$ref": "#/components/schemas/AccessPointVpcConfiguration"
            }
        }
    },
    "CreateAccessPointResult": {
        "title": "保存接入点信息的容器。",
        "description": "保存接入点信息的容器。",
        "type": "object",
        "properties": {
            "AccessPointArn": {
                "title": "接入点ARN。",
                "description": "接入点ARN。",
                "$ref": "#/components/schemas/AccessPointArn"
            },
            "Alias": {
                "title": "接入点别名。",
                "description": "接入点别名。",
                "$ref": "#/components/schemas/AccessPointAlias"
            }
        }
    },
    "CreateBucketConfiguration": {
        "title": "The configuration of a bucket.",
        "description": "Bucket存储类型和数据容灾类型的配置信息。",
        "type": "object",
        "properties": {
            "StorageClass": {
                "description": "Bucket的存储类型。 取值范围如下：\n\n- Standard（默认）：标准存储\n- IA：低频访问\n- Archive：归档存储\n- ColdArchive：冷归档存储",
                "enumValueTitles": {},
                "$ref": "#/components/schemas/StorageClass"
            },
            "DataRedundancyType": {
                "description": "指定Bucket的数据容灾类型。\n\n- LRS（默认值）\n<br>本地冗余LRS，将您的数据冗余存储在同一个可用区的不同存储设备上，可支持两个存储设备并发损坏时，仍维持数据不丢失，可正常访问。\n\n- ZRS\n<br>同城冗余ZRS采用多可用区（AZ）机制，将您的数据冗余存储在同一地域（Region）的3个可用区。可支持单个可用区（机房）整体故障时（例如断电、火灾等），仍然能够保障数据的正常访问。\n> 归档类型的Bucket不支持设置同城冗余。</props>",
                "enumValueTitles": {},
                "$ref": "#/components/schemas/DataRedundancyType"
            }
        }
    },
    "CreateSelectMetaProcess": {
        "description": "CreateSelectMeta可选的x-oss-process参数",
        "type": "string",
        "example": "csv/meta"
    },
    "DataRedundancyType": {
        "title": "The type of disaster recovery for a bucket.",
        "description": "Bucket的数据容灾类型。取值范围如下：\n\n- LRS（默认） ：本地冗余LRS，将您的数据冗余存储在同一个可用区的不同存储设备上，可支持两个存储设备并发损坏时，仍维持数据不丢失，可正常访问。\n- ZRS：同城冗余ZRS，采用多可用区（AZ）机制，将您的数据冗余存储在同一地域（Region）的3个可用区。可支持单个可用区（机房）整体故障时（例如断电、火灾等），仍然能够保障数据的正常访问。\n>归档类型的Bucket不支持设置同城冗余。",
        "type": "string",
        "example": "LRS",
        "default": "LRS",
        "enum": [
            "LRS",
            "ZRS"
        ]
    },
    "Delete": {
        "title": "A short description of struct",
        "description": "保存DeleteMultipleObjects请求的容器。",
        "type": "object",
        "properties": {
            "Quiet": {
                "title": "description",
                "description": "打开简单响应模式的开关。\nDeleteMultipleObjects提供以下两种消息返回模式：\n  - 简单模式（quiet）：OSS不返回消息体。\n  - 详细模式（verbose）：OSS返回的消息体中会包含所有删除Object的结果。默认采用详细模式。\n\n有效值：**true**（开启简单模式）、**false**（开启详细模式）\n默认值：**false**\n",
                "type": "boolean",
                "example": "false"
            },
            "Object": {
                "title": "description",
                "description": "保存一个Object信息的容器。",
                "type": "array",
                "items": {
                    "description": "对象标识符。",
                    "$ref": "#/components/schemas/ObjectIdentifier"
                }
            }
        }
    },
    "DeleteMarkerEntry": {
        "title": "Information about the delete marker",
        "description": "保存删除标记的容器。\n\n",
        "type": "object",
        "properties": {
            "Key": {
                "title": "The name of the object",
                "description": "Object的名称。",
                "type": "string",
                "example": "example"
            },
            "VersionId": {
                "title": "The version ID of the object",
                "description": "Object的版本ID。\n",
                "type": "string",
                "example": "CAEQMxiBgMDNoP2D0BYiIDE3MWUxNzgxZDQxNTRiODI5OGYwZGMwNGY3MzZjN****"
            },
            "IsLatest": {
                "title": "Indicates whether the version is the current version",
                "description": "Object是否为当前版本。\n取值：\n\n- true：Object为当前版本。\n\n- false：Object为非当前版本。\n",
                "type": "boolean",
                "enumValueTitles": {
                    "true": "true",
                    "false": "false"
                },
                "example": "true",
                "default": "false"
            },
            "LastModified": {
                "title": "The last modified time of the object",
                "description": "Object最后被修改的时间。",
                "type": "string",
                "format": "iso8601",
                "example": "2019-04-09T07:27:28.000Z"
            },
            "Owner": {
                "description": "保存Bucket拥有者信息的容器。",
                "$ref": "#/components/schemas/Owner"
            }
        }
    },
    "DeletedObject": {
        "title": "A short description of struct",
        "description": "保存被成功删除的Object的容器。\n\n",
        "type": "object",
        "properties": {
            "Key": {
                "title": "description",
                "description": "被删除Object的名字。",
                "type": "string",
                "example": "multipart.data"
            },
            "DeleteMarker": {
                "title": "description",
                "description": "表示该版本是否为删除标记。true为是，false为否。\n> 只有当创建删除标记和永久删除删除标记时，才会返回该元素，且值为true。",
                "type": "boolean",
                "enumValueTitles": {
                    "true": "true",
                    "false": "false"
                },
                "example": "true"
            },
            "DeleteMarkerVersionId": {
                "title": "description",
                "description": "表示删除标记对应的版本ID。",
                "type": "string",
                "example": "CAEQMhiBgIDB3aWB0BYiIGUzYTA3YzliMzVmNzRkZGM5NjllYTVlMjYyYWEy****"
            },
            "VersionId": {
                "title": "description",
                "description": "Object对应的版本ID。",
                "type": "string",
                "example": "CAEQNRiBgIDyz.6C0BYiIGQ2NWEwNmVhNTA3ZTQ3MzM5ODliYjM1ZTdjYjA4****"
            }
        }
    },
    "EncodeType": {
        "title": "specifies the encoding method to use",
        "description": "指明返回结果中编码使用的类型。如果请求的参数中指定了encoding-type，那返回的结果会对Key进行编码。\n",
        "type": "string",
        "example": "URL",
        "enum": [
            "url"
        ]
    },
    "Endpoint": {
        "title": "访问域名",
        "description": "访问域名",
        "type": "string",
        "example": "oss-cn-hangzhou.aliyuncs.com"
    },
    "Error": {
        "title": "Error responses",
        "description": "错误响应。",
        "type": "object",
        "properties": {
            "Code": {
                "title": "The error code that OSS returns to the user",
                "description": "错误码。",
                "type": "string",
                "example": "AccessDenied"
            },
            "Message": {
                "title": "The detailed error message provided by OSS",
                "description": "错误信息。",
                "type": "string",
                "example": "Anonymous user has no right to access this bucket."
            },
            "RequestId": {
                "title": "The ID that uniquely identifies a request",
                "description": "请求ID。",
                "type": "string",
                "example": "654D97A16F8C26383287EAAF"
            },
            "HostId": {
                "title": "The ID of the host in the accessed OSS cluster",
                "description": "访问OSS所用的域名。",
                "type": "string",
                "example": "example-bucket.oss-cn-hangzhou.aliyuncs.com"
            }
        }
    },
    "ErrorDocument": {
        "title": "A short description of struct",
        "description": "404页面的容器。",
        "type": "object",
        "properties": {
            "Key": {
                "title": "description",
                "description": "错误页面。\n",
                "type": "string",
                "example": "error.html"
            },
            "HttpStatus": {
                "title": "description",
                "description": "返回错误页面时的HTTP状态码。\n",
                "type": "string",
                "example": "404"
            }
        }
    },
    "ExtendWormConfiguration": {
        "title": "The configuration of extending the retention period of objects in a bucket",
        "description": "根节点。",
        "type": "object",
        "properties": {
            "RetentionPeriodInDays": {
                "title": "The number of days for which objects can be retained",
                "description": "指定Object的保留天数。",
                "type": "integer",
                "format": "int32",
                "example": "366"
            }
        }
    },
    "FileHeaderInfo": {
        "title": "A short description of struct",
        "description": "指定CSV文件头信息（可选）。\n取值：\n  - Use：该CSV文件有头信息，可以用CSV列名作为Select中的列名。\n  - Ignore：该CSV文件有头信息，但不可用CSV列名作为Select中的列名。\n  - None：该文件没有头信息，为默认值。\n\n",
        "type": "string",
        "example": "Use",
        "enum": [
            "USE",
            "IGNORE",
            "NONE"
        ]
    },
    "GetAccessPointResult": {
        "title": "保存接入点信息的容器。",
        "description": "保存接入点信息的容器。",
        "type": "object",
        "properties": {
            "AccessPointName": {
                "description": "接入点名称。",
                "$ref": "#/components/schemas/AccessPointName"
            },
            "Bucket": {
                "title": "配置接入点的Bucket名称。",
                "description": "配置接入点的Bucket名称。",
                "type": "string",
                "example": "example-bucket"
            },
            "AccountId": {
                "title": "配置接入点的阿里云账号UID。",
                "description": "配置接入点的阿里云账号UID。",
                "type": "string",
                "example": "10378****8768"
            },
            "NetworkOrigin": {
                "title": "接入点网络来源。返回值如下：  vpc：限制仅支持通过指定的VPC ID访问接入点。  internet：同时持通过外网和内网Endpoint互联网访问接入点。",
                "description": "接入点网络来源。返回值如下：  vpc：限制仅支持通过指定的VPC ID访问接入点。  internet：同时持通过外网和内网Endpoint互联网访问接入点。",
                "$ref": "#/components/schemas/AccessPointNetworkOrigin"
            },
            "VpcConfiguration": {
                "title": "保存VPC网络来源信息的容器。",
                "description": "保存VPC网络来源信息的容器。",
                "$ref": "#/components/schemas/AccessPointVpcConfiguration"
            },
            "AccessPointArn": {
                "description": "接入点ARN。",
                "$ref": "#/components/schemas/AccessPointArn"
            },
            "Alias": {
                "description": "接入点别名。",
                "$ref": "#/components/schemas/AccessPointAlias"
            },
            "Status": {
                "description": "接入点所处状态。",
                "$ref": "#/components/schemas/AccessPointStatus"
            },
            "Endpoints": {
                "title": "保存接入点网络来源信息的容器。",
                "description": "保存接入点网络来源信息的容器。",
                "type": "object",
                "properties": {
                    "PublicEndpoint": {
                        "title": "接入点的外网Endpoint。",
                        "description": "接入点的外网Endpoint。",
                        "$ref": "#/components/schemas/Endpoint"
                    }
                }
            },
            "InternalEndpoint": {
                "title": "接入点的内网Endpoint。",
                "description": "接入点的内网Endpoint。",
                "$ref": "#/components/schemas/Endpoint"
            }
        }
    },
    "Grant": {
        "description": "Bucket的读写权限ACL。\n\n",
        "$ref": "#/components/schemas/ObjectACL"
    },
    "HttpsConfiguration": {
        "title": "存储空间安全传输层配置",
        "description": "存储空间TLS版本配置",
        "type": "object",
        "properties": {
            "TLS": {
                "title": "存储空间TLS版本配置",
                "description": "存储空间TLS版本配置",
                "type": "object",
                "properties": {
                    "Enable": {
                        "title": "是否启用TLS版本配置",
                        "description": "是否启用TLS版本配置",
                        "type": "boolean",
                        "required": true,
                        "enumValueTitles": {
                            "true": "开启TLS版本设置",
                            "false": "关闭TLS版本设置"
                        },
                        "example": "true"
                    },
                    "TLSVersion": {
                        "title": "TLS版本列表",
                        "description": "TLS版本列表",
                        "type": "array",
                        "items": {
                            "description": "TLS版本",
                            "type": "string",
                            "enumValueTitles": {
                                "TLSv1.3": "TLSv1.3",
                                "TLSv1.2": "TLSv1.2",
                                "TLSv1.1": "TLSv1.1",
                                "TLSv1.0": "TLSv1.0"
                            },
                            "example": "TLSv1.2"
                        }
                    }
                }
            }
        }
    },
    "IndexDocument": {
        "title": "A short description of struct",
        "description": "默认主页的容器。\n\n",
        "type": "object",
        "properties": {
            "Suffix": {
                "title": "description",
                "description": "默认主页。",
                "type": "string",
                "example": "index.html"
            },
            "SupportSubDir": {
                "title": "description",
                "description": "访问子目录时，是否支持转到子目录下的默认主页。取值范围如下：\n  - **true**：转到子目录下的默认主页。\n  - **false**（默认）：不转到子目录下的默认主页，而是转到根目录下的默认主页。\n\n假设默认主页为index.html，要访问`bucket.oss-cn-hangzhou.aliyuncs.com/subdir/`，如果设置**SupportSubDir**为false，则转到`bucket.oss-cn-hangzhou.aliyuncs.com/index.html`；如果设置**SupportSubDir**为true，则转到`bucket.oss-cn-hangzhou.aliyuncs.com/subdir/index.html`。",
                "type": "boolean",
                "enumValueTitles": {
                    "true": "true",
                    "false": "false"
                },
                "example": "false"
            },
            "Type": {
                "title": "description",
                "description": "设置默认主页后，访问以非正斜线（/）结尾的Object，且该Object不存在时的行为。 只有设置**SupportSubDir**为true时才生效，且生效的顺序在RoutingRule之后、ErrorFile之前。\n假设默认主页为index.html，要访问的文件路径为`bucket.oss-cn-hangzhou.aliyuncs.com/abc`，且abc这个Object不存在，此时**Type**的不同取值对应的行为如下：\n  - **0**（默认）：检查abc/index.html是否存在（即`Object + 正斜线（/）+ 主页`的形式），如果存在则返回302，Location头为`/abc/`的URL编码（即`正斜线（/） + Object + 正斜线（/）`的形式），如果不存在则返回404，继续检查ErrorFile。\n  - **1**：直接返回404，报错NoSuchKey，继续检查ErrorFile。\n  - **2**：检查abc/index.html是否存在，如果存在则返回该Object的内容；如果不存在则返回404，继续检查ErrorFile。\n\n",
                "type": "string",
                "example": "0"
            }
        }
    },
    "InitiateWormConfiguration": {
        "title": "The confiiguration of a retention policy",
        "description": "根节点。",
        "type": "object",
        "properties": {
            "RetentionPeriodInDays": {
                "title": "The number of days for which objects can be retained",
                "description": "指定Object保留天数。",
                "type": "integer",
                "format": "int32",
                "required": true,
                "example": "365"
            }
        }
    },
    "InputSerialization": {
        "title": "A short description of struct",
        "description": "保存Select请求的容器。",
        "type": "object",
        "properties": {
            "CompressionType": {
                "description": "指定文件压缩类型（可选）。目前不支持任何压缩，即取值只能是None。",
                "example": "None",
                "$ref": "#/components/schemas/CompressionType"
            },
            "CSV": {
                "description": "指定CSV输入格式。",
                "$ref": "#/components/schemas/CSVInput"
            },
            "JSON": {
                "description": "指定JSON输入格式。",
                "$ref": "#/components/schemas/JSONInput"
            }
        }
    },
    "InventoryConfiguration": {
        "title": "The configuration of a inventory task",
        "description": "存储清单配置信息的容器。\n\n",
        "type": "object",
        "properties": {
            "Id": {
                "title": "The specified inventory list name, which must be globally unique in the bucket",
                "description": "自定义清单名称，清单名称在当前Bucket下必须唯一。",
                "type": "string",
                "example": "report1"
            },
            "IsEnabled": {
                "title": "Indicates whether the inventory function is enabled",
                "description": "是否启用清单功能。取值范围如下：\n\n- true：启用清单功能。\n- false：不启用清单功能。\n",
                "type": "boolean",
                "enumValueTitles": {
                    "true": "true",
                    "false": "false"
                },
                "example": "true"
            },
            "Destination": {
                "description": "存放清单结果。",
                "$ref": "#/components/schemas/InventoryDestination"
            },
            "Schedule": {
                "description": "存放清单导出周期信息的容器。",
                "$ref": "#/components/schemas/InventorySchedule"
            },
            "Filter": {
                "description": "清单筛选的前缀。指定前缀后，清单将筛选出符合前缀设置的对象。",
                "$ref": "#/components/schemas/InventoryFilter"
            },
            "IncludedObjectVersions": {
                "description": "是否在清单中包含Object版本信息。\n取值范围如下：\n\n- All：导出Object的所有版本信息。\n\n- Current：导出Object的当前版本信息。\n",
                "enumValueTitles": {
                    "All": "All",
                    "Current": "Current"
                },
                "example": "All",
                "$ref": "#/components/schemas/InventoryIncludedObjectVersions"
            },
            "OptionalFields": {
                "title": "The container that stores the configuration fields included in the inventory list",
                "description": "清单结果中包含的配置项列表。",
                "type": "object",
                "properties": {
                    "Field": {
                        "title": "field list",
                        "description": "清单结果中包含的配置项。\n可选的配置项包括：\n\n- Size：Object的大小。\n- LastModifiedDate：Object的最后修改时间。\n- ETag：Object的ETag值，用于标识Object的内容。\n- StorageClass：Object的存储类型。\n- IsMultipartUploaded：是否为通过分片上传方式上传的Object。\n- EncryptionStatus：Object是否加密。\n\n",
                        "type": "array",
                        "items": {
                            "description": "清单结果中包含的配置项。",
                            "$ref": "#/components/schemas/InventoryOptionalField"
                        }
                    }
                }
            }
        }
    },
    "InventoryDestination": {
        "title": "The information about the bucket that stores the exported inventory list",
        "description": "存放清单结果的信息。",
        "type": "object",
        "properties": {
            "OSSBucketDestination": {
                "title": "The information about the bucket that stores the exported inventory list",
                "description": "清单结果导出后存放的Bucket信息。",
                "$ref": "#/components/schemas/InventoryOSSBucketDestination"
            }
        }
    },
    "InventoryEncryption": {
        "title": "The container that stores the encryption method of the inventory list",
        "description": "清单文件的加密方式。",
        "type": "object",
        "properties": {
            "SSE-OSS": {
                "title": "The container that stores the information about the SSE-OSS encryption method",
                "description": "保存SSE-OSS加密方式的容器。",
                "$ref": "#/components/schemas/SSEOSS"
            },
            "SSE-KMS": {
                "title": "The container that stores the CMK used in the SSE-KMS encryption method",
                "description": "保存SSE-KMS加密密钥的容器。",
                "$ref": "#/components/schemas/SSEKMS"
            }
        }
    },
    "InventoryFilter": {
        "title": "Contains the prefix used to filter the objects in the inventory list",
        "description": "清单筛选的前缀。指定前缀后，清单将筛选出符合前缀设置的对象。",
        "type": "object",
        "properties": {
            "Prefix": {
                "title": "The prefix specified in the inventory rule",
                "description": "筛选规则的匹配前缀。",
                "type": "string",
                "example": "Pics/"
            }
        }
    },
    "InventoryFormat": {
        "title": "The format of the exported inventory list",
        "description": "取值范围为CSV。",
        "type": "string",
        "example": "CSV",
        "enum": [
            "CSV"
        ]
    },
    "InventoryFrequency": {
        "title": "The frequency that inventory lists are exported",
        "description": "清单文件导出的周期。\n\n有效值：\n- Daily：按天导出清单文件。\n- Weekly：按周导出清单文件。",
        "type": "string",
        "enumValueTitles": {
            "Daily": "Daily",
            "Weekly": "Weekly"
        },
        "example": "Daily",
        "enum": [
            "Daily",
            "Weekly"
        ]
    },
    "InventoryIncludedObjectVersions": {
        "title": "Specifies whether versioning information about the objects is included in the inventory list",
        "description": "是否在清单中包含Object版本信息。取值范围如下：\n\n- All：导出Object的所有版本信息。\n- Current：导出Object的当前版本信息。",
        "type": "string",
        "enumValueTitles": {
            "All": "All",
            "Current": "Current"
        },
        "example": "All",
        "enum": [
            "All",
            "Current"
        ]
    },
    "InventoryOSSBucketDestination": {
        "title": "The information about the bucket that stores the exported inventory list",
        "description": "清单结果导出后存放的Bucket信息。\n",
        "type": "object",
        "properties": {
            "Format": {
                "description": "清单文件的文件格式。 清单文件导出后的格式为使用GZIP压缩的CSV文件。",
                "$ref": "#/components/schemas/InventoryFormat"
            },
            "AccountId": {
                "title": "The account ID granted by the bucket owner",
                "description": "Bucket所有者授予的账户ID。",
                "type": "string",
                "example": "100000000000000"
            },
            "RoleArn": {
                "title": "The name of the role to which the bucket owner grants permissions",
                "description": "具有读取源Bucket所有文件和向目标Bucket写入文件权限的角色名，格式为`acs:ram::uid:role/rolename`。",
                "type": "string",
                "example": "acs:ram::100000000000000:role/AliyunOSSRole"
            },
            "Bucket": {
                "title": "The bucket that stores the exported inventory list",
                "description": "存放导出的清单文件的Bucket。\n",
                "type": "string",
                "example": "acs:oss:::bucket_0001"
            },
            "Prefix": {
                "title": "The path of the exported inventory list",
                "description": "清单文件的存储路径前缀。",
                "type": "string",
                "example": "prefix1/"
            },
            "Encryption": {
                "description": "清单文件的加密方式。",
                "$ref": "#/components/schemas/InventoryEncryption"
            }
        }
    },
    "InventoryOptionalField": {
        "title": "The configuration fields included in the inventory list",
        "description": "清单结果中包含的配置项。\n\n- Size：Object的大小。\n- LastModifiedDate：Object的最后修改时间。\n- ETag：Object的ETag值，用于标识Object的内容。\n- StorageClass：Object的存储类型。\n- IsMultipartUploaded：是否为通过分片上传方式上传的Object。\n- EncryptionStatus：Object是否加密。",
        "type": "string",
        "example": "Size",
        "enum": [
            "Size",
            "LastModifiedDate",
            "ETag",
            "StorageClass",
            "IsMultipartUploaded",
            "EncryptionStatus"
        ]
    },
    "InventorySchedule": {
        "title": "Contains the frequency that inventory lists are exported",
        "description": "Contains the frequency that inventory lists are exported",
        "type": "object",
        "properties": {
            "Frequency": {
                "$ref": "#/components/schemas/InventoryFrequency"
            }
        }
    },
    "JSONInput": {
        "title": "A short description of struct",
        "description": "保存Select请求的容器。",
        "type": "object",
        "properties": {
            "Type": {
                "description": "指定输入JSON的类型。",
                "enumValueTitles": {
                    " LINES": " LINES",
                    "DOCUMENT": "DOCUMENT"
                },
                "example": "DOCUMENT",
                "$ref": "#/components/schemas/JSONType"
            },
            "Range": {
                "title": "description",
                "description": "指定查询文件的范围（可选）。支持两种格式：\n> 使用Range参数查询的文件需要有select meta。关于select meta的更多信息，请参见[CreateSelectObjectMeta](~~74054~~)。\n\n- 按行查询：line-range=start-end。例如line-range=10-20表示扫描第10行到第20行。\n\n- 按Split查询：split-range=start-end。例如split-range=10-20表示扫描第10到第20个split。\n\n<br>其中start和end均为inclusive。其格式和range get中的range参数一致。\n<br>仅在文档是CSV或者JSON Type为LINES时使用。",
                "type": "string",
                "enumValueTitles": {
                    "line-range=start-end": "line-range=start-end",
                    "split-range=start-end": "split-range=start-end"
                },
                "example": "line-range=start-end"
            },
            "ParseJsonNumberAsString": {
                "title": "description",
                "description": "将JSON中的数字（整数和浮点数）解析成字符串。目前JSON中的浮点数解析时会损失精度，如果要完整保留原始数据，则推荐用该选项。如果需要进行数值计算，则可以在SQL中cast成需要的格式，例如int、double、decimal。\n<br>默认值： false",
                "type": "boolean",
                "enumValueTitles": {
                    "true": "true",
                    "false": "false"
                },
                "example": "false"
            }
        }
    },
    "JSONOutput": {
        "title": "A short description of struct",
        "description": "保存Select请求的容器。",
        "type": "object",
        "properties": {
            "RecordDelimiter": {
                "title": "description",
                "description": "指定换行符，以Base64编码。未编码前的值最多为两个字符，以字符的ANSI值表示，例如在Java中使用`\\n`表示换行。\n<br>默认值：`\\n`",
                "type": "string",
                "example": "\\n"
            }
        }
    },
    "JSONType": {
        "title": "A short description of struct",
        "description": "指定输入JSON的类型。\n取值：\n- DOCUMENT：输入数据中的单个JSON对象可以跨行。\n- LINES：输入数据中的每一行都包含一个JSON对象。",
        "type": "string",
        "enumValueTitles": {
            "DOCUMENT": "DOCUMENT",
            "LINES": "LINES"
        },
        "example": "DOCUMENT",
        "enum": [
            "DOCUMENT",
            "LINES"
        ]
    },
    "LifecycleConfiguration": {
        "title": "A short description of struct",
        "description": "Lifecycle配置的容器，最多可容纳1000条规则。",
        "type": "object",
        "properties": {
            "Rule": {
                "title": "description",
                "description": "生命周期规则的容器。Object设置过期时间必须大于转储为IA或者Archive存储类型的时间。\n",
                "type": "array",
                "items": {
                    "description": "生命周期规则的容器。Object设置过期时间必须大于转储为IA或者Archive存储类型的时间。\n",
                    "$ref": "#/components/schemas/LifecycleRule"
                }
            }
        }
    },
    "LifecycleRule": {
        "title": "生命周期规则",
        "description": "生命周期规则的容器。\n  - 不支持Archive Bucket创建转储规则。\n  - Object设置过期时间必须大于转储为IA或者Archive存储类型的时间。\n\n",
        "type": "object",
        "properties": {
            "ID": {
                "title": "规则标识",
                "description": "标识规则的唯一ID。最多由255个字节组成。如没有指定，或者该值为空时，OSS会自动生成一个唯一ID。\n",
                "type": "string",
                "required": true,
                "example": "rule1"
            },
            "Prefix": {
                "title": "指定规则所适用的前缀",
                "description": "指定规则所适用的前缀（Prefix）。Prefix不可重复。\n  - 若指定了Prefix，则表示此规则仅适用于Bucket中与Prefix匹配的Object。\n  - 若Prefix置空，则表示此规则适用于Bucket中的所有Object。",
                "type": "string",
                "required": false,
                "example": "tmp/"
            },
            "Status": {
                "title": "规则的状态",
                "description": "是否启用规则。取值范围如下：\n- Enabled：表示启用规则，OSS会定期执行该规则。\n- Disabled：表示不启用规则，OSS会忽略该规则。",
                "type": "string",
                "required": true,
                "enumValueTitles": {
                    "Enabled": "Enabled",
                    "Disabled": "Disabled"
                },
                "example": "Enabled"
            },
            "Expiration": {
                "title": "过期属性",
                "description": "指定Object生命周期规则的过期属性。 对于受版本控制的Bucket，指定的过期属性只对Object的当前版本生效。\n<br>Object的过期时间必须大于转储为IA或Archive类型的时间。",
                "type": "object",
                "properties": {
                    "CreatedBeforeDate": {
                        "title": "日期",
                        "description": "指定一个日期，OSS会对最后更新时间早于该日期的数据执行生命周期规则。日期格式为yyyy-MM-ddT00:00:00.000Z。\n<br>日期需要按照ISO8601标准表示并使用UTC时间，且必须为UTC的零点。",
                        "type": "string",
                        "format": "iso8601",
                        "example": "2002-10-11T00:00:00.000Z"
                    },
                    "Days": {
                        "title": "天数",
                        "description": "指定生命周期规则在距离Object最后更新多少天后生效。",
                        "type": "integer",
                        "format": "int32",
                        "example": "1"
                    },
                    "ExpiredObjectDeleteMarker": {
                        "title": "自动移除过期删除标记",
                        "description": "指定是否自动移除过期删除标记。\n\n- true：表示自动移除过期删除标记。取值为true时，不支持指定Days或CreatedBeforeDate。\n\n- false：表示不会自动移除过期删除标记。取值为false时，则必须指定Days或CreatedBeforeDate。",
                        "type": "boolean",
                        "enumValueTitles": {
                            "true": "true",
                            "false": "false"
                        },
                        "example": "true"
                    }
                }
            },
            "Transition": {
                "title": "存储类型转换",
                "description": "指定Object在有效生命周期中，OSS何时将Object转储为IA、Archive和ColdArchive存储类型 。\nStandard Bucket中的Standard Object可以转储为IA、Archive或ColdArchive存储类型，但转储Archive存储类型的时间必须比转储IA存储类型的时间长。例如Transition\nIA设置Days为30，Transition Archive设置Days必须大于30。\n\n> Days或CreatedBeforeDate只能二选一。\n\n",
                "type": "array",
                "items": {
                    "description": "指定Object在有效生命周期中，OSS何时将Object转储为IA、Archive和ColdArchive存储类型 。\nStandard Bucket中的Standard Object可以转储为IA、Archive或ColdArchive存储类型，但转储Archive存储类型的时间必须比转储IA存储类型的时间长。例如Transition\nIA设置Days为30，Transition Archive设置Days必须大于30。\n\n> Days或CreatedBeforeDate只能二选一。\n\n",
                    "type": "object",
                    "properties": {
                        "CreatedBeforeDate": {
                            "title": "日期",
                            "description": "指定一个日期，OSS会对最后更新时间早于该日期的数据执行生命周期规则。日期必须服从ISO8601的格式，且要求是UTC的零点。\n",
                            "type": "string",
                            "format": "iso8601",
                            "example": "2002-10-11T00:00:00.000Z"
                        },
                        "Days": {
                            "title": "天数",
                            "description": "指定生命周期规则在距离Object最后更新多少天后生效。\n",
                            "type": "integer",
                            "format": "int32",
                            "example": "1"
                        },
                        "StorageClass": {
                            "description": "指定Object转储的存储类型。\n\n- IA：低频访问\n- Archive：归档存储\n- ColdArchive：冷归档存储\n\n> IA Bucket中的Object可以转储为Archive或者ColdArchive存储类型，但不支持转储为Standard存储类型。\n",
                            "enumValueTitles": {},
                            "$ref": "#/components/schemas/StorageClass"
                        },
                        "IsAccessTime": {
                            "title": "基于最后访问时间",
                            "description": "指定是否基于last access time匹配规则。取值如下：\n\n- true：采用Object的last access time（最后一次访问时间）匹配规则。\n\n- false（默认值）：采用Object的last modify time（最后一次修改时间）匹配规则。",
                            "type": "boolean",
                            "example": "true"
                        },
                        "ReturnToStdWhenVisit": {
                            "title": "再次访问是否转回标准存储",
                            "description": "指定Object转为非标准存储后，再次访问时是否将Object转为标准存储。只有当IsAccessTime设置为true时才有效。取值如下：\n\n- true：Object由非标准存储转为标准存储。\n\n- false（默认值）：Object仍为非标准存储。",
                            "type": "boolean",
                            "example": "true"
                        },
                        "AllowSmallFile": {
                            "title": "小文件是否转储",
                            "description": "基于最后一次访问时间设置生命周期规则时，指定是否将小于64 KB的Object转储为低频、归档、冷归档文件类型。取值如下：\n\n- true（默认值）：转储包含小于64 KB在内的所有Object。当Object小于64 KB时，按照64 KB计算。当Object大于或等于64 KB时，按照实际大小计算。设置为true时，可能会增加存储费用。\n\n- false：不转储小于64 KB的Object。",
                            "type": "boolean",
                            "example": "true"
                        }
                    }
                }
            },
            "AbortMultipartUpload": {
                "title": "未完成分片上传的过期属性",
                "description": "指定未完成分片上传的过期属性。\n",
                "type": "object",
                "properties": {
                    "Days": {
                        "title": "天数",
                        "description": "指定生命周期规则在距离Object最后更新多少天后生效。\n",
                        "type": "integer",
                        "format": "int32",
                        "example": "1"
                    },
                    "CreatedBeforeDate": {
                        "title": "日期",
                        "description": "指定一个日期，OSS会对最后更新时间早于该日期的数据执行生命周期规则。日期必须服从ISO8601的格式，且要求是UTC的零点。\n",
                        "type": "string",
                        "format": "iso8601",
                        "example": "2002-10-11T00:00:00.000Z"
                    }
                }
            },
            "Tag": {
                "title": "标签列表",
                "description": "指定规则所适用的对象标签，可设置多个。\n",
                "type": "array",
                "items": {
                    "description": "指定规则所适用的对象标签，可设置多个。\n",
                    "$ref": "#/components/schemas/Tag"
                }
            },
            "NoncurrentVersionExpiration": {
                "title": "非当前版本生命周期规则的过期属性",
                "description": "指定Object非当前版本生命周期规则的过期属性。\n",
                "type": "object",
                "properties": {
                    "NoncurrentDays": {
                        "title": "天数",
                        "description": "指定生命周期规则在Object成为非当前版本多少天后生效。\n",
                        "type": "integer",
                        "format": "int32",
                        "example": "5"
                    }
                }
            },
            "NoncurrentVersionTransition": {
                "title": "非当前版本生命周期规则的转储属性",
                "description": "在有效的生命周期规则中，OSS何时将指定Object的非当前版本转储为IA或者Archive存储类型 。\nStandard类型的Object转储为Archive类型的时间必须大于转储为IA类型的时间。\n",
                "type": "array",
                "items": {
                    "description": "在有效的生命周期规则中，OSS何时将指定Object的非当前版本转储为IA或者Archive存储类型 。\nStandard类型的Object转储为Archive类型的时间必须大于转储为IA类型的时间。\n",
                    "type": "object",
                    "properties": {
                        "NoncurrentDays": {
                            "title": "天数",
                            "description": "指定生命周期规则在Object成为非当前版本多少天后生效。\n",
                            "type": "integer",
                            "format": "int32",
                            "example": "5"
                        },
                        "StorageClass": {
                            "title": "存储类型",
                            "description": "指定Object转储的存储类型。\n\n- IA：低频访问\n- Archive：归档存储\n- ColdArchive：冷归档存储\n\n> IA Bucket中的Object可以转储为Archive或者ColdArchive存储类型，但不支持转储为Standard存储类型。\n",
                            "enumValueTitles": {},
                            "$ref": "#/components/schemas/StorageClass"
                        },
                        "IsAccessTime": {
                            "title": "基于最后访问时间",
                            "description": "指定是否基于last access time匹配规则。取值如下：\n\n- true：采用Object的last access time（最后一次访问时间）匹配规则。\n\n- false（默认值）：采用Object的last modify time（最后一次修改时间）匹配规则。",
                            "type": "boolean",
                            "example": "true"
                        },
                        "ReturnToStdWhenVisit": {
                            "title": "再次访问是否转回标准存储",
                            "description": "指定Object转为非标准存储后，再次访问时是否将Object转为标准存储。只有当IsAccessTime设置为true时才有效。取值如下：\n\n- true：Object由非标准存储转为标准存储。\n\n- false（默认值）：Object仍为非标准存储。",
                            "type": "boolean",
                            "example": "true"
                        },
                        "AllowSmallFile": {
                            "title": "小文件是否转储",
                            "description": "基于最后一次访问时间设置生命周期规则时，指定是否将小于64 KB的Object转储为低频、归档、冷归档文件类型。取值如下：\n\n- true（默认值）：转储包含小于64 KB在内的所有Object。当Object小于64 KB时，按照64 KB计算。当Object大于或等于64 KB时，按照实际大小计算。设置为true时，可能会增加存储费用。\n\n- false：不转储小于64 KB的Object。",
                            "type": "boolean",
                            "example": "true"
                        }
                    }
                }
            },
            "Filter": {
                "title": "本条规则的排除条件",
                "description": "本条规则的排除条件。",
                "type": "object",
                "properties": {
                    "Not": {
                        "title": "满足何种规则跳过",
                        "description": "满足何种规则跳过。",
                        "type": "object",
                        "properties": {
                            "Prefix": {
                                "title": "排除规则适用的前缀",
                                "description": "排除规则适用的前缀。",
                                "type": "string",
                                "example": "tmp/not/"
                            },
                            "Tag": {
                                "title": "排除规则适用的标签",
                                "description": "排除规则适用的标签。",
                                "$ref": "#/components/schemas/Tag"
                            }
                        }
                    }
                }
            }
        }
    },
    "ListAccessPointsResult": {
        "title": "保存本次列举接入点信息结果的容器。",
        "description": "保存本次列举接入点信息结果的容器。",
        "type": "object",
        "properties": {
            "IsTruncated": {
                "title": "请求中返回的结果是否被截断。返回值如下：  true：表示本次未返回全部结果。  false：表示本次已返回全部结果。",
                "description": "请求中返回的结果是否被截断。返回值如下：  true：表示本次未返回全部结果。  false：表示本次已返回全部结果。",
                "type": "string",
                "example": "true"
            },
            "NextContinuationToken": {
                "title": "表明本次ListAccessPoints请求包含后续结果，需要将NextContinuationToken指定为continuation-token继续获取结果。",
                "description": "表明本次ListAccessPoints请求包含后续结果，需要将NextContinuationToken指定为continuation-token继续获取结果。",
                "type": "string",
                "example": "abc**"
            },
            "AccountId": {
                "title": "接入点所属的阿里云账号UID。",
                "description": "接入点所属的阿里云账号UID。",
                "type": "string",
                "example": "10107***1448150"
            },
            "AccessPoints": {
                "title": "保存所有接入点信息的容器。",
                "description": "保存所有接入点信息的容器。",
                "type": "array",
                "items": {
                    "description": "保存单个接入点信息的容器。",
                    "$ref": "#/components/schemas/AccessPoint"
                }
            }
        }
    },
    "LiveChannel": {
        "title": "A short description of struct",
        "description": "保存返回每个LiveChannel信息的容器。",
        "type": "object",
        "properties": {
            "Name": {
                "title": "description",
                "description": "LiveChannel的名称。\n",
                "type": "string",
                "example": "channel-0"
            },
            "Description": {
                "title": "description",
                "description": "LiveChannel的描述信息。\n",
                "type": "string",
                "example": "test"
            },
            "Status": {
                "title": "description",
                "description": "LiveChannel的状态。\n有效值：\n- disabled：表示禁用LiveChannel。\n- enabled：表示启用LiveChannel。",
                "type": "string",
                "example": "enabled"
            },
            "LastModified": {
                "title": "description",
                "description": "LiveChannel配置的最后修改时间。\n格式：ISO8601\n",
                "type": "string",
                "format": "iso8601",
                "example": "ISO8601"
            },
            "PublishUrls": {
                "description": "保存LiveChannel对应的推流地址的容器。\n",
                "$ref": "#/components/schemas/LiveChannelPublishUrls"
            },
            "PlayUrls": {
                "description": "保存LiveChannel对应的播放地址的容器。\n",
                "$ref": "#/components/schemas/LiveChannelPlayUrls"
            }
        }
    },
    "LiveChannelAudio": {
        "title": "A short description of struct",
        "description": "当Status为Live时，保存音频流信息的容器。\n> Video、Audio容器只有在Status为Live时才会返回，但Status为Live时不一定返回这两个容器。例如，客户端已经连接到LiveChannel，但尚未发送音视频数据，这种情况不会返回这两个容器。\n",
        "type": "object",
        "properties": {
            "Bandwidth": {
                "title": "description",
                "description": "当前音频流的码率。\n> Bandwidth为音频流/视频流最近一段时间内的平均码率。LiveChannel刚切换到Live状态时，返回的Bandwidth值可能为0。\n单位：B/s\n",
                "type": "integer",
                "format": "int64",
                "example": "0"
            },
            "SampleRate": {
                "title": "description",
                "description": "当前音频流的采样率。\n",
                "type": "integer",
                "format": "int64",
                "example": "44100"
            },
            "Codec": {
                "title": "description",
                "description": "当前音频流的编码格式。\n",
                "type": "string",
                "example": "ADPCM"
            }
        }
    },
    "LiveChannelConfiguration": {
        "title": "A short description of struct",
        "description": "保存LiveChannel配置的容器。",
        "type": "object",
        "properties": {
            "Description": {
                "title": "description",
                "description": "LiveChannel的描述信息，最长128字节。\n",
                "type": "string",
                "example": "test"
            },
            "Status": {
                "title": "description",
                "description": " 指定LiveChannel的状态。\n\n有效值：**enabled**、**disabled**\n默认值：**enabled**",
                "type": "string",
                "example": "enabled"
            },
            "Target": {
                "description": "保存转储配置的容器。\n",
                "$ref": "#/components/schemas/LiveChannelTarget"
            },
            "Snapshot": {
                "description": "保存高频截图操作Snapshot选项的容器。\n",
                "$ref": "#/components/schemas/LiveChannelSnapshot"
            }
        }
    },
    "LiveChannelPlayUrls": {
        "title": "A short description of struct",
        "description": "保存播放地址的容器。\n",
        "type": "object",
        "properties": {
            "Url": {
                "title": "description",
                "description": "播放地址。\n",
                "type": "string",
                "example": "http://test-bucket.oss-cn-hangzhou.aliyuncs.com/test-channel/playlist.m3u8"
            }
        }
    },
    "LiveChannelPublishUrls": {
        "title": "A short description of struct",
        "description": "保存推流地址的容器。",
        "type": "object",
        "properties": {
            "Url": {
                "title": "description",
                "description": "推流地址。\n\n>   - 推流地址是未加签名的URL，如Bucket ACL非public-read-write，则需先进行签名才可访问。\n>   - 播放地址是未加签名的URL，如Bucket ACL为private，则需先进行签名才可访问。",
                "type": "string",
                "example": "rtmp://test-bucket.oss-cn-hangzhou.aliyuncs.com/live/test-channel"
            }
        }
    },
    "LiveChannelSnapshot": {
        "title": "A short description of struct",
        "description": "保存高频截图操作Snapshot 选项的容器。",
        "type": "object",
        "properties": {
            "RoleName": {
                "title": "description",
                "description": "用于高频截图操作的角色名称，要求有DestBucket的写权限和向NotifyTopic发消息的权限。\n",
                "type": "string",
                "example": "role_for_snapshot"
            },
            "DestBucket": {
                "title": "description",
                "description": "保存高频截图目标Bucket，要求与当前Bucket是同一个Owner。\n",
                "type": "string",
                "example": "snapshotdest"
            },
            "NotifyTopic": {
                "title": "description",
                "description": "用于通知用户高频截图操作结果的MNS的Topic。\n",
                "type": "string",
                "example": "snapshotnotify"
            },
            "Interval": {
                "title": "description",
                "description": "高频截图的间隔长度。如果该段间隔时间内没有关键帧（I 帧），那么该间隔时间不截图。\n单位：秒\n取值范围：[1, 100]",
                "type": "integer",
                "format": "int64",
                "example": "5"
            }
        }
    },
    "LiveChannelTarget": {
        "title": "A short description of struct",
        "description": "保存转储配置的容器。\n\n",
        "type": "object",
        "properties": {
            "Type": {
                "title": "description",
                "description": "指定转储的类型。\n\n有效值：**HLS**\n\n>   - 转储类型为HLS时，OSS会在生成每个ts文件后更新m3u8文件。m3u8文件中最多包含最近的FragCount个ts文件。\n>   - 转储类型为HLS时，写入当前ts文件的音视频数据时长达到FragDuration指定的时长后，OSS会在收到下一个关键帧的时切换到下一个ts文件；如果max(2*FragDuration,\n                                          60s)后仍未收到下一个关键帧，OSS将强制切换文件，此时可能引起播放时卡顿。",
                "type": "string",
                "example": "HLS"
            },
            "FragDuration": {
                "title": "description",
                "description": "当Type为HLS时，指定每个ts文件的时长。\n单位：秒\n\n取值范围：[1, 100]\n默认值：**5**\n> FragDuration和FragCount的默认值只有在两者都未指定时才会生效；指定了其中一个，则另一个的值也必须指定。",
                "type": "integer",
                "format": "int64",
                "example": "5"
            },
            "FragCount": {
                "title": "description",
                "description": "当Type为HLS时，指定m3u8文件中包含ts文件的个数。\n\n取值范围：[1, 100]\n默认值：**3**\n> FragDuration和FragCount的默认值只有在两者都未指定时才会生效；指定了其中一个，则另一个的值也必须指定。",
                "type": "integer",
                "format": "int64",
                "example": "3"
            },
            "PlaylistName": {
                "title": "description",
                "description": "当Type为HLS时，指定生成的m3u8文件的名称。必须以”.m3u8”结尾，长度范围为[6, 128]。\n\n默认值：**playlist.m3u8**\n取值范围：[6, 128]",
                "type": "string",
                "example": "playlist.m3u8"
            }
        }
    },
    "LiveChannelVideo": {
        "title": "A short description of struct",
        "description": "当Status为Live时，保存视频流信息的容器。\n> **说明** Video、Audio容器只有在Status为Live时才会返回，但Status为Live时不一定返回这两个容器。例如，客户端已经连接到LiveChannel，但尚未发送音视频数据，这种情况不会返回这两个容器。\n",
        "type": "object",
        "properties": {
            "Width": {
                "title": "description",
                "description": "当前视频流的画面宽度。\n单位：像素\n",
                "type": "integer",
                "format": "int64",
                "example": "1280"
            },
            "Height": {
                "title": "description",
                "description": "当前视频流的画面高度。\n单位：像素\n",
                "type": "integer",
                "format": "int64",
                "example": "536"
            },
            "FrameRate": {
                "title": "description",
                "description": "当前视频流的帧率。\n",
                "type": "integer",
                "format": "int64",
                "example": "24"
            },
            "Bandwidth": {
                "title": "description",
                "description": "当前视频流的码率。\n单位：B/s\n",
                "type": "integer",
                "format": "int64",
                "example": "0"
            },
            "Codec": {
                "title": "description",
                "description": "当前视频流的编码格式。\n",
                "type": "string",
                "example": "ADPCM"
            }
        }
    },
    "LiveRecord": {
        "title": "A short description of struct",
        "description": "保存一次推流记录信息的容器。\n",
        "type": "object",
        "properties": {
            "StartTime": {
                "title": "description",
                "description": "推流开始时间，使用ISO8601格式表示。\n",
                "type": "string",
                "example": "2016-07-30T01:53:21.000Z"
            },
            "EndTime": {
                "title": "description",
                "description": "推流结束时间，使用ISO8601格式表示。\n",
                "type": "string",
                "example": "2016-07-30T01:53:31.000Z"
            },
            "RemoteAddr": {
                "title": "description",
                "description": "推流客户端的IP地址。\n",
                "type": "string",
                "example": "10.101.194.148:57632"
            }
        }
    },
    "LocationTransferType": {
        "title": "The container that stores regions in which the destination bucket can be located with the TransferType information",
        "description": "包含TransferType的Location信息容器。\n\n",
        "type": "object",
        "properties": {
            "Location": {
                "title": "The region in which the destination bucket can be located",
                "description": "可复制到的目标Bucket所在的地域。",
                "type": "string",
                "example": "oss-cn-beijing"
            },
            "TransferTypes": {
                "title": "The container that stores the transmission type",
                "description": "传输类型容器。",
                "type": "object",
                "properties": {
                    "Type": {
                        "title": "The link used to transfer data in Cross-region replication",
                        "description": "数据复制时使用的数据传输类型。\n取值：\n  - internal（默认值）：OSS默认传输链路。\n  - oss_acc：传输加速链路。只有创建跨区域复制规则时才能使用传输加速链路。",
                        "type": "string",
                        "example": "oss_acc"
                    }
                }
            }
        }
    },
    "LoggingEnabled": {
        "title": "A short description of struct",
        "description": "访问日志信息的容器。\n",
        "type": "object",
        "properties": {
            "TargetBucket": {
                "title": "存储访问日志的存储空间",
                "description": "指定存储访问日志的Bucket。\n",
                "type": "string",
                "required": true,
                "example": "examplebucket"
            },
            "TargetPrefix": {
                "title": "保存的日志文件前缀",
                "description": "指定保存的日志文件前缀，可以为空。\n",
                "type": "string",
                "example": "MyLog-"
            }
        }
    },
    "MetaQuery": {
        "title": "A short description of struct",
        "description": "查询条件的容器。",
        "type": "object",
        "properties": {
            "NextToken": {
                "title": "翻页的Token",
                "description": "翻页的Token。从NextToken开始按字典序返回Object信息列表。",
                "type": "string",
                "example": "MTIzNDU2Nzg6aW1tdGVzdDpleGFtcGxlYnVja2V0OmRhdGFzZXQwMDE6b3NzOi8vZXhhbXBsZWJ1Y2tldC9zYW1wbGVvYmplY3QxLmpw****"
            },
            "MaxResults": {
                "title": "返回对象的最大个数",
                "description": "返回对象的最大个数，取值范围为0~100。\n不设置此参数或者设置为0时，则默认值为100。",
                "type": "integer",
                "format": "int64",
                "example": "5"
            },
            "Query": {
                "title": "查询条件",
                "description": "查询条件。包括如下选项：\n\n- Operation：操作符。取值范围为eq（等于）、gt（大于）、gte（大于等于）、lt（小于）、 lte（小于等于）、match（模糊查询）、prefix（前缀查询）、and（逻辑与）、or（逻辑或）和not（逻辑非）。\n\n- Field：字段名称。\n\n- Value：字段值。\n\n- SubQueries：子查询条件，包括的选项与简单查询条件相同。只有当Operations为逻辑运算符（and、or和not）时，才需要设置子查询条件。",
                "type": "string",
                "required": true,
                "example": "{\"Field\": \"Size\",\"Value\": \"1048576\",\"Operation\": \"gt\"}"
            },
            "Sort": {
                "title": "对指定字段排序",
                "description": "对指定字段排序。",
                "type": "string",
                "example": "Size"
            },
            "Order": {
                "description": "排序方式。",
                "$ref": "#/components/schemas/MetaQueryOrder"
            },
            "Aggregations": {
                "title": "聚合操作信息",
                "description": "聚合操作信息的容器。",
                "type": "object",
                "properties": {
                    "Aggregation": {
                        "title": "聚合操作信息",
                        "description": "单个聚合操作信息的容器。",
                        "type": "array",
                        "items": {
                            "description": "句号操作信息的容器。",
                            "$ref": "#/components/schemas/MetaQueryAggregation"
                        }
                    }
                }
            }
        }
    },
    "MetaQueryAggregation": {
        "title": "聚合操作信息",
        "description": "聚合操作信息",
        "type": "object",
        "properties": {
            "Field": {
                "title": "字段名称",
                "description": "字段名称",
                "type": "string",
                "example": "Size"
            },
            "Operation": {
                "title": "聚合操作中的操作符",
                "description": "聚合操作中的操作符。\n\n- min：最小值\n- max：最大值\n- average：平均数\n- sum：求和\n- count：计数\n- distinct：去重统计\n- group：分组计数",
                "type": "string",
                "example": "sum"
            }
        }
    },
    "MetaQueryFile": {
        "title": "A short description of struct",
        "description": "A short description of struct",
        "type": "object",
        "properties": {
            "Filename": {
                "title": "对象的完整路径",
                "description": "对象的完整路径",
                "type": "string",
                "example": "exampleobject.txt"
            },
            "Size": {
                "title": "对象大小",
                "description": "对象大小",
                "type": "integer",
                "format": "int64",
                "example": "120"
            },
            "FileModifiedTime": {
                "title": "最近一次修改时间",
                "description": "最近一次修改时间",
                "type": "string",
                "example": "2021-06-29T15:04:05.000000000Z07:00"
            },
            "OSSObjectType": {
                "title": "对象的类型",
                "description": "对象的类型",
                "type": "string",
                "enumValueTitles": {
                    "Multipart": "MultipartUpload上传的文件",
                    "Symlink": "PutSymlink创建的软链接",
                    "Appendable": "AppendObject上传的文件",
                    "Normal": "PutObject上传的文件"
                },
                "example": "Normal"
            },
            "OSSStorageClass": {
                "title": "对象的存储类型",
                "description": "对象的存储类型",
                "type": "string",
                "enumValueTitles": {
                    "Archive": "归档存储类型",
                    "ColdArchive": "冷归档存储类型文件",
                    "IA": "低频文件",
                    "Standard": "标准文件"
                },
                "example": "Standard"
            },
            "ObjectACL": {
                "title": "对象的访问权限",
                "description": "对象的访问权限",
                "type": "string",
                "enumValueTitles": {
                    "default": "遵循存储空间的访问权限",
                    "private": "私有",
                    "public-read": "公共读",
                    "public-read-write": "公共读写"
                },
                "example": "default"
            },
            "ETag": {
                "title": "对象的ETAG",
                "description": "对象的ETAG",
                "type": "string",
                "example": "\"fba9dede5f27731c9771645a3986****\""
            },
            "OSSCRC64": {
                "title": "对象的CRC64校验值",
                "description": "对象的CRC64校验值",
                "type": "string",
                "example": "4858A48BD1466884"
            },
            "ServerSideEncryption": {
                "title": "创建对象时的服务端加密密钥",
                "description": "创建对象时的服务端加密密钥",
                "type": "string",
                "example": "AES256"
            },
            "ServerSideEncryptionCustomerAlgorithm": {
                "title": "创建对象时的服务端加密算法",
                "description": "创建对象时的服务端加密算法",
                "type": "string",
                "example": "SM4"
            },
            "OSSTaggingCount": {
                "title": "对象的标签个数",
                "description": "对象的标签个数",
                "type": "integer",
                "format": "int64",
                "example": "16"
            },
            "OSSTagging": {
                "title": "对象的标签列表",
                "description": "对象的标签列表",
                "type": "object",
                "properties": {
                    "Tagging": {
                        "title": "对象的标签",
                        "description": "对象的标签",
                        "type": "array",
                        "items": {
                            "description": "对象的标签",
                            "$ref": "#/components/schemas/MetaQueryTagging"
                        }
                    }
                }
            },
            "OSSUserMeta": {
                "title": "对象的自定义元数据列表",
                "description": "对象的自定义元数据列表",
                "type": "object",
                "properties": {
                    "UserMeta": {
                        "title": "对象的自定义元数据",
                        "description": "对象的自定义元数据",
                        "type": "array",
                        "items": {
                            "description": "用户自定义元数据",
                            "$ref": "#/components/schemas/MetaQueryUserMeta"
                        }
                    }
                }
            }
        }
    },
    "MetaQueryOrder": {
        "title": "A short description of struct",
        "description": "排序方式。取值范围如下：\n\n- asc：升序。\n\n- desc（默认值）：降序。",
        "type": "string",
        "example": "asc",
        "enum": [
            "asc",
            "desc"
        ]
    },
    "MetaQueryTagging": {
        "title": "A short description of struct",
        "description": "对象所附标签",
        "type": "object",
        "properties": {
            "Key": {
                "title": "key",
                "description": "对象标签键",
                "type": "string",
                "example": "abc"
            },
            "Value": {
                "title": "value",
                "description": "对象标签值",
                "type": "string",
                "example": "test"
            }
        }
    },
    "MetaQueryUserMeta": {
        "title": "A short description of struct",
        "description": "用户自定义元数据",
        "type": "object",
        "properties": {
            "Key": {
                "title": "key",
                "description": "用户自定义元数据键",
                "type": "string",
                "example": "abc"
            },
            "Value": {
                "title": "value",
                "description": "用户自定义元数据值",
                "type": "string",
                "example": "test"
            }
        }
    },
    "ObjectACL": {
        "description": "指定OSS创建Object时的访问权限。\n取值：\n\n- default（默认）：Object遵循所在存储空间的访问权限。\n- private：Object是私有资源。只有Object的拥有者和授权用户有该Object的读写权限，其他用户没有权限操作该Object。\n- public-read：Object是公共读资源。只有Object的拥有者和授权用户有该Object的读写权限，其他用户只有该Object的读权限。请谨慎使用该权限。\n- public-read-write：Object是公共读写资源。所有用户都有该Object的读写权限。请谨慎使用该权限。\n\n关于访问权限的更多信息，请参见**[读写权限ACL](~~100676~~)**。",
        "type": "string",
        "example": "public-read",
        "default": "default",
        "enum": [
            "private",
            "public-read",
            "public-read-write",
            "default"
        ]
    },
    "ObjectIdentifier": {
        "title": "A short description of struct",
        "description": "对象标识符。",
        "type": "object",
        "properties": {
            "Key": {
                "title": "key",
                "description": "对象 Key。",
                "type": "string",
                "required": true,
                "example": "object_key"
            },
            "VersionId": {
                "title": "version id",
                "description": "版本ID。",
                "type": "string",
                "example": "version_20211101141621_d137"
            }
        }
    },
    "ObjectList": {
        "title": "A list of the objects.",
        "description": "文件信息的容器",
        "type": "array",
        "items": {
            "description": "返回的文件元信息。",
            "$ref": "#/components/schemas/ObjectSummary"
        },
        "enumValueTitles": {}
    },
    "ObjectSummary": {
        "title": "Object元信息",
        "description": "返回的文件元信息。",
        "type": "object",
        "properties": {
            "Key": {
                "title": "Object名称",
                "description": "Object的Key。",
                "type": "string",
                "example": "fun/test.jpg"
            },
            "LastModified": {
                "title": "Object最后被修改的时间",
                "description": "Object最后被修改的时间。",
                "type": "string",
                "format": "iso8601",
                "example": "2012-02-24T08:42:32.000Z"
            },
            "ETag": {
                "title": "在每个Object生成时创建，用于标识一个Object的内容",
                "description": "ETag (Entity Tag) 在每个Object生成时创建，用于标识一个Object的内容。\n\n- 对于PutObject请求创建的Object，ETag值是其内容的MD5值。\n\n- 对于其他方式创建的Object，ETag值是基于一定计算规则生成的唯一值，但不是其内容的MD5值。\n\n- ETag值可以用于检查Object内容是否发生变化。不建议使用ETag值作为Object内容的MD5校验数据完整性的依据。",
                "type": "string",
                "example": "5B3C1A2E053D763E1B002CC607C5A0FE1****"
            },
            "Type": {
                "title": "Object类型",
                "description": "Object的类型，包含以下三种：\n\n- 通过简单上传生成的Object类型为Normal。\n\n- 通过分片上传生成的Object类型为Multipart。\n\n- 通过追加上传生成的Object类型为Appendable，且仅支持在Appendable类型的Object后直接追加内容。",
                "type": "string",
                "example": "Normal"
            },
            "Size": {
                "title": "Object的大小，单位为字节",
                "description": "返回Object大小，单位为字节。",
                "type": "integer",
                "format": "int64",
                "example": "344606"
            },
            "StorageClass": {
                "title": "Object的存储类型",
                "description": "Object的存储类型。",
                "$ref": "#/components/schemas/StorageClass"
            },
            "Owner": {
                "title": "Bucket拥有者信息",
                "description": "保存Bucket拥有者信息的容器。",
                "$ref": "#/components/schemas/Owner"
            },
            "ResoreInfo": {
                "title": "Object的解冻状态",
                "description": "Object的解冻状态",
                "type": "string",
                "example": "ongoing-request=\"true”"
            }
        }
    },
    "ObjectVersion": {
        "title": "The version of an object",
        "description": "保存除删除标记以外的Object版本的容器。\n",
        "type": "object",
        "properties": {
            "Key": {
                "title": "The name of the object",
                "description": "Object的名称。\n",
                "type": "string",
                "example": "example"
            },
            "VersionId": {
                "title": "The version ID of the object",
                "description": "Object的版本ID。",
                "type": "string",
                "example": "CAEQMxiBgMDNoP2D0BYiIDE3MWUxNzgxZDQxNTRiODI5OGYwZGMwNGY3MzZjN****"
            },
            "IsLatest": {
                "title": "Indicates whether the version is the current version",
                "description": "Object是否为当前版本。\n取值：\n\n- true：Object为当前版本。\n\n- false：Object为非当前版本。",
                "type": "boolean",
                "enumValueTitles": {
                    "true": "true",
                    "false": "false"
                },
                "example": "true",
                "default": "false"
            },
            "LastModified": {
                "title": "The last modified time of the object",
                "description": "Object最后被修改的时间。",
                "type": "string",
                "format": "iso8601",
                "example": "2019-04-09T07:27:28.000Z"
            },
            "ETag": {
                "title": "The entity tag",
                "description": "每个Object生成时创建的ETag ，用于标识Object的内容。\n  - 对于PutObject请求创建的Object，ETag值是其内容的MD5值。\n  - 对于其他方式创建的Object，ETag值是基于一定计算规则生成的唯一值，但不是其内容的MD5值。\n\n> ETag值仅用于检查Object内容是否发生变化。不建议使用ETag值作为Object内容的MD5数据完整性校验的依据。\n",
                "type": "string",
                "example": "250F8A0AE989679A22926A875F0A2****"
            },
            "Size": {
                "title": "The size of the returned object",
                "description": "Object的字节数。\n",
                "type": "integer",
                "format": "int64",
                "example": "93731"
            },
            "StorageClass": {
                "description": "Object的存储类型。\n",
                "example": "Standard",
                "$ref": "#/components/schemas/StorageClass"
            },
            "Owner": {
                "title": "The information about the bucket owner",
                "description": "保存Bucket拥有者信息的容器。\n",
                "$ref": "#/components/schemas/Owner"
            }
        }
    },
    "OutputSerialization": {
        "title": "A short description of struct",
        "description": "保存Select请求的容器。",
        "type": "object",
        "properties": {
            "CSV": {
                "description": "输出CSV的格式参数。",
                "$ref": "#/components/schemas/CSVOutput"
            },
            "JSON": {
                "description": "输出JSON的格式参数。",
                "$ref": "#/components/schemas/JSONOutput"
            },
            "KeepAllColumns": {
                "title": "description",
                "description": "指定返回结果中包含CSV所有列的位置（可选）。<br>默认值：false\n <br>仅在select语句里出现的列会有值，不出现的列则为空，返回结果中每一行的数据按照CSV列的顺序从低到高排列。\n例如以下语句：<br>\n`select _5, _1 from ossobject.`\n<br>如果KeepAllColumns = true，假设一共有6列数据，则返回以下数据：\n<br> `Value of 1st column,,,,Value of 5th column,\\n`",
                "type": "boolean",
                "enumValueTitles": {
                    "true": "true",
                    "false": "false"
                },
                "example": "false"
            },
            "OutputHeader": {
                "title": "description",
                "description": "在返回结果开头输出CSV头信息。\n<br>默认值：false",
                "type": "boolean",
                "enumValueTitles": {
                    "true": "true",
                    "false": "false"
                },
                "example": "false"
            },
            "OutputRawData": {
                "title": "description",
                "description": "指定输出数据为纯数据。\n\n- 您在请求中指定OutputRawData值时，OSS服务端会按照请求中的要求返回数据。\n\n- 您在请求中不指定OutputRawData值时，OSS服务端会自动选择一种格式返回。\n\n- 当您显式地指定OutputRawData为True时，如果该SQL长时间内没有返回数据，则HTTP请求可能因没有数据返回而超时。",
                "type": "boolean",
                "enumValueTitles": {
                    "true": "true",
                    "false": "false"
                },
                "example": "false"
            },
            "EnablePayloadCrc": {
                "title": "description",
                "description": "在每个Frame中会有一个32位的CRC32校验值。客户端可以计算相应payload的CRC32值进行数据完整性校验。",
                "type": "boolean",
                "enumValueTitles": {
                    "true": "true",
                    "false": "false"
                },
                "example": "true"
            }
        }
    },
    "Owner": {
        "title": "Container for the owner's display name and ID",
        "description": "保存Bucket拥有者信息的容器。\n",
        "type": "object",
        "properties": {
            "ID": {
                "title": "The ID of the owner",
                "description": "Bucket拥有者的用户ID。",
                "type": "string",
                "example": "ut_test_bucket"
            },
            "DisplayName": {
                "title": "The display name of the owner",
                "description": "Bucket拥有者的名称 （目前和ID一致）。",
                "type": "string",
                "example": "ut_test_bucket"
            }
        }
    },
    "Part": {
        "title": "A short description of struct",
        "description": "保存已上传Part信息的容器。\n",
        "type": "object",
        "properties": {
            "ETag": {
                "title": "description",
                "description": "Part成功上传后，OSS返回的ETag值。",
                "type": "string",
                "example": "3349DC700140D7F86A0784842780****"
            },
            "PartNumber": {
                "title": "description",
                "description": "Part数目。",
                "type": "integer",
                "format": "int64",
                "example": "1"
            },
            "Size": {
                "title": "description",
                "description": "已上传Part大小。",
                "type": "integer",
                "format": "int64",
                "example": "6291456"
            },
            "LastModified": {
                "title": "description",
                "description": "Part上传的时间。\n",
                "type": "string",
                "format": "iso8601",
                "example": "2012-02-23T07:01:34.000Z"
            }
        }
    },
    "RTC": {
        "title": "数据复制时间控制功能的状态",
        "description": "数据复制时间控制功能的状态",
        "type": "object",
        "properties": {
            "Status": {
                "title": "是否开启复制时间控制（RTC）功能",
                "description": "是否开启复制时间控制（RTC）功能",
                "type": "string",
                "enumValueTitles": {
                    "disabled": "关闭RTC功能",
                    "enabled": "开启RTC功能"
                },
                "example": "Enabled"
            }
        }
    },
    "RefererConfiguration": {
        "title": "A short description of struct",
        "description": "保存Referer配置内容的容器。",
        "type": "object",
        "properties": {
            "AllowEmptyReferer": {
                "title": "是否允许Referer字段为空的请求访问",
                "description": "指定是否允许Referer字段为空的请求访问OSS。取值如下：\n\n- true（默认值）：允许Referer字段为空的请求访问OSS。\n- false：不允许Referer字段为空的请求访问OSS。",
                "type": "boolean",
                "required": true,
                "enumValueTitles": {
                    "true": "true",
                    "false": "false"
                },
                "example": "true",
                "default": "true"
            },
            "AllowTruncateQueryString": {
                "title": "匹配时是否截断请求参数",
                "description": "是否截断QueryString。\n\n- true（默认值）：截断QueryString。\n\n- false：不截断QueryString。",
                "type": "boolean",
                "enumValueTitles": {
                    "true": "true",
                    "false": "false"
                },
                "example": "true"
            },
            "RefererList": {
                "title": "保存Referer访问白名单",
                "description": "保存Referer访问白名单的容器。\n> **说明**PutBucketReferer为覆盖语义，即RefererList中的新指定的白名单列表将覆盖已配置的白名单列表。当您上传的RefererList为空时（即不包含Referer请求元素），此操作将清空RefererList中已配置的白名单列表。\n",
                "type": "object",
                "properties": {
                    "Referer": {
                        "title": "指定一条Referer访问白名单",
                        "description": "指定一条Referer访问白名单。\n",
                        "type": "array",
                        "items": {
                            "description": "指定一条Referer访问白名单。",
                            "type": "string",
                            "example": "http://www.aliyun.com"
                        }
                    }
                },
                "required": true
            },
            "TruncatePath": {
                "title": "匹配时是否截断路径部分（即只匹配protocol://host/部分）",
                "description": "匹配时是否截断路径部分（即只匹配protocol://host/部分）。取值：\n\n- true：截断URL中包括Path在内的后续所有部分。\n\n- false：不截断URL中包括Path在内的后续所有部分。",
                "type": "boolean",
                "enumValueTitles": {
                    "true": "true",
                    "false": "false"
                },
                "example": "true"
            }
        }
    },
    "RegionInfo": {
        "title": "A short description of struct",
        "description": "地域信息。",
        "type": "object",
        "properties": {
            "Region": {
                "title": "region",
                "description": "地域ID。",
                "type": "string",
                "example": "oss-cn-hangzhou"
            },
            "InternetEndpoint": {
                "title": "internet endpoint",
                "description": "地域对应的外网Endpoint。",
                "type": "string",
                "example": "oss-cn-hangzhou.aliyuncs.com"
            },
            "InternalEndpoint": {
                "title": "internal endpoint",
                "description": "地域对应的内网Endpoint。",
                "type": "string",
                "example": "oss-cn-hangzhou-internal.aliyuncs.com"
            },
            "AccelerateEndpoint": {
                "title": "accelerate endpoint",
                "description": "地域对应的传输加速Endpoint。取值固定为oss-accelerate.aliyuncs.com。",
                "type": "string",
                "example": "oss-accelerate.aliyuncs.com"
            }
        }
    },
    "ReplicationConfiguration": {
        "title": "A short description of struct",
        "description": "数据复制配置信息。",
        "type": "object",
        "properties": {
            "Rule": {
                "description": "保存数据复制规则的容器。",
                "$ref": "#/components/schemas/ReplicationRule"
            }
        }
    },
    "ReplicationDestination": {
        "title": "A short description of struct",
        "description": "保存目标Bucket信息的容器。",
        "type": "object",
        "properties": {
            "Bucket": {
                "title": "The destination bucket to which the data is replicated",
                "description": "指定数据要复制到的目标Bucket。\n",
                "type": "string",
                "example": "target-bucket"
            },
            "Location": {
                "title": "The region in which the destination bucket is located",
                "description": "目标Bucket所处的地域。\n",
                "type": "string",
                "enumValueTitles": {},
                "example": "oss-cn-beijing"
            },
            "TransferType": {
                "title": "The link used to transfer data in CRR",
                "description": "指定数据复制时使用的数据传输链路。\n取值：\n  - internal（默认值）：OSS默认传输链路。\n  - oss_acc：传输加速链路。只有创建跨区域复制规则时才能使用传输加速链路。\n",
                "type": "string",
                "enumValueTitles": {},
                "example": "oss_acc"
            }
        }
    },
    "ReplicationPrefixSet": {
        "title": "The container that stores prefixes",
        "description": "保存Prefix的容器，每个复制规则中，最多能指定10个Prefix。",
        "type": "object",
        "properties": {
            "Prefix": {
                "title": "Prefixs used to specify the object to replicate",
                "description": "设置待复制Object的Prefix。只有匹配该Prefix的Object才被复制到目标Bucket。\n  - Prefix最大长度为1023个字符。\n  - 如果配置了Prefix，则新写入的数据和历史数据的同步都会遵循Prefix指定的规则。\n\n",
                "type": "array",
                "items": {
                    "description": "设置待复制Object的Prefix。只有匹配该Prefix的Object才被复制到目标Bucket。\n  - Prefix最大长度为1023个字符。\n  - 如果配置了Prefix，则新写入的数据和历史数据的同步都会遵循Prefix指定的规则。\n\n",
                    "type": "string",
                    "example": "video"
                }
            }
        }
    },
    "ReplicationProgressRule": {
        "title": "A short description of struct",
        "description": "数据复制进度信息",
        "type": "object",
        "properties": {
            "ID": {
                "title": "rule id",
                "description": "rule id",
                "type": "string",
                "example": "rep01"
            },
            "PrefixSet": {
                "description": "保存Prefix 的容器，每个复制规则中，最多能指定10个Prefix。",
                "$ref": "#/components/schemas/ReplicationPrefixSet"
            },
            "Action": {
                "title": "A short description of action",
                "description": "表示被同步到目标Bucket的操作。\n\nAction允许以下操作类型，您可以指定一项或者多项。\n\nALL（默认操作）：表示PUT、DELETE、ABORT操作均会被同步到目标Bucket。\n\nPUT：表示被同步到目标Bucket的写入操作，包括PutObject、PostObject、AppendObject、CopyObject、PutObjectACL、 InitiateMultipartUpload 、 UploadPart、UploadPartCopy和CompleteMultipartUpload。",
                "type": "string",
                "enumValueTitles": {
                    "ALL": "PUT/DELETE/ABORT操作都会同步",
                    "PUT": "仅同步写入类操作"
                },
                "example": "PUT"
            },
            "Destination": {
                "description": "保存目标Bucket信息的容器。",
                "$ref": "#/components/schemas/ReplicationDestination"
            },
            "Status": {
                "title": "A short description of action",
                "description": "复制状态。",
                "type": "string",
                "example": "doing"
            },
            "HistoricalObjectReplication": {
                "title": "A short description of HistoricalObjectReplication",
                "description": "是否复制历史数据。即开启数据复制前，是否将源Bucket中的数据复制到目标Bucket。\n\n取值：\n\nenabled（默认值）：表示复制历史数据。\n\ndisabled：表示不复制历史数据，仅复制跨区域复制规则生效后新写入的数据。",
                "type": "string",
                "enumValueTitles": {
                    "disabled": "不复制历史数据",
                    "enabled": "复制历史数据"
                },
                "example": "enabled"
            },
            "Progress": {
                "title": "A short description of Progress",
                "description": "保存复制进度的容器，仅当数据处于同步状态（doing）时才返回此元素。",
                "type": "object",
                "properties": {
                    "HistoricalObject": {
                        "title": "A short description of HistoricalObject",
                        "description": "显示已复制历史数据的百分比。仅对开启了历史数据复制的Bucket有效。",
                        "type": "string",
                        "example": "0.86"
                    },
                    "NewObject": {
                        "title": "A short description of NewObject",
                        "description": "显示数据复制到目标Bucket的时间点（GMT格式）。\n\n例如Thu, 24 Sep 2015 15:39:18 GMT，表示早于该时间点写入的数据都已复制到目标Bucket。",
                        "type": "string",
                        "example": "Thu, 24 Sep 2015 15:39:18 GMT"
                    }
                }
            }
        }
    },
    "ReplicationRule": {
        "title": "A short description of struct",
        "description": "数据复制规则。",
        "type": "object",
        "properties": {
            "ID": {
                "title": "rule id",
                "description": "请求规则对应的ID。",
                "type": "string",
                "example": "test_replication_1"
            },
            "PrefixSet": {
                "description": "保存前缀（Prefix）的容器。每条数据复制规则中，最多可指定10条Prefix。\n",
                "$ref": "#/components/schemas/ReplicationPrefixSet"
            },
            "Action": {
                "title": "A short description of action",
                "description": "指定可以被复制到目标Bucket的操作。如果配置了Action，则新写入的数据和历史数据的同步都会遵循Action指定的复制操作。\nAction允许以下操作类型，您可以指定一项或多项。\n取值：\n  - ALL（默认值）：表示PUT、DELETE、ABORT操作均会被同步到目标Bucket。\n  - PUT：表示被同步到目标Bucket的写入操作，包括PutObject、PostObject、AppendObject、CopyObject、PutObjectACL、InitiateMultipartUpload、UploadPart、UploadPartCopy、CompleteMultipartUpload。\n\n",
                "type": "string",
                "example": "PUT"
            },
            "Destination": {
                "description": "保存目标Bucket信息的容器。",
                "$ref": "#/components/schemas/ReplicationDestination"
            },
            "Status": {
                "title": "A short description of action",
                "description": "表示复制状态。\n取值：\n  - starting：设置数据复制规则后，OSS会为Bucket准备复制任务，此时的复制状态为starting。\n  - doing：当数据复制规则生效后，即数据处于同步状态时，此时的复制状态为doing。\n  - closing：删除数据复制规则后，OSS会自动完成清理工作，此时的复制状态为closing。\n",
                "type": "string",
                "example": "starting"
            },
            "HistoricalObjectReplication": {
                "title": "A short description of HistoricalObjectReplication",
                "description": "指定是否复制历史数据。即开启数据复制前，是否将源Bucket中的数据复制到目标Bucket。\n取值：\n  - enabled（默认值）：表示复制历史数据。\n  - disabled：表示不复制历史数据。即仅复制创建数据复制规则后新写入的数据。\n\n",
                "type": "string",
                "example": "enabled"
            },
            "SyncRole": {
                "title": "A short description of SyncRole",
                "description": "授权OSS使用哪个角色来进行数据复制。如果指定使用SSE-KMS加密目标对象，则必须指定该元素。",
                "type": "string",
                "example": "aliyunramrole"
            },
            "SourceSelectionCriteria": {
                "description": "用于标识要复制的源对象的其他筛选条件的容器。当前OSS仅支持针对SSE-KMS加密的源对象指定筛选条件。",
                "$ref": "#/components/schemas/ReplicationSourceSelectionCriteria"
            },
            "EncryptionConfiguration": {
                "title": "A short description of EncryptionConfiguration",
                "description": "目标对象加密配置。如果指定Status为Enabled，则必须指定该元素。",
                "type": "object",
                "properties": {
                    "ReplicaKmsKeyID": {
                        "title": "kms id",
                        "description": "指定SSE-KMS密钥ID。如果指定Status为Enabled，则必须指定该元素。",
                        "type": "string",
                        "example": "c4d49f85-ee30-426b-a5ed-95e9139d****"
                    }
                }
            }
        }
    },
    "ReplicationRuleProgress": {
        "title": "A short description of struct",
        "description": "数据复制规则进度信息。",
        "type": "object",
        "properties": {
            "ID": {
                "title": "id",
                "description": "复制规则对应的ID。",
                "type": "string",
                "example": "test_replication_rule_1"
            },
            "PrefixSet": {
                "description": "保存Prefix 的容器，每个复制规则中，最多能指定10个Prefix。",
                "$ref": "#/components/schemas/ReplicationPrefixSet"
            },
            "Action": {
                "title": "action",
                "description": "表示被同步到目标Bucket的操作。\nAction允许以下操作类型，您可以指定一项或者多项。\n\n- ALL（默认操作）：表示PUT、DELETE、ABORT操作均会被同步到目标Bucket。\n\n- PUT：表示被同步到目标Bucket的写入操作，包括PutObject、PostObject、AppendObject、CopyObject、PutObjectACL、InitiateMultipartUpload 、 UploadPart、UploadPartCopy和CompleteMultipartUpload。",
                "type": "string",
                "example": "ALL"
            }
        }
    },
    "ReplicationRules": {
        "title": "A short description of struct",
        "description": "保存需要删除的数据复制规则的容器。",
        "type": "object",
        "properties": {
            "ID": {
                "title": "the container of id",
                "description": "需要删除的复制规则对应的ID。规则ID可从GetBucketReplication中获取。",
                "type": "array",
                "items": {
                    "description": "需要删除的复制规则对应的ID。规则ID可从GetBucketReplication中获取。",
                    "type": "string",
                    "example": "test_replication_1"
                }
            }
        }
    },
    "ReplicationSourceSelectionCriteria": {
        "title": "A short description of struct",
        "description": "用于标识要复制的源对象的其他筛选条件的容器。当前OSS仅支持针对SSE-KMS加密的源对象指定筛选条件。",
        "type": "object",
        "properties": {
            "SseKmsEncryptedObjects": {
                "title": "A short description of SseKmsEncryptedObjects",
                "description": "用于筛选使用SSE-KMS加密对象的容器。如果在数据复制规则中指定了SourceSelectionCriteria，则必须指定该元素。",
                "type": "object",
                "properties": {
                    "Status": {
                        "title": "A short description of Status",
                        "description": "指定OSS是否复制通过SSE-KMS加密创建的对象。取值范围如下：\n  - Enabled：表示复制通过SSE-KMS加密创建的对象。\n  - Disabled：表示不复制通过SSE-KMS加密创建的对象。",
                        "type": "string",
                        "example": "Enabled"
                    }
                }
            }
        }
    },
    "RequestPaymentConfiguration": {
        "title": "A short description of struct",
        "description": "请求付费配置的容器。\n",
        "type": "object",
        "properties": {
            "Payer": {
                "title": "description",
                "description": "指定Bucket付费类型。\n取值：\n\n- BucketOwner：由Bucket拥有者付费。\n\n- Requester：由请求者付费。",
                "type": "string",
                "example": "Requester"
            }
        }
    },
    "ResourceGroupId": {
        "title": "Bucket所属的资源组ID",
        "description": "指定资源组ID。\n\n- 如果在请求中携带该请求头并指定资源组ID，则OSS会返回属于该资源组的所有Bucket。当指定的资源组ID为rg-default-id时，OSS会返回属于默认资源组的所有Bucket。\n- 如果在请求中携带了该请求头但未指定资源组ID，则OSS会返回属于默认资源组的所有Bucket。\n- 如果在请求中未携带该请求头，则OSS会返回请求者拥有的所有Bucket。您可以通过资源管理的控制台或ListResourceGroups接口获取资源组ID。\n\n您可以通过资源管理的控制台或ListResourceGroups接口获取资源组ID。具体操作，请分别参见[查看资源组基本信息](~~151181~~)和[ListResourceGroups](~~158855~~)。",
        "type": "string",
        "example": "rg-aekz****"
    },
    "RestoreRequest": {
        "title": "A short description of struct",
        "description": "解冻请求信息。",
        "type": "object",
        "properties": {
            "Days": {
                "title": "description",
                "description": "解冻的天数。取值范围为1~7天。\n",
                "type": "integer",
                "format": "int64",
                "example": "2"
            },
            "JobParameters": {
                "title": "description",
                "description": "解冻优先级的容器。只有解冻冷归档类型的Object时才生效。\n如果不传入JobParameters节点，则解冻优先级默认为Standard。\n",
                "type": "object",
                "properties": {
                    "Tier": {
                        "title": "description",
                        "description": "解冻优先级。取值范围如下：\n  - 高优先级（Expedited）：表示1小时内完成解冻。\n  - 标准（Standard）：表示2~5小时内完成解冻。\n  - 批量（Bulk）：表示5~12小时内完成解冻。\n",
                        "type": "string",
                        "example": "Standard"
                    }
                }
            }
        }
    },
    "RoutingRule": {
        "title": "A short description of struct",
        "description": "指定跳转规则或者镜像回源规则，最多指定20个RoutingRule。\n",
        "type": "object",
        "properties": {
            "RuleNumber": {
                "title": "description",
                "description": "匹配和执行RoutingRule的序号，OSS将按照此序号依次匹配规则。如果匹配成功，则执行此规则，后续的规则不再执行。\n\n>如果指定了父节点RoutingRule，则必须指定此项。",
                "type": "integer",
                "format": "int64",
                "example": "1"
            },
            "Condition": {
                "title": "description",
                "description": "匹配的条件。\n如果指定的项都满足，则执行此规则。只有满足此容器下的各个节点的所有条件才算匹配。\n>如果指定了父节点RoutingRule，则必须指定此项。",
                "$ref": "#/components/schemas/RoutingRuleCondition"
            },
            "Redirect": {
                "title": "description",
                "description": "指定匹配此规则后执行的动作。\n>如果指定了父节点RoutingRule，则必须指定此项。",
                "$ref": "#/components/schemas/RoutingRuleRedirect"
            }
        }
    },
    "RoutingRuleCondition": {
        "title": "A short description of struct",
        "description": "匹配的条件。\n如果指定的项都满足，则执行此规则。只有满足此容器下的各个节点的所有条件才算匹配。\n>如果指定了父节点RoutingRule，则必须指定此项。",
        "type": "object",
        "properties": {
            "KeyPrefixEquals": {
                "title": "A short description of struct",
                "description": "只有匹配此前缀的Object才能匹配此规则。\n",
                "type": "string",
                "example": "abc"
            },
            "HttpErrorCodeReturnedEquals": {
                "title": "A short description of struct",
                "description": "访问指定Object时，返回此status才能匹配此规则。当跳转规则是镜像回源类型时，此字段必须为404。\n",
                "type": "integer",
                "format": "int64",
                "example": "404"
            }
        }
    },
    "RoutingRuleRedirect": {
        "title": "A short description of struct",
        "description": "指定匹配此规则后执行的动作。\n>如果指定了父节点RoutingRule，则必须指定此项。",
        "type": "object",
        "properties": {
            "RedirectType": {
                "title": "description",
                "description": "指定跳转的类型。取值范围如下：\n  - **Mirror**：镜像回源。\n  - **External**：外部跳转，即OSS会返回一个3xx请求，指定跳转到另外一个地址。\n  - **AliCDN**：阿里云CDN跳转，主要用于阿里云的CDN。与External不同的是，OSS会额外添加一个Header。阿里云CDN识别到此Header后会主动跳转到指定的地址，返回给用户获取到的数据，而不是将3xx跳转请求返回给用户。\n\n>如果指定了父节点Redirect，则必须指定此项。",
                "type": "string",
                "example": "Mirror"
            },
            "PassQueryString": {
                "title": "description",
                "description": "执行跳转或者镜像回源规则时，是否携带请求参数。\n用户请求OSS时携带了请求参数`?a=b&c=d`，并且设置**PassQueryString**为true，如果规则为302跳转，则跳转的Location头中会添加此请求参数。例如`Location:example.com?a=b&c=d`，跳转类型为镜像回源，则在发起的回源请求中也会携带此请求参数。\n取值：true、false（默认）\n",
                "type": "boolean",
                "enumValueTitles": {
                    "true": "true",
                    "false": "false"
                },
                "example": "true"
            },
            "MirrorURL": {
                "title": "description",
                "description": "镜像回源的源站地址。只有设置RedirectType为Mirror时才生效。\n源站地址必须以**http://**或者**https://**开头，并且以正斜线（/）结尾，OSS会在此地址后带上Object名称组成回源URL。\n例如要访问的Object名称为myobject，如果指定此项为`http://example.com/`，则回源URL为`http://example.com/myobject`，如果指定此项为`http://example.com/dir1/`，则回源URL为`http://example.com/dir1/myobject`。\n>如果RedirectType指定为Mirror，则必须指定此项。",
                "type": "string",
                "enumValueTitles": {
                    "true": "true",
                    "false": "false"
                },
                "example": "http://example.com"
            },
            "TransparentMirrorResponseCodes": {
                "title": "description",
                "description": "指定当源站返回哪些状态码时需要透传该状态码以及body到客户端，取值为4xx、5xx等HTTP状态码，多个HTTP状态码之间用英文逗号（,）分隔，例如`400,404`。只有设置RedirectType为Mirror时才生效。\n当OSS向源站请求内容时，如果源站返回了此参数中的某个状态码，则OSS将透传源站返回的该状态码以及body到客户端。\n> 如果在此参数中设置了404状态码，则设置的ErrorDocument会失效。\n",
                "type": "string",
                "example": "400,404"
            },
            "MirrorPassQueryString": {
                "title": "description",
                "description": "与PassQueryString作用相同，优先级高于PassQueryString。只有设置RedirectType为Mirror时才生效。\n默认值：false\n",
                "type": "boolean",
                "enumValueTitles": {
                    "true": "true",
                    "false": "false"
                },
                "example": "false"
            },
            "MirrorFollowRedirect": {
                "title": "description",
                "description": "如果镜像回源获取的结果为3xx，是否继续跳转到指定的Location获取数据。 只有设置RedirectType为Mirror时才生效。\n例如发起镜像回源请求时，源站返回了302，并且指定了Location。\n  - 如果设置此项为true，则OSS会继续请求Location对应的地址。\n最多能跳转10次，如果跳转超过10次，则返回镜像回源失败。\n  - 如果设置此项为false，则OSS会返回302，并透传Location。\n\n默认值：true\n",
                "type": "boolean",
                "enumValueTitles": {
                    "true": "true",
                    "false": "false"
                },
                "example": "true"
            },
            "MirrorCheckMd5": {
                "title": "description",
                "description": "是否检查回源body的MD5。 只有设置RedirectType为Mirror时才生效。\n当设置**MirrorCheckMd5**为true，并且源站返回的response中含有Content-Md5头时，OSS检查拉取的数据MD5是否与此Header匹配，如果不匹配，则不保存在OSS上。\n默认值：false",
                "type": "boolean",
                "enumValueTitles": {
                    "true": "true",
                    "false": "false"
                },
                "example": "false"
            },
            "MirrorHeaders": {
                "title": "description",
                "description": "指定镜像回源时携带的Header。只有设置RedirectType为Mirror时才生效。\n",
                "type": "object",
                "properties": {
                    "PassAll": {
                        "title": "description",
                        "description": " 是否透传除以下Header之外的其他Header到源站。只有设置RedirectType为Mirror时才生效。\n  - content-length、authorization2、authorization、range、date等Header\n  - 以oss-/x-oss-/x-drs-开头的Header\n\n默认值：false\n",
                        "type": "boolean",
                        "enumValueTitles": {
                            "true": "true",
                            "false": "false"
                        },
                        "example": "false"
                    },
                    "Pass": {
                        "title": "description",
                        "description": "透传指定的Header到源站。只有设置RedirectType为Mirror时才生效。\n每个Header长度最多为1024个字节，字符集为0~9、A~Z、a~z以及短划线（-）。\n此字段最多可指定10个。\n",
                        "type": "array",
                        "items": {
                            "description": "透传指定的Header到源站。只有设置RedirectType为Mirror时才生效。\n每个Header长度最多为1024个字节，字符集为0~9、A~Z、a~z以及短划线（-）。\n此字段最多可指定10个。\n",
                            "type": "string",
                            "example": "myheader-key1"
                        }
                    },
                    "Remove": {
                        "title": "description",
                        "description": "禁止透传指定的Header到源站。只有设置RedirectType为Mirror时才生效。\n每个Header长度最多为1024个字节，字符集与Pass相同。\n此字段最多可指定10个，通常与PassAll一起使用。\n",
                        "type": "array",
                        "items": {
                            "description": "禁止透传指定的Header到源站。只有设置RedirectType为Mirror时才生效。\n每个Header长度最多为1024个字节，字符集与Pass相同。\n此字段最多可指定10个，通常与PassAll一起使用。\n",
                            "type": "string",
                            "example": "myheader-key3"
                        }
                    },
                    "Set": {
                        "title": "description",
                        "description": "设置一个Header传到源站，不管请求中是否携带这些指定的Header，回源时都会设置这些Header。只有设置RedirectType为Mirror时才生效。\n此容器最多可指定10组。\n",
                        "type": "array",
                        "items": {
                            "description": "设置一个Header传到源站，不管请求中是否携带这些指定的Header，回源时都会设置这些Header。只有设置RedirectType为Mirror时才生效。\n此容器最多可指定10组。\n",
                            "type": "object",
                            "properties": {
                                "Key": {
                                    "title": "description",
                                    "description": "设置Header的key，最多1024个字节，字符集与Pass相同。只有设置RedirectType为Mirror时才生效。\n>若指定了父节点Set，则必须指定此项。",
                                    "type": "string",
                                    "example": "myheader-key5"
                                },
                                "Value": {
                                    "title": "description",
                                    "description": "设置Header的value，最多1024个字节，不能出现`\\r\\n`。只有设置RedirectType为Mirror时才生效。\n>若指定了父节点Set，则必须指定此项。",
                                    "type": "string",
                                    "example": "myheader-value5"
                                }
                            }
                        }
                    }
                }
            },
            "Protocol": {
                "title": "description",
                "description": "跳转时的协议。只有设置RedirectType为External或者AliCDN时才生效。\n如果要访问的文件为test，设置跳转到`example.com`，并且设置Protocol为https，则Location头为`https://example.com/test`。\n取值：**http**、**https**。\n",
                "type": "string",
                "example": "http"
            },
            "HostName": {
                "title": "description",
                "description": "跳转时的域名，域名需符合域名规范。\n如果要访问的文件为test，设置Protocol为https，并且设置Hostname为`example.com`，则Location头为`https://example.com/test`。\n",
                "type": "string",
                "example": "example.com"
            },
            "ReplaceKeyPrefixWith": {
                "title": "description",
                "description": "Redirect时Object名称的前缀将替换成该值。如果前缀为空，则将这个字符串插入Object名称的前面。\n> 仅允许存在ReplaceKeyWith或ReplaceKeyPrefixWith节点。\n假设要访问的Object为abc/test.txt，如果设置KeyPrefixEquals为abc/，ReplaceKeyPrefixWith为def/，则Location头为`http://example.com/def/test.txt`。\n",
                "type": "string",
                "example": "def/"
            },
            "EnableReplacePrefix": {
                "title": "description",
                "description": "如果设置此字段为true，则Object的前缀将被替换为ReplaceKeyPrefixWith指定的值。如果未指定此字段或为空，则表示截断Object前缀。\n> 当ReplaceKeyWith字段不为空时，不能设置此字段为true。\n\n默认值：false\n",
                "type": "boolean",
                "enumValueTitles": {
                    "true": "true",
                    "false": "false"
                },
                "example": "false"
            },
            "ReplaceKeyWith": {
                "title": "description",
                "description": "Redirect时Object名称将替换成ReplaceKeyWith指定的值，ReplaceKeyWith支持设置变量。目前支持的变量为${key}，表示该请求中的Object名称。\n假设要访问的Object为test，如果设置ReplaceKeyWith为`prefix/${key}.suffix`，则Location头为`http://example.com/prefix/test.suffix`。\n",
                "type": "string",
                "example": "prefix/${key}.suffix"
            },
            "HttpRedirectCode": {
                "title": "description",
                "description": "跳转时返回的状态码。只有设置RedirectType为External或者AliCDN时才生效。\n取值：301（默认）、302、307。\n",
                "type": "integer",
                "format": "int64",
                "example": "301"
            }
        }
    },
    "RtcConfiguration": {
        "title": "数据复制时间控制配置容器。",
        "description": "数据复制时间控制配置容器。",
        "type": "object",
        "properties": {
            "RTC": {
                "description": "保存RTC状态规则的容器。",
                "$ref": "#/components/schemas/RTC"
            },
            "ID": {
                "title": "需要设置RTC状态的复制规则ID。",
                "description": "需要设置RTC状态的复制规则ID。",
                "type": "string",
                "example": "test_replication_rule_1"
            }
        }
    },
    "SSEKMS": {
        "title": "The container that stores the CMK used in the SSE-KMS encryption method",
        "description": "保存SSE-KMS加密密钥的容器。\n\n",
        "type": "object",
        "properties": {
            "KeyId": {
                "title": "The CMK used in the SSE-KMS encryption method",
                "description": "KMS密钥ID。",
                "type": "string",
                "example": "9468da86-3509-4f8d-a61e-6eab1eac****"
            }
        }
    },
    "SSEOSS": {
        "title": "The container that stores the information about the SSE-OSS encryption method",
        "description": "使用OSS完全托管密钥进行加解密。",
        "type": "object",
        "properties": {},
        "example": "SSE-OSS"
    },
    "SelectMetaRequest": {
        "title": "A short description of struct",
        "description": "保存SelectMetaRequest信息的容器。",
        "type": "object",
        "properties": {
            "InputSerialization": {
                "description": "输入序列化参数（可选）。",
                "$ref": "#/components/schemas/InputSerialization"
            },
            "OverwriteIfExists": {
                "title": "description",
                "description": "重新计算SelectMeta，覆盖已有数据。\n<br>默认值：false（即如果Select Meta已存在则直接返回）。",
                "type": "boolean",
                "enumValueTitles": {
                    "true": "true",
                    "false": "false"
                },
                "example": "false"
            }
        }
    },
    "SelectMetaStatus": {
        "title": "A short description of struct",
        "description": "保存CreateSelectObjectMeta信息的容器。",
        "type": "object",
        "properties": {
            "Offset": {
                "title": "description",
                "description": "8位整数，扫描结束时的文件偏移。",
                "type": "integer",
                "format": "int64",
                "example": "0x0000000000000065"
            },
            "TotalScannedBytes": {
                "title": "description",
                "description": "8位整数，最终扫描过的数据大小。",
                "type": "integer",
                "format": "int64",
                "example": "0x0000000000000065"
            },
            "Status": {
                "title": "description",
                "description": "4位整数，最终的status。",
                "type": "integer",
                "format": "int64",
                "example": "0x000000c8"
            },
            "SplitsCount": {
                "title": "description",
                "description": "4位整数，总split个数。",
                "type": "integer",
                "format": "int64",
                "example": "0x00000001"
            },
            "RowsCount": {
                "title": "description",
                "description": "8位整数，总行数。",
                "type": "integer",
                "format": "int64",
                "example": "0x0000000000000003"
            },
            "ColsCount": {
                "title": "description",
                "description": "4位整数，总列数。",
                "type": "integer",
                "format": "int64",
                "example": "0x00000004"
            },
            "ErrorMessage": {
                "title": "description",
                "description": "详细的错误信息。如果无错误，则error_message为空。",
                "type": "string",
                "example": "The body size in select request exceeds the max allowed size."
            }
        }
    },
    "SelectProcess": {
        "description": "SelectObject可选的x-oss-process参数",
        "type": "string",
        "example": "csv/select"
    },
    "SelectRequest": {
        "title": "A short description of struct",
        "description": "保存Select请求的容器。",
        "type": "object",
        "properties": {
            "Expression": {
                "title": "description",
                "description": "以Base64 编码的SQL语句。",
                "type": "string",
                "example": "c2VsZWN0IGNvdW50KCopIGZyb20gb3Nzb2JqZWN0IHdoZXJlIF80ID4gNDU="
            },
            "InputSerialization": {
                "description": "输入序列化参数。",
                "$ref": "#/components/schemas/InputSerialization"
            },
            "OutputSerialization": {
                "description": "输出序列化参数。",
                "$ref": "#/components/schemas/OutputSerialization"
            },
            "Options": {
                "description": "其他可选参数。",
                "$ref": "#/components/schemas/SelectRequestOptions"
            }
        }
    },
    "SelectRequestOptions": {
        "title": "A short description of struct",
        "description": "保存Select请求的容器。",
        "type": "object",
        "properties": {
            "SkipPartialDataRecord": {
                "title": "description",
                "description": "忽略缺失数据的行。\n\n- 当该参数为false时，OSS会忽略缺失某些列（该列值当做null）而不报错。\n\n- 当该参数为true时，该行数据因为不完整而被整体跳过。当跳过的行数超过指定的最大跳过行数时OSS会报错并停止处理。",
                "type": "boolean",
                "enumValueTitles": {
                    "false": "false",
                    "true": "true"
                },
                "example": "false"
            },
            "MaxSkippedRecordsAllowed": {
                "title": "description",
                "description": "指定最大能容忍的跳过的行数。当某一行数据因为不匹配SQL中期望的类型、或者某一列或者多列数据缺失且SkipPartialDataRecord为True时，该行数据会被跳过。如果跳过的行数超过该参数的值，OSS会停止处理并报错。\n<br>默认值：0\n\n> 如果某一行是非法CSV行，例如在一列中间连续含有奇数个quote字符，则OSS会马上停止处理并报错，因为该错误很可能会影响对整个CSV文件的解析。即该参数用来调整对非整齐数据的容忍度，但不应用于非法的CSV文件。",
                "type": "integer",
                "format": "int64",
                "example": "0"
            }
        }
    },
    "ServerSideEncryptionRule": {
        "title": "A short description of struct",
        "description": "服务器端加密规则的容器。\n",
        "type": "object",
        "properties": {
            "ApplyServerSideEncryptionByDefault": {
                "description": "服务器端默认加密方式的容器。\n",
                "$ref": "#/components/schemas/ApplyServerSideEncryptionByDefault"
            }
        }
    },
    "StorageClass": {
        "title": "The storage class of a bucket.",
        "description": "Bucket的存储类型。 取值范围如下：\n\n- Standard（默认）：标准存储\n- IA：低频访问\n- Archive：归档存储\n- ColdArchive：冷归档存储\n- DeepColdArchive：深度冷归档存储",
        "type": "string",
        "enumValueTitles": {
            "Archive": "Archive",
            "ColdArchive": "ColdArchive",
            "IA": "IA",
            "Standard": "Standard"
        },
        "example": "Standard",
        "default": "Standard",
        "enum": [
            "Standard",
            "IA",
            "Archive",
            "ColdArchive",
            "DeepColdArchive"
        ]
    },
    "Style": {
        "title": "A short description of struct",
        "description": "保存Content信息列表的容器。",
        "type": "object",
        "properties": {
            "Content": {
                "title": "样式内容",
                "description": "图片样式内容，图片样式可以包含一个或多个图片处理操作。\n\n- 包含单个图片处理操作的图片样式，例如image/resize,p_50，表示将原图缩放50%。\n\n- 包含多个图片处理操作的图片样式，例如image/resize,p_63/quality,q_90，表示先将图片缩放到原图的63%，再设置图片相对质量为90%。",
                "type": "string",
                "example": "image/resize,p_50"
            }
        }
    },
    "StyleInfo": {
        "title": "A short description of struct",
        "description": "包含存储空间图片处理样式信息的结构体",
        "type": "object",
        "properties": {
            "Name": {
                "title": "样式名称",
                "description": "样式名称",
                "type": "string",
                "example": "imagestyle"
            },
            "Content": {
                "title": "图片",
                "description": "样式内容",
                "type": "string",
                "example": "image/resize,p_50"
            },
            "CreateTime": {
                "title": "样式创建时间",
                "description": "样式创建时间",
                "type": "string",
                "example": "Wed, 20 May 2020 12:07:15 GMT"
            },
            "LastModifyTime": {
                "title": "样式创建时间",
                "description": "样式创建时间",
                "type": "string",
                "example": "Wed, 21 May 2020 12:07:15 GMT"
            }
        }
    },
    "Tag": {
        "title": "标签键值对",
        "description": "设置Bucket Tag的容器。\n",
        "type": "object",
        "properties": {
            "Key": {
                "title": "key",
                "description": "指定Bucket Tag的Key。\n\n> - 最大长度为64字节。\n> - 不能以`http ://`、`https://`、`Aliyun`为前缀。\n> - 必须为UTF-8编码。\n> - 不能为空。",
                "type": "string",
                "required": true,
                "example": "testb"
            },
            "Value": {
                "title": "value",
                "description": "指定Bucket Tag的Value。\n > - 最大长度为128字节。\n >  - 必须为UTF-8编码。\n >  - 可以为空。",
                "type": "string",
                "example": "testv2"
            }
        }
    },
    "TagSet": {
        "title": "A short description of struct",
        "description": "标签集合。",
        "type": "object",
        "properties": {
            "Tag": {
                "title": "A short description of struct",
                "description": "标签集合。",
                "type": "array",
                "items": {
                    "description": "标签集合。",
                    "$ref": "#/components/schemas/Tag"
                }
            }
        }
    },
    "Tagging": {
        "title": "A short description of struct",
        "description": "设置Bucket TagSet的容器。\n",
        "type": "object",
        "properties": {
            "TagSet": {
                "title": "the container of tags",
                "description": "包含一系列Bucket Tag的容器。\n",
                "required": false,
                "$ref": "#/components/schemas/TagSet"
            }
        }
    },
    "TransferAccelerationConfiguration": {
        "title": "A short description of struct",
        "description": "传输加速配置的容器。",
        "type": "object",
        "properties": {
            "Enabled": {
                "title": "是否开启传输加速",
                "description": "目标Bucket是否开启传输加速。取值如下：\n  - **true**：开启传输加速。\n  - **false**：关闭传输加速。\n\n> 传输加速开启及关闭操作在30分钟内生效。",
                "type": "boolean",
                "enumValueTitles": {
                    "true": "true",
                    "false": "false"
                },
                "example": "true"
            }
        }
    },
    "Upload": {
        "title": "A short description of struct",
        "description": "保存Multipart Upload事件信息的容器。",
        "type": "object",
        "properties": {
            "Key": {
                "title": "description",
                "description": "初始化Multipart Upload事件的Object名称。\n\n\n\n> OSS的返回结果按照Object名称字典序升序排列，对于同一个Object，则按照UploadId的字典序升序排列。",
                "type": "string",
                "example": "multipart.data"
            },
            "UploadId": {
                "title": "description",
                "description": "Multipart Upload事件的ID。\n",
                "type": "string",
                "example": "0004B999EF5A239BB9138C6227D6****"
            },
            "Initiated": {
                "title": "description",
                "description": "Multipart Upload事件初始化的时间。\n",
                "type": "string",
                "format": "iso8601",
                "example": "2012-02-23T04:18:23.000Z"
            }
        }
    },
    "UserAntiDDOSInfo": {
        "title": "A short description of struct",
        "description": "高防实例信息。",
        "type": "object",
        "properties": {
            "InstanceId": {
                "title": "拥有者的UID",
                "description": "高防实例ID。",
                "type": "string",
                "example": "cbcac8d2-4f75-4d6d-9f2e-c3447f73****"
            },
            "Owner": {
                "title": "拥有者的UID",
                "description": "高防实例拥有者的UID。",
                "type": "string",
                "example": "114893010724****"
            },
            "Ctime": {
                "title": "高防实例创建时间",
                "description": "高防实例创建时间，格式为时间戳。",
                "type": "integer",
                "format": "int64",
                "example": "1626769503"
            },
            "Mtime": {
                "title": "高防实例更新时间",
                "description": "高防实例更新时间，格式为时间戳。",
                "type": "integer",
                "format": "int64",
                "example": "1626769840"
            },
            "ActiveTime": {
                "title": "高防实例激活时间",
                "description": "高防实例激活时间，格式为时间戳。",
                "type": "integer",
                "format": "int64",
                "example": "1626769845"
            },
            "Status": {
                "title": "高防实的状态",
                "description": "高防实例所处状态。\n\n- Init：初始化防护状态。\n\n- Defending：防护中状态。\n\n- HaltDefending：解除防护状态。",
                "type": "string",
                "example": "Defending"
            }
        }
    },
    "VersioningConfiguration": {
        "title": "Describes the versioning state of a OSS bucket",
        "description": "保存版本控制状态的容器。",
        "type": "object",
        "properties": {
            "Status": {
                "description": "版本控制状态。取值如下：\n\n- Enabled：开启版本控制状态。\n\n- Suspended：暂停版本控制状态。",
                "enumValueTitles": {
                    "Enabled": "Enabled",
                    "Suspended": "Suspended"
                },
                "example": "Enabled",
                "$ref": "#/components/schemas/BucketVersioningStatus"
            }
        }
    },
    "VpcId": {
        "title": "VPC ID",
        "description": "VPC ID",
        "type": "string",
        "example": "vpc-t4nlw426y44rd3iq4****"
    },
    "WebsiteConfiguration": {
        "title": "A short description of struct",
        "description": "根节点。",
        "type": "object",
        "properties": {
            "IndexDocument": {
                "description": "默认主页的容器。\n\n>至少指定IndexDocument、ErrorDocument、RoutingRules三个容器中的一个。",
                "$ref": "#/components/schemas/IndexDocument"
            },
            "ErrorDocument": {
                "description": "404页面的容器。\n\n>至少指定IndexDocument、ErrorDocument、RoutingRules三个容器中的一个。",
                "$ref": "#/components/schemas/ErrorDocument"
            },
            "RoutingRules": {
                "title": "description",
                "description": "RoutingRule的容器。\n\n>至少指定IndexDocument、ErrorDocument、RoutingRules三个容器中的一个。",
                "type": "object",
                "properties": {
                    "RoutingRule": {
                        "title": "description",
                        "description": "指定跳转规则或者镜像回源规则，最多指定20个RoutingRule。\n",
                        "type": "array",
                        "items": {
                            "description": "指定跳转规则或者镜像回源规则，最多指定20个RoutingRule。\n",
                            "$ref": "#/components/schemas/RoutingRule"
                        }
                    }
                }
            }
        }
    }
}