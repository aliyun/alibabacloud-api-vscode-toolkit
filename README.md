# Alibaba Cloud API Toolkit

[![Version](https://img.shields.io/visual-studio-marketplace/v/alibabacloud-openapi.vscode-alicloud-api)](https://marketplace.visualstudio.com/items?itemName=alibabacloud-openapi.vscode-alicloud-api)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/alibabacloud-openapi.vscode-alicloud-api)](https://marketplace.visualstudio.com/items?itemName=alibabacloud-openapi.vscode-alicloud-api)
[![Ratings](https://img.shields.io/visual-studio-marketplace/r/alibabacloud-openapi.vscode-alicloud-api)](https://marketplace.visualstudio.com/items?itemName=alibabacloud-openapi.vscode-alicloud-api)
![beta](https://img.shields.io/badge/beta-version)

Alibaba Cloud API Toolkit 是一个轻量化的阿里云 API 工具，支持在 VS Code 中快速查阅阿里云产品的 API.

简体中文 | [English](./README.en-US.md)

## 功能

* **阿里云产品订阅：** 插件提供了一键订阅阿里云产品的功能，你可以通过 `ctrl+cmd+k` 搜索和订阅阿里云产品。

* **API 搜索:** 你可以通过 `ctrl+cmd+l` 搜索并查看已订阅的 API 文档。

* **API 文档预览:** 点击 API 可以打开一个新的标签页，并显示对应的 API 文档，包括描述、请求参数、响应参数和错误码。在文档中点击调试按钮，可以链接到阿里云 OpenAPI 门户进行在线 API 试用。

* **API 调试:** 你可以在插件中使用表单的方式调试阿里云 API，并查看结果。
  
* **SDK 代码示例:** 你可以在插件中获得 SDK 代码示例，并在编辑器中快速打开对应的 SDK 代码。

* 更多功能正在开发中，敬请期待...

## 插件 UI 导览

![VSCode Extension Guide](https://img.alicdn.com/imgextra/i1/O1CN01o9s4TT1GTq3oggW7K_!!6000000000624-0-tps-2456-1446.jpg)

 * 产品搜索 `ctrl+cmd+k`

![Product Searching](https://img.alicdn.com/imgextra/i1/O1CN01bcJ5DM1RpmnlOjDHK_!!6000000002161-0-tps-1202-798.jpg)

 * API 搜索 `ctrl+cmd+l`

![API Serching](https://img.alicdn.com/imgextra/i1/O1CN01KaWkBF1UfCUkY0N3v_!!6000000002544-0-tps-1286-518.jpg)

* API 调试 
调试功能需要配置你的 AK/SK 信息，请先安装 [Alibaba Cloud CLI Tools](vscode:extension/alibabacloud-openapi.aliyuncli) 插件，然后在插件中配置你的 AK/SK 信息。更多信息请参考 [Alibaba Cloud CLI Documentation](https://github.com/aliyun/aliyun-cli?tab=readme-ov-file#configure)。

![API debug](https://img.alicdn.com/imgextra/i4/O1CN01F1qI7S1BunIFJPiAt_!!6000000000006-0-tps-2618-2050.jpg)

* SDK 示例
  
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