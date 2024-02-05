import * as vscode from "vscode";

export const makeJavaImportList = () => {
  return {
    "java":`import com.aliyun.tea.*;`
  };
};

export const makeJavaAsyncImportList = () => {
    const importParts = {
      Credential: `import com.aliyun.auth.credentials.Credential;\n`,
      StaticCredentialProvider: `import com.aliyun.auth.credentials.provider.StaticCredentialProvider;\n`,
      Gson: `import com.google.gson.Gson;\n`,
      ClientOverrideConfiguration: `import darabonba.core.client.ClientOverrideConfiguration;\n`,
      CompletableFuture: `import java.util.concurrent.CompletableFuture;\n`,
    };
    return importParts;
  };

export const makeTSImportList = () => {
  const importParts = {
    OpenApi: `import OpenApi, * as $OpenApi from '@alicloud/openapi-client';\n`,
    $OpenApi: `import OpenApi, * as $OpenApi from '@alicloud/openapi-client';\n`,
    Util: `import Util, * as $Util from '@alicloud/tea-util';\n`,
    $Util: `import Util, * as $Util from '@alicloud/tea-util';\n`,
    $tea: `import * as $tea from '@alicloud/tea-typescript';\n`,
  };
  return importParts;
};

export const makePyImportList = () => {
  const importParts = {
    os: `import os\n`,
    sys: `import sys\n`,
    open_api_models: `from alibabacloud_tea_openapi import models as open_api_models\n`,
    util_models: `from alibabacloud_tea_util import models as util_models\n`,
    UtilClient: `from alibabacloud_tea_util.client import Client as UtilClient\n`,
  };
  return importParts;
};

export const generateImport = (missingDep: string, rang: vscode.Range): string => {
  const language = vscode.window.activeTextEditor?.document.languageId;
  let dep = missingDep;
  if (missingDep?.includes("$")) {
    dep = dep.replace("$", "");
  }
  switch (language) {
    case "typescript":
      return makeTSImportList()[dep] || `import ${dep}, * as $${dep} from '@alicloud/${dep}';\n`;
    case "python":
      return makePyImportList()[dep];
    default:
      return "";
  }
};


export const getDepsByLanguage = (dep, rang: vscode.Range) => {
  const language = vscode.window.activeTextEditor?.document.languageId;
  switch (language) {
    case "typescript":
      return Object.keys(makeTSImportList() || []);
    case "python":
      return Object.keys(makePyImportList() || []);
    default:
      return [];
  }
};
