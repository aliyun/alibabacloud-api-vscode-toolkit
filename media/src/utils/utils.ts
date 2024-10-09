import { PontSpec } from "pontx-spec";
import * as React from "react";
import { useEffect } from "react";
import { WebviewApi } from "vscode-webview";
import { PontUIService } from "../service/UIService";
import I18N from "./I18N";

declare let acquireVsCodeApi: any;

export const isDevelopment = process.env.NODE_ENV === "development";
export const getVSCode = () => {
  if ((window as any).vscode) {
    return (window as any).vscode;
  }

  const vscode: WebviewApi<any> = isDevelopment ? null : acquireVsCodeApi?.();
  (window as any).vscode = vscode;

  return vscode;
};

export function useCurrentSpec() {
  const [currentSpec, setCurrentSpec] = React.useState(undefined as PontSpec);

  useEffect(() => {
    PontUIService.requestPontSpecs().then((result) => {
      const currentSpec =
        result.localSpecs?.find((spec) => spec?.name === result?.currentOriginName) || result?.localSpecs?.[0];
      setCurrentSpec(currentSpec);
    });
  }, []);

  return {
    currentSpec,
  };
}
export type SpecInfo = {
  product: string;
  version: string;
};
export const getSpecInfoFromName = (name: string): SpecInfo => {
  if (name.includes("::")) {
    return {
      product: name.split("::")[0],
      version: name.split("::")[1],
    };
  }
  if (name.includes("__")) {
    return {
      product: name.split("__")[0],
      version: name.split("__")[1],
    };
  }
  return {
    product: "Ecs",
    version: "2014-05-26",
  };
};

export const debugForbiddenProducts = ["Kms__2016-01-20", "Oss__2019-05-17", "pds__2022-03-01", "Sls__2020-12-30"];

export class TableI18N {
  structLabel = I18N.ide.main.common.struct;
  viewDoc = "";
  fieldName = I18N.ide.main.common.fieldName;
  defaultText = I18N.ide.main.common.defaultValue;
  fieldDetail = I18N.ide.main.common.fieldDetail;
  expandDetail = I18N.ide.main.common.expandDetail;
  sampleValue = I18N.ide.main.explorer.sampleValue;
  enums = I18N.ide.main.common.enum;
  pattern = I18N.ide.main.common.regular;
  fieldValue = I18N.ide.main.common.value;
  itemsCnt = I18N.ide.main.common.itemsCut;
  charLength = I18N.ide.main.common.chatLenght;
}
