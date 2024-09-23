import React from "react";
import { Row, Col, Typography, Tooltip } from "antd";
import I18N from "../../../utils/I18N";
import HighlightCode from "../../common/HighlightCode";
import { PontUIService } from "../../../service/UIService";

export class SDKInfoProps {
  sdkDetail: any;
  lanKey: string;
  product: string;
  version: string;
  theme: string;
}

export const SDKInfo: React.FC<SDKInfoProps> = (props) => {
  const { sdkDetail, lanKey } = props;

  const getSdkInstall = (install, lan) => {
    if (["java", "java-async"].includes(lan)) {
      const arr = (install || "").split(":");
      return `<dependency>\n  <groupId>${arr?.[0]}</groupId>\n  <artifactId>${arr?.[1]}</artifactId>\n  <version>${arr?.[2]}</version>\n</dependency>`;
    }

    return install;
  };

  const items = [
    {
      title: "SDK包名称：",
      content: (
        <Typography.Text className="text-xs text-[var(--vscode-textPreformat-foreground)]" copyable>
          {sdkDetail.package_name}
        </Typography.Text>
      ),
    },
    {
      title: "SDK包版本：",
      content: (
        <Typography.Text className="text-xs text-[var(--vscode-textPreformat-foreground)]" copyable>
          {sdkDetail.last_version}
        </Typography.Text>
      ),
    },
    {
      title: "SDK 包管理平台：",
      content: (
        <Typography.Text className="text-xs text-[var(--vscode-textPreformat-foreground)]" copyable>
          {sdkDetail.platform}
        </Typography.Text>
      ),
    },
    // {
    //   title: "相关链接：",
    //   content: (
    //     <a
    //       href={`/api-tools/sdk/${product}?version=${version}&language=${
    //         isOldSDK ? lanKey : `${lanKey}-tea`
    //       }&tab=history-version&sdkReportVersion=${sdkDetail?.last_version}`}
    //       target="_blank"
    //     >
    //       {I18N.ide.main.explorer.SDKReport}
    //     </a>
    //   ),
    // },
    {
      title: "SDK 安装命令：",
      content: (
        <HighlightCode
          isShowCopyIcon
          source={getSdkInstall(sdkDetail?.install, lanKey)}
          language={lanKey === "java" ? "java" : "powershell"}
          otherTag={
            lanKey === "javascript" || lanKey === "typescript" ? (
              <Tooltip title={<span className="text-xs text-white">运行脚本</span>}>
                <div
                  className="codicon codicon-debug-start mx-1 cursor-pointer"
                  style={{
                    fontSize: "14px",
                    alignItems: lanKey?.includes("java") ? "baseline" : "center",
                    marginLeft: "4px",
                    display: "flex",
                  }}
                  onClick={() => {
                    PontUIService.executeCli({
                      code: getSdkInstall(sdkDetail?.install, lanKey),
                      language: "node",
                    });
                  }}
                />
              </Tooltip>
            ) : null
          }
        ></HighlightCode>
      ),
    },
  ];

  const sdkInfoContent = (
    <div className="sdk-info-popover">
      {sdkDetail ? (
        <div className="sdk-demo-content-tip w-[full] text-xs">
          {items.map((item) => {
            return (
              <Row className="my-2 text-xs">
                <Col span={9} className="mb-1 text-xs">
                  <span className="w-22 inline-block">{item.title}</span>
                </Col>
                <Col className="text-xs">{item.content}</Col>
              </Row>
            );
          })}
          <div className="text=[var(--vscode-editor-foreground)] mt-2 opacity-70">{I18N.ide.main.explorer.syncDelay}</div>
        </div>
      ) : null}
    </div>
  );

  return sdkInfoContent;
};

SDKInfo.defaultProps = new SDKInfoProps();
