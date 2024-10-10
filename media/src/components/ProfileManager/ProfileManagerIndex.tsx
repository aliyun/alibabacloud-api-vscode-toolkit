/**
 * @author yini-chen
 * @description profiles manager index
 */
import { Button, Form, Input, Message } from "@alicloud/console-components";
import React from "react";
import { PontUIService } from "../../service/UIService";
import { message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import I18N from "../../utils/I18N";

export class ProfileManagerIndexProps {}

export const ProfileManagerIndex: React.FC<ProfileManagerIndexProps> = (props) => {
  const [status, setStatus] = React.useState("edit");
  return (
    <div className="m-auto w-[60%]">
      <div className="my-8 flex">
        <img
          className="h-20 p-0"
          src="https://gw.alicdn.com/imgextra/i3/O1CN01OYLeqI1QoaCtQcMvA_!!6000000002023-2-tps-128-128.png"
        ></img>
        <span className="text-alicloud-theme ml-4 text-5xl font-bold leading-[80px]">OpenAPI</span>
      </div>
      <div className="flex-col">
        <div className="text-base font-medium text-gray-700">{I18N.src.explorer.configAKProfile}</div>
        <div className="my-2 text-gray-500">
          <span className="text-gray-500">{I18N.ProfileManager.ProfileManagerIndex.tip1}</span>
          <ul className="list-inside list-disc">
            <li>{I18N.ProfileManager.ProfileManagerIndex.Tip2}</li>
            <li>{I18N.ProfileManager.ProfileManagerIndex.tip3}</li>
          </ul>
        </div>
        {status === "success" ? (
          <div className="my-4 text-base">
            <div className="flex w-[100%] rounded-sm bg-[#d8f5d8] px-4 py-2 text-sm">
              <div className="codicon codicon-pass-filled success m-[2px] mr-1 leading-5 text-green-600"></div>
              <div className="text-[12px] leading-5 text-gray-600">
                {I18N.ProfileManager.ProfileManagerIndex.addSuccess}
              </div>
            </div>
            <div className="my-8 flex justify-end">
              <Button
                type="primary"
                onClick={() => {
                  setStatus("edit");
                }}
              >
                {I18N.ProfileManager.ProfileManagerIndex.continueAdd}
              </Button>
              <Button
                className="ml-4"
                onClick={() => {
                  PontUIService.closeCurrentTab();
                }}
              >
                {I18N.ide.main.common.close}
              </Button>
            </div>
          </div>
        ) : (
          <div>
            {status === "loading" ? (
              <div className="my-4 flex w-[100%] rounded-sm bg-[#f6f6f6] px-4 py-2 text-sm">
                <LoadingOutlined />
                <div className="ml-2 text-[12px] leading-5 text-gray-600">
                  {I18N.ProfileManager.ProfileManagerIndex.writing}
                </div>
              </div>
            ) : null}
            <Form labelAlign="left">
              <Form.Item
                label={
                  <span className="text-sm font-medium text-gray-900">
                    {I18N.ProfileManager.ProfileManagerIndex.title}
                  </span>
                }
                required
              >
                <span className="text-gray-500">{I18N.ProfileManager.ProfileManagerIndex.tip4}</span>
                <Input id="profileName" name="profileName" placeholder={I18N.ide.main.explorer.inputString} />
              </Form.Item>
              <Form.Item label={<span className="text-sm font-medium text-gray-900">Access Key</span>} required>
                <span className="text-gray-500">
                  {I18N.ProfileManager.ProfileManagerIndex.look}
                  <a
                    href="https://help.aliyun.com/zh/ram/user-guide/create-an-accesskey-pair#title-ebf-nrl-l0i"
                    target="_blank"
                  >
                    {I18N.ProfileManager.ProfileManagerIndex.createRamAK}
                  </a>
                  {I18N.ide.main.explorer.fullStop}
                </span>
                <Input
                  id="accessKey"
                  name="accessKey"
                  placeholder={I18N.ProfileManager.ProfileManagerIndex.akInputTip}
                />
              </Form.Item>
              <Form.Item label={<span className="text-sm font-medium text-gray-900">Secret Key</span>} required>
                <span className="text-gray-500">
                  {I18N.ProfileManager.ProfileManagerIndex.look}
                  <a
                    href="https://help.aliyun.com/zh/ram/user-guide/create-an-accesskey-pair#title-ebf-nrl-l0i"
                    target="_blank"
                  >
                    {I18N.ProfileManager.ProfileManagerIndex.createRamAK}
                  </a>
                  {I18N.ide.main.explorer.fullStop}
                </span>
                <Input
                  id="secretKey"
                  name="secretKey"
                  placeholder={I18N.ProfileManager.ProfileManagerIndex.skInputTip}
                />
              </Form.Item>
              <Form.Item
                label={
                  <span className="text-sm font-medium text-gray-900">
                    {I18N.ProfileManager.ProfileManagerIndex.defaultRegionId}
                  </span>
                }
                required
              >
                <span className="text-gray-500">
                  {I18N.ProfileManager.ProfileManagerIndex.look2}
                  <a
                    href="https://help.aliyun.com/zh/ecs/product-overview/regions-and-zones#concept-2459516"
                    target="_blank"
                  >
                    {I18N.ProfileManager.ProfileManagerIndex.regionsAndZone}
                  </a>
                  {I18N.ide.main.explorer.fullStop}
                </span>
                <Input
                  id="defaultRegionId"
                  name="defaultRegionId"
                  placeholder={I18N.ProfileManager.ProfileManagerIndex.regionInputTip}
                />
              </Form.Item>
              <div className="flex">
                <Form.Submit
                  validate
                  type="primary"
                  onClick={(submitValue, errors) => {
                    if (errors) {
                      return;
                    } else {
                      setStatus("loading");
                      PontUIService.addNewAKProfile(submitValue).then((res) => {
                        if (res.success === true) {
                          setStatus("success");
                        } else {
                          message.error(I18N.ProfileManager.ProfileManagerIndex.faildToAdd);
                          setStatus("edit");
                        }
                      });
                    }
                  }}
                  className="text-right"
                >
                  {I18N.ProfileManager.ProfileManagerIndex.add}
                </Form.Submit>
                <Form.Reset style={{ marginLeft: 10 }}>{I18N.ProfileManager.ProfileManagerIndex.reset}</Form.Reset>
              </div>
            </Form>
          </div>
        )}
      </div>
    </div>
  );
};
ProfileManagerIndex.defaultProps = new ProfileManagerIndexProps();
export default ProfileManagerIndex;
