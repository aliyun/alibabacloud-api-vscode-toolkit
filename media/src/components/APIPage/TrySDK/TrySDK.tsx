/**
 * @author 念依
 * @description
 */
import React from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { getLanguageEditorByLang } from "../../utils";
import { Editor } from "@monaco-editor/react";
import { codes } from "../../../mocks/makeCode";
import { Tag } from "antd";
import { PontUIService } from "../../../service/UIService";
import { APIPageContext } from "../context";

export class TrySDKProps {}

export const TrySDK: React.FC<TrySDKProps> = (props) => {
  // const daraSdkLannguages = SDKPublishInfo.getDaraLanguages(props.sdkInfos || [], product, version);
  const { apiMeta, schemaForm, product, version, onDebug, changeMode, endpoints, regionId } = APIPageContext.useContainer();
  const [languageTab, setLanguageTab] = React.useState("java-async");
  const [sdkDemos, setSdkDemos] = React.useState(codes.demoSdk as any);

  React.useEffect(() => {
    PontUIService.makeCodeRequest({
        paramsValue: schemaForm.formData,
        apiMeta: apiMeta,
        product,
        version,
        endpoint: endpoints?.find((item) => item.regionId === regionId)?.public,
        regionId:regionId
      }).then((res) => {
      setSdkDemos(res?.data?.demoSdk || codes.demoSdk);
    });
  }, [schemaForm.formData, regionId, apiMeta?.name,product,version ]);

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

  const tabContent = React.useMemo(() => {
    return sdkDemos ? (
      <>
        <Editor
          height={800}
          options={{
            readOnly: true,
          }}
          // theme='vs-dark'
          language={getEditorLanguage(languageTab)}
          value={sdkDemos[languageTab?.toLocaleLowerCase()]}
        />
      </>
    ): null;
  }, [languageTab, sdkDemos]);

  return React.useMemo(() => {
    return (
      <div className="sdk-demo-content">
        <div className="head-info">
          <Tag color="#3b5999">sdk | v2.0</Tag>
        </div>
        <LanguageSwitcher
          language={languageTab}
          sdkDemos={sdkDemos}
          extra={null}
          onLanguageChange={(lang) => setLanguageTab(lang)}
          tabContent={tabContent}
        ></LanguageSwitcher>
      </div>
    );
  }, [languageTab, sdkDemos, tabContent]);
};
TrySDK.defaultProps = new TrySDKProps();
export default TrySDK;
