# TodoList

* 1、支持国际化配置，展示英文文档。
* 2、目录展示
* 3、调试、SDK 示例代码生成、智能API搜索

	* 在 Pontx 里，media 和 pontx-ui 是两个 package，但是在我们阿里云 API 场景，完全没有这个必要。
		我建议把 pontx-ui的 components 里的代码，直接和 media 合并。

		IDE Webview 和 workbench 前端有如下区别

		* 1、数据上只能取到开放API，很多接口能力不能使用
		* 2、需要支持 SSR，建议使用 next.js 来启动应用。
		* 3、接口调用的方式不同，你不能直接做接口调用，而是通过和 VSCode Extension 通信，间接拿到请求结果。
			因此接口请求的逻辑需要做一层封装。目前是已经封装好的。
		* 4、VSCode Extension 里实现的接口能力，不包含后续 API 调用、API 搜索、SDK 示例代码生成。
		* 5、VSCode Webview 有一些特定的 DOM 可以使用，例如 VSCode Icon。

		综上，建议在工程化上最一些改造，以达到如下效果：

		* 1、可以通过浏览器启动的方式快速开发 WebView。在 IDE 中能看到几乎一致的效果。
		* 2、可以考虑是否同时生成 Idea 的 WebView。
