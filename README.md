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

![Product Searching](https://img.alicdn.com/imgextra/i1/O1CN019u2pa61o8UckRnqni_!!6000000005180-2-tps-1244-944.png)

### API Searching `ctrl+cmd+l`

![API Serching](https://img.alicdn.com/imgextra/i4/O1CN014n1bop1fkf5WH815m_!!6000000004045-2-tps-1742-642.png)

### Call the API

![API debugging](https://img.alicdn.com/imgextra/i1/O1CN01tJwQXu1cm5TQ9afy2_!!6000000003642-2-tps-3306-2150.png)

> Note that the debugging needs to configure your AK credentials, click the left identity icon, you can add and switch the current AK credentials configuration.

![manage profiles](https://img.alicdn.com/imgextra/i3/O1CN016oSAO51GR5lqATMhr_!!6000000000618-2-tps-1916-386.png)

### SDK Code Sample

You can generate the SDK Sample by using the debugger form and then open it in your editor.

![sdk demo](https://img.alicdn.com/imgextra/i4/O1CN01vsCXCO1hHvTDcCuvf_!!6000000004253-2-tps-3088-2114.png)

### Code Snippets

You can use the code snippets to quickly generate the code.

Type your subscribed API into the editor and select the API snippet you want to generate.

![code snippets](https://img.alicdn.com/imgextra/i3/O1CN01iKQA6u1KWMiVttyH0_!!6000000001171-1-tps-915-442.gif)
Or use the keyboard shortcuts `ctrl+cmd+l` to search the API and select Insert snippets.

![code snippets](https://img.alicdn.com/imgextra/i3/O1CN01dmGwmX1ZyVHozyKx4_!!6000000003263-1-tps-842-468.gif)

### Profiles Management

Add and switch your Alibaba Cloud profiles.

![Profiles Management](https://img.alicdn.com/imgextra/i4/O1CN01pcpjRV1F6C5BrXmh6_!!6000000000437-2-tps-3088-2114.png)

### Document Enhancement

When writing SDK code, you can get more code sample references by viewing the OpenAPI description information and additional related sample links through the code documentation.

![Document enhancement](https://img.alicdn.com/imgextra/i1/O1CN01DpAon51MRuAYkrsTT_!!6000000001432-2-tps-1482-522.png)

### Sensitive Information Warning Linter

![Sensitive Information Warning Linter](https://img.alicdn.com/imgextra/i2/O1CN01jqCkYG20wfOwVtSIg_!!6000000006914-2-tps-2532-812.png)

### Quickly Search the Contents of the Document

Use `ctrl+f` or `cmd+f` to quickly search for the contents of the document.

![](https://img.alicdn.com/imgextra/i1/O1CN01JImHwN1y4VKftTDBV_!!6000000006525-2-tps-3088-2114.png)

### Set the display language of extension

Tap the Settings icon to quickly open the extension configuration, where you can switch the display language of the extension.

![](https://img.alicdn.com/imgextra/i2/O1CN01tzj3Hx1pwheyJuX1X_!!6000000005425-2-tps-2526-864.png)

## Feedback

- Submit bug reports and feature requests on [our Github repository](https://github.com/aliyun/alibabacloud-api-vscode-toolkit/issues).
- You are welcome to submit your questions and suggestions on the [experience questionnaire](https://g.alicdn.com/aes/tracker-survey-preview/0.0.13/survey.html?pid=fePxMy&id=3486).

## Requirements

- Need VS Code 1.75.0 or above.

## License

See the [Apache License 2.0](./LICENSE).
