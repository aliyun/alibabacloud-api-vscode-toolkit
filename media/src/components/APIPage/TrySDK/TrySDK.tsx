/**
 * @author yini-chen
 * @description
 */
import React from "react";
import { DARA_SDK_LANGUAGES, LanguageSwitcher } from "./LanguageSwitcher";
import { Editor } from "@monaco-editor/react";
import { codes } from "../../../mocks/makeCode";
import { MenuProps, Tag } from "antd";
import { PontUIService } from "../../../service/UIService";
import { APIPageContext } from "../context";
import { Button } from "@alicloud/console-components";
import { getVSCode } from "../../../utils/utils";
import MonacoEditor from "../../common/MonacoEditor";

export class TrySDKProps {}

export const TrySDK: React.FC<TrySDKProps> = (props) => {
  // const daraSdkLannguages = SDKPublishInfo.getDaraLanguages(props.sdkInfos || [], product, version);
  const { apiMeta, schemaForm, product, version, onDebug, changeMode, endpoints, regionId, mode } =
    APIPageContext.useContainer();
  const [languageTab, setLanguageTab] = React.useState("Java");
  const [sdkDemos, setSdkDemos] = React.useState(codes.demoSdk as any);

  React.useEffect(() => {
    PontUIService.getLocalLanguage().then((res) => {
      if (res?.length) {
        setLanguageTab(res);
      } else {
        setLanguageTab("Java");
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


  const tabContent = React.useMemo(() => {
    return sdkDemos ? (
      <div className="tab-content">
        <Editor
          height={800}
          options={{
            readOnly: true,
            tabCompletion: "on",
          }}
          // theme='vs-dark'
          language={getEditorLanguage(languageTab)}
          value={sdkDemos[languageTab?.toLocaleLowerCase()]}
        />
      </div>
    ) : null;
  }, [languageTab, sdkDemos]);

  const getCode = React.useCallback(()=>{
    if(!sdkDemos[languageTab?.toLocaleLowerCase()]){
      return "// API 暂未支持该语言的 SDK"
    }
    return sdkDemos[languageTab?.toLocaleLowerCase()]
  },[sdkDemos, languageTab])

  return React.useMemo(() => {
    return (
      <div className="sdk-demo-content">
        <MonacoEditor
          languageTab={languageTab}
          height={580}
          setLanguageTab={setLanguageTab}
          header={
            <div className="head-info">
              <Tag color="#3b5999">sdk | v2.0</Tag>
            </div>
          }
          menuItems={[{
            key: "gotoweb",
            label: "去门户网页版调试",
            codicon:"link-external",
            externalLink: apiMeta?.externalDocs?.url,
            onClick: () => {
              // window.open(apiMeta?.externalDocs?.url, "_blank");
            },
          }]}
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
  }, [languageTab, sdkDemos, tabContent]);
};
TrySDK.defaultProps = new TrySDKProps();
export default TrySDK;
