# Alibaba Cloud API Toolkit

[![Version](https://img.shields.io/visual-studio-marketplace/v/alibabacloud-openapi.vscode-alicloud-api)](https://marketplace.visualstudio.com/items?itemName=alibabacloud-openapi.vscode-alicloud-api)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/alibabacloud-openapi.vscode-alicloud-api)](https://marketplace.visualstudio.com/items?itemName=alibabacloud-openapi.vscode-alicloud-api)
[![Ratings](https://img.shields.io/visual-studio-marketplace/r/alibabacloud-openapi.vscode-alicloud-api)](https://marketplace.visualstudio.com/items?itemName=alibabacloud-openapi.vscode-alicloud-api)

The Alibaba Cloud API Toolkit for VSCode makes it easier to access Alibaba Cloud services.

English | [简体中文](./README.zh_CN.md)

## Features

- **Alicloud Product Subscription:** You can search for Alicloud products and subscribe to its APIs you want to use.

- **API Searching:** You can search the Open API of Alibaba Cloud products to which you are subscribed.

- **API Document View:** Clicking on an API can navigate you to a new tab which displays the corresponding API document,
  including descriptions, request parameters, response parameters and error codes.

- **Call the API:** You can use the form to call the Alibaba Cloud API and see the response.
- **SDK Code Sample:** You can get the SDK code samples and quickly open the corresponding SDK code in VS Code.

- **Code Snippets:** You can use the code snippets to quickly generate the code.

- **Profiles Management:** Manage your Alibaba Cloud profiles.

- **Document Enhancement:** Extension provides a document enhancement function, you can write SDK code, through the hover code to see the description of OpenAPI information and more related example links, to get more code example reference, or directly open the document for reference.

- **Sensitive Information Linter:** Extension provides sensitive information detection, during the code writing process, the extension will automatically detect AK information, and prompt you to use the AK in a more secure way.

- **Quickly Search the Contents of the Document:** You can quickly search the contents of the document by using `ctrl+f` or `cmd+f`.

- **Set the display language of extension:** The extension default language is Chinese, while supporting English, by modifying the extension configuration, you can easily switch the extension language, or follow the system language automatically switch.

- More features are under development, please stay tuned.

## Extension UI Guide

![VSCode Extension Guide](https://img.alicdn.com/imgextra/i4/O1CN01Nir1nE1NUU0bblcEy_!!6000000001573-0-tps-1954-1234.jpg)

### Product Searching `ctrl+cmd+k`

![Product Searching](https://img.alicdn.com/imgextra/i1/O1CN01bcJ5DM1RpmnlOjDHK_!!6000000002161-0-tps-1202-798.jpg)

### API Searching `ctrl+cmd+l`

![API Serching](https://img.alicdn.com/imgextra/i4/O1CN01KCrc1a1vooTmC9a1h_!!6000000006220-0-tps-1986-542.jpg)

### Call the API

![API debugging](https://gw.alicdn.com/imgextra/i2/O1CN01fsuDBE1CLMJaBJj32_!!6000000000064-0-tps-3238-1920.jpg)

> Note that the debugging needs to configure your AK credentials, click the left identity icon, you can add and switch the current AK credentials configuration.

![manage profiles](https://gw.alicdn.com/imgextra/i2/O1CN01HzFhxH20gdVF4MIfq_!!6000000006879-0-tps-1938-378.jpg)

### SDK Code Sample

You can generate the SDK Sample by using the debugger form and then open it in your editor.

![sdk demo](https://img.alicdn.com/imgextra/i1/O1CN01C0vQDB29gTtW5erj4_!!6000000008097-0-tps-2638-1778.jpg)

### Code Snippets

You can use the code snippets to quickly generate the code.

Type your subscribed API into the editor and select the API snippet you want to generate.

![code snippets](https://img.alicdn.com/imgextra/i3/O1CN01iKQA6u1KWMiVttyH0_!!6000000001171-1-tps-915-442.gif)
Or use the keyboard shortcuts `ctrl+cmd+l` to search the API and select Insert snippets.

![code snippets](https://img.alicdn.com/imgextra/i3/O1CN01dmGwmX1ZyVHozyKx4_!!6000000003263-1-tps-842-468.gif)

### Profiles Management

Add and switch your Alibaba Cloud profiles.

![](https://img.alicdn.com/imgextra/i1/O1CN01NN667S1skk7vLbhr1_!!6000000005805-0-tps-2912-1596.jpg)

### Document Enhancement

When writing SDK code, you can get more code sample references by viewing the OpenAPI description information and additional related sample links through the code documentation.

![Document enhancement](https://gw.alicdn.com/imgextra/i2/O1CN01ymjnpo1l2aeq8D3lQ_!!6000000004761-0-tps-1496-646.jpg)

### Sensitive Information Warning Linter

![](https://gw.alicdn.com/imgextra/i4/O1CN01u787jO241C9LmbQ57_!!6000000007330-0-tps-1970-848.jpg)

### Quickly Search the Contents of the Document

Use `ctrl+f` or `cmd+f` to quickly search for the contents of the document.

![](https://gw.alicdn.com/imgextra/i2/O1CN01YmSwSz1Rn2VcqQILP_!!6000000002155-0-tps-2514-2098.jpg)

### Set the display language of extension

Tap the Settings icon to quickly open the extension configuration, where you can switch the display language of the extension.

![](https://img.alicdn.com/imgextra/i1/O1CN01Hl6ziV1pR6KIelNba_!!6000000005356-0-tps-2484-1506.jpg)

## Feedback

- Submit bug reports and feature requests on [our Github repository](https://github.com/aliyun/alibabacloud-api-vscode-toolkit/issues).
- You are welcome to submit your questions and suggestions on the [experience questionnaire](https://g.alicdn.com/aes/tracker-survey-preview/0.0.13/survey.html?pid=fePxMy&id=3486).

## Requirements

- Need VS Code 1.75.0 or above.

## License

See the [Apache License 2.0](./LICENSE).
