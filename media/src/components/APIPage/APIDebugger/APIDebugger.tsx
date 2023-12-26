/**
 * @author nianyi
 * @description API调试器
 */
import React from "react";
import { APIPageContext } from "../context";
import { Input, Button } from "@alicloud/console-components";
import { SemixForm } from "../../SemixFormRender";

export class APIDebuggerProps {}

export const APIDebugger: React.FC<APIDebuggerProps> = (props) => {
  const { apiMeta, schemaForm, product, version, onDebug } = APIPageContext.useContainer();

  return React.useMemo(() => {
    return (
      <div className="api-debug">
        {apiMeta.title}
        <SemixForm
          // widgets={serviceFormWidgets}
          // renderTitle={Guide}
          form={schemaForm as any}
          //   onChange={(value): void => {
          //     callVscode({ data: value, type: "openAPIDebug", requestId: 100 }, (res) => {
          //         console.log("callVscode callback", res);
          //       });
          //   }}
        ></SemixForm>
        <Button
          onClick={() => {
            onDebug({
              paramsValue: schemaForm.formData,
              apiMeta: apiMeta,
              product,
              version,
            })
          }}
        >
          调试
        </Button>
      </div>
    );
  }, [schemaForm.formData]);
};
APIDebugger.defaultProps = new APIDebuggerProps();
export default APIDebugger;
