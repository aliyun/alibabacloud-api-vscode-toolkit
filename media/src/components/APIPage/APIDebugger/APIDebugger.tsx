/**
 * @author yini-chen
 * @description API debugger
 */
import React from "react";
import { APIPageContext } from "../context";
import { Input, Button } from "@alicloud/console-components";
import { SemixForm } from "../../SemixFormRender";
import I18N from "../../../utils/I18N";
import { PontUIService } from "../../../service/UIService";
import { endpointsMocks } from "../../../mocks/endpoints";
import RegionSelector from "./RegionSelector";
import { xconsoleWidgets } from "./widgets/xconsole";
import { APIGuide } from "./APIGuide";
// import { APIGuide } from "./Guide";
// import { APIGuide } from "./APIGuide";
// import APIGuide from "./Guide";

export class APIDebuggerProps {}

export const APIDebugger: React.FC<APIDebuggerProps> = (props) => {
  const { apiMeta, schemaForm, product, version, onDebug, changeMode, endpoints, regionId, setRegionId } = APIPageContext.useContainer();

  return React.useMemo(() => {
    return (
      <div className="api-debug">
        <div className="head-content">
        <RegionSelector endpoints={endpoints} regionId={regionId} setRegionId={setRegionId} product={product}></RegionSelector>
        </div>
        <div className="middle-content">
        <SemixForm
          widgets={xconsoleWidgets}
          renderTitle={(props)=>{
            return <APIGuide product={product} version={version} {...props} ></APIGuide>
          }}
          form={schemaForm as any}
          //   onChange={(value): void => {
          //     callVscode({ data: value, type: "openAPIDebug", requestId: 100 }, (res) => {
          //         console.log("callVscode callback", res);
          //       });
          //   }}
        ></SemixForm>
        </div>
        <div className="footer-content">
          <Button onClick={()=>{
            schemaForm.setFormData({})
          }}>
            {I18N.main.explorer.empty}
          </Button>
          <Button
          onClick={() => {
            changeMode("debug");
            onDebug({
              paramsValue: schemaForm.formData,
              apiMeta: apiMeta,
              product,
              version,
              endpoint: endpoints?.find((item) => item.regionId === regionId)?.public
            })
          }}
        >
          {I18N.main.explorer.debug}
        </Button></div>
        
      </div>
    );
  }, [schemaForm.formData, regionId, endpoints]);
};
APIDebugger.defaultProps = new APIDebuggerProps();
export default APIDebugger;
