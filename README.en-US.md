# Alibaba Cloud API Toolkit

[![Version](https://img.shields.io/visual-studio-marketplace/v/alibabacloud-openapi.vscode-alicloud-api)](https://marketplace.visualstudio.com/items?itemName=alibabacloud-openapi.vscode-alicloud-api)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/alibabacloud-openapi.vscode-alicloud-api)](https://marketplace.visualstudio.com/items?itemName=alibabacloud-openapi.vscode-alicloud-api)
[![Ratings](https://img.shields.io/visual-studio-marketplace/r/alibabacloud-openapi.vscode-alicloud-api)](https://marketplace.visualstudio.com/items?itemName=alibabacloud-openapi.vscode-alicloud-api)

The Alibaba Cloud API Toolkit for VSCode makes it easier to access Alibaba Cloud services.

## Features

* **Alicloud Product subscription:** You can search for Alicloud products and subscribe to its APIs you want to use.

* **API Searching:** You can search the Open API of Alibaba Cloud products to which you are subscribed.

* **API Document View:** Clicking on an API can navigate you to a new tab which displays the corresponding API document, 
including descriptions, request parameters, response parameters and error codes.
Click to debug, you can link to Aliyun OpenAPI portal for online API trial.

* **Call the API:** You can use the form to call the Alibaba Cloud API and see the response.
  
* **SDK Code Sample:** You can get the SDK code samples and quickly open the corresponding SDK code in VS Code.

* More features are under development, please stay tuned.

## Extension UI Guide

![VSCode Extension Guide](https://img.alicdn.com/imgextra/i1/O1CN01iYMtwm27arlqDq7V3_!!6000000007814-0-tps-2328-1540.jpg)

 * Product Searching `ctrl+cmd+k`
  
![Product Searching](https://img.alicdn.com/imgextra/i1/O1CN01bcJ5DM1RpmnlOjDHK_!!6000000002161-0-tps-1202-798.jpg)
 
 * API Searching `ctrl+cmd+l`

![API Serching](https://img.alicdn.com/imgextra/i1/O1CN01KaWkBF1UfCUkY0N3v_!!6000000002544-0-tps-1286-518.jpg)

* Call the API
To call the API, you need to configure your AK/SK information. Please install the [Alibaba Cloud CLI Tools](vscode:extension/alibabacloud-openapi.aliyuncli)  first, and then configure your AK/SK information. For more information, please refer to [Alibaba Cloud CLI Documentation](https://github.com/aliyun/aliyun-cli?tab=readme-ov-file#configure).

![API debug](https://img.alicdn.com/imgextra/i4/O1CN01F1qI7S1BunIFJPiAt_!!6000000000006-0-tps-2618-2050.jpg)

* SDK Code Sample
  
![sdk demo](https://img.alicdn.com/imgextra/i1/O1CN01GVhWTl1waRdYmCn7E_!!6000000006324-0-tps-2630-2038.jpg)

## Requirements
- Need VS Code 1.75.0 or above.

## Release Notes

### 0.0.1 
Initial release
- Support product searching and subscription.
- Support API searching.
- Support API Document View.

### 0.0.3
- Support API calling.
- Support SDK code sample.

## License

See the [Apache License 2.0](./LICENSE).