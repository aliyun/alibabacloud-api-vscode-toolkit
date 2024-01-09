import _ from "lodash";
import { APIResponse } from "../types/WorkbenchAPI";
import { Parser } from 'xml2js';
import { EditorLanguages } from "./define";
import { PontUIService } from "../service/UIService";
import { getVSCode } from "../utils/utils";

export const getRefSchema = (schemas: any) => ($ref: string) => {
  const schemaName = $ref.split("/").pop();
  const schema = schemaName ? schemas?.[schemaName] : {};
  if (schema) {
    return schema;
  }
  return null;
};

export function getIsUploadApi(response: APIResponse | APIResponse[]) {
  return ((_.isArray(response) ? response : response) as any)?.type === 'Binary';
}

export const parseXml = (body: string): any => {
  let parser = new Parser({ explicitArray: false });
  let result: { [key: string]: any } = {};
  parser.parseString(body, function (err: any, output: any) {
    result.err = err;
    result.output = output;
  });
  if (result.err) {
    throw result.err;
  }
  return result.output;
};

export const getLanguageEditorByLang = (
  lang:
    | 'JAVA'
    | 'NODEJS'
    | 'GO'
    | 'PHP'
    | 'PYTHON'
    | 'PYTHON2'
    | 'CSHARP'
    | 'RUBY'
    | 'TYPESCRIPT'
    | 'JAVAASYNC'
    | 'SWIFT',
) => {
  switch (lang) {
    case 'CSHARP': {
      return EditorLanguages.CSharp;
    }
    case 'GO': {
      return EditorLanguages.Go;
    }
    case 'JAVA': {
      return EditorLanguages.Java;
    }
    case 'JAVAASYNC': {
      return EditorLanguages.JavaAsync;
    }
    case 'NODEJS': {
      return EditorLanguages.Javascript;
    }
    case 'PHP': {
      return EditorLanguages.PHP;
    }
    case 'PYTHON': {
      return EditorLanguages.Python;
    }
    case 'PYTHON2': {
      return EditorLanguages.Python2;
    }
    case 'RUBY': {
      return EditorLanguages.Ruby;
    }
    case 'TYPESCRIPT': {
      return EditorLanguages.TypeScript;
    }
    case 'SWIFT': {
      return EditorLanguages.Swift;
    }
    default: {
      return EditorLanguages.Javascript;
    }
  }
};

export const getLangByLanguageEditor = (language: EditorLanguages) => {
  switch (language) {
    case EditorLanguages.TypeScript: {
      return 'TYPESCRIPT';
    }
    case EditorLanguages.CSharp: {
      return 'CSHARP';
    }
    case EditorLanguages.Go: {
      return 'GO';
    }
    case EditorLanguages.Java: {
      return 'JAVA';
    }
    case EditorLanguages.JavaAsync: {
      return 'JAVAASYNC';
    }
    case EditorLanguages.Javascript: {
      return 'NODEJS';
    }
    case EditorLanguages.PHP: {
      return 'PHP';
    }
    case EditorLanguages.Python: {
      return 'PYTHON';
    }
    case EditorLanguages.Python2: {
      return 'PYTHON2';
    }
    case EditorLanguages.Ruby: {
      return 'RUBY';
    }
    case EditorLanguages.CPP: {
      return 'CPP';
    }
    case EditorLanguages.Swift: {
      return 'SWIFT';
    }
    default: {
      return language;
    }
  }
};

export const getEditorMenuItems = (code, language):Array<{ key: string; label: string; codicon?: string; onClick: () => void }> => {
  return [
    {
      key: "openInCode",
      label: "在 IDE 中打开",
      codicon: "file-code",
      onClick: () => {
        PontUIService.openInCode({
          code: code,
          language: language,
        });
      },
    },
    {
      key: "saveToFile",
      label: "另存为...",
      codicon: "save-as",
      onClick: () => {
        PontUIService.saveToFile(code || "");
      },
    },
  ];
}

export const getEditorLanguage = (lang) => {
  switch (lang) {
    case "java-async":
      return "java";
    case "Java":
      return "java";
    case "TypeScript":
      return "typescript";
    case "Go":
      return "go";
    case "PHP":
      return "php";
    case "Python":
      return "python";
    case "Python2":
      return "python";
    case "CSharp":
      return "csharp";
    case "cpp":
      return "cpp";
    case "swift":
      return "swift";
    default:
      return "javascript";
  }
};
