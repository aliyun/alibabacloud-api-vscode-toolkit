export const routerMeta = {
  specName: "Oss::2019-05-17",
  modName: "",
  spec: {
    consumes: ["application/xml"],
    deprecated: true,
    description:
      '## 接口说明\n\n<props="china">\n\n- **准备工作**：\n  - 通过实名认证。更多信息，请参见[账号实名认证相关文档](~~48263~~)。 \n  - 成本估算：了解云服务器ECS的计费方式。更多信息，请参见[计费概述](~~25398~~)。\n  - 产品选型：调用[DescribeInstanceTypes](~~25620~~)查看目标实例规格的性能数据，或者参见[选型配置](~~58291~~)了解如何选择实例规格。\n  - 查询库存：调用[DescribeAvailableResource](~~66186~~)查看指定地域或者可用区内的资源供给情况。\n  - 网络规划：您需要确保您已经有可用的安全组。更多信息，请参见[CreateSecurityGroup](~~25553~~)。创建专有网络VPC类型实例前，您需要预先在相应的阿里云地域[创建VPC](~~65430~~)。\n\n</props>\n\n\n<props="intl">\n\n- **准备工作**：\n  - 成本估算：了解云服务器ECS的计费方式。更多信息，请参见[计费概述](~~25398~~)。\n  - 产品选型：调用[DescribeInstanceTypes](~~25620~~)查看目标实例规格的性能数据，或者参见[选型配置](~~58291~~)了解如何选择实例规格。\n  - 查询库存：调用[DescribeAvailableResource](~~66186~~)查看指定地域或者可用区内的资源供给情况。\n  - 网络规划：您需要确保您已经有可用的安全组。更多信息，请参见[CreateSecurityGroup](~~25553~~)。创建专有网络VPC类型实例前，您需要预先在相应的阿里云地域[创建VPC](~~65430~~)。\n\n</props>\n\n- **与CreateInstance对比差异**：\n\n    和CreateInstance接口相比，RunInstances接口有以下优点：\n \n  - 单次最多可以创建100台实例，避免重复多次调用CreateInstance。\n  - 实例创建之后，实例会自动变成`Starting`状态，然后变成`Running`状态，不需要再调用[StartInstance](~~25500~~)启动实例。\n  - 创建实例时可以指定`InternetMaxBandwidthOut`为ECS实例分配公网IP，不需要您再调用[AllocatePublicIpAddress](~~25544~~)分配公网IP。\n  - 您可以指定`AutoReleaseTime`参数来设定自动释放时间，不需要再调用[ModifyInstanceAutoReleaseTime](~~47576~~)设置自动释放时间。\n  - 您可以指定`LaunchTemplateId`和`LaunchTemplateVersion`使用启动模板，可以免除您每次创建实例时都需要填入大量配置参数。\n  - 可以指定`UniqueSuffix`参数批量设置有序的实例名称或主机名称，方便管理与检索。\n  - 使用RunInstances创建实例时支持设置Enclave机密计算模式和可信系统模式。\n  - 可以指定 `NetworkOptions.EnableJumboFrame`参数为true在创建时开启Jumbo frame特性。 更多信息，请参见 [ECS实例MTU](~~200512~~)。\n\n- **注意事项**：\n\n  - 单次最多能创建100台实例。\n  - 您可以指定参数`AutoReleaseTime`设置实例自动释放时间。\n  - 创建成功后会返回实例ID列表，您可以通过[DescribeInstances](~~25506~~)查询新建实例状态。\n  - 创建实例时，默认自动启动实例，直到实例状态变成运行中（`Running`）。\n  - 自2020年11月27日起，创建和变配ECS实例时带宽峰值受账户限速策略影响。如需更大带宽峰值，请提交工单。具体限速策略：单个地域下，所有按使用流量计费ECS实例的实际运行带宽峰值总和不大于5 Gbit/s；所有按固定带宽计费ECS实例的实际运行带宽峰值总和不大于50 Gbit/s。\n  - 与[CreateInstance](~~25499~~)相比，通过`RunInstances`创建的实例如果参数`InternetMaxBandwidthOut`的值大于0，则自动为实例分配公网IP。\n  - RunInstances支持以下任一方式绑定主网卡，但需要注意一次调用只能选用一种方式配置主网卡，同时使用两种方式将会调用失败并返回错误信息。\n       - 通过`SecurityGroupId`、`VSwitchId`、`PrivateIpAddress`、`NetworkInterfaceQueueNumber`与`Ipv6AddressCount`等参数直接设置主网卡的相关配置信息。\n       - 通过`NetworkInterface.N.*`设置主网卡以及辅助网卡的配置信息。当`NetworkInterface.N.InstanceType`取值为`Primary`时，表示设置主网卡；当`NetworkInterface.N.InstanceType`取值为`Secondary`或空值时，表示设置辅助网卡。\n  - 提交创建任务后，参数不合法或者库存不足的情况下会报错，具体的报错原因参见错误码。\n\n       - 如果创建实例时返回`QuotaExceed.ElasticQuota`错误，表示您在当前地域选择的实例规格所要创建的台数超出系统限额，或者全实例规格vCPU配额超出系统限额，您可以前往[ECS管理控制台](https://ecs.console.aliyun.com/?spm=a2c8b.12215451.favorites.decs.5e3a336aMGTtzy#/privileges/quota)或[配额中心](https://quotas.console.aliyun.com/products/ecs/quotas)申请提高限额。\n           \n      - 如果创建实例时返回`QuotaExceed.DiskCapacity`错误，表示您当前选择的磁盘类型所要创建的总容量超出指定可用区的系统限额，您可以前往[配额中心](https://quotas.console.aliyun.com/products/disk/quotas)查询和申请提高磁盘容量配额。\n\n\n<props="china">\n\n- **最佳实践**：\n\n  - 单次大批量创建ECS实例（大于100台）遇到库存不足的场景；对实例规格或可用区等资源配置无指定要求，更关注如何快速创建实例的场景；对ECS实例数量无指定要求，更关注总算力vCPU个数等场景下，阿里云推荐您使用弹性供应组。您可以通过[CreateAutoProvisioningGroup](~~122738~~)创建弹性供应组，一键式地部署跨计费方式、跨可用区、跨实例规格族的实例集群。更多信息，请参见[使用弹性供应组API批量创建ECS实例](~~200772~~)。\n\n  - `RunInstances`可以执行批量创建任务，为便于管理与检索，建议您为每批次启动的实例指定标签（`Tag.N.Key`和`Tag.N.Value`），并且为主机名（`HostName`）和实例名称（`InstanceName`）添加有序后缀（`UniqueSuffix`）。\n\n  - 实例启动模板能免除您每次创建实例时都需要填入大量配置参数，您可以创建实例启动模板（[CreateLaunchTemplate](~~74686~~)）后，在`RunInstances`请求中指定`LaunchTemplateId`和`LaunchTemplateVersion`使用启动模板。\n\n</props>\n\n<props="intl">\n\n- **最佳实践**：\n\n  - 单次大批量创建ECS实例（大于100台）遇到库存不足的场景；对实例规格或可用区等资源配置无指定要求，更关注如何快速创建实例的场景；对ECS实例数量无指定要求，更关注总算力vCPU个数等场景下，阿里云推荐您使用弹性供应组。您可以通过[CreateAutoProvisioningGroup](~~122738~~)创建弹性供应组，一键式地部署跨计费方式、跨可用区、跨实例规格族的实例集群。更多信息，请参见[使用弹性供应组API批量创建ECS实例](~~200772~~)。\n\n  - `RunInstances`可以执行批量创建任务，为便于管理与检索，建议您为每批次启动的实例指定标签（`Tag.N.Key`和`Tag.N.Value`），并且为主机名（`HostName`）和实例名称（`InstanceName`）添加有序后缀（`UniqueSuffix`）。\n\n  - 实例启动模板能免除您每次创建实例时都需要填入大量配置参数，您可以创建实例启动模板（[CreateLaunchTemplate](~~74686~~)）后，在`RunInstances`请求中指定`LaunchTemplateId`和`LaunchTemplateVersion`使用启动模板。\n\n</props>\n\n### 示例1：创建包年包月实例\n\n实例所在地域为华东1（杭州），计费方式为包年包月，购买时长一个月，到期自动续费一个月，镜像ID为：aliyun_3_x64_20G_alibase_20221102.vhd，实例规格为：ecs.g7.large，40 GiB ESSD云盘，挂载100 GiB  ESSD云数据盘，公网出带宽为10 Mbit/s，自动分配私网IP和公网IP，实例名称为ECS-test，登录密码为ECS@test1234，数量为1台。\n\n```\nhttp(s)://ecs.aliyuncs.com/?Action=RunInstances\n&RegionId=cn-hangzhou\n&ImageId=aliyun_3_x64_20G_alibase_20221102.vhd\n&InstanceType=ecs.g7.large\n&SecurityGroupId=sg-bp150uqocpf9jj70****\n&VSwitchId=vsw-bp1qo7s91cbch5i4l****\n&InstanceChargeType=PrePaid\n&SystemDisk.Size=40\n&DataDisk.1.Size=100\n&DataDisk.1.Category=cloud_essd\n&SystemDisk.Category=cloud_essd\n&Amount=1\n&Period=1\n&PeriodUnit=Month\n&AutoRenew=true\n&AutoRenewPeriod=1\n&HostName=ECS-test\n&Password=ECS@test1234\n&InternetMaxBandwidthOut=10\n&公共请求参数\n```\n\n### 示例2：创建按量付费实例\n\n实例所在地域为华东1（杭州），计费方式为按量付费，镜像ID为：aliyun_3_x64_20G_alibase_20221102.vhd，实例规格为：ecs.g7.large，40 GiB ESSD云盘，挂载100 GiB  ESSD云数据盘，公网出带宽为10 Mbit/s，自动分配私网IP和公网IP，实例名称为ECS-test，登录密码为ECS@test1234，数量为1台。\n\n```\nhttp(s)://ecs.aliyuncs.com/?Action=RunInstances\n&RegionId=cn-hangzhou\n&ImageId=aliyun_3_x64_20G_alibase_20221102.vhd\n&InstanceType=ecs.g7.large\n&SecurityGroupId=sg-bp150uqocpf9jj70****\n&VSwitchId=vsw-bp1qo7s91cbch5i4l****\n&InstanceChargeType=PostPaid\n&SystemDisk.Size=40\n&DataDisk.1.Size=100\n&DataDisk.1.Category=cloud_essd\n&SystemDisk.Category=cloud_essd\n&HostName=ECS-test\n&Password=ECS@test1234\n&InternetMaxBandwidthOut=10\n&公共请求参数\n```\n\n### 示例3：创建抢占式实例\n\n实例所在地域为华东1（杭州），计费方式为抢占式实例，竞价策略为系统自动出价，跟随当前市场实际价格，实例保留时长为1小时，镜像ID为：aliyun_3_x64_20G_alibase_20221102.vhd，实例规格为：ecs.g7.large，40 GiB ESSD云盘，挂载100 GiB  ESSD云数据盘，公网出带宽为10 Mbit/s，自动分配私网IP和公网IP，实例名称为ECS-test，登录密码为ECS@test1234，数量为1台。\n\n```\nhttp(s)://ecs.aliyuncs.com/?Action=RunInstances\n&RegionId=cn-hangzhou\n&ImageId=aliyun_3_x64_20G_alibase_20221102.vhd\n&InstanceType=ecs.g7.large\n&SecurityGroupId=sg-bp150uqocpf9jj70****\n&VSwitchId=vsw-bp1qo7s91cbch5i4l****\n&InstanceChargeType=PostPaid\n&SystemDisk.Size=40\n&DataDisk.1.Size=100\n&DataDisk.1.Category=cloud_essd\n&SystemDisk.Category=cloud_essd\n&HostName=ECS-test\n&Password=ECS@test1234\n&InternetMaxBandwidthOut=10\n&SpotStrategy=SpotAsPriceGo\n&SpotDuration=1\n&公共请求参数\n```\n\n### 示例4：在专有宿主机上创建包年包月实例\n\n实例所在地域为华东1（杭州），专有宿主机为dh-bp12w10wll9xcjq2****，计费方式包年包月，购买时长一个月，镜像ID为：aliyun_3_x64_20G_alibase_20221102.vhd，实例规格为：ecs.g7.large，40 GiB ESSD云盘，挂载100 GiB  ESSD云数据盘，公网出带宽为10 Mbit/s，自动分配私网IP和公网IP，实例名称为ECS-test，登录密码为ECS@test1234，购买数量为1台。\n\n```\nhttp(s)://ecs.aliyuncs.com/?Action=RunInstances\n&RegionId=cn-hangzhou\n&ImageId=aliyun_3_x64_20G_alibase_20221102.vhd\n&InstanceType=ecs.g7.large\n&SecurityGroupId=sg-bp150uqocpf9jj70****\n&VSwitchId=vsw-bp1qo7s91cbch5i4l****\n&InstanceChargeType=PrePaid\n&Amount=1\n&Period=1\n&PeriodUnit=Month\n&SystemDisk.Size=40\n&DataDisk.1.Size=100\n&DataDisk.1.Category=cloud_essd\n&SystemDisk.Category=cloud_essd\n&HostName=ECS-test\n&Password=ECS@test1234\n&InternetMaxBandwidthOut=10\n&DedicatedHostId=dh-bp12w10wll9xcjq2****\n&公共请求参数\n```',
    ext: {
      methods: ["post"],
      operationType: "read",
      produces: ["application/octet-stream"],
      responseDemo: '[{"errorExample":"","example":"\\"\\"","type":"json"}]',
      schemes: ["http", "https"],
      security: [
        {
          AK: [],
        },
      ],
      staticInfo: {
        returnType: "synchronous",
      },
      summary: "对目标文件执行SQL语句，返回执行结果。",
      systemTags: {
        operationType: "get",
      },
      title: "对文件执行SQL语句并返回结果",
      errorCodes: {
        "401": [
          {
            errorCode: "InvalidRamRole.NotEcsRole",
            errorMessage: "The specified ram role is not authorized for ecs, please check your role policy.",
          },
        ],
        "429": [
          {
            errorCode: "Throttling.Resource",
            errorMessage: "The request throttle by resource operation.",
          },
        ],
        "500": [
          {
            errorCode: "InternalError",
            errorMessage: "The request processing has failed due to some unknown error.",
          },
          {
            errorCode: "InvalidParameter.DataEncryptedKeyCreateFailed",
            errorMessage:
              "Create kms data encrypted key fail. If you need further assistance, you can contact the KMS Technical Support.",
          },
        ],
      },
    },
    externalDocs: {
      description: "去调试",
      url: "https://api.aliyun.com/api/Oss/2019-05-17/SelectObject",
    },
    method: "post",
    name: "SelectObject",
    parameters: [
      {
        name: "RegionId",
        in: "query",
        schema: {
          description: "实例所属的地域ID。您可以调用[DescribeRegions](~~25609~~)查看最新的阿里云地域列表。",
          type: "string",
          required: true,
          example: "cn-hangzhou",
        },
      },
      {
        name: "RegionId",
        in: "query",
        schema: {
          description: "实例所属的地域ID。您可以调用[DescribeRegions](~~25609~~)查看最新的阿里云地域列表。",
          type: "string",
          required: true,
          example: "cn-hangzhou",
        },
      },
      {
        name: "ImageId",
        in: "query",
        schema: {
          description:
            "镜像ID，启动实例时选择的镜像资源。您可以通过[DescribeImages](~~25534~~)查询您可以使用的镜像资源。如果您不指定`LaunchTemplateId`或`LaunchTemplateName`以确定启动模板，也不通过指定`ImageFamily`选用镜像族系最新可用镜像，则`ImageId`为必选参数。",
          type: "string",
          required: false,
          example: "aliyun_2_1903_x64_20G_alibase_20200324.vhd",
        },
      },
      {
        name: "ImageFamily",
        in: "query",
        schema: {
          description:
            "镜像族系名称，通过设置该参数来获取当前镜像族系内最新可用镜像来创建实例。\n- 设置了参数`ImageId`，则不能设置该参数。\n- 未设置参数`ImageId`，但指定的`LaunchTemplateId`或`LaunchTemplateName`对应的启动模板设置了`ImageId`，则不能设置该参数。\n- 未设置`ImageId`，且指定的`LaunchTemplateId`或`LaunchTemplateName`对应的启动模板未设置`ImageId`，则可以设置该参数。\n- 未设置`ImageId`，且未设置`LaunchTemplateId`、`LaunchTemplateName`参数，则可以设置该参数。\n> 阿里云官方镜像关联的镜像族系信息请参见[公共镜像概述](~~108393~~)。",
          type: "string",
          required: false,
          example: "hangzhou-daily-update",
        },
      },
      {
        name: "InstanceType",
        in: "query",
        schema: {
          description:
            "实例的资源规格。如果您不指定`LaunchTemplateId`或`LaunchTemplateName`以确定启动模板，`InstanceType`为必选参数。  \n\n- 产品选型：参见[实例规格族](~~25378~~)或调用[DescribeInstanceTypes](~~25620~~)查看目标实例规格的性能数据，或者参见[选型配置](~~58291~~)了解如何选择实例规格。\n- 查询库存：调用[DescribeAvailableResource](~~66186~~)查看指定地域或者可用区内的资源供给情况。",
          type: "string",
          required: false,
          example: "ecs.g6.large",
        },
      },
      {
        name: "SecurityGroupId",
        in: "query",
        schema: {
          description:
            "新创建实例所属于的安全组ID。同一个安全组内的实例之间可以互相访问，一个安全组能容纳的实例数量视安全组类型而定，具体请参见[使用限制](~~25412~~#SecurityGroupQuota)的安全组章节。\n\n> `SecurityGroupId`决定了实例的网络类型，例如，如果设置的安全组的网络类型为专有网络VPC，实例则为VPC类型，并同时需要指定参数`VSwitchId`。\n\n如果您不设置`LaunchTemplateId`或`LaunchTemplateName`以确定实例启动模板，则安全组ID为必选参数。您需要注意：\n\n- 您可以通过`SecurityGroupId`设置一个安全组，也可以通过`SecurityGroupIds.N`设置一个或多个安全组，但不支持同时设置`SecurityGroupId`和`SecurityGroupIds.N`。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则不能设置`SecurityGroupId`或`SecurityGroupIds.N`，只能设置`NetworkInterface.N.SecurityGroupId`或`NetworkInterface.N.SecurityGroupIds.N`。",
          type: "string",
          required: false,
          example: "sg-bp15ed6xe1yxeycg7****",
        },
      },
      {
        name: "VSwitchId",
        in: "query",
        schema: {
          description:
            "虚拟交换机ID。如果您创建的是VPC类型ECS实例，必须指定虚拟交换机ID，且安全组和虚拟交换机在同一个专有网络VPC中。您可以调用[DescribeVSwitches](~~35748~~)查询已创建的交换机的相关信息。\n\n您需要注意：\n\n- 如果您设置了`VSwitchId`参数，则设置的`ZoneId`参数必须和交换机所在的可用区保持一致。您也可以不设置`ZoneId`参数，系统将自动选择指定交换机所在的可用区。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则不能设置`VSwitchId`，只能设置`NetworkInterface.N.VSwitchId`。",
          type: "string",
          required: false,
          example: "vsw-bp1s5fnvk4gn2tws0****",
        },
      },
      {
        name: "InstanceName",
        in: "query",
        schema: {
          description:
            "实例名称。长度为2~128个字符，必须以大小写字母或中文开头，不能以`http://`和`https://`开头。可以包含中文、英文、数字、半角冒号（:）、下划线（_）、半角句号（.）或者短划线（-）。默认值为实例的`InstanceId`。\n\n创建多台ECS实例时，您可以批量设置有序的实例名称。具体操作，请参见[批量设置有序的实例名称或主机名称](~~196048~~)。",
          type: "string",
          required: false,
          example: "k8s-node-[1,4]-alibabacloud",
        },
      },
      {
        name: "Description",
        in: "query",
        schema: {
          description: "实例的描述。长度为2~256个英文或中文字符，不能以`http://`和`https://`开头。",
          type: "string",
          required: false,
          example: "Instance_Description",
        },
      },
      {
        name: "InternetMaxBandwidthIn",
        in: "query",
        schema: {
          description:
            "公网入带宽最大值，单位为Mbit/s。取值范围：\n\n- 当所购公网出带宽小于等于10 Mbit/s时：1~10，默认为10。\n- 当所购公网出带宽大于10 Mbit/s时：1~`InternetMaxBandwidthOut`的取值，默认为`InternetMaxBandwidthOut`的取值。",
          type: "integer",
          format: "int32",
          required: false,
          example: "10",
        },
      },
      {
        name: "InternetMaxBandwidthOut",
        in: "query",
        schema: {
          description: "公网出带宽最大值，单位为Mbit/s。取值范围：0~100。\n\n默认值：0。",
          type: "integer",
          format: "int32",
          required: false,
          example: "10",
        },
      },
      {
        name: "HostName",
        in: "query",
        schema: {
          description:
            "实例主机名称。限制说明如下：\n\n- 半角句号（.）和短划线（-）不能作为首尾字符，更不能连续使用。\n- Windows实例：字符长度为2~15，不支持半角句号（.），不能全是数字。允许包含大小写英文字母、数字和短划线（-）。\n- 其他类型实例（Linux等）：\n    - 字符长度为2~64，支持多个半角句号（.），点之间为一段，每段允许包含大小写英文字母、数字和短划线（-）。\n    - 支持通过占位符`${instance_id}`将实例ID写入`HostName`参数。例如：`HostName=k8s-${instance_id}`，并且创建的ECS实例ID为`i-123abc****`，则该实例的主机名为`k8s-i-123abc****`。\n\n创建多台ECS实例时，您可以：\n\n- 批量设置有序的主机名。具体操作，请参见[批量设置有序的实例名称或主机名称](~~196048~~)。\n- 通过`HostNames.N`参数，为多台实例分别设置主机名。需要注意`HostName`参数和`HostNames.N`参数不能同时设置。",
          type: "string",
          required: false,
          example: "k8s-node-[1,4]-ecshost",
        },
      },
      {
        name: "UniqueSuffix",
        in: "query",
        schema: {
          description:
            "当创建多台实例时，是否为`HostName`和`InstanceName`自动添加有序后缀。有序后缀从001开始递增，最大不能超过999。取值范围：\n- true：添加。\n- false：不添加。\n\n默认值：false。\n\n当`HostName`或`InstanceName`按照指定排序格式设置，未设置命名后缀`name_suffix`，即命名格式为`name_prefix[begin_number,bits]`时，`UniqueSuffix`不生效，名称仅按照指定顺序排序。\n\n更多信息，请参见[批量设置有序的实例名称或主机名称](~~196048~~)。",
          type: "boolean",
          required: false,
          example: "true",
        },
      },
      {
        name: "Password",
        in: "query",
        schema: {
          description:
            "实例的密码。长度为8至30个字符，必须同时包含大小写英文字母、数字和特殊符号中的三类字符。特殊符号可以是：\n\n```\n()`~!@#$%^&*-_+=|{}[]:;'<>,.?/\n```\n\n其中，Windows实例不能以正斜线（/）为密码首字符。\n\n> 如果传入`Password`参数，建议您使用HTTPS协议发送请求，避免密码泄露。",
          type: "string",
          required: false,
          example: "EcsV587!",
        },
      },
      {
        name: "PasswordInherit",
        in: "query",
        schema: {
          description:
            "是否使用镜像预设的密码。取值范围：\n\n- true：使用。\n- false：不使用。\n\n默认值：false。\n\n> 使用该参数时，Password参数必须为空，同时您需要确保使用的镜像已经设置了密码。",
          type: "boolean",
          required: false,
          example: "false",
        },
      },
      {
        name: "ZoneId",
        in: "query",
        schema: {
          description:
            "实例所属的可用区ID，您可以调用[DescribeZones](~~25610~~)获取可用区列表。\n\n> 如果您指定了`VSwitchId`参数，则指定的`ZoneId`参数必须和交换机所在的可用区保持一致。您也可以不指定`ZoneId`参数，系统将自动选择指定的交换机所在的可用区。\n\n默认值：系统自动选择。",
          type: "string",
          required: false,
          example: "cn-hangzhou-g",
        },
      },
      {
        name: "InternetChargeType",
        in: "query",
        schema: {
          description:
            "网络计费类型。取值范围：\n\n- PayByBandwidth：按固定带宽计费。\n- PayByTraffic：按使用流量计费。\n\n默认值：PayByTraffic。\n\n> **按使用流量计费**模式下的出入带宽峰值都是带宽上限，不作为业务承诺指标。当出现资源争抢时，带宽峰值可能会受到限制。如果您的业务需要有带宽的保障，请使用**按固定带宽计费**模式。\n",
          type: "string",
          required: false,
          example: "PayByTraffic",
        },
      },
      {
        name: "SystemDisk.Size",
        in: "query",
        schema: {
          description:
            "系统盘大小，单位为GiB。取值范围：\n\n- 普通云盘：20~500\n\n- 其他类型云盘：20~2048\n\n该参数的取值必须大于或者等于max{20, ImageSize}。\n\n默认值：max{40, 参数ImageId对应的镜像大小}。",
          type: "string",
          required: false,
          example: "40",
        },
      },
      {
        name: "SystemDisk.Category",
        in: "query",
        schema: {
          description:
            "系统盘的云盘种类。取值范围：\n\n- cloud_efficiency：高效云盘。\n- cloud_ssd：SSD云盘。\n- cloud_essd：ESSD云盘。\n- cloud：普通云盘。\n- cloud_auto：ESSD AutoPL云盘。\n- cloud_essd_entry：ESSD Entry云盘。\n>仅当`InstanceType`设置为[通用算力型实例规格族u1](~~457079~~)（`ecs.u1`）或[经济型实例规格族e](~~108489~~)（`ecs.e`）时，该参数支持取`cloud_essd_entry`值。\n\n已停售的实例规格且非I/O优化实例默认值为cloud，否则默认值为cloud_efficiency。",
          type: "string",
          required: false,
          example: "cloud_ssd",
        },
      },
      {
        name: "SystemDisk.DiskName",
        in: "query",
        schema: {
          description:
            "系统盘名称。长度为2~128个英文或中文字符。必须以大小写字母或中文开头，不能以`http://`和`https://`开头。可以包含数字、半角句号（.）、半角冒号（:）、下划线（_）或者短划线（-）。",
          type: "string",
          required: false,
          example: "cloud_ssdSystem",
        },
      },
      {
        name: "SystemDisk.Description",
        in: "query",
        schema: {
          description: "系统盘的描述。长度为2~256个英文或中文字符，不能以`http://`和`https://`开头。",
          type: "string",
          required: false,
          example: "SystemDisk_Description",
        },
      },
      {
        name: "SystemDisk.PerformanceLevel",
        in: "query",
        schema: {
          description:
            "创建ESSD云盘作为系统盘使用时，设置云盘的性能等级。取值范围：\n\n- PL0：单盘最高随机读写IOPS 1万。\n- PL1（默认）：单盘最高随机读写IOPS 5万。\n- PL2：单盘最高随机读写IOPS 10万。\n- PL3：单盘最高随机读写IOPS 100万。\n\n有关如何选择ESSD性能等级，请参见[ESSD云盘](~~122389~~)。",
          type: "string",
          required: false,
          example: "PL0",
        },
      },
      {
        name: "SystemDisk.AutoSnapshotPolicyId",
        in: "query",
        schema: {
          description: "系统盘采用的自动快照策略ID。",
          type: "string",
          required: false,
          example: "sp-bp67acfmxazb4p****",
        },
      },
      {
        name: "IoOptimized",
        in: "query",
        schema: {
          description:
            "是否为I/O优化实例。[已停售的实例规格](~~55263~~)实例默认值是none，其他实例规格默认值是optimized。取值范围：\n\n- none：非I/O优化。\n- optimized：I/O优化。",
          type: "string",
          required: false,
          example: "optimized",
        },
      },
      {
        name: "UserData",
        in: "query",
        schema: {
          description:
            "实例自定义数据。需要以Base64方式编码，原始数据最多为16 KB。\n\n> 若实例满足[实例自定义数据](~~49121~~)的限制，您可传入UserData信息。因为传输API请求时，不会加密您设置的UserData，建议不要以明文方式传入机密的信息，例如密码和私钥等。如果必须传入，建议加密后，然后以Base64的方式编码后再传入，在实例内部以同样的方式反解密。",
          type: "string",
          required: false,
          example: "ZWNobyBoZWxsbyBlY3Mh",
        },
      },
      {
        name: "KeyPairName",
        in: "query",
        schema: {
          description:
            "密钥对名称。\n>Windows实例，忽略该参数。默认为空。即使填写了该参数，仍旧只执行`Password`的内容。",
          type: "string",
          required: false,
          example: "KeyPair_Name",
        },
      },
      {
        name: "RamRoleName",
        in: "query",
        schema: {
          description: "实例RAM角色名称。您可以使用RAM API [ListRoles](~~28713~~)查询您已创建的实例RAM角色。",
          type: "string",
          required: false,
          example: "RAM_Name",
        },
      },
      {
        name: "Amount",
        in: "query",
        schema: {
          description: "指定创建ECS实例的数量。取值范围：1~100。\n\n默认值：1。",
          type: "integer",
          format: "int32",
          required: false,
          maximum: "1000",
          minimum: "1",
          example: "3",
          default: "1",
        },
      },
      {
        name: "MinAmount",
        in: "query",
        schema: {
          description:
            "指定ECS实例最小购买数量。取值范围：1~100。\n\n- 当ECS库存数量小于最小购买数量，会创建失败。\n- 当ECS库存数量大于等于最小购买数量，按照库存数量创建。",
          type: "integer",
          format: "int32",
          required: false,
          maximum: "100",
          minimum: "1",
          example: "2",
        },
      },
      {
        name: "AutoReleaseTime",
        in: "query",
        schema: {
          description:
            "按量付费实例的自动释放时间。按照[ISO 8601](~~25696~~)标准表示，使用UTC+0时间。格式为：`yyyy-MM-ddTHH:mm:ssZ`。\n\n- 如果秒（`ss`）取值不是`00`，则自动取为当前分钟（`mm`）开始时。\n\n- 最短释放时间为当前时间半小时之后。\n\n- 最长释放时间不能超过当前时间三年。",
          type: "string",
          required: false,
          example: "2018-01-01T12:05:00Z",
        },
      },
      {
        name: "SpotStrategy",
        in: "query",
        schema: {
          description:
            "按量付费实例的竞价策略。当参数`InstanceChargeType`取值为`PostPaid`时生效。取值范围：\n\n- NoSpot：正常按量付费实例。\n- SpotWithPriceLimit：设置上限价格的抢占式实例。\n- SpotAsPriceGo：系统自动出价，跟随当前市场实际价格。\n\n默认值：NoSpot。",
          type: "string",
          required: false,
          example: "NoSpot",
        },
      },
      {
        name: "SpotDuration",
        in: "query",
        schema: {
          description:
            "抢占式实例的保留时长，单位为小时。 默认值：1。取值范围：\n- 1：创建后阿里云会保证实例运行1小时不会被自动释放；超过1小时后，系统会自动比较出价与市场价格、检查资源库存，来决定实例的持有和回收。\n- 0：创建后，阿里云不保证实例运行1小时，系统会自动比较出价与市场价格、检查资源库存，来决定实例的持有和回收。\n\n实例回收前5分钟阿里云会通过ECS系统事件向您发送通知。抢占式实例按秒计费，建议您结合具体任务执行耗时来选择合适的保留时长。",
          type: "integer",
          format: "int32",
          required: false,
          maximum: "6",
          minimum: "0",
          example: "1",
        },
      },
      {
        name: "SpotPriceLimit",
        in: "query",
        schema: {
          description:
            "设置实例的每小时最高价格。支持最大3位小数，参数`SpotStrategy`取值为`SpotWithPriceLimit`时生效。",
          type: "number",
          format: "float",
          required: false,
          maximum: "999999",
          minimum: "0",
          example: "0.97",
        },
      },
      {
        name: "SpotInterruptionBehavior",
        in: "query",
        schema: {
          description:
            "抢占实例中断模式。取值范围：\n\n- Terminate：直接释放实例。\n- Stop：实例进入节省停机模式。如需使用，请提交工单申请。\n\n  关于节省停机模式的更多说明，请参见[按量付费实例节省停机模式](~~63353~~)。\n\n默认值：Terminate。",
          type: "string",
          required: false,
          example: "Terminate",
        },
      },
      {
        name: "SecurityEnhancementStrategy",
        in: "query",
        schema: {
          description:
            "是否开启安全加固。取值范围：\n\n- Active：启用安全加固，只对公共镜像生效。\n- Deactive：不启用安全加固，对所有镜像类型生效。",
          type: "string",
          required: false,
          example: "Active",
        },
      },
      {
        name: "ClientToken",
        in: "query",
        schema: {
          description:
            "保证请求幂等性。从您的客户端生成一个参数值，确保不同请求间该参数值唯一。**ClientToken**只支持ASCII字符，且不能超过64个字符。更多信息，请参见[如何保证幂等性](~~25693~~)。",
          type: "string",
          required: false,
          example: "123e4567-e89b-12d3-a456-426655440000",
        },
      },
      {
        name: "HpcClusterId",
        in: "query",
        schema: {
          description:
            "实例所属的HPC集群ID。 \n\n创建SCC实例时，该参数为必选参数。您可以参考[CreateHpcCluster](~~109138~~)创建HPC集群。\n",
          type: "string",
          required: false,
          example: "hpc-bp67acfmxazb4p****",
        },
      },
      {
        name: "DryRun",
        in: "query",
        schema: {
          description:
            "是否只预检此次请求。取值范围：\n\n-  true：发送检查请求，不会创建实例。检查项包括是否填写了必需参数、请求格式、业务限制和ECS库存。如果检查不通过，则返回对应错误。如果检查通过，则返回错误码`DryRunOperation`。\n-  false（默认）：发送正常请求，通过检查后直接创建实例。",
          type: "boolean",
          required: false,
          example: "false",
        },
      },
      {
        name: "DedicatedHostId",
        in: "query",
        schema: {
          description:
            '是否在专有宿主机上创建ECS实例。由于专有宿主机不支持创建抢占式实例，指定`DedicatedHostId`参数后，会自动忽略请求中的`SpotStrategy`和`SpotPriceLimit`设置。\n\n<props="china">您可以通过[DescribeDedicatedHosts](~~134242~~)查询专有宿主机ID列表。</props>\n\n<props="intl">您可以通过[DescribeDedicatedHosts](~~134242~~)查询专有宿主机ID列表。</props>\n',
          type: "string",
          required: false,
          example: "dh-bp67acfmxazb4p****",
        },
      },
      {
        name: "LaunchTemplateId",
        in: "query",
        schema: {
          description:
            "启动模板ID。更多信息，请调用[DescribeLaunchTemplates](~~73759~~)。\n\n使用启动模板创建实例时，您必须指定`LaunchTemplateId`或`LaunchTemplateName`确定启动模板。",
          type: "string",
          required: false,
          example: "lt-bp1apo0bbbkuy0rj****",
        },
      },
      {
        name: "LaunchTemplateName",
        in: "query",
        schema: {
          description:
            "启动模板名称。\n\n使用启动模板创建实例时，您必须指定`LaunchTemplateId`或`LaunchTemplateName`确定启动模板。",
          type: "string",
          required: false,
          example: "LaunchTemplate_Name",
        },
      },
      {
        name: "LaunchTemplateVersion",
        in: "query",
        schema: {
          description:
            "启动模板版本。如果您指定了`LaunchTemplateId`或`LaunchTemplateName`而不指定启动模板版本号，则采用默认版本。 ",
          type: "integer",
          format: "int64",
          required: false,
          example: "3",
        },
      },
      {
        name: "ResourceGroupId",
        in: "query",
        schema: {
          description: "实例所在的企业资源组ID。",
          type: "string",
          required: false,
          example: "rg-bp67acfmxazb4p****",
        },
      },
      {
        name: "Period",
        in: "query",
        schema: {
          description:
            '购买资源的时长，单位由`PeriodUnit`指定。当参数`InstanceChargeType`取值为`PrePaid`时才生效且为必选值。一旦指定了`DedicatedHostId`，则取值范围不能超过专有宿主机的订阅时长。取值范围：\n\n<props="china">\n- PeriodUnit=Week时，Period取值：1、2、3、4。\n- PeriodUnit=Month时，Period取值：1、2、3、4、5、6、7、8、9、12、24、36、48、60。\n\n</props>\n\n<props="intl">PeriodUnit=Month时，Period取值：1、2、3、4、5、6、7、8、9、12、24、36、48、60。</props>',
          type: "integer",
          format: "int32",
          required: false,
          example: "1",
        },
      },
      {
        name: "PeriodUnit",
        in: "query",
        schema: {
          description:
            '包年包月计费方式的时长单位。取值范围： \n\n<props="china">\n- Week。\n- Month（默认）。\n\n</props>\n\n<props="intl">Month（默认）。</props>\n',
          type: "string",
          required: false,
          example: "Month",
        },
      },
      {
        name: "AutoRenew",
        in: "query",
        schema: {
          description:
            "是否要自动续费。当参数`InstanceChargeType`取值`PrePaid`时才生效。取值范围：\n\n- true：自动续费。\n- false：不自动续费。\n\n默认值：false。",
          type: "boolean",
          required: false,
          example: "true",
        },
      },
      {
        name: "AutoRenewPeriod",
        in: "query",
        schema: {
          description:
            '单次自动续费的续费时长。取值范围： \n         \n<props="china">\n- PeriodUnit=Week时：1、2、3。\n- PeriodUnit=Month时：1、2、3、6、12、24、36、48、60。\n\n</props>\n\n<props="intl">PeriodUnit=Month时：1、2、3、6、12、24、36、48、60。</props>\n\n默认值：1。',
          type: "integer",
          format: "int32",
          required: false,
          example: "1",
        },
      },
      {
        name: "InstanceChargeType",
        in: "query",
        schema: {
          description:
            '实例的付费方式。取值范围：\n\n-  PrePaid：包年包月。\n-  PostPaid：按量付费。\n\n默认值：PostPaid。\n\n<props="china">选择包年包月时，您必须确认自己的账号支持余额支付或者信用支付，否则将返回`InvalidPayMethod`的错误提示。</props>\n\n<props="intl">选择包年包月时，您必须确认自己的账号支持信用支付，否则将返回`InvalidPayMethod`的错误提示。</props>',
          type: "string",
          required: false,
          example: "PrePaid",
        },
      },
      {
        name: "DeploymentSetId",
        in: "query",
        schema: {
          description: "部署集ID。",
          type: "string",
          required: false,
          example: "ds-bp1brhwhoqinyjd6****",
        },
      },
      {
        name: "DeploymentSetGroupNo",
        in: "query",
        schema: {
          description:
            "如果您设置的部署集对应的策略为部署集组高可用策略（AvailabilityGroup），可以通过该参数指定实例在部署集中的分组号。取值范围：1~7。",
          type: "integer",
          format: "int32",
          required: false,
          example: "1",
        },
      },
      {
        name: "PrivateIpAddress",
        in: "query",
        schema: {
          description:
            "实例私网IP地址。专有网络VPC类型ECS实例设置私网IP地址时，必须从虚拟交换机（`VSwitchId`）的空闲网段中选择。\n\n您需要注意：\n\n- 设置`PrivateIpAddress`后：\n    - 如果`Amount`参数取值为1，则表示为创建的一台ECS实例分配私网IP地址。\n    - 如果`Amount`参数取值大于1，则表示在批量创建ECS实例时，以指定的私网IP地址为起始地址，依次为多台ECS实例分配连续的私网IP地址，但需要注意，此时不支持再为实例绑定辅助网卡（即不支持再设置`NetworkInterface.N.*`这类参数）。\n\n-  如果`NetworkInterface.N.InstanceType`取值为`Primary`，则不能设置`PrivateIpAddress`，只能设置`NetworkInterface.N.PrimaryIpAddress`。\n\n>每个交换机的第1个和最后3个IP地址为系统保留地址，不支持指定。\n例如，交换机的网段为192.168.1.0/24，则192.168.1.0、192.168.1.253、192.168.1.254和192.168.1.255这4个地址是系统保留地址。",
          type: "string",
          required: false,
          example: "10.1.**.**",
        },
      },
      {
        name: "CreditSpecification",
        in: "query",
        schema: {
          description:
            "设置突发性能实例的运行模式。取值范围：\n\n- Standard：标准模式，实例性能请参见[什么是突发性能实例](~~59977~~)下的性能约束模式章节。\n- Unlimited：无性能约束模式，实例性能请参见[什么是突发性能实例](~~59977~~)下的无性能约束模式章节。",
          type: "string",
          required: false,
          example: "Standard",
        },
      },
      {
        name: "Ipv6AddressCount",
        in: "query",
        schema: {
          description:
            "为主网卡指定随机生成的IPv6地址数量。取值范围：1~10。\n         \n您需要注意：\n\n- 您不能同时设置`Ipv6Address.N`和`Ipv6AddressCount`。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则不能设置`Ipv6Address.N`或`Ipv6AddressCount`，只能设置`NetworkInterface.N.Ipv6Address.N`或`NetworkInterface.N.Ipv6AddressCount`。",
          type: "integer",
          format: "int32",
          required: false,
          example: "1",
        },
      },
      {
        name: "NetworkInterfaceQueueNumber",
        in: "query",
        schema: {
          description:
            "主网卡队列数。您需要注意：\n\n- 不能超过实例规格允许的单块网卡最大队列数。\n\n- 实例的所有网卡累加队列数不能超过实例规格允许的队列数总配额。实例规格的单块网卡最大队列数和总配额可以通过[DescribeInstanceTypes](~~25620~~)接口查询`MaximumQueueNumberPerEni`、`TotalEniQueueQuantity`字段。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则不能设置`NetworkInterfaceQueueNumber`，只能设置`NetworkInterface.N.QueueNumber`。",
          type: "integer",
          format: "int32",
          required: false,
          minimum: "1",
          example: "8",
        },
      },
      {
        name: "DeletionProtection",
        in: "query",
        schema: {
          description:
            "实例释放保护属性，指定是否支持通过控制台或API（[DeleteInstance](~~25507~~)）释放实例。取值范围： \n\n-  true：开启实例释放保护。\n-  false：关闭实例释放保护。\n\n默认值：false。\n\n> 该属性仅适用于按量付费实例，且只能限制手动释放操作，对系统释放操作不生效。",
          type: "boolean",
          required: false,
          example: "false",
        },
      },
      {
        name: "HibernationOptions.Configured",
        in: "query",
        schema: {
          description: ">该参数正在邀测中，暂未开放使用。",
          type: "boolean",
          required: false,
          example: "false",
        },
      },
      {
        name: "Affinity",
        in: "query",
        schema: {
          description:
            "专有宿主机实例是否与专有宿主机关联。取值范围：\n\n- default：实例不与专有宿主机关联。已启用节省停机模式的实例，停机后再次启动时，若原专有宿主机可用资源不足，则实例被放置在自动部署资源池的其它专有宿主机上。\n\n- host：实例与专有宿主机关联。已启用节省停机模式的实例，停机后再次启动时，仍放置在原专有宿主机上。若原专有宿主机可用资源不足，则实例重启失败。\n\n默认值：default。",
          type: "string",
          required: false,
          example: "default",
        },
      },
      {
        name: "Tenancy",
        in: "query",
        schema: {
          description:
            "是否在专有宿主机上创建实例。取值范围：\n\n- default：创建非专有宿主机实例。\n\n- host：创建专有宿主机实例。若您不指定`DedicatedHostId`，则由阿里云自动选择专有宿主机放置实例。\n\n默认值：default。",
          type: "string",
          required: false,
          example: "default",
        },
      },
      {
        name: "StorageSetId",
        in: "query",
        schema: {
          description: "存储集ID。",
          type: "string",
          required: false,
          example: "ss-bp67acfmxazb4p****",
        },
      },
      {
        name: "StorageSetPartitionNumber",
        in: "query",
        schema: {
          description: "存储集中的最大分区数量。取值范围：大于等于2。",
          type: "integer",
          format: "int32",
          required: false,
          minimum: "1",
          example: "2",
        },
      },
      {
        name: "CpuOptions.Core",
        in: "query",
        schema: {
          description:
            'CPU核心数。该参数不支持自定义设置，只能采用默认值。\n\n<props="china">默认值：请参见[自定义CPU选项](~~145895~~)。</props>\n',
          type: "integer",
          format: "int32",
          required: false,
          example: "2",
        },
      },
      {
        name: "CpuOptions.ThreadsPerCore",
        in: "query",
        schema: {
          description:
            'CPU线程数。ECS实例的vCPU数=`CpuOptions.Core`取值*`CpuOptions.ThreadsPerCore`取值。\n\n- `CpuOptions.ThreadsPerCore=1`表示关闭CPU超线程。\n\n- 仅部分实例规格支持设置CPU线程数。\n\n<props="china">取值范围和默认值：请参见[自定义CPU选项](~~145895~~)。</props>\n',
          type: "integer",
          format: "int32",
          required: false,
          example: "2",
        },
      },
      {
        name: "CpuOptions.Numa",
        in: "query",
        schema: {
          description: "该参数已弃用。",
          type: "string",
          required: false,
          example: "1",
        },
      },
      {
        name: "CpuOptions.TopologyType",
        in: "query",
        schema: {
          description:
            "实例的Cpu拓扑类型。取值范围：\n\n- ContinuousCoreToHTMapping：当选择`ContinuousCoreToHTMapping`时，实例的Cpu拓扑中，实例的同一个Core的HT是连续的。\n- DiscreteCoreToHTMapping：当选择`DiscreteCoreToHTMapping`时，实例的同一个Core的HT是离散的。\n\n默认值：无。\n\n>仅部分实例规格族支持使用本参数，具体支持实例规格族请参见[查看和修改CPU拓扑结构](~~2636059~~)。",
          type: "string",
          required: false,
          example: "DiscreteCoreToHTMapping",
        },
      },
      {
        name: "SecurityOptions.TrustedSystemMode",
        in: "query",
        schema: {
          description:
            "可信系统模式。取值：vTPM。\n\n目前，可信系统模式支持的实例规格族：\n- g7、c7、r7。\n- 安全增强型（g7t、c7t、r7t）。\n\n当您创建以上实例规格族的ECS实例时，需要设置该参数。具体说明如下：\n\n- 如果您使用阿里云可信系统，请将该参数值设置为vTPM，在实例启动时即可通过阿里云可信系统完成可信校验。\n- 如果您不使用阿里云可信系统，可以不设置该参数值，但您需要注意，如果您所创建的ECS实例使用了Enclave机密计算模式（`SecurityOptions.ConfidentialComputingMode=Enclave`），则该ECS实例也会启用可信系统。\n- 通过OpenAPI创建可信系统的ECS实例时，只能调用`RunInstances`实现，`CreateInstance`目前不支持设置`SecurityOptions.TrustedSystemMode`参数。\n>如果您在创建实例的时候指定其为可信实例，那么当您更换系统盘时只能使用支持可信系统的镜像。\n\n关于可信系统的更多信息，请参见[安全增强型实例可信功能概述](~~201394~~)。",
          type: "string",
          required: false,
          example: "vTPM",
        },
      },
      {
        name: "SecurityOptions.ConfidentialComputingMode",
        in: "query",
        schema: {
          description:
            "机密计算模式。取值：Enclave。\n\n该参数取值为Enclave时，表示ECS实例使用Enclave构建机密计算环境。目前仅实例规格族c7、g7、r7，支持调用`RunInstances`时指定该参数使用Enclave机密计算。您需要注意：\n\n- 机密计算功能正在邀测中。\n\n- 通过OpenAPI创建Enclave机密计算的ECS实例时，只能调用`RunInstances`实现，`CreateInstance`目前不支持设置`SecurityOptions.ConfidentialComputingMode`参数。\n\n- Enclave机密计算依托可信系统（vTPM）实现，当您指定ECS实例使用Enclave构建机密计算环境时，该实例同时也会启用可信系统。因此，调用该接口时，如果设置了`SecurityOptions.ConfidentialComputingMode=Enclave`，则无论您是否设置了`SecurityOptions.TrustedSystemMode=vTPM`，最终创建的ECS实例均会启用Enclave机密计算模式以及可信系统。\n\n关于机密计算的更多信息，请参见[使用Enclave构建机密计算环境](~~203433~~)。\n",
          type: "string",
          required: false,
          example: "Enclave",
        },
      },
      {
        name: "HttpEndpoint",
        in: "query",
        schema: {
          description:
            "是否启用实例元数据的访问通道。取值范围：\n- enabled：启用。\n- disabled：禁用。\n\n默认值：enabled。\n>有关实例元数据的信息，请参见[实例元数据概述](~~49122~~)。",
          type: "string",
          required: false,
          example: "enabled",
        },
      },
      {
        name: "HttpTokens",
        in: "query",
        schema: {
          description:
            "访问实例元数据时是否强制使用加固模式（IMDSv2）。取值范围：\n- optional：不强制使用。\n- required：强制使用。设置该取值后，普通模式无法访问实例元数据。\n\n默认值：optional。\n>有关访问实例元数据的模式，请参见[实例元数据访问模式](~~150575~~)。",
          type: "string",
          required: false,
          example: "optional",
        },
      },
      {
        name: "HttpPutResponseHopLimit",
        in: "query",
        schema: {
          description: "实例元数据请求所需的HTTP PUT响应跃点限制。取值范围：1~64。\n \n默认值：1。\n",
          type: "integer",
          format: "int32",
          required: false,
          example: "3",
        },
      },
      {
        name: "PrivatePoolOptions.MatchCriteria",
        in: "query",
        schema: {
          description:
            "实例启动的私有池容量选项。弹性保障服务或容量预定服务在生效后会生成私有池容量，供实例启动时选择。取值范围：\n\n- Open：开放模式。将自动匹配开放类型的私有池容量。如果没有符合条件的私有池容量，则使用公共池资源启动。该模式下无需设置`PrivatePoolOptions.Id`参数。\n- Target：指定模式。使用指定的私有池容量启动实例，如果该私有池容量不可用，则实例会启动失败。该模式下必须指定私有池ID，即`PrivatePoolOptions.Id`参数为必填项。\n- None：不使用模式。实例启动将不使用私有池容量。\n\n默认值：None。\n\n以下任一场景，实例启动的私有池容量选项只能取值`None`或不传值。\n- 创建抢占式实例。\n- 创建经典网络类型的ECS实例。\n- 在专有宿主机DDH上创建ECS实例。",
          type: "string",
          required: false,
          example: "Open",
        },
      },
      {
        name: "PrivatePoolOptions.Id",
        in: "query",
        schema: {
          description: "私有池ID。即弹性保障服务ID或容量预定服务ID。",
          type: "string",
          required: false,
          example: "eap-bp67acfmxazb4****",
        },
      },
      {
        name: "Isp",
        in: "query",
        schema: {
          description: ">该参数正在邀测中，暂未开放使用。",
          type: "string",
          required: false,
          example: "null",
        },
      },
      {
        name: "SchedulerOptions.DedicatedHostClusterId",
        in: "query",
        schema: {
          description:
            '指定ECS实例所属的专有宿主机集群，系统会自动选择该专有宿主机集群中的一台专有宿主机部署ECS实例。\n\n> 仅在`Tenancy`设置为`host`时生效。\n\n在您同时指定了专有宿主机（`DedicatedHostId`）和专有宿主机集群（`SchedulerOptions.DedicatedHostClusterId`）时：\n- 如果专有宿主机属于专有宿主机集群，则优先将ECS实例部署在指定的专有宿主机上。\n- 如果专有宿主机不属于专有宿主机集群，则ECS实例创建失败。\n\n<props="china">您可以通过[DescribeDedicatedHostClusters](~~184145~~)查询专有宿主机集群ID列表。</props>\n\n<props="intl">您可以通过[DescribeDedicatedHostClusters](~~184145~~)查询专有宿主机集群ID列表。</props>\n\n<props="partner">您可以通过[DescribeDedicatedHostClusters](~~184145~~)查询专有宿主机集群ID列表。</props>',
          type: "string",
          required: false,
          example: "dc-bp12wlf6am0vz9v2****",
        },
      },
      {
        name: "SecurityGroupIds",
        in: "query",
        style: "repeatList",
        schema: {
          description:
            "将实例同时加入多个安全组。N的取值范围与实例能够加入安全组配额有关。更多信息，请参见[安全组限制](~~101348~~)。\n\n您需要注意：\n\n- 不支持同时设置`SecurityGroupId`和`SecurityGroupIds.N`。\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则不能设置`SecurityGroupId`或`SecurityGroupIds.N`，只能设置`NetworkInterface.N.SecurityGroupId`或`NetworkInterface.N.SecurityGroupIds.N`。",
          type: "array",
          items: {
            description:
              "将实例同时加入多个安全组。N的取值范围与实例能够加入安全组配额有关。更多信息，请参见[安全组限制](~~101348~~)。\n\n您需要注意：\n\n- 不支持同时设置`SecurityGroupId`和`SecurityGroupIds.N`。\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则不能设置`SecurityGroupId`或`SecurityGroupIds.N`，只能设置`NetworkInterface.N.SecurityGroupId`或`NetworkInterface.N.SecurityGroupIds.N`。",
            type: "string",
            required: false,
            example: "sg-bp15ed6xe1yxeycg7****",
          },
          required: false,
          example: "sg-bp15ed6xe1yxeycg7****",
          maxItems: 16,
        },
      },
      {
        name: "HostNames",
        in: "query",
        style: "repeatList",
        schema: {
          description: "创建多台实例时，为每台实例指定不同的主机名。",
          type: "array",
          items: {
            description:
              "创建多台实例时，为每台实例指定不同的主机名。限制说明如下：\n\n- N的个数需要和`Amount`参数值保持一致。例如，`Amount=2`时，通过该参数指定主机名的格式为`HostNames.1=test1`和`HostNames.2=test2`。\n- 不支持同时设置`HostName`参数和`HostNames.N`参数。\n- 半角句号（.）和短划线（-）不能作为首尾字符，更不能连续使用。\n- Windows实例：字符长度为2~15，不支持半角句号（.），不能全是数字。允许包含大小写英文字母、数字和短划线（-）。\n- 其他类型实例（Linux等）：字符长度为2~64，支持多个半角句号（.），点之间为一段，每段允许包含大小写英文字母、数字和短划线（-）。",
            type: "string",
            required: false,
            example: "ecs-host-01",
          },
          required: false,
          example: "ecs-host-01",
          maxItems: 1000,
        },
      },
      {
        name: "DataDisk",
        in: "query",
        style: "repeatList",
        schema: {
          description: "数据盘信息集合。",
          type: "array",
          items: {
            description: "数据盘信息集合。",
            type: "object",
            properties: {
              PerformanceLevel: {
                description:
                  "创建ESSD云盘作为数据盘使用时，设置云盘的性能等级。N的取值必须和`DataDisk.N.Category=cloud_essd`中的N保持一致。取值范围：\n\n- PL0：单盘最高随机读写IOPS 1万。\n- PL1（默认）：单盘最高随机读写IOPS 5万。\n- PL2：单盘最高随机读写IOPS 10万。\n- PL3：单盘最高随机读写IOPS 100万。\n\n有关如何选择ESSD性能等级，请参见[ESSD云盘](~~122389~~)。",
                type: "string",
                required: false,
                example: "PL1",
              },
              AutoSnapshotPolicyId: {
                description: "数据盘采用的自动快照策略ID。",
                type: "string",
                required: false,
                example: "sp-bp67acfmxazb4p****",
              },
              Encrypted: {
                description: "数据盘N是否加密。取值范围：\n- true：加密。\n- false：不加密。\n\n默认值：false。",
                type: "string",
                required: false,
                example: "false",
              },
              Description: {
                description: "数据盘的描述。长度为2~256个英文或中文字符，不能以`http://`和`https://`开头。",
                type: "string",
                required: false,
                example: "DataDisk_Description",
              },
              SnapshotId: {
                description:
                  "创建数据盘N使用的快照。N的取值范围为1~16。\n\n指定参数`DataDisk.N.SnapshotId`后，参数`DataDisk.N.Size`会被忽略，实际创建的云盘大小为指定的快照的大小。不能使用早于2013年7月15日（含）创建的快照，请求会报错被拒绝。",
                type: "string",
                required: false,
                example: "s-bp17441ohwka0yuh****",
              },
              Device: {
                description:
                  "数据盘的挂载点。挂载的数据盘数量不同，挂载点的命名不同：\n\n- 1~25块数据盘：/dev/xvd`[b-z]`\n\n- 大于25块数据盘：/dev/xvd`[aa-zz]`，例如第26块数据盘会被命名为/dev/xvdaa，第27块数据盘为/dev/xvdab，以此类推。\n\n>该参数仅用于全镜像（整机镜像）场景。您可以通过将此参数设置为全镜像中数据盘对应的挂载点，并修改对应的`DataDisk.N.Size`和`DataDisk.N.Category`参数，达到修改全镜像中数据盘磁盘种类和大小的目的。",
                type: "string",
                required: false,
                example: "/dev/xvdb",
              },
              Size: {
                description:
                  "第n个数据盘的容量大小，N的取值范围为1~16，内存单位为GiB。取值范围：\n\n- cloud_efficiency：20~32768。\n- cloud_ssd：20~32768。\n- cloud_essd：具体取值范围与`DataDisk.N.PerformanceLevel`的取值有关。 \n    - PL0：40~32768。\n    - PL1：20~32768。\n    - PL2：461~32768。\n    - PL3：1261~32768。\n- cloud：5~2000。\n- cloud_auto：40~32768。\n- cloud_essd_entry：10~32768。\n\n该参数的取值必须大于等于参数`SnapshotId`指定的快照的大小。\n",
                type: "integer",
                format: "int32",
                required: false,
                example: "2000",
              },
              DiskName: {
                description:
                  "数据盘名称。长度为2~128个英文或中文字符。必须以大小写字母或中文开头，不能以`http://`和`https://`开头。可以包含数字、半角句号（.）、半角冒号（:）、下划线（_）或者短划线（-）。",
                type: "string",
                required: false,
                example: "cloud_ssdData",
              },
              Category: {
                description:
                  "数据盘N的云盘种类。取值范围：\n\n- cloud_efficiency：高效云盘。\n- cloud_ssd：SSD云盘。\n- cloud_essd：ESSD云盘。\n- cloud：普通云盘。\n- cloud_auto：ESSD AutoPL云盘。\n- cloud_essd_entry：ESSD Entry云盘。\n>仅当`InstanceType`设置为`ecs.u1`或`ecs.e`规格族时，该参数支持`cloud_essd_entry`。\n\n对于I/O优化实例，默认值为cloud_efficiency。对于非I/O优化实例，默认值为cloud。",
                type: "string",
                required: false,
                example: "cloud_ssd",
              },
              EncryptAlgorithm: {
                description: ">该参数暂未开放使用。",
                type: "string",
                required: false,
                example: "null",
              },
              DeleteWithInstance: {
                description:
                  "表示数据盘是否随实例释放。取值范围：\n- true：数据盘随实例释放。\n- false：数据盘不随实例释放。\n\n默认值为true。",
                type: "boolean",
                required: false,
                example: "true",
              },
              KMSKeyId: {
                description: "数据盘对应的KMS密钥ID。",
                type: "string",
                required: false,
                example: "0e478b7a-4262-4802-b8cb-00d3fb40****",
              },
              StorageClusterId: {
                description:
                  "专属块存储集群ID。如果您在创建ECS实例时，需要使用专属块存储集群中的云盘资源作为数据盘，请设置该参数。",
                type: "string",
                required: false,
                example: "dbsc-j5e1sf2vaf5he8m2****",
              },
              ProvisionedIops: {
                description:
                  "ESSD AutoPL云盘预配置的读写IOPS。可能值：0~min{50,000, 1000*容量-基准性能}。\n\n基准性能=min{1,800+50*容量, 50000}。\n\n>当DiskCategory取值为cloud_auto时才支持设置该参数。更多信息，请参见[ESSD AutoPL云盘](~~368372~~)。",
                type: "integer",
                format: "int64",
                required: false,
                minimum: "0",
                example: "40000",
              },
              BurstingEnabled: {
                description:
                  "是否开启Burst（性能突发）。取值范围：\n\n- true：是。\n- false：否。\n\n>当DiskCategory取值为cloud_auto时才支持设置该参数。更多信息，请参见[ESSD AutoPL云盘](~~368372~~)。",
                type: "boolean",
                required: false,
                example: "false",
              },
            },
            required: false,
          },
          required: false,
          maxItems: 16,
        },
      },
      {
        name: "Arn",
        in: "query",
        style: "repeatList",
        schema: {
          description: "该参数暂未开放使用。",
          type: "array",
          items: {
            description: "该参数暂未开放使用。",
            type: "object",
            properties: {
              RoleType: {
                description: "该参数暂未开放使用。",
                type: "string",
                required: false,
                example: "null",
              },
              Rolearn: {
                description: "该参数暂未开放使用。",
                type: "string",
                required: false,
                example: "null",
              },
              AssumeRoleFor: {
                description: "该参数暂未开放使用。",
                type: "integer",
                format: "int64",
                required: false,
                example: "null",
              },
            },
            required: false,
          },
          required: false,
          maxItems: 16,
        },
      },
      {
        name: "NetworkInterface",
        in: "query",
        style: "repeatList",
        schema: {
          description: "弹性网卡信息。",
          type: "array",
          items: {
            description: "弹性网卡信息。",
            type: "object",
            properties: {
              VSwitchId: {
                description:
                  "弹性网卡所属的虚拟交换机ID。\n\n您需要注意：\n\n- N的取值范围为1~2，设置1个弹性网卡时，支持设置1个主网卡或1个辅助网卡；设置2个弹性网卡时，仅支持同时设置1个主网卡和1个辅助网卡。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则必须设置该参数。此时该参数的作用等同于`VSwitchId`，但需要注意不能同时设置`VSwitchId`参数。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Secondary`或空值，则该参数为非必填参数。默认值为ECS实例所属的虚拟交换机。",
                type: "string",
                required: false,
                example: "vsw-bp67acfmxazb4p****",
              },
              NetworkInterfaceName: {
                description:
                  "弹性网卡名称。\n\n您需要注意：\n\n- N的取值范围为1~2，设置1个弹性网卡时，支持设置1个主网卡或1个辅助网卡；设置2个弹性网卡时，仅支持同时设置1个主网卡和1个辅助网卡。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则无需设置该参数。",
                type: "string",
                required: false,
                example: "Network_Name",
              },
              Description: {
                description:
                  "弹性网卡的描述。\n\n您需要注意：\n\n- N的取值范围为1~2，设置1个弹性网卡时，支持设置1个主网卡或1个辅助网卡；设置2个弹性网卡时，仅支持同时设置1个主网卡和1个辅助网卡。\n- 长度为2~256个英文或中文字符，不能以`http://`或`https://`开头。\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则无需设置该参数。",
                type: "string",
                required: false,
                example: "Network_Description",
              },
              SecurityGroupId: {
                description:
                  "弹性网卡所属的安全组ID。\n\n您需要注意：\n\n- N的取值范围为1~2，设置1个弹性网卡时，支持设置1个主网卡或1个辅助网卡；设置2个弹性网卡时，仅支持同时设置1个主网卡和1个辅助网卡。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则必须设置该参数。此时该参数的作用等同于`SecurityGroupId`，但需要注意不能再设置`SecurityGroupId`、`SecurityGroupIds.N`或`NetworkInterface.N.SecurityGroupIds.N`。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Secondary`或空值，则该参数为非必填参数。默认值为ECS实例所属的安全组。",
                type: "string",
                required: false,
                example: "sg-bp67acfmxazb4p****",
              },
              PrimaryIpAddress: {
                description:
                  "添加一张弹性网卡并设置主IP地址。\n\n您需要注意：\n\n- N的取值范围为1~2：\n    - 设置1个弹性网卡时，支持设置1个主网卡或1个辅助网卡。如果`Amount`参数取值大于1，且设置了主网卡并设置了该参数，则表示在批量创建ECS实例时，以指定的主IP地址为起始地址，依次为多台ECS实例分配连续的主IP地址，但需要注意，此时不支持再为实例绑定辅助网卡。\n    - 设置2个弹性网卡时，仅支持同时设置1个主网卡和1个辅助网卡，但需要注意，如果`Amount`参数取值大于1且已为主网卡设置了该参数，则不支持再设置辅助网卡（即不支持再设置`NetworkInterface.2.InstanceType=Secondary`）。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则该参数的作用等同于`PrivateIpAddress`，但需要注意不能同时设置`PrivateIpAddress`参数。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Secondary`或空值，表示为辅助网卡设置主IP地址。默认从网卡所属的交换机网段中随机选择一个IP地址。\n\n> - 创建ECS实例时，您最多能添加一张辅助网卡。实例创建成功后，您可以调用[CreateNetworkInterface](~~58504~~)和[AttachNetworkInterface](~~58515~~)添加更多的辅助网卡。\n>- 每个交换机的第1个和最后3个IP地址为系统保留地址，不支持指定。\n例如，交换机的网段为192.168.1.0/24，则192.168.1.0、192.168.1.253、192.168.1.254和192.168.1.255这4个地址是系统保留地址。",
                type: "string",
                required: false,
                example: "172.16.**.**",
              },
              QueueNumber: {
                description:
                  "弹性网卡队列数。\n\n您需要注意：\n\n- N的取值范围为1~2，设置1个弹性网卡时，支持设置1个主网卡或1个辅助网卡；设置2个弹性网卡时，仅支持同时设置1个主网卡和1个辅助网卡。\n\n- 不能超过实例规格允许的单块网卡最大队列数。\n\n- 实例的所有网卡累加队列数不能超过实例规格允许的队列数总配额。实例规格的单块网卡最大队列数和总配额可以通过[DescribeInstanceTypes](~~25620~~)接口查询`MaximumQueueNumberPerEni`、`TotalEniQueueQuantity`字段。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，且设置了该参数取值，则不能再设置`NetworkInterfaceQueueNumber`参数。",
                type: "integer",
                format: "int32",
                required: false,
                minimum: "1",
                example: "8",
              },
              SecurityGroupIds: {
                description:
                  "弹性网卡所属的一个或多个安全组ID。\n\n- 第一个N的取值范围为1~2，设置1个弹性网卡时，支持设置1个主网卡或1个辅助网卡；设置2个弹性网卡时，仅支持同时设置1个主网卡和1个辅助网卡。\n- 第二个N表示可以指定一个或多个安全组ID。N的取值范围与实例能够加入安全组配额有关。更多信息，请参见[安全组限制](~~25412#SecurityGroupQuota1~~)。\n\n您需要注意：\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则必须设置该参数或`NetworkInterface.N.SecurityGroupId`。此时该参数的作用等同于`SecurityGroupIds.N`，但需要注意不能再设置`SecurityGroupId`、`SecurityGroupIds.N`或`NetworkInterface.N.SecurityGroupId`。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Secondary`或空值，则该参数为非必填参数。默认值为ECS实例所属的安全组。",
                type: "array",
                items: {
                  description:
                    "弹性网卡所属的一个或多个安全组ID。\n\n- 第一个N的取值范围为1~2，设置1个弹性网卡时，支持设置1个主网卡或1个辅助网卡；设置2个弹性网卡时，仅支持同时设置1个主网卡和1个辅助网卡。\n- 第二个N表示可以指定一个或多个安全组ID。N的取值范围与实例能够加入安全组配额有关。更多信息，请参见[安全组限制](~~25412#SecurityGroupQuota1~~)。\n\n您需要注意：\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则必须设置该参数或`NetworkInterface.N.SecurityGroupId`。此时该参数的作用等同于`SecurityGroupIds.N`，但需要注意不能再设置`SecurityGroupId`、`SecurityGroupIds.N`或`NetworkInterface.N.SecurityGroupId`。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Secondary`或空值，则该参数为非必填参数。默认值为ECS实例所属的安全组。",
                  type: "string",
                  required: false,
                  example: "sg-bp15ed6xe1yxeycg7****",
                },
                required: false,
                example: "sg-bp15ed6xe1yxeycg7****",
                maxItems: 16,
              },
              NetworkInterfaceTrafficMode: {
                description:
                  "网卡的通讯模式。参数取值范围：\n\n- Standard：使用TCP通讯模式。\n- HighPerformance：开启ERI（Elastic RDMA Interface）接口，使用RDMA通讯模式。\n\n默认值：Standard。\n\n>RDMA模式的弹性网卡数量不能超过该实例规格族的限制。更多信息，请参见[实例规格族](~~25378~~)。",
                type: "string",
                required: false,
                example: "Standard",
              },
              QueuePairNumber: {
                description: "RDMA网卡队列数。",
                type: "integer",
                format: "int64",
                required: false,
                example: "0",
              },
              InstanceType: {
                description:
                  "弹性网卡类型。N的取值范围为1~2，设置1个弹性网卡时，支持设置1个主网卡或1个辅助网卡；设置2个弹性网卡时，仅支持同时设置1个主网卡和1个辅助网卡。\n\n参数取值范围：\n\n- Primary：主网卡。\n- Secondary：辅助网卡。\n\n默认值：Secondary。",
                type: "string",
                required: false,
                example: "Secondary",
              },
              Ipv6AddressCount: {
                description:
                  "为主网卡指定随机生成的IPv6地址数量。取值范围：1~10\n\n您需要注意：\n\n- `NetworkInterface.N.InstanceType`取值为`Primary`时，设置该参数才会生效。如果`NetworkInterface.N.InstanceType`取值为`Secondary`或空值，则不能设置该参数。\n\n- 设置该参数后，您不能再设置`Ipv6AddressCount`、`Ipv6Address.N`或`NetworkInterface.N.Ipv6Address.N`。",
                type: "integer",
                format: "int64",
                required: false,
                example: "1",
              },
              Ipv6Address: {
                description:
                  "为主网卡指定一个或多个IPv6地址。支持设置最多10个IPv6地址，即第二个N的取值范围：1~10。\n\n取值示例：`Ipv6Address.1=2001:db8:1234:1a00::***`\n\n您需要注意：\n\n- `NetworkInterface.N.InstanceType`取值为`Primary`时，设置该参数才会生效。如果`NetworkInterface.N.InstanceType`取值为`Secondary`或空值，则不能设置该参数。\n\n- 设置该参数后，`Amount`取值只能为1，且不能再设置`Ipv6AddressCount`、`Ipv6Address.N`或`NetworkInterface.N.Ipv6AddressCount`。",
                type: "array",
                items: {
                  description:
                    "为主网卡指定一个或多个IPv6地址。支持设置最多10个IPv6地址，即第二个N的取值范围：1~10\n\n取值示例：`Ipv6Address.1=2001:db8:1234:1a00::***`\n\n您需要注意：\n\n- `NetworkInterface.N.InstanceType`取值为`Primary`时，设置该参数才会生效。如果`NetworkInterface.N.InstanceType`取值为`Secondary`或空值，则不能设置该参数。\n\n- 设置该参数后，`Amount`取值只能为1，且不能再设置`Ipv6AddressCount`、`Ipv6Address.N`或`NetworkInterface.N.Ipv6AddressCount`。",
                  type: "string",
                  required: false,
                  example: "2001:db8:1234:1a00::***",
                },
                required: false,
                maxItems: 10,
              },
              NetworkCardIndex: {
                description:
                  "网卡指定的物理网卡索引。\n\n您需要注意：\n- 只有特定实例规格支持指定物理网卡索引。\n- NetworkInterface.N.InstanceType取值为Primary时，对于支持物理网卡的实例规格，如果设置此参数，只能设置为0。\n- NetworkInterface.N.InstanceType取值为Secondary或者空值，对于支持物理网卡的实例规格，此参数可以依据实例规格设置。更多信息，请参见[实例规格族](~~25378~~)。",
                type: "integer",
                format: "int32",
                required: false,
                example: "0",
              },
              DeleteOnRelease: {
                description:
                  "释放实例时是否保留网卡。取值范围：\n\n- true：不保留。\n\n- false：保留。\n\n默认值：true。\n\n>该参数只对辅助网卡生效。",
                type: "boolean",
                required: false,
                example: "true",
              },
              NetworkInterfaceId: {
                description:
                  "随实例附加的弹性网卡ID。\n\n>该参数只对辅助弹性网卡生效。指定一个现有辅助弹性网卡后，您将无法配置其它网卡创建参数。",
                type: "string",
                required: false,
                example: "eni-bp1gn106np8jhxhj****",
              },
              RxQueueSize: {
                description:
                  "弹性网卡入方向队列深度。\n\n您需要注意：\n\n- 网卡的入方向队列深度必须和出方向队列深度相等，取值范围：8192~16384，且必须为 2 的幂。\n\n- 较大的入方向队列深度可以提升入方向的吞吐量，但会占用更多的内存。",
                type: "integer",
                format: "int32",
                required: false,
                example: "8192",
              },
              TxQueueSize: {
                description:
                  "弹性网卡出方向队列深度。\n\n您需要注意：\n\n- 网卡的出方向队列深度必须和入方向队列深度相等，取值范围：8192~16384，且必须为 2 的幂。\n\n- 较大的出方向队列深度可以提升出方向的吞吐量，但会占用更多的内存。",
                type: "integer",
                format: "int32",
                required: false,
                example: "8192",
              },
            },
            required: false,
          },
          required: false,
          maxItems: 10,
        },
      },
      {
        name: "Tag",
        in: "query",
        style: "repeatList",
        schema: {
          description: "实例、云盘和主网卡的标签信息。",
          type: "array",
          items: {
            description: "实例、云盘和主网卡的标签信息。",
            type: "object",
            properties: {
              Key: {
                description:
                  "实例、云盘和主网卡的标签键。N的取值范围：1~20。一旦传入该值，则不允许为空字符串。最多支持128个字符，不能以aliyun和acs:开头，不能包含http://或 https://。",
                type: "string",
                required: false,
                example: "TestKey",
              },
              Value: {
                description:
                  "实例、云盘和主网卡的标签值。N的取值范围：1~20。一旦传入该值，可以为空字符串。最多支持128个字符，不能以acs:开头，不能包含http://或者https://。",
                type: "string",
                required: false,
                example: "TestValue",
              },
            },
            required: false,
          },
          required: false,
          maxItems: 71,
        },
      },
      {
        name: "Ipv6Address",
        in: "query",
        style: "repeatList",
        schema: {
          description:
            "为主网卡指定一个或多个IPv6地址。支持设置最多10个IPv6地址，即N的取值范围：1~10。\n\n取值示例：`Ipv6Address.1=2001:db8:1234:1a00::***`。\n\n您需要注意：\n\n- 设置了`Ipv6Address.N`时，`Amount`参数取值只能为1，且不能同时设置`Ipv6AddressCount`。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则不能设置`Ipv6Addresses.N`或`Ipv6AddressCount`，而是需要设置`NetworkInterface.N.Ipv6Addresses.N`或`NetworkInterface.N.Ipv6AddressCount`。",
          type: "array",
          items: {
            description:
              "为主网卡指定一个或多个IPv6地址。支持设置最多10个IPv6地址，即N的取值范围：1~10。\n\n取值示例：`Ipv6Address.1=2001:db8:1234:1a00::***`。\n\n您需要注意：\n\n- 设置了`Ipv6Address.N`时，`Amount`参数取值只能为1，且不能同时设置`Ipv6AddressCount`。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则不能设置`Ipv6Addresses.N`或`Ipv6AddressCount`，而是需要设置`NetworkInterface.N.Ipv6Addresses.N`或`NetworkInterface.N.Ipv6AddressCount`。",
            type: "string",
            required: false,
            example: "2001:db8:1234:1a00::***",
          },
          required: false,
          example: "Ipv6Address.1=2001:db8:1234:1a00::***",
          maxItems: 10,
        },
      },
      {
        name: "SystemDisk",
        in: "query",
        style: "flat",
        schema: {
          description: "系统盘相关参数，目前专属块存储集群ID（`StorageClusterId`）需要通过该参数设置参数值。",
          type: "object",
          properties: {
            StorageClusterId: {
              description:
                "专属块存储集群ID。如果您在创建ECS实例时，需要使用专属块存储集群中的云盘资源作为系统盘，请设置该参数。",
              type: "string",
              required: false,
              example: "dbsc-j5e1sf2vaf5he8m2****",
            },
            ProvisionedIops: {
              description:
                "ESSD AutoPL云盘预配置的读写IOPS。可能值：0~min{50,000, 1000*容量-基准性能}。\n\n基准性能=min{1,800+50*容量, 50,000}。\n\n>当`SystemDisk.Category`取值为`cloud_auto`时才支持设置该参数。更多信息，请参见[ESSD AutoPL云盘](~~368372~~)。",
              type: "integer",
              format: "int64",
              required: false,
              minimum: "0",
              example: "40000",
            },
            BurstingEnabled: {
              description:
                "是否开启Burst（性能突发）。取值范围：\n\n- true：是。\n- false：否。\n\n>当`SystemDisk.Category`取值为`cloud_auto`时才支持设置该参数。更多信息，请参见[ESSD AutoPL云盘](~~368372~~)。",
              type: "boolean",
              required: false,
              example: "false",
            },
            Encrypted: {
              description:
                "系统盘是否加密。取值范围：\n\n- true：加密。\n\n- false：不加密。\n\n默认值：false。\n\n>中国（香港）D可用区、新加坡A可用区暂不支持在创建实例时加密系统盘。",
              type: "string",
              required: false,
              example: "false",
            },
            KMSKeyId: {
              description: "系统盘对应的KMS密钥ID。",
              type: "string",
              required: false,
              example: "0e478b7a-4262-4802-b8cb-00d3fb40****",
            },
            EncryptAlgorithm: {
              description: ">该参数暂未开放使用。",
              type: "string",
              required: false,
              example: "null",
            },
          },
          required: false,
        },
      },
      {
        name: "ImageOptions",
        in: "query",
        style: "flat",
        schema: {
          description: "镜像相关属性信息。",
          type: "object",
          properties: {
            LoginAsNonRoot: {
              description: "使用该镜像的实例是否支持使用ecs-user用户登录。可能值：\n\n- true：是\n\n- false：否",
              type: "boolean",
              required: false,
              example: "false",
            },
          },
          required: false,
        },
      },
      {
        name: "NetworkOptions",
        in: "query",
        style: "flat",
        schema: {
          description: "网络相关属性参数。",
          type: "object",
          properties: {
            EnableJumboFrame: {
              description:
                "实例是否开启Jumbo frame特性。参数取值范围：\n\n- false：不开启Jumbo frame, 该实例下的所有网卡（包括主网卡及辅助网卡）MTU取值为1500。\n\n- true：开启Jumbo frame, 该实例下的所有网卡（包括主网卡及辅助网卡）的MTU取值为8500。\n\n默认值：true。\n\n>只有八代以上部分实例规格支持开启Jumbo frame特性。更多信息请参见[ECS实例MTU](~~200512~~)。",
              type: "boolean",
              required: false,
              example: "false",
            },
          },
          required: false,
        },
      },
      {
        name: "AutoPay",
        in: "query",
        schema: {
          description:
            "创建实例时，是否自动支付。取值范围：\n\n- true：自动支付。\n\n    > 自动支付时，请确保支付方式余额充足，否则会生成异常订单，只能作废订单。如果您的支付方式余额不足，可以将参数`AutoPay`置为`false`，此时会生成未支付订单，您可以登录ECS管理控制台自行支付。\n\n- false：只生成订单不扣费。\n\n    > 当`InstanceChargeType` 取值为`PostPaid`时，`AutoPay`不能设置为`false`。\n\n默认值：true。\n\n",
          type: "boolean",
          required: false,
          example: "true",
        },
      },
    ],
    path: "/{key}",
    responses: {
      "200": {
        schema: {
          format: "binary",
          type: "string",
        },
      },
      "5XX": {},
    },
    summary: "对目标文件执行SQL语句，返回执行结果。",
    title: "对文件执行SQL语句并返回结果",
  },
  name: "SelectObject",
  pageType: "profile",
  schemaType: "api",
  code: '// This file is auto-generated, don\'t edit it. Thanks.\npackage demo;\n\nimport com.aliyun.auth.credentials.Credential;\nimport com.aliyun.auth.credentials.provider.StaticCredentialProvider;\nimport com.aliyun.core.http.HttpClient;\nimport com.aliyun.core.http.HttpMethod;\nimport com.aliyun.core.http.ProxyOptions;\nimport com.aliyun.httpcomponent.httpclient.ApacheAsyncHttpClientBuilder;\nimport com.aliyun.sdk.service.oss20190517.models.*;\nimport com.aliyun.sdk.service.oss20190517.*;\nimport com.google.gson.Gson;\nimport darabonba.core.RequestConfiguration;\nimport darabonba.core.client.ClientOverrideConfiguration;\nimport darabonba.core.utils.CommonUtil;\nimport darabonba.core.TeaPair;\n\n//import javax.net.ssl.KeyManager;\n//import javax.net.ssl.X509TrustManager;\nimport java.net.InetSocketAddress;\nimport java.time.Duration;\nimport java.util.*;\nimport java.util.concurrent.CompletableFuture;\n\npublic class SelectObject {\n    public static void main(String[] args) throws Exception {\n\n        // HttpClient Configuration\n        /*HttpClient httpClient = new ApacheAsyncHttpClientBuilder()\n                .connectionTimeout(Duration.ofSeconds(10)) // Set the connection timeout time, the default is 10 seconds\n                .responseTimeout(Duration.ofSeconds(10)) // Set the response timeout time, the default is 20 seconds\n                .maxConnections(128) // Set the connection pool size\n                .maxIdleTimeOut(Duration.ofSeconds(50)) // Set the connection pool timeout, the default is 30 seconds\n                // Configure the proxy\n                .proxy(new ProxyOptions(ProxyOptions.Type.HTTP, new InetSocketAddress("<your-proxy-hostname>", 9001))\n                        .setCredentials("<your-proxy-username>", "<your-proxy-password>"))\n                // If it is an https connection, you need to configure the certificate, or ignore the certificate(.ignoreSSL(true))\n                .x509TrustManagers(new X509TrustManager[]{})\n                .keyManagers(new KeyManager[]{})\n                .ignoreSSL(false)\n                .build();*/\n\n        // Configure Credentials authentication information, including ak, secret, token\n        StaticCredentialProvider provider = StaticCredentialProvider.create(Credential.builder()\n                // Please ensure that the environment variables ALIBABA_CLOUD_ACCESS_KEY_ID and ALIBABA_CLOUD_ACCESS_KEY_SECRET are set.\n                .accessKeyId(System.getenv("ALIBABA_CLOUD_ACCESS_KEY_ID"))\n                .accessKeySecret(System.getenv("ALIBABA_CLOUD_ACCESS_KEY_SECRET"))\n                //.securityToken(System.getenv("ALIBABA_CLOUD_SECURITY_TOKEN")) // use STS token\n                .build());\n\n        // Configure the Client\n        AsyncClient client = AsyncClient.builder()\n                //.httpClient(httpClient) // Use the configured HttpClient, otherwise use the default HttpClient (Apache HttpClient)\n                .credentialsProvider(provider)\n                //.serviceConfiguration(Configuration.create()) // Service-level configuration\n                // Client-level configuration rewrite, can set Endpoint, Http request parameters, etc.\n                .overrideConfiguration(\n                        ClientOverrideConfiguration.create()\n                                  // Endpoint 请参考 https://api.aliyun.com/product/Oss\n                                .setEndpointOverride("oss-cn-qingdao.aliyuncs.com")\n                        //.setConnectTimeout(Duration.ofSeconds(30))\n                )\n                .build();\n\n        // Parameter settings for API request\n        SelectObjectRequest selectObjectRequest = SelectObjectRequest.builder()\n                .selectRequest(selectRequest)\n                // Request-level configuration rewrite, can set Http request parameters, etc.\n                // .requestConfiguration(RequestConfiguration.create().setHttpHeaders(new HttpHeaders()))\n                .build();\n\n        // Asynchronously get the return value of the API request\n        CompletableFuture<SelectObjectResponse> response = client.selectObject(selectObjectRequest);\n        // Synchronously get the return value of the API request\n        SelectObjectResponse resp = response.get();\n        System.out.println(new Gson().toJson(resp));\n        // Asynchronous processing of return values\n        /*response.thenAccept(resp -> {\n            System.out.println(new Gson().toJson(resp));\n        }).exceptionally(throwable -> { // Handling exceptions\n            System.out.println(throwable.getMessage());\n            return null;\n        });*/\n\n        // Finally, close the client\n        client.close();\n    }\n\n}\n',
  language: "java-async",
};
