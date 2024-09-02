import * as assert from "assert";
import { after, before } from "mocha";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");
  before(async () => {
    // 确保插件激活
    const extension = vscode.extensions.getExtension("alibabacloud-openapi.vscode-alicloud-api");
    if (!extension.isActive) {
      await extension.activate();
    }
    console.log("Extension activate.");
  });

  after(() => {
    console.log("All tests done!");
  });

  test("Test alicloud.api.restart command", async () => {
    const result = await vscode.commands.executeCommand("alicloud.api.restart");
    console.log("alicloud.api.restart successfully executed");
    assert.strictEqual("ok", result);
  });
});
