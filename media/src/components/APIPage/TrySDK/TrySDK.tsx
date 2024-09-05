/**
 * @author yini-chen
 * @description
 */
import { Tag } from "antd";
import React from "react";
import { codes } from "../../../mocks/makeCode";
import { PontUIService } from "../../../service/UIService";
import { getVSCode } from "../../../utils/utils";
import MonacoEditor from "../../common/MonacoEditor";
import { APIPageContext } from "../context";
import { DARA_SDK_LANGUAGES } from "./LanguageSwitcher";
import { SDKInfo } from "./SDKInfo";
import { Balloon } from "@alicloud/console-components";
import { EditorLanguages } from "../../../types/EditorLanguages";

export class TrySDKProps {
  isExpand? = true;
}

export const TrySDK: React.FC<TrySDKProps> = (props) => {
  const { sdkInfo, theme, apiMeta, schemaForm, product, version, endpoints, regionId, mode } =
    APIPageContext.useContainer();
  const [languageTab, setLanguageTab] = React.useState(EditorLanguages.TypeScript);
  const [sdkDemos, setSdkDemos] = React.useState(codes.demoSdk as any);

  React.useEffect(() => {
    PontUIService.getLocalLanguage().then((res) => {
      if (res?.length) {
        setLanguageTab(res);
      } else {
        setLanguageTab(EditorLanguages.Java);
      }
    });
  });

  React.useEffect(() => {
    PontUIService.makeCodeRequest({
      paramsValue: schemaForm.formData,
      apiMeta: apiMeta,
      product,
      version,
      endpoint: endpoints?.find((item) => item.regionId === regionId)?.public,
      regionId: regionId,
    }).then((res) => {
      setSdkDemos(res?.data?.demoSdk || codes.demoSdk);
    });
  }, [schemaForm.formData, regionId, apiMeta?.name, product, version, endpoints]);

  const getEditorLanguage = (lang) => {
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

  React.useEffect(() => {
    if (mode === "sdk") {
      getVSCode()?.setState({
        ...getVSCode()?.getState(),
        code: sdkDemos[languageTab?.toLocaleLowerCase()],
        language: languageTab,
      });
    }
  }, [mode, languageTab, sdkDemos[languageTab?.toLocaleLowerCase()]]);

  const getCode = React.useCallback(() => {
    if (!sdkDemos[languageTab?.toLocaleLowerCase()]) {
      return "// API 暂未支持该语言的 SDK";
    }
    return sdkDemos[languageTab?.toLocaleLowerCase()];
  }, [sdkDemos, languageTab]);

  const sdkDetail = sdkInfo?.[`${languageTab.toLocaleLowerCase()}-tea`];

  return React.useMemo(() => {
    return (
      <div className="sdk-demo-content h-[calc(100vh_-_194px)]">
        <MonacoEditor
          languageTab={languageTab}
          theme={theme}
          height={"100vh"}
          setLanguageTab={setLanguageTab}
          header={
            <>
              <div className="head-info">
                <Tag color="#3b5999">sdk | v2.0</Tag>
              </div>
              {sdkDetail ? (
                <Balloon
                  align="b"
                  triggerType="click"
                  style={{ maxWidth: "380px" }}
                  closable={false}
                  trigger={
                    <span className="m-auto cursor-pointer text-xs text-[var(--vscode-textPreformat-foreground)]">
                      SDK 安装信息
                    </span>
                  }
                >
                  <SDKInfo
                    sdkDetail={sdkDetail}
                    theme={theme}
                    lanKey={languageTab.toLocaleLowerCase()}
                    product={product}
                    version={version}
                  ></SDKInfo>
                </Balloon>
              ) : null}
            </>
          }
          menuItems={[
            {
              key: "gotoweb",
              label: "去门户网页版调试",
              codicon: "link-external",
              externalLink: apiMeta?.externalDocs?.url,
              onClick: () => {
                // window.open(apiMeta?.externalDocs?.url, "_blank");
              },
            },
          ]}
          value={getCode()}
          languages={DARA_SDK_LANGUAGES?.map((lang) => {
            if (Object.keys(sdkDemos || {})?.includes(lang?.value?.toLocaleLowerCase())) {
              return lang;
            } else {
              return { ...lang, disabled: true };
            }
          })}
        ></MonacoEditor>
      </div>
    );
  }, [languageTab, sdkDemos, props.isExpand]);
};
TrySDK.defaultProps = new TrySDKProps();
export default TrySDK;
