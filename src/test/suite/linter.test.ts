import * as assert from "assert";
import path from "path";
import * as vscode from "vscode";
import { LintRules, searchCode } from "../../provider/linter";

suite("Alicloud linter Test Suite", function () {
  let document;

  // 运行前的初始化
  setup(async function () {
    const text = `String[] tests = {
                "LTAIAbcd1234abcd",         // Length 16, should match
                "LTAIAbcd1234abcdefgh",     // Length 20, should match
                "LTAIAbcd1234abcdefghij",   // Length 22, should match
                "LTAIAbcd1234abcdefghijkl", // Length 24, should match
                "LTAIAbcd1234abcdefghijklmn", // Length 26, should match
                "LTAIabc",                  // Too short, should not match
                "LTAIabcdefghijklm",        // Too short, should not match
                "LTAIAbcd1234abcdefghijklmnop", // Too long, should not match
                "LTAIabcd1234abcdefghij",   // Length 22, missing uppercase letter, should not match
                "LTAIABCD1234ABCDEFGHIJ",   // Length 22, missing lowercase letter, should not match
                "LTAIAbcdabcdabcdefghij",   // Length 22, missing digit, should not match
                "LTAIAbcd1234abcdefghiJ",   // Length 22, should match
                "ltaiAbcd1234abcdefghij",   // Length 22, does not start with "LTAI", should not match
                "LTAIAbcd1234abcdefghi",    // Length 21, should not match
        };`;

    const uri = vscode.Uri.file(path.join(__dirname, "testDocument.txt"));

    // 写入自定义文本到文件
    await vscode.workspace.fs.writeFile(uri, Buffer.from(text, "utf8"));

    // 打开文件作为 TextDocument
    document = await vscode.workspace.openTextDocument(uri);
  });

  // 测试指定单词是否存在于文档中
  test("Check if document contains the AK", async function () {
    const text = document.getText();

    let diagnosticCollection: vscode.Diagnostic[] = [];

    let matches = [];

    LintRules.forEach((rule) => {
      matches = matches.concat(matches, searchCode(diagnosticCollection, rule, text, document));
    });

    const result = [
      "LTAIAbcd1234abcd",
      "LTAIAbcd1234abcdefghij",
      "LTAIAbcd1234abcdefghijklmn",
      "LTAIabcd1234abcdefghij",
      "LTAIAbcd1234abcdefghiJ",
    ];

    assert.equal(matches.toString(), result.toString());
    // assert.ok(matches, `test failed`);
  });

  // 清理工作
  teardown(async function () {
    const uri = vscode.Uri.file(path.join(__dirname, "testDocument.txt"));
    await vscode.workspace.fs.delete(uri, { useTrash: true });
  });
});
