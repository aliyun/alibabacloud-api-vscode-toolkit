/**
 * @description: Linter of the Code
 */
import * as vscode from "vscode";
import { fileSel } from "../utils";
import I18N from "../utils/I18N";

class Rule {
  LintName: string;
  pattern: string;
  message: string;
  source: string;
  information: string;
  length?: number;
  methods: Array<{
    title: string;
    command: string;
  }>;
}
export const LintRules: Array<Rule> = [
  {
    LintName: "AccessKey-NewAK",
    source: "Alibaba Cloud AK Lint",
    information: I18N.provider.linter.leakAK,
    pattern: `^LTAI(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{12}$|^LTAI(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{16}$|^LTAI(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{18}$|^LTAI(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{20}$|^LTAI(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{22}$`,
    message: I18N.provider.linter.akLintTip,
    methods: [{ title: I18N.provider.linter.srcurityCredential, command: "alicloud.api.akSecurityHelper" }],
  },
  {
    LintName: "AccessSecret",
    source: "Alibaba Cloud AK Lint",
    information: I18N.provider.linter.leakSK,
    pattern: `(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{30}`,
    length: 30,
    message: I18N.provider.linter.akLintTip,
    methods: [{ title: I18N.provider.linter.srcurityCredential, command: "alicloud.api.akSecurityHelper" }],
  },
];

export function searchCode(
  diagnosticCollection: vscode.Diagnostic[],
  rule: Rule,
  text: string,
  document: vscode.TextDocument,
) {
  const regex = new RegExp(rule.pattern, "gi");
  const strRegex = new RegExp(`[\'\"\`](.*?)[\'\"\`]`, "gi");
  let strMatch;
  let matchTexts = [];
  while ((strMatch = strRegex.exec(text)) !== null) {
    const range = new vscode.Range(document.positionAt(strMatch.index), document.positionAt(strRegex.lastIndex));
    const matchText = document.getText(range);
    const pureString = matchText.substring(1, matchText.length - 1);
    const isMatch = rule?.length
      ? regex.test(pureString) && pureString?.length === rule.length
      : regex.test(pureString);
    if (isMatch) {
      matchTexts.push(pureString);
      diagnosticCollection.push({
        code: "",
        message: rule.message,
        range: range,
        severity: vscode.DiagnosticSeverity.Error,
        source: rule.source,
        relatedInformation: [
          new vscode.DiagnosticRelatedInformation(new vscode.Location(document.uri, range), rule.information),
        ],
      });
    }
  }
  return matchTexts;
}

export async function updateDiagnostics(
  document: vscode.TextDocument,
  collection: vscode.DiagnosticCollection,
): Promise<void> {
  if ((fileSel as any)?.find((sel) => sel.language === document.languageId)) {
    const text = document.getText();

    let diagnosticCollection: vscode.Diagnostic[] = [];

    let errors = [];

    errors = searchCode(diagnosticCollection, LintRules[0], text, document);
    if (errors?.length) {
      searchCode(diagnosticCollection, LintRules[1], text, document);
    }

    // LintRules.forEach((rule) => {
    //   searchCode(diagnosticCollection, rule, text, document);
    // });

    collection.set(document.uri, diagnosticCollection);
  } else {
    collection.clear();
  }
}

export async function registerLinter(context: vscode.ExtensionContext) {
  // 插件诊断器
  const collection = vscode.languages.createDiagnosticCollection("alicloud-linter");
  if (vscode.window.activeTextEditor) {
    updateDiagnostics(vscode.window.activeTextEditor.document, collection);
  }
  context.subscriptions.push(
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (editor) {
        updateDiagnostics(editor.document, collection);
      }
    }),
  );
  context.subscriptions.push(
    vscode.workspace.onDidCloseTextDocument((document) => {
      // 文件关闭（删除）后清空诊断
      collection.clear();
    }),
  );
  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((editor) => {
      if (editor) {
        updateDiagnostics(editor.document, collection);
      }
    }),
  );
}
