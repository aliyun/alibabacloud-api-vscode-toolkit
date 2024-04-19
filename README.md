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

- More features are under development, please stay tuned.

## Extension UI Guide

![VSCode Extension Guide](https://img.alicdn.com/imgextra/i2/O1CN01t993u81InC3xh7RVU_!!6000000000937-0-tps-2328-1646.jpg)

### Product Searching `ctrl+cmd+k`

![Product Searching](https://img.alicdn.com/imgextra/i1/O1CN01bcJ5DM1RpmnlOjDHK_!!6000000002161-0-tps-1202-798.jpg)

### API Searching `ctrl+cmd+l`

![API Serching](https://img.alicdn.com/imgextra/i4/O1CN01KCrc1a1vooTmC9a1h_!!6000000006220-0-tps-1986-542.jpg)

### Call the API

The feature requires you to configure your AK/SK information as follows:

1. Install Aliyun CLI: [Install guide](https://www.alibabacloud.com/help/en/cli/installation-guide).
2. Install [Alibaba Cloud CLI Tools](https://marketplace.visualstudio.com/items?itemName=alibabacloud-openapi.aliyuncli) extentions.
3. You can run the `aliyun configure` command for quick configuration.

```
$ aliyun configure
Configuring profile 'default' ...
Aliyun Access Key ID [None]: <Your AccessKey ID>
Aliyun Access Key Secret [None]: <Your AccessKey Secret>
Default Region Id [None]: cn-hangzhou
Default output format [json]: json
Default Language [zh]: zh
```

4. Click the Alibaba Cloud icon in VS Code status bar to manage your profiles.
   ![](https://img.alicdn.com/imgextra/i1/O1CN0144NU9N1L4G1cq89Uf_!!6000000001245-0-tps-248-46.jpg)
   ![](https://img.alicdn.com/imgextra/i2/O1CN01btLUkc1ldEHJQ0w4S_!!6000000004841-0-tps-1206-190.jpg)
   More information please refer to the [Alibaba Cloud CLI Documentation](https://github.com/aliyun/aliyun-cli?tab=readme-ov-file#configure).

![API debug](https://img.alicdn.com/imgextra/i3/O1CN01yfMcHl1i6lNdjzmzs_!!6000000004364-2-tps-2688-1820.png)

### SDK Code Sample

You can generate the SDK Sample by using the debugger form and then open it in your editor.

![sdk demo](https://img.alicdn.com/imgextra/i1/O1CN01C0vQDB29gTtW5erj4_!!6000000008097-0-tps-2638-1778.jpg)

### Code Snippets

You can use the code snippets to quickly generate the code.

Type your subscribed API into the editor and select the API snippet you want to generate.

![code snippets](https://img.alicdn.com/imgextra/i3/O1CN01iKQA6u1KWMiVttyH0_!!6000000001171-1-tps-915-442.gif)
Or use the keyboard shortcuts `ctrl+cmd+l` to search the API and select Insert snippets.

![code snippets](https://img.alicdn.com/imgextra/i3/O1CN01dmGwmX1ZyVHozyKx4_!!6000000003263-1-tps-842-468.gif)

## Feedback

- Submit bug reports and feature requests on [our Github repository](https://github.com/aliyun/alibabacloud-api-vscode-toolkit/issues).
- You are welcome to submit your questions and suggestions on the [experience questionnaire](https://g.alicdn.com/aes/tracker-survey-preview/0.0.13/survey.html?pid=fePxMy&id=3486).

## Requirements

- Need VS Code 1.75.0 or above.

## License

See the [Apache License 2.0](./LICENSE).
