import * as assert from "assert";
import { before } from "mocha";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
// import * as myExtension from '../../extension';

before(async () => {
  // 确保插件激活
  const extension = vscode.extensions.getExtension("alibabacloud-openapi.vscode-alicloud-api");
  if (!extension.isActive) {
    await extension.activate();
  }
});

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Sample test", () => {
    assert.strictEqual(-1, [1, 2, 3].indexOf(5));
    assert.strictEqual(-1, [1, 2, 3].indexOf(0));
  });
});

suite("YourCommand Test Suite", () => {
  test("Test alicloud.api.restart command", async () => {
    // 这里我们假设指令 `extension.sayHello` 可以正常运行且不返回任何值
    // 注意，对于返回结果或者有其他作用的指令，你可能需要更复杂的验证逻辑
    await vscode.commands.executeCommand("alicloud.api.restart");
    console.log("alicloud.api.restart successfully executed");

    // 如果指令成功执行，我们仅简单地验证一下（根据具体实现你还可以进行更多检查）
    assert.ok(true, "alicloud.api.restart successfully executed");

    // 示例：如果该指令返回了一个值，可以使用assert来验证该值
    // let result = await vscode.commands.executeCommand('extension.sayHello');
    // assert.strictEqual(result, 'expectedResult', 'extension.sayHello返回了意外的结果');
  });
});
