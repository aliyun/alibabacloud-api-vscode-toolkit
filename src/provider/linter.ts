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
    LintName: "AccessKey-NewAK",
    source: "Alicloud Access Key Lint",
    information: "在此处透露了 Access Key。",
    pattern: `^LTAI(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{12}$|^LTAI(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{16}$|^LTAI(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{18}$|^LTAI(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{20}$|^LTAI(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)[A-Za-z\\d]{22}$`,
    message: "在工程中硬编码 Access Key ID/Secret 容易发生凭证数据泄漏，并进而威胁到您账号下所有资源的安全性。",
    methods: [{ title: "凭据的安全使用方案", command: "alicloud.api.akSecurityHelper" }],
  },
  {
    LintName: "AccessSecret",
    source: "Alicloud AccessKey Lint",
    information: "在此处透露了 Access Secret。",
    pattern: `[a-zA-Z0-9]{30}`,
    message: "在工程中硬编码 Access Key ID/Secret 容易发生凭证数据泄漏，并进而威胁到您账号下所有资源的安全性。",
    methods: [{ title: "凭据的安全使用方案", command: "alicloud.api.akSecurityHelper" }],
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
    const isMatch = regex.test(pureString);
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

    LintRules.forEach((rule) => {
      searchCode(diagnosticCollection, rule, text, document);
    });

    collection.set(document.uri, diagnosticCollection);
  } else {
    collection.clear();
  }
}
