export const routerMeta = {
    "specName": "Oss::2019-05-17",
    "modName": "",
    "spec": {
        "consumes": [
            "application/xml"
        ],
        "deprecated": false,
        "description": "- 此操作要求您对该Object有读权限。\n- 正确执行时，该API返回206。如果SQL语句不正确，或者和文件不匹配，则会返回400错误。\n- 关于SelectObject的功能介绍请参见[使用SelectObject查询文件](https://help.aliyun.com/document_detail/106082.html)。",
        "ext": {
            "methods": [
                "post"
            ],
            "operationType": "read",
            "produces": [
                "application/octet-stream"
            ],
            "responseDemo": "[{\"errorExample\":\"\",\"example\":\"\\\"\\\"\",\"type\":\"json\"}]",
            "schemes": [
                "http",
                "https"
            ],
            "security": [
                {
                    "AK": []
                }
            ],
            "staticInfo": {
                "returnType": "synchronous"
            },
            "summary": "对目标文件执行SQL语句，返回执行结果。",
            "systemTags": {
                "operationType": "get"
            },
            "title": "对文件执行SQL语句并返回结果"
        },
        "externalDocs": {
            "description": "去调试",
            "url": "https://api.aliyun.com/api/Oss/2019-05-17/SelectObject"
        },
        "method": "post",
        "name": "SelectObject",
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
                    "example": "exampledir/exampleobject.txt",
                    "required": true,
                    "type": "string"
                }
            },
            {
                "in": "body",
                "name": "body",
                "required": true,
                "schema": {
                    "$ref": "#/definitions/SelectRequest",
                    "description": "保存SelectObject请求的容器。",
                    "isDefsType": true,
                    "required": true,
                    "typeName": "SelectRequest"
                }
            }
        ],
        "path": "/{key}",
        "responses": {
            "200": {
                "schema": {
                    "format": "binary",
                    "type": "string"
                }
            },
            "5XX": {}
        },
        "summary": "对目标文件执行SQL语句，返回执行结果。",
        "title": "对文件执行SQL语句并返回结果"
    },
    "name": "SelectObject",
    "pageType": "document",
    "schemaType": "api",
    "code": "// This file is auto-generated, don't edit it. Thanks.\npackage demo;\n\nimport com.aliyun.auth.credentials.Credential;\nimport com.aliyun.auth.credentials.provider.StaticCredentialProvider;\nimport com.aliyun.core.http.HttpClient;\nimport com.aliyun.core.http.HttpMethod;\nimport com.aliyun.core.http.ProxyOptions;\nimport com.aliyun.httpcomponent.httpclient.ApacheAsyncHttpClientBuilder;\nimport com.aliyun.sdk.service.oss20190517.models.*;\nimport com.aliyun.sdk.service.oss20190517.*;\nimport com.google.gson.Gson;\nimport darabonba.core.RequestConfiguration;\nimport darabonba.core.client.ClientOverrideConfiguration;\nimport darabonba.core.utils.CommonUtil;\nimport darabonba.core.TeaPair;\n\n//import javax.net.ssl.KeyManager;\n//import javax.net.ssl.X509TrustManager;\nimport java.net.InetSocketAddress;\nimport java.time.Duration;\nimport java.util.*;\nimport java.util.concurrent.CompletableFuture;\n\npublic class SelectObject {\n    public static void main(String[] args) throws Exception {\n\n        // HttpClient Configuration\n        /*HttpClient httpClient = new ApacheAsyncHttpClientBuilder()\n                .connectionTimeout(Duration.ofSeconds(10)) // Set the connection timeout time, the default is 10 seconds\n                .responseTimeout(Duration.ofSeconds(10)) // Set the response timeout time, the default is 20 seconds\n                .maxConnections(128) // Set the connection pool size\n                .maxIdleTimeOut(Duration.ofSeconds(50)) // Set the connection pool timeout, the default is 30 seconds\n                // Configure the proxy\n                .proxy(new ProxyOptions(ProxyOptions.Type.HTTP, new InetSocketAddress(\"<your-proxy-hostname>\", 9001))\n                        .setCredentials(\"<your-proxy-username>\", \"<your-proxy-password>\"))\n                // If it is an https connection, you need to configure the certificate, or ignore the certificate(.ignoreSSL(true))\n                .x509TrustManagers(new X509TrustManager[]{})\n                .keyManagers(new KeyManager[]{})\n                .ignoreSSL(false)\n                .build();*/\n\n        // Configure Credentials authentication information, including ak, secret, token\n        StaticCredentialProvider provider = StaticCredentialProvider.create(Credential.builder()\n                // Please ensure that the environment variables ALIBABA_CLOUD_ACCESS_KEY_ID and ALIBABA_CLOUD_ACCESS_KEY_SECRET are set.\n                .accessKeyId(System.getenv(\"ALIBABA_CLOUD_ACCESS_KEY_ID\"))\n                .accessKeySecret(System.getenv(\"ALIBABA_CLOUD_ACCESS_KEY_SECRET\"))\n                //.securityToken(System.getenv(\"ALIBABA_CLOUD_SECURITY_TOKEN\")) // use STS token\n                .build());\n\n        // Configure the Client\n        AsyncClient client = AsyncClient.builder()\n                //.httpClient(httpClient) // Use the configured HttpClient, otherwise use the default HttpClient (Apache HttpClient)\n                .credentialsProvider(provider)\n                //.serviceConfiguration(Configuration.create()) // Service-level configuration\n                // Client-level configuration rewrite, can set Endpoint, Http request parameters, etc.\n                .overrideConfiguration(\n                        ClientOverrideConfiguration.create()\n                                  // Endpoint 请参考 https://api.aliyun.com/product/Oss\n                                .setEndpointOverride(\"oss-cn-qingdao.aliyuncs.com\")\n                        //.setConnectTimeout(Duration.ofSeconds(30))\n                )\n                .build();\n\n        // Parameter settings for API request\n        SelectObjectRequest selectObjectRequest = SelectObjectRequest.builder()\n                .selectRequest(selectRequest)\n                // Request-level configuration rewrite, can set Http request parameters, etc.\n                // .requestConfiguration(RequestConfiguration.create().setHttpHeaders(new HttpHeaders()))\n                .build();\n\n        // Asynchronously get the return value of the API request\n        CompletableFuture<SelectObjectResponse> response = client.selectObject(selectObjectRequest);\n        // Synchronously get the return value of the API request\n        SelectObjectResponse resp = response.get();\n        System.out.println(new Gson().toJson(resp));\n        // Asynchronous processing of return values\n        /*response.thenAccept(resp -> {\n            System.out.println(new Gson().toJson(resp));\n        }).exceptionally(throwable -> { // Handling exceptions\n            System.out.println(throwable.getMessage());\n            return null;\n        });*/\n\n        // Finally, close the client\n        client.close();\n    }\n\n}\n",
    "language": "java-async"
}