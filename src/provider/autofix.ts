/**
 * @description: Quick fix need to be used with a Linter
 */
import * as vscode from "vscode";
import { containsAnySubstring, fileSel, getSpecInfoFromName } from "../utils";
import { getDepsByLanguage } from "../common/generateImport";
import { alicloudAPIMessageService } from "../Service";

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
      const products = service.pontManager.localPontSpecs
        .map((pontSpec) => {
          return getSpecInfoFromName(pontSpec?.name)[0];
        })

      if (getDepsByLanguage(errorText, item.range)?.includes(errorText) || containsAnySubstring(errorText, products)) {
        const autoImportAction = new vscode.CodeAction(
          item.message + "导入依赖",
          vscode.CodeActionKind.QuickFix,
        );
        const newDiagnostic = new vscode.Diagnostic(item.range, "importLists", vscode.DiagnosticSeverity.Error);
        // 自动修复命令注册
        autoImportAction.command = {
          title: "导入依赖",
          command: "alicloud.api.autoImport",
          arguments: [newDiagnostic, errorText, item.range],
        };
        return autoImportAction;
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
