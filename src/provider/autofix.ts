/**
 * @description: Quick fix need to be used with a Linter
 */
import * as vscode from "vscode";
import { containsAnySubstring, fileSel, getSpecInfoFromName, SDKLanguageLabel } from "../utils";
import { getDepsByLanguage } from "../common/generateImport";
import { alicloudAPIMessageService } from "../Service";
import { LintRules } from "./linter";
import I18N from "../utils/I18N";

class CodeActionProvider {
  provideCodeActions(
    document: vscode.TextDocument,
    _range: vscode.Range | vscode.Selection,
    _context: vscode.CodeActionContext,
    _token: vscode.CancellationToken,
  ): vscode.ProviderResult<vscode.CodeAction[]> {
    // 拿到当前文档全部诊断信息
    const diagnostic: readonly vscode.Diagnostic[] = _context.diagnostics;

    let result: vscode.CodeAction[] = diagnostic?.map((item) => {
      const editor = vscode.window.activeTextEditor;
      const document = editor.document;
      const errorText = document.getText(item?.range);
      const service = alicloudAPIMessageService;
      const products = service.pontManager.localPontSpecs.map((pontSpec) => {
        return getSpecInfoFromName(pontSpec?.name)[0];
      });

      // 未导入依赖的诊断建议
      if (getDepsByLanguage(errorText, item.range)?.includes(errorText) || containsAnySubstring(errorText, products)) {
        const autoImportAction = new vscode.CodeAction(
          item.message + I18N.provider.autofix.importDev,
          vscode.CodeActionKind.QuickFix,
        );
        const newDiagnostic = new vscode.Diagnostic(item.range, "importLists", vscode.DiagnosticSeverity.Error);
        // 自动修复命令注册
        autoImportAction.command = {
          title: I18N.provider.autofix.importDev,
          command: "alicloud.api.autoImport",
          arguments: [newDiagnostic, errorText, item.range],
        };
        return autoImportAction;
      }

      // AccessKey 可能泄露的诊断建议
      const lintResult = LintRules?.find((rule) => rule.source === item.source);
      if (lintResult) {
        // 自动修复命令注册
        const codeAction = new vscode.CodeAction(
          `${lintResult.methods[0]?.title}(${SDKLanguageLabel[document.languageId] || I18N.provider.autofix.aliyunSdk})`,
          vscode.CodeActionKind.QuickFix,
        );
        codeAction.command = {
          title: `${lintResult.methods[0]?.title}(${SDKLanguageLabel[document.languageId] || I18N.provider.autofix.aliyunSdk})`,
          command: lintResult.methods[0]?.command,
          arguments: [document],
        };

        return codeAction;
      }
    });

    return result;
  }
}

class CodeActionProviderMetadata {
  providedCodeActionKinds = [vscode.CodeActionKind.QuickFix];
}

export default function autofix(context: vscode.ExtensionContext) {
  // 自动修复命令
  context.subscriptions.push(
    vscode.languages.registerCodeActionsProvider(fileSel, new CodeActionProvider(), new CodeActionProviderMetadata()),
  );
}
