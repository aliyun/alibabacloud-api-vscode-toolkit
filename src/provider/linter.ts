/**
 * @description: Linter of the Code
 */
import * as vscode from "vscode";
import { fileSel } from "../utils";

class Rule {
  LintName: string;
  pattern: string;
  message: string;
  source: string;
  information: string;
  methods: Array<{
    title: string;
    command: string;
  }>;
}
export const LintRules: Array<Rule> = [
  {
    LintName: "AccessKey-KeyValue",
    source: "Alicloud AccessKey Lint",
    pattern:
      '(?<keyword>access|key|secret|scret|ak|sk)[^\\w\\n]*(?:\\n)?(?<separator>["\'\\s]*[:=@,]\\s*(?:"|\')?|\\w*"\\s*?,\\s*?")[\\s"\']*(?<key>[0-9A-Za-z]{14,40})(?<suffix>["\'\\s]*)',
    message: "工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性。",
    information: "在此处透露了 AccessKey。",
    methods: [{ title: "凭据的安全使用方案", command: "alicloud.api.akSecurityHelper" }],
  },
  {
    LintName: "AccessKey-NewAK",
    source: "Alicloud AccessKey Lint",
    information: "在此处透露了 AccessKey。",
    pattern:
      "^LTAI(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{12}$|^LTAI(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{16}$|^LTAI(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{18}$|^LTAI(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{20}$|^LTAI(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{22}$",
    message: "工程代码泄露可能会导致 AccessKey 泄露，并威胁账号下所有资源的安全性。",
    methods: [{ title: "凭据的安全使用方案", command: "alicloud.api.akSecurityHelper" }],
  },
];

function searchCode(
  diagnosticCollection: vscode.Diagnostic[],
  rule: Rule,
  text: string,
  document: vscode.TextDocument,
) {
  const regex = new RegExp(rule.pattern, "gi");
  let match;
  while ((match = regex.exec(text)) !== null) {
    const range = new vscode.Range(document.positionAt(match.index), document.positionAt(regex.lastIndex));
    const matchText = document.getText(range);
    if (!diagnosticCollection?.find((item) => item.code === matchText)) {
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
}

export async function updateDiagnostics(
  document: vscode.TextDocument,
  collection: vscode.DiagnosticCollection,
): Promise<void> {
  if ((fileSel as any)?.find((sel) => sel.language === document.languageId)) {
    const text = document.getText();

    let diagnosticCollection: vscode.Diagnostic[] = [];

    LintRules.forEach((rule) => {
      searchCode(diagnosticCollection, rule, text, document);
    });

    collection.set(document.uri, diagnosticCollection);
  } else {
    collection.clear();
  }
}
