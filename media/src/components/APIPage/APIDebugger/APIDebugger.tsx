/**
 * @author yini-chen
 * @description API debugger
 */
import { Button } from "@alicloud/console-components";
import React from "react";
import I18N from "../../../utils/I18N";
import { SemixForm } from "../../SemixFormRender";
import { APIPageContext } from "../context";
import { APIGuide } from "./APIGuide";
import RegionSelector from "./RegionSelector";
import { xconsoleWidgets } from "./widgets/xconsole";
import { debugForbiddenProducts } from "../../../utils/utils";

export class APIDebuggerProps {}

export const APIDebugger: React.FC<APIDebuggerProps> = (props) => {
  const { apiMeta, schemaForm, product, version, onDebug, changeMode, endpoints, regionId, setRegionId } =
    APIPageContext.useContainer();

  const endpoint = regionId
    ? endpoints?.find((item) => item.regionId === regionId)?.public
    : endpoints?.find((item) => item.regionId === "cn-hangzhou")?.public;

  return (
    <div className="relative flex h-full flex-col justify-between border-r">
      <div className="border-b p-4">
        <RegionSelector
          endpoints={endpoints}
          regionId={regionId}
          setRegionId={setRegionId}
          product={product}
        ></RegionSelector>
      </div>
      <div className="scrollbar-custom h-full overflow-y-scroll p-4">
        <SemixForm
          widgets={xconsoleWidgets}
          renderTitle={(props) => {
            return <APIGuide product={product} version={version} {...props}></APIGuide>;
          }}
          form={schemaForm as any}
          //   onChange={(value): void => {
          //     callVscode({ data: value, type: "openAPIDebug", requestId: 100 }, (res) => {
          //         console.log("callVscode callback", res);
          //       });
          //   }}
        ></SemixForm>
      </div>
      <div className="flex h-16 justify-between border-t p-4">
        <Button
          onClick={() => {
            schemaForm.setFormData({});
          }}
        >
          {I18N.main.explorer.empty}
        </Button>
        {debugForbiddenProducts?.includes(`${product}__${version}`) ? (
          <a href={apiMeta?.externalDocs?.url}>
            <Button type="primary">去门户网页版调试</Button>
          </a>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              changeMode("debug");
              onDebug({
                paramsValue: schemaForm.formData,
                apiMeta: apiMeta,
                product,
                version,
                endpoint: endpoint,
              });
            }}
          >
            {I18N.main.explorer.debug}
          </Button>
        )}
      </div>
    </div>
  );
};
APIDebugger.defaultProps = new APIDebuggerProps();
export default APIDebugger;
