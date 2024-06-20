/**
 * @author 念依
 * @description profiles manager index
 */
import { Button, Form, Input, Message } from "@alicloud/console-components";
import React from "react";
import { PontUIService } from "../../service/UIService";

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
      <div className="flex-col ">
        <div className="text-base font-medium">AK 凭证配置</div>
        <div className="my-2 text-gray-500">
          <span>凭证将存储于您个人用户目录下的 .aliyun 文件夹中，个人用户目录位置因操作系统而异：</span>
          <ul className="list-inside list-disc">
            <li>Windows环境：C:\Users\USERNAME\.aliyun</li>
            <li>Linux或macOS：~/.aliyun</li>
          </ul>
        </div>
        {status === "success" ? (
          <div className="my-4 text-base">
            <Message type="success">新增成功！</Message>
            <div className="my-8 flex justify-end">
              <Button
                type="primary"
                onClick={() => {
                  setStatus("edit");
                }}
              >
                继续新增
              </Button>
              <Button
                className="ml-4"
                onClick={() => {
                  PontUIService.closeCurrentTab();
                }}
              >
                关闭
              </Button>
            </div>
          </div>
        ) : (
          <Form labelAlign="left">
            <Form.Item label={<span className="text-sm font-medium">Profile 名称</span>} required>
              <span className="text-gray-500">用于区别不同的 profiles。</span>
              <Input id="profileName" name="profileName" placeholder="请输入字符串" />
            </Form.Item>
            <Form.Item label={<span className="text-sm font-medium">Access Key</span>} required>
              <span className="text-gray-500">
                获取方式请参见
                <a
                  href="https://help.aliyun.com/zh/ram/user-guide/create-an-accesskey-pair#title-ebf-nrl-l0i"
                  target="_blank"
                >
                  创建 RAM 用户的 AccessKey
                </a>
                。
              </span>
              <Input id="accessKey" name="accessKey" placeholder="指定您的AccessKey ID" />
            </Form.Item>
            <Form.Item label={<span className="text-sm font-medium">Secret Key</span>} required>
              <span className="text-gray-500">
                获取方式请参见
                <a
                  href="https://help.aliyun.com/zh/ram/user-guide/create-an-accesskey-pair#title-ebf-nrl-l0i"
                  target="_blank"
                >
                  创建 RAM 用户的 AccessKey
                </a>
                。
              </span>
              <Input id="secretKey" name="secretKey" placeholder="指定您的AccessKey Secret" />
            </Form.Item>
            <Form.Item label={<span className="text-sm font-medium">默认 Region Id</span>} required>
              <span className="text-gray-500">
                阿里云支持的 Region Id ，请参见
                <a
                  href="https://help.aliyun.com/zh/ecs/product-overview/regions-and-zones#concept-2459516"
                  target="_blank"
                >
                  地域和可用区
                </a>
                。
              </span>
              <Input id="defaultRegionId" name="defaultRegionId" placeholder="指定默认区域的Region Id" />
            </Form.Item>
            <div className="flex">
              <Form.Submit
                validate
                type="primary"
                onClick={(submitValue, errors) => {
                  if (errors) {
                    return;
                  } else {
                    PontUIService.addNewAKProfile(submitValue).then((res) => {
                      if (res.success === true) {
                        setStatus("success");
                      }
                    });
                  }
                }}
                className="text-right"
              >
                新增
              </Form.Submit>
              <Form.Reset style={{ marginLeft: 10 }}>重置</Form.Reset>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};
ProfileManagerIndex.defaultProps = new ProfileManagerIndexProps();
export default ProfileManagerIndex;
