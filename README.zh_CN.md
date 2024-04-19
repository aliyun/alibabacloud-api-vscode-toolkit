# Alibaba Cloud API Toolkit

[![Version](https://img.shields.io/visual-studio-marketplace/v/alibabacloud-openapi.vscode-alicloud-api)](https://marketplace.visualstudio.com/items?itemName=alibabacloud-openapi.vscode-alicloud-api)
[![Installs](https://img.shields.io/visual-studio-marketplace/i/alibabacloud-openapi.vscode-alicloud-api)](https://marketplace.visualstudio.com/items?itemName=alibabacloud-openapi.vscode-alicloud-api)
[![Ratings](https://img.shields.io/visual-studio-marketplace/r/alibabacloud-openapi.vscode-alicloud-api)](https://marketplace.visualstudio.com/items?itemName=alibabacloud-openapi.vscode-alicloud-api)
![beta](https://img.shields.io/badge/beta-version)

Alibaba Cloud API Toolkit 是一个轻量化的阿里云 API 工具，支持在 VS Code 中快速查阅阿里云产品的 API.

简体中文 | [English](./README.md)

## 功能

- **阿里云产品订阅：** 插件提供了一键订阅阿里云产品的功能，你可以通过 `ctrl+cmd+k` 搜索和订阅阿里云产品。

- **API 搜索:** 你可以通过 `ctrl+cmd+l` 搜索并查看已订阅的 API 文档。

- **API 文档预览:** 点击 API 可以打开一个新的标签页，并显示对应的 API 文档，包括描述、请求参数、响应参数和错误码。

- **API 调试:** 你可以在插件中使用表单的方式调试阿里云 API，并查看结果。
- **SDK 代码示例:** 你可以在插件中获得 SDK 代码示例，并在编辑器中快速打开对应的 SDK 代码。

- **Code Snippets:** 支持代码片段功能，帮助你快速编写 SDK 代码。

- 更多功能正在开发中，敬请期待...

## 插件 UI 导览

![VSCode Extension Guide](https://img.alicdn.com/imgextra/i1/O1CN01tlXFtt1mj0vE1ZrhR_!!6000000004989-0-tps-2498-1768.jpg)

### 产品搜索 `ctrl+cmd+k`

![Product Searching](https://img.alicdn.com/imgextra/i1/O1CN01bcJ5DM1RpmnlOjDHK_!!6000000002161-0-tps-1202-798.jpg)

### API 搜索 `ctrl+cmd+l`

![API Serching](https://img.alicdn.com/imgextra/i2/O1CN01ySJXt41c4ZnIbj51N_!!6000000003547-0-tps-1986-542.jpg)

### API 调试

调试功能需要配置你的 AK/SK 信息，配置方法如下：

1. 安装阿里云 CLI：[安装指南](https://help.aliyun.com/zh/cli/installation-guide)；
2. 安装 [Alibaba Cloud CLI Tools](https://marketplace.visualstudio.com/items?；itemName=alibabacloud-openapi.aliyuncli) 插件；
3. 输入 `aliyun configure` 命令，按照提示进行配置，

```
$ aliyun configure
Configuring profile 'default' ...
Aliyun Access Key ID [None]: <Your AccessKey ID>
Aliyun Access Key Secret [None]: <Your AccessKey Secret>
Default Region Id [None]: cn-hangzhou
Default output format [json]: json
Default Language [zh]: zh
```

4. 点击 VS Code 底部状态栏中的阿里云图标，管理你的 profiles，
   ![](https://img.alicdn.com/imgextra/i1/O1CN0144NU9N1L4G1cq89Uf_!!6000000001245-0-tps-248-46.jpg)
   ![](https://img.alicdn.com/imgextra/i2/O1CN01btLUkc1ldEHJQ0w4S_!!6000000004841-0-tps-1206-190.jpg)
   更多信息请参考 [Alibaba Cloud CLI Documentation](https://github.com/aliyun/aliyun-cli?tab=readme-ov-file#configure)。

![API debug](https://img.alicdn.com/imgextra/i3/O1CN01yfMcHl1i6lNdjzmzs_!!6000000004364-2-tps-2688-1820.png)

### SDK 示例

你能够通过调试表单生成 SDK 代码示例，并在编辑器中打开对应的 SDK 代码。

![sdk demo](https://img.alicdn.com/imgextra/i1/O1CN01C0vQDB29gTtW5erj4_!!6000000008097-0-tps-2638-1778.jpg)

### Code Snippets

你能通过代码片段快速生成 SDK 代码示例。

在编辑器输入你已订阅的 API 即可搜索到对应 API 的代码段。

![code snippets](https://img.alicdn.com/imgextra/i3/O1CN01iKQA6u1KWMiVttyH0_!!6000000001171-1-tps-915-442.gif)

或者你也可以通过快捷键 `ctrl+cmd+l` 搜索 API，然后选择插入代码段。

![code snippets](https://img.alicdn.com/imgextra/i3/O1CN01dmGwmX1ZyVHozyKx4_!!6000000003263-1-tps-842-468.gif)

## 反馈

- 欢迎在我们的 [Github repository](https://github.com/aliyun/alibabacloud-api-vscode-toolkit/issues) 上提交你的问题和建议。
- 您对插件的使用体验满意吗？点击 [体验问卷](https://g.alicdn.com/aes/tracker-survey-preview/0.0.13/survey.html?pid=fePxMy&id=3486) 进行吐槽或夸赞，您的反馈对我们十分重要！

## Requirements

- Need VS Code 1.75.0 or above.

## License

See the [Apache License 2.0](./LICENSE).
