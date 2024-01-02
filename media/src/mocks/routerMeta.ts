export const routerMeta = {
    "specName": "Ecs::2014-05-26",
    "modName": "",
    "spec": {
        "deprecated": false,
        "description": "## 接口说明\n\n- **准备工作**：\n  - 通过实名认证。更多信息，请参见[账号实名认证相关文档](https://help.aliyun.com/document_detail/48263.html)。 \n  - 成本估算：了解云服务器ECS的计费方式。更多信息，请参见[计费概述](https://help.aliyun.com/document_detail/25398.html)。\n  - 产品选型：调用[DescribeInstanceTypes](https://help.aliyun.com/document_detail/25620.html)查看目标实例规格的性能数据，或者参见[选型配置](https://help.aliyun.com/document_detail/58291.html)了解如何选择实例规格。\n  - 查询库存：调用[DescribeAvailableResource](https://help.aliyun.com/document_detail/66186.html)查看指定地域或者可用区内的资源供给情况。\n  - 网络规划：您需要确保您已经有可用的安全组。更多信息，请参见[CreateSecurityGroup](https://help.aliyun.com/document_detail/25553.html)。创建专有网络VPC类型实例前，您需要预先在相应的阿里云地域[创建VPC](https://help.aliyun.com/document_detail/65430.html)。\n\n- **与CreateInstance对比差异**：\n\n    和CreateInstance接口相比，RunInstances接口有以下优点：\n \n  - 单次最多可以创建100台实例，避免重复多次调用CreateInstance。\n  - 实例创建之后，实例会自动变成`Starting`状态，然后变成`Running`状态，不需要再调用[StartInstance](https://help.aliyun.com/document_detail/25500.html)启动实例。\n  - 创建实例时可以指定`InternetMaxBandwidthOut`为ECS实例分配公网IP，不需要您再调用[AllocatePublicIpAddress](https://help.aliyun.com/document_detail/25544.html)分配公网IP。\n  - 您可以指定`AutoReleaseTime`参数来设定自动释放时间，不需要再调用[ModifyInstanceAutoReleaseTime](https://help.aliyun.com/document_detail/47576.html)设置自动释放时间。\n  - 您可以指定`LaunchTemplateId`和`LaunchTemplateVersion`使用启动模板，可以免除您每次创建实例时都需要填入大量配置参数。\n  - 可以指定`UniqueSuffix`参数批量设置有序的实例名称或主机名称，方便管理与检索。\n  - 使用RunInstances创建实例时支持设置Enclave机密计算模式和可信系统模式。\n  - 可以指定 `NetworkOptions.EnableJumboFrame`参数为true在创建时开启Jumbo frame特性。 更多信息，请参见 [ECS实例MTU](https://help.aliyun.com/document_detail/200512.html)。\n\n- **注意事项**：\n\n  - 单次最多能创建100台实例。\n  - 您可以指定参数`AutoReleaseTime`设置实例自动释放时间。\n  - 创建成功后会返回实例ID列表，您可以通过[DescribeInstances](https://help.aliyun.com/document_detail/25506.html)查询新建实例状态。\n  - 创建实例时，默认自动启动实例，直到实例状态变成运行中（`Running`）。\n  - 自2020年11月27日起，创建和变配ECS实例时带宽峰值受账户限速策略影响。如需更大带宽峰值，请提交工单。具体限速策略：单个地域下，所有按使用流量计费ECS实例的实际运行带宽峰值总和不大于5 Gbit/s；所有按固定带宽计费ECS实例的实际运行带宽峰值总和不大于50 Gbit/s。\n  - 与[CreateInstance](https://help.aliyun.com/document_detail/25499.html)相比，通过`RunInstances`创建的实例如果参数`InternetMaxBandwidthOut`的值大于0，则自动为实例分配公网IP。\n  - RunInstances支持以下任一方式绑定主网卡，但需要注意一次调用只能选用一种方式配置主网卡，同时使用两种方式将会调用失败并返回错误信息。\n           - 通过`SecurityGroupId`、`VSwitchId`、`PrivateIpAddress`、`NetworkInterfaceQueueNumber`与`Ipv6AddressCount`等参数直接设置主网卡的相关配置信息。\n           - 通过`NetworkInterface.N.*`设置主网卡以及辅助网卡的配置信息。当`NetworkInterface.N.InstanceType`取值为`Primary`时，表示设置主网卡；当`NetworkInterface.N.InstanceType`取值为`Secondary`或空值时，表示设置辅助网卡。\n  - 提交创建任务后，参数不合法或者库存不足的情况下会报错，具体的报错原因参见错误码。\n\n           - 如果创建实例时返回`QuotaExceed.ElasticQuota`错误，表示您在当前地域选择的实例规格所要创建的台数超出系统限额，或者全实例规格vCPU配额超出系统限额，您可以前往[ECS管理控制台](https://ecs.console.aliyun.com/?spm=a2c8b.12215451.favorites.decs.5e3a336aMGTtzy#/privileges/quota)或[配额中心](https://quotas.console.aliyun.com/products/ecs/quotas)申请提高限额。\n\n           - 如果创建实例时返回`QuotaExceed.DiskCapacity`错误，表示您当前选择的磁盘类型所要创建的总容量超出指定可用区的系统限额，您可以前往[配额中心](https://quotas.console.aliyun.com/products/disk/quotas)查询和申请提高磁盘容量配额。\n\n- **最佳实践**：\n\n  - 单次大批量创建ECS实例（大于100台）遇到库存不足的场景；对实例规格或可用区等资源配置无指定要求，更关注如何快速创建实例的场景；对ECS实例数量无指定要求，更关注总算力vCPU个数等场景下，阿里云推荐您使用弹性供应组。您可以通过[CreateAutoProvisioningGroup](https://help.aliyun.com/document_detail/122738.html)创建弹性供应组，一键式地部署跨计费方式、跨可用区、跨实例规格族的实例集群。更多信息，请参见[使用弹性供应组API批量创建ECS实例](https://help.aliyun.com/document_detail/200772.html)。\n\n  - `RunInstances`可以执行批量创建任务，为便于管理与检索，建议您为每批次启动的实例指定标签（`Tag.N.Key`和`Tag.N.Value`），并且为主机名（`HostName`）和实例名称（`InstanceName`）添加有序后缀（`UniqueSuffix`）。\n\n  - 实例启动模板能免除您每次创建实例时都需要填入大量配置参数，您可以创建实例启动模板（[CreateLaunchTemplate](https://help.aliyun.com/document_detail/74686.html)）后，在`RunInstances`请求中指定`LaunchTemplateId`和`LaunchTemplateVersion`使用启动模板。\n\n  - 您可以在[ECS管理控制台](https://ecs.console.aliyun.com/)创建ECS实例时获取`RunInstances`的最佳实践建议。确认订单时，左侧**API 工作流**罗列出`RunInstances`能使用的关联API以及请求参数的值。右侧提供面向编程语言的SDK示例，目前支持**Java**和**Python**示例。\n\n### 示例1：创建包年包月实例\n\n实例所在地域为华东1（杭州），计费方式为包年包月，购买时长一个月，到期自动续费一个月，镜像ID为：aliyun_3_x64_20G_alibase_20221102.vhd，实例规格为：ecs.g7.large，40 GiB ESSD云盘，挂载100 GiB  ESSD云数据盘，公网出带宽为10 Mbit/s，自动分配私网IP和公网IP，实例名称为ECS-test，登录密码为ECS@test1234，数量为1台。\n\n```\nhttp(s)://ecs.aliyuncs.com/?Action=RunInstances\n&RegionId=cn-hangzhou\n&ImageId=aliyun_3_x64_20G_alibase_20221102.vhd\n&InstanceType=ecs.g7.large\n&SecurityGroupId=sg-bp150uqocpf9jj70****\n&VSwitchId=vsw-bp1qo7s91cbch5i4l****\n&InstanceChargeType=PrePaid\n&SystemDisk.Size=40\n&DataDisk.1.Size=100\n&DataDisk.1.Category=cloud_essd\n&SystemDisk.Category=cloud_essd\n&Amount=1\n&Period=1\n&PeriodUnit=Month\n&AutoRenew=true\n&AutoRenewPeriod=1\n&HostName=ECS-test\n&Password=ECS@test1234\n&InternetMaxBandwidthOut=10\n&公共请求参数\n```\n\n### 示例2：创建按量付费实例\n\n实例所在地域为华东1（杭州），计费方式为按量付费，镜像ID为：aliyun_3_x64_20G_alibase_20221102.vhd，实例规格为：ecs.g7.large，40 GiB ESSD云盘，挂载100 GiB  ESSD云数据盘，公网出带宽为10 Mbit/s，自动分配私网IP和公网IP，实例名称为ECS-test，登录密码为ECS@test1234，数量为1台。\n\n```\nhttp(s)://ecs.aliyuncs.com/?Action=RunInstances\n&RegionId=cn-hangzhou\n&ImageId=aliyun_3_x64_20G_alibase_20221102.vhd\n&InstanceType=ecs.g7.large\n&SecurityGroupId=sg-bp150uqocpf9jj70****\n&VSwitchId=vsw-bp1qo7s91cbch5i4l****\n&InstanceChargeType=PostPaid\n&SystemDisk.Size=40\n&DataDisk.1.Size=100\n&DataDisk.1.Category=cloud_essd\n&SystemDisk.Category=cloud_essd\n&HostName=ECS-test\n&Password=ECS@test1234\n&InternetMaxBandwidthOut=10\n&公共请求参数\n```\n\n### 示例3：创建抢占式实例\n\n实例所在地域为华东1（杭州），计费方式为抢占式实例，竞价策略为系统自动出价，跟随当前市场实际价格，实例保留时长为1小时，镜像ID为：aliyun_3_x64_20G_alibase_20221102.vhd，实例规格为：ecs.g7.large，40 GiB ESSD云盘，挂载100 GiB  ESSD云数据盘，公网出带宽为10 Mbit/s，自动分配私网IP和公网IP，实例名称为ECS-test，登录密码为ECS@test1234，数量为1台。\n\n```\nhttp(s)://ecs.aliyuncs.com/?Action=RunInstances\n&RegionId=cn-hangzhou\n&ImageId=aliyun_3_x64_20G_alibase_20221102.vhd\n&InstanceType=ecs.g7.large\n&SecurityGroupId=sg-bp150uqocpf9jj70****\n&VSwitchId=vsw-bp1qo7s91cbch5i4l****\n&InstanceChargeType=PostPaid\n&SystemDisk.Size=40\n&DataDisk.1.Size=100\n&DataDisk.1.Category=cloud_essd\n&SystemDisk.Category=cloud_essd\n&HostName=ECS-test\n&Password=ECS@test1234\n&InternetMaxBandwidthOut=10\n&SpotStrategy=SpotAsPriceGo\n&SpotDuration=1\n&公共请求参数\n```\n\n### 示例4：在专有宿主机上创建包年包月实例\n\n实例所在地域为华东1（杭州），专有宿主机为dh-bp12w10wll9xcjq2****，计费方式包年包月，购买时长一个月，镜像ID为：aliyun_3_x64_20G_alibase_20221102.vhd，实例规格为：ecs.g7.large，40 GiB ESSD云盘，挂载100 GiB  ESSD云数据盘，公网出带宽为10 Mbit/s，自动分配私网IP和公网IP，实例名称为ECS-test，登录密码为ECS@test1234，购买数量为1台。\n\n```\nhttp(s)://ecs.aliyuncs.com/?Action=RunInstances\n&RegionId=cn-hangzhou\n&ImageId=aliyun_3_x64_20G_alibase_20221102.vhd\n&InstanceType=ecs.g7.large\n&SecurityGroupId=sg-bp150uqocpf9jj70****\n&VSwitchId=vsw-bp1qo7s91cbch5i4l****\n&InstanceChargeType=PrePaid\n&Amount=1\n&Period=1\n&PeriodUnit=Month\n&SystemDisk.Size=40\n&DataDisk.1.Size=100\n&DataDisk.1.Category=cloud_essd\n&SystemDisk.Category=cloud_essd\n&HostName=ECS-test\n&Password=ECS@test1234\n&InternetMaxBandwidthOut=10\n&DedicatedHostId=dh-bp12w10wll9xcjq2****\n&公共请求参数\n```",
        "ext": {
            "errorCodes": {
                "400": [
                    {
                        "errorCode": "LoginAsNonRoot.ImageNotSupport",
                        "errorMessage": "The specified image does not support login as non-root."
                    },
                    {
                        "errorCode": "InvalidParam.NotSupportJumboFrame",
                        "errorMessage": "Not support jumbo frame."
                    },
                    {
                        "errorCode": "InsufficientBalance.AgentCredit",
                        "errorMessage": "Insufficient agent credit. Please contact your agent."
                    },
                    {
                        "errorCode": "QuotaExceed.DiskCapacity",
                        "errorMessage": "The used capacity of disk type has exceeded the quota in the zone,  %s."
                    },
                    {
                        "errorCode": "InvalidPeriod.ExceededDedicatedHost",
                        "errorMessage": "Instance expired date can not exceed dedicated host expired date."
                    },
                    {
                        "errorCode": "InvalidParam.SecondaryNetworkInterface",
                        "errorMessage": "When min amount greater than 1 and the PrivateIpAddress or Primary NetworkInterface is specified,the Secondary NetworkInterface IP parameter cannot be specified."
                    },
                    {
                        "errorCode": "InvalidPrimaryIpAddress.SizeInvalid",
                        "errorMessage": "The NetworkInterface PrimaryIpAddress is used to create only one instance."
                    },
                    {
                        "errorCode": "InvalidStorageClusterId.CapacityNotEnough",
                        "errorMessage": "The remaining capacity of the current dedicated storage cluster is less than the size of disk."
                    },
                    {
                        "errorCode": "InvalidStorageClusterId.StatusNotSupport",
                        "errorMessage": "The current status of the dedicated storage cluster cannot create a cloud disk yet."
                    },
                    {
                        "errorCode": "InvalidStorageClusterId.ZoneIdEmpty",
                        "errorMessage": "The specified param ZoneId cannot be empty when StorageClusterId given."
                    },
                    {
                        "errorCode": "InvalidStorageClusterId.PerformanceLevelNotMatch",
                        "errorMessage": "The current dedicated storage cluster cannot create this performance level of disk."
                    },
                    {
                        "errorCode": "InvalidStorageClusterId.CategoryNotMatch",
                        "errorMessage": "The current dedicated storage cluster cannot create this category of disk."
                    },
                    {
                        "errorCode": "InvalidStorageClusterId.DiskSizeEmpty",
                        "errorMessage": "The specified param DiskSize cannot be empty when StorageClusterId given."
                    },
                    {
                        "errorCode": "InvalidInstanceType.ValueUnauthorized",
                        "errorMessage": "The specified InstanceType is not authorized."
                    },
                    {
                        "errorCode": "InvalidInstanceType.ValueNotSupported",
                        "errorMessage": "The specified InstanceType beyond the permitted range."
                    },
                    {
                        "errorCode": "InvalidDescription.Malformed",
                        "errorMessage": "The specified parameter \"Description\" is not valid."
                    },
                    {
                        "errorCode": "InvalidInternetChargeType.ValueNotSupported",
                        "errorMessage": "The specified InternetChargeType is not valid."
                    },
                    {
                        "errorCode": "InvalidParameter",
                        "errorMessage": "The specified parameter \"InternetMaxBandwidthOut\" is not valid."
                    },
                    {
                        "errorCode": "InvalidHostName.Malformed",
                        "errorMessage": "The specified parameter \"HostName\" is not valid."
                    },
                    {
                        "errorCode": "InvalidPassword.Malformed",
                        "errorMessage": "The specified parameter \"Password\" is not valid."
                    },
                    {
                        "errorCode": "InvalidPasswordParam.Mismatch",
                        "errorMessage": "The input password should be null when passwdInherit is true."
                    },
                    {
                        "errorCode": "InvalidSystemDiskCategory.ValueNotSupported",
                        "errorMessage": "The specified parameter \"SystemDisk.Category\" is not valid."
                    },
                    {
                        "errorCode": "InvalidDiskName.Malformed",
                        "errorMessage": "The specified parameter \"SyatemDisk.DiskName or DataDisk.n.DiskName\" is not valid."
                    },
                    {
                        "errorCode": "InvalidDiskDescription.Malformed",
                        "errorMessage": "The specified parameter \"SyatemDisk.DiskDescription\" or \"DataDisk.n.Description\" is not valid."
                    },
                    {
                        "errorCode": "InvalidDataDiskSize.ValueNotSupported",
                        "errorMessage": "The specified DataDisk.n.Size beyond the permitted range, or the capacity of snapshot exceeds the size limit of the specified disk category."
                    },
                    {
                        "errorCode": "InvalidDataDiskCategory.ValueNotSupported",
                        "errorMessage": "The specified parameter \"DataDisk.n.Category\" is not valid."
                    },
                    {
                        "errorCode": "InvalidDataDevice.Malformed",
                        "errorMessage": "The specified parameter \"DataDisk.n.Device\" is not valid."
                    },
                    {
                        "errorCode": "InvalidNodeControllerId.Malformed",
                        "errorMessage": "The specified parameter \"NodeControllerId\" is not valid."
                    },
                    {
                        "errorCode": "InvalidInnerIpAddress.Malformed",
                        "errorMessage": "The specified parameter \"InnerIpAddress\" is not valid."
                    },
                    {
                        "errorCode": "InvalidInnerIpAddress.Unusable",
                        "errorMessage": "The specified InnerIpAddress is already used or not found in usable ip range."
                    },
                    {
                        "errorCode": "InvalidParameter.Conflict",
                        "errorMessage": "The specified image does not support the specified instance type."
                    },
                    {
                        "errorCode": "ImageNotSupportCloudInit",
                        "errorMessage": "The specified image does not support cloud-init."
                    },
                    {
                        "errorCode": "InvalidSnapshotId.BasedSnapshotTooOld",
                        "errorMessage": "The specified snapshot is created before 2013-07-15."
                    },
                    {
                        "errorCode": "QuotaExceed.AfterpayInstance",
                        "errorMessage": "Living afterpay instances quota exceeded."
                    },
                    {
                        "errorCode": "InvalidInstanceName.Malformed",
                        "errorMessage": "The specified parameter \"InstanceName\" is not valid."
                    },
                    {
                        "errorCode": "InvalidInstanceName.CustomMalformed",
                        "errorMessage": "Customized section of instance or host name is invalid, please use valid format: [], [,], [m,], [,n], [m,n]."
                    },
                    {
                        "errorCode": "InvalidParameter.Mismatch",
                        "errorMessage": "Specified security group and virtual switch are not in the same VPC."
                    },
                    {
                        "errorCode": "InvalidNetworkType.Mismatch",
                        "errorMessage": "Specified parameter \"InternetMaxBandwidthIn\" or \"InternetMaxBandwidthOut\" conflict with instance network type."
                    },
                    {
                        "errorCode": "InvalidPrivateIpAddress",
                        "errorMessage": "Specified private IP address is not in the CIDR block of virtual switch."
                    },
                    {
                        "errorCode": "InvalidPrivateIpAddress.Malformed",
                        "errorMessage": "Specified private IP address is malformed."
                    },
                    {
                        "errorCode": "InvalidPrivateIpAddress.Duplicated",
                        "errorMessage": "Specified private IP address is duplicated."
                    },
                    {
                        "errorCode": "QuotaExceeded.PrivateIpAddress",
                        "errorMessage": "Don't have enough private IPs in this switch."
                    },
                    {
                        "errorCode": "QuotaExceeded",
                        "errorMessage": "Living instances quota exceeded in this VPC."
                    },
                    {
                        "errorCode": "IncorrectVSwitchStatus",
                        "errorMessage": "The current status of virtual switch does not support this operation."
                    },
                    {
                        "errorCode": "ResourceNotAvailable",
                        "errorMessage": "Resource you requested is not available in this region or zone."
                    },
                    {
                        "errorCode": "MissingParameter",
                        "errorMessage": "The input parameter \"VSwitchId\" that is mandatory for processing this request is not supplied."
                    },
                    {
                        "errorCode": "InvalidDiskCategory.Mismatch",
                        "errorMessage": "The specified disk categories' combination is not supported."
                    },
                    {
                        "errorCode": "MissingParamter",
                        "errorMessage": "The specified parameter \"Period\" is not null."
                    },
                    {
                        "errorCode": "InvalidPeriod",
                        "errorMessage": "The specified period is not valid."
                    },
                    {
                        "errorCode": "InstanceDiskCategoryLimitExceed",
                        "errorMessage": "The specified DataDisk.n.Size beyond the permitted range, or the capacity of snapshot exceeds the size limit of the specified disk category."
                    },
                    {
                        "errorCode": "InvalidClientToken.ValueNotSupported",
                        "errorMessage": "The ClientToken provided is invalid."
                    },
                    {
                        "errorCode": "InvalidIoOptimize.ValueNotSupported",
                        "errorMessage": "The specified IoOptimize is not valid."
                    },
                    {
                        "errorCode": "InvalidSecurityGroupId.NotFound",
                        "errorMessage": "The SecurityGroupId provided does not exist in our records."
                    },
                    {
                        "errorCode": "InvalidInternetMaxBandwidthOut.Malformed",
                        "errorMessage": "The specified parameter internetMaxBandwidthOut is not valid."
                    },
                    {
                        "errorCode": "InvalidInternetMaxBandwidthIn.Malformed",
                        "errorMessage": "The specified parameter internetMaxBandwidthIn is not valid."
                    },
                    {
                        "errorCode": "InvalidSnapshotId.NotFound",
                        "errorMessage": "The specified parameter SnapshotId is not exist."
                    },
                    {
                        "errorCode": "InvalidTagKey.Malformed",
                        "errorMessage": "The specified Tag.n.Key is not valid."
                    },
                    {
                        "errorCode": "InvalidTagValue.Malformed",
                        "errorMessage": "The specified Tag.n.Value is not valid."
                    },
                    {
                        "errorCode": "InvalidTag.Mismatch",
                        "errorMessage": "The specified Tag.n.Key and Tag.n.Value are not match."
                    },
                    {
                        "errorCode": "InvalidTagCount",
                        "errorMessage": "The specified tags are beyond the permitted range."
                    },
                    {
                        "errorCode": "InvalidMinAmount.Malformed",
                        "errorMessage": "The specified parameter MinAmount is not valid."
                    },
                    {
                        "errorCode": "InvalidMaxAmount.Malformed",
                        "errorMessage": "The specified parameter MaxAmount is not valid."
                    },
                    {
                        "errorCode": "InvalidAutoReleaseTime.Malformed",
                        "errorMessage": "The specified parameter AutoReleaseTime is not valid."
                    },
                    {
                        "errorCode": "OperationDenied.NoVlan",
                        "errorMessage": "The specified parameter \"VlanId\" is not valid or vlan has not enough IP address."
                    },
                    {
                        "errorCode": "OperationDenied.QuotaExceed",
                        "errorMessage": "The quota of tags on resource is beyond permitted range."
                    },
                    {
                        "errorCode": "Account.Arrearage",
                        "errorMessage": "Your account has been in arrears."
                    },
                    {
                        "errorCode": "InvalidUserData.SizeExceeded",
                        "errorMessage": "The specified parameter \"UserData\" exceeds the size."
                    },
                    {
                        "errorCode": "InvalidUserData.NotSupported",
                        "errorMessage": "TThe specified parameter \"UserData\" only support the vpc and IoOptimized Instance."
                    },
                    {
                        "errorCode": "InvalidUserData.Base64FormatInvalid",
                        "errorMessage": "The specified UserData is not valid."
                    },
                    {
                        "errorCode": "InstanceDiskNumber.LimitExceed",
                        "errorMessage": "The total number of specified disk in an instance exceeds."
                    },
                    {
                        "errorCode": "InvalidDiskCategory.ValueNotSupported",
                        "errorMessage": "The specified parameter \"DiskCategory\" is not valid."
                    },
                    {
                        "errorCode": "InvalidSpotStrategy",
                        "errorMessage": "The specified SpotStrategy is not valid."
                    },
                    {
                        "errorCode": "InvalidSpotParam.EmptyZoneID",
                        "errorMessage": "The specified zoneid is empty when SpotStrategy is set."
                    },
                    {
                        "errorCode": "InvalidSpotPriceLimit",
                        "errorMessage": "The specified SpotPriceLimitis not valid."
                    },
                    {
                        "errorCode": "InvalidSpotDuration",
                        "errorMessage": "The specified SpotDuration is not valid."
                    },
                    {
                        "errorCode": "InvalidSpotAuthorized",
                        "errorMessage": "The specified Spot param is unauthorized."
                    },
                    {
                        "errorCode": "InvalidSpotPrepaid",
                        "errorMessage": "The specified Spot type is not support PrePay Instance."
                    },
                    {
                        "errorCode": "InvalidSpotAliUid",
                        "errorMessage": "The specified UID is not authorized to use SPOT instance."
                    },
                    {
                        "errorCode": "InvalidParameter.Bandwidth",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "RegionUnauthorized",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "Zone.NotOnSale",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidSystemDiskSize.ValueNotSupported",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidInstanceType.ElasticNetworkInterfaceNotSupported",
                        "errorMessage": "The specified instance type does not support Elastic Network Interface, you can not attach Elastic Network Interface to generation I instances."
                    },
                    {
                        "errorCode": "InvalidParameter.EncryptedIllegal",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidParameter.EncryptedNotSupported",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidParameter.Encrypted.KmsNotEnabled",
                        "errorMessage": "The encrypted disk need enable KMS."
                    },
                    {
                        "errorCode": "InvalidParameter.KmsNotEnabled",
                        "errorMessage": "The specified operation need enable KMS."
                    },
                    {
                        "errorCode": "InvalidSpotPriceLimit.LowerThanPublicPrice",
                        "errorMessage": "The specified parameter \"spotPriceLimit\" can't be lower than current public price."
                    },
                    {
                        "errorCode": "InvalidRelationResource.NotFound",
                        "errorMessage": "The relation resource has been deleted."
                    },
                    {
                        "errorCode": "IncorrectRecycleBinStatus",
                        "errorMessage": "The operation is not permitted due to resource status."
                    },
                    {
                        "errorCode": "InvalidHpcClusterId.Unnecessary",
                        "errorMessage": "The specified HpcClusterId is unnecessary."
                    },
                    {
                        "errorCode": "InvalidVSwitchId.Necessary",
                        "errorMessage": "The VSwitchId is necessary."
                    },
                    {
                        "errorCode": "InvalidHpcClusterId.Necessary",
                        "errorMessage": "The HpcClusterId is necessary."
                    },
                    {
                        "errorCode": "InvalidHpcClusterId.NotFound",
                        "errorMessage": "The specified HpcClusterId is not found."
                    },
                    {
                        "errorCode": "InvalidHpcClusterId.Creating",
                        "errorMessage": "The specified HpcClusterId is creating."
                    },
                    {
                        "errorCode": "InvalidParameter.VSwitchId",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidSecurityGroup.NotInDefaultVpc",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "VpcNotFound",
                        "errorMessage": "Vpc is not found according to the specified VSwitch or the vpc does not belong to you."
                    },
                    {
                        "errorCode": "InvalidSystemDiskSize.ImageNotSupportResize",
                        "errorMessage": "The specified image does not support resize."
                    },
                    {
                        "errorCode": "InvalidSpotInterruptionBehavior",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidDeploymentOnHost",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidInstanceChargeType.NotSupport",
                        "errorMessage": "The Dedicated host not support the specified Instance charge type."
                    },
                    {
                        "errorCode": "InvalidNetworkType.NotSupported",
                        "errorMessage": "The classic networkType not support create ECS on dedicatedHost."
                    },
                    {
                        "errorCode": "NoAvaliableDedicatedHost",
                        "errorMessage": "No available dedicated host or not enough resource on dedicated host."
                    },
                    {
                        "errorCode": "InvalidDedicatedHostId.NotFound",
                        "errorMessage": "The specified DedicatedHostId does not exist."
                    },
                    {
                        "errorCode": "InvalidDedicatedHostStatus.NotSupport",
                        "errorMessage": "Operation denied due to dedicated host status."
                    },
                    {
                        "errorCode": "IncorrectDedicatedHostStatus",
                        "errorMessage": "The current status of the resource does not support this operation."
                    },
                    {
                        "errorCode": "ChargeTypeViolation.PostPaidDedicatedHost",
                        "errorMessage": "Prepaid instance onto postpaid dedicated host is not allowed."
                    },
                    {
                        "errorCode": "DedicatedHostType.Unmatched",
                        "errorMessage": "The specified DedicatedHostType doesn?t match the instance type."
                    },
                    {
                        "errorCode": "InvalidParam.NetworkInterface",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidParams.CreateEniParams",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidParameter.CreditSpecification",
                        "errorMessage": "The specified CreditSpecification is not supported in this region."
                    },
                    {
                        "errorCode": "IncorrectVpcStatus",
                        "errorMessage": "Current VPC status does not support this operation."
                    },
                    {
                        "errorCode": "InvalidInstanceType.NotSupported",
                        "errorMessage": "The specified instanceType is not supported by the deployment set."
                    },
                    {
                        "errorCode": "InvalidVpcZone.NotSupported",
                        "errorMessage": "The specified operation is not allowed in the zone to which your VPC belongs, please try in other zones."
                    },
                    {
                        "errorCode": "IncorrectDefaultVpcStatus",
                        "errorMessage": "The status of the default VPC is invalid."
                    },
                    {
                        "errorCode": "InvalidAutoRenewPeriod.ValueNotSupported",
                        "errorMessage": "The specified autoRenewPeriod is invalid."
                    },
                    {
                        "errorCode": "InvalidMarketImageChargeType.NotSupport",
                        "errorMessage": "The specified chargeType of marketImage is unsupported."
                    },
                    {
                        "errorCode": "OperationDenied",
                        "errorMessage": "The specified instanceType or zone is not available or not authorized."
                    },
                    {
                        "errorCode": "InvalidPeriodType.ValueNotSupported",
                        "errorMessage": "The specified parameter PeriodType is invalid."
                    },
                    {
                        "errorCode": "IncorrectImageStatus",
                        "errorMessage": "The specified image is an Alibaba Cloud Marketplace image. The sale of this image has ended. For more information, contact the image service provider."
                    },
                    {
                        "errorCode": "InvalidParam.Tenancy",
                        "errorMessage": "The specified Tenancy is invalid."
                    },
                    {
                        "errorCode": "InvalidParameter.Affinity",
                        "errorMessage": "The specified Affinity is invalid."
                    },
                    {
                        "errorCode": "InvalidCustomInstanceType.NotSupported",
                        "errorMessage": "The specified custom instance type is invalid."
                    },
                    {
                        "errorCode": "IoOptimized.NotSupported",
                        "errorMessage": "The specified instance must be IoOptimized instance when kmsKeyId is not empty."
                    },
                    {
                        "errorCode": "InvalidSnapshotId.Malformed",
                        "errorMessage": "The specified SnapshotId is not valid."
                    },
                    {
                        "errorCode": "InvalidCapacityReservationId.NotFound",
                        "errorMessage": "The specified CapacityReservationId does not exist."
                    },
                    {
                        "errorCode": "LackResource",
                        "errorMessage": "There's no enough resource on the specified capacity reservation."
                    },
                    {
                        "errorCode": "Duplicate.TagKey",
                        "errorMessage": "The Tag.N.Key contain duplicate key."
                    },
                    {
                        "errorCode": "InvalidSecurityGroup.NetworkType",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidSecurityGroup.VpcMismatch",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidParameter.SecurityGroupIdRepeated",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidSecurityGroupId.SingleIdAndMultiIdConflict",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidSecurityGroupId.MultiGroupIdNetworkTypeConflict",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "JoinedGroupLimitExceed",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidAccountStatus.PayAmountLimitExceeded",
                        "errorMessage": "Your account is being restricted, because you have no default payment method or you are not authorized."
                    },
                    {
                        "errorCode": "InvalidPerformanceLevel.Malformed",
                        "errorMessage": "The specified parameter DataDisk.n.PerformanceLevel is not valid."
                    },
                    {
                        "errorCode": "InvalidOperation.EniCountExceeded",
                        "errorMessage": "The maximum number of eni in a enterprise security group is exceeded."
                    },
                    {
                        "errorCode": "QuotaExceeded.PrepayDataDiskCapacity",
                        "errorMessage": "The quota of prepay data disk capacity exceeds."
                    },
                    {
                        "errorCode": "InvalidDiskCategory.ConflictSnapshotCategory",
                        "errorMessage": "The specified disk category conflict with snapshot category."
                    },
                    {
                        "errorCode": "AccountForbidden.ProductCreationLimited",
                        "errorMessage": "The commodity must be officially operated by Aliyun and in pay-as-you-go billing method."
                    },
                    {
                        "errorCode": "UnexpectedImageFamily.ImageIdSupplied",
                        "errorMessage": "The input parameter ImageFamily must be null when image id is set."
                    },
                    {
                        "errorCode": "InvalidEncrypted.NotMatchEncryptAlgorithm",
                        "errorMessage": "The specified parameter Encrypted must be true when EncryptAlgorithm is not empty."
                    },
                    {
                        "errorCode": "InvalidEncrypted.NotMatchKmsKeyId",
                        "errorMessage": "The specified parameter Encrypted must be true when KmsKeyId is not empty."
                    },
                    {
                        "errorCode": "InvalidEncrypted.NotMatchSnapshot",
                        "errorMessage": "The specified parameter Encrypted is different from the Encrypted of the snapshot."
                    },
                    {
                        "errorCode": "InvalidEncryptAlgorithm.NotMatchSnapshot",
                        "errorMessage": "The specified parameter EncryptAlgorithm is different from the encrypt algorithm of the snapshot."
                    },
                    {
                        "errorCode": "InvalidKmsKeyId.NotMatchSnapshot",
                        "errorMessage": "The specified parameter KmsKeyId is different from the KmsKeyId of the snapshot."
                    },
                    {
                        "errorCode": "InvalidEncryptAlgorithm",
                        "errorMessage": "The specified parameter EncryptAlgorithm is not valid."
                    },
                    {
                        "errorCode": "InvalidHttpEndpoint.NotSupported",
                        "errorMessage": "The specified HttpEndpoint not supported, you can use enabled(default) or disabled."
                    },
                    {
                        "errorCode": "InvalidHttpTokens.NotSupported",
                        "errorMessage": "The specified HttpTokens not supported, you can use optional(default) or required."
                    },
                    {
                        "errorCode": "InvalidHttpPutResponseHopLimit.NotSupported",
                        "errorMessage": "The specified HttpPutResponseHopLimit not supported, more than 1 and less than 64 is reasonable."
                    },
                    {
                        "errorCode": "InvalidOperation.VpcHasEnabledAdvancedNetworkFeature",
                        "errorMessage": "The specified vpc has enabled advanced network feature."
                    },
                    {
                        "errorCode": "InvalidChargeType.CapacityReservationNotSupported",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidPerformanceLevel.ValueNotSupported",
                        "errorMessage": "The current ZoneId or InstanceType does not support PL0 of cloud_essd."
                    },
                    {
                        "errorCode": "InvalidKMSKeyId.NotSymmetric",
                        "errorMessage": "The specified parameter KmsKeyId must be symmetric."
                    },
                    {
                        "errorCode": "InvalidParameter.Arns",
                        "errorMessage": "The specified Arns is not valid."
                    },
                    {
                        "errorCode": "InvalidDedicatedHostClusterId.NotFound",
                        "errorMessage": "The specified DedicatedHostClusterId does not exist."
                    },
                    {
                        "errorCode": "InvalidDedicatedHostClusterId.InValid",
                        "errorMessage": "The specified Dedicated Host Cluster is invalid."
                    },
                    {
                        "errorCode": "InvalidDeploymentSetId.NotFound",
                        "errorMessage": "The parameter DeploymentSetId is invalid."
                    },
                    {
                        "errorCode": "InvalidOperation.UserNotSupported",
                        "errorMessage": "Reseller user do not support purchase at the moment."
                    },
                    {
                        "errorCode": "InvalidManagedPrivateSpaceId.NotFound",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidSchedulerOptions",
                        "errorMessage": "The specified parameter SchedulerOptions is not valid."
                    },
                    {
                        "errorCode": "MissingParameter.PrivatePoolOptionsId",
                        "errorMessage": "The specified PrivatePoolOptions.Id should not be null."
                    },
                    {
                        "errorCode": "Invalid.PrivatePoolOptionsId",
                        "errorMessage": "The specified PrivatePoolOptions.Id is invalid."
                    },
                    {
                        "errorCode": "DedicatedHostNotSupported",
                        "errorMessage": "DedicatedHost is not supported for PrivatePool."
                    },
                    {
                        "errorCode": "SpotNotSupported",
                        "errorMessage": "Spot is not supported for PrivatePool."
                    },
                    {
                        "errorCode": "ClassicNetworkNotSupported",
                        "errorMessage": "Classic network is not supported for PrivatePool."
                    },
                    {
                        "errorCode": "Invalid.InstanceId",
                        "errorMessage": "Instance does not exist."
                    },
                    {
                        "errorCode": "Invalid.PrivatePoolOptions.MatchCriteria",
                        "errorMessage": "Target mode does not support this operation."
                    },
                    {
                        "errorCode": "MissingParameter.PrivatePoolOptions.Id",
                        "errorMessage": "The specified PrivatePoolOptions.Id should not be null."
                    },
                    {
                        "errorCode": "Invalid.PrivatePoolOptions.Id",
                        "errorMessage": "The PrivatePool does not exist."
                    },
                    {
                        "errorCode": "Invalid.InstanceType",
                        "errorMessage": "The InstanceType does not match the PrivatePool."
                    },
                    {
                        "errorCode": "Invalid.InstanceChargeType",
                        "errorMessage": "The InstanceChargeType does not match the PrivatePool."
                    },
                    {
                        "errorCode": "Invalid.ZoneId",
                        "errorMessage": "The ZoneId does not match the PrivatePool."
                    },
                    {
                        "errorCode": "Invalid.PrivatePoolOptions.NoStock",
                        "errorMessage": "The PrivatePool has been used up."
                    },
                    {
                        "errorCode": "InvalidPlatform.ValueNotSupported",
                        "errorMessage": "The Platform does not match the PrivatePool."
                    },
                    {
                        "errorCode": "Invalid.PrivatePoolOptions.status",
                        "errorMessage": "The PrivatePool is expired or inactive."
                    },
                    {
                        "errorCode": "InvalidAliUid",
                        "errorMessage": "The PrivatePool does not belong to the user of the Instance."
                    },
                    {
                        "errorCode": "InvalidBandwidthOut.LessThanZero",
                        "errorMessage": "The bandwidth must be larger than 0 when specifying isp."
                    },
                    {
                        "errorCode": "HibernationConfigured.InstanceTypeNotSupport",
                        "errorMessage": "The specified instance type is not support."
                    },
                    {
                        "errorCode": "HibernationConfigured.ImageNotEncrypted",
                        "errorMessage": "The hibernation configured instance only support encrypted image."
                    },
                    {
                        "errorCode": "HibernationConfigured.MemorySizeTooBig",
                        "errorMessage": "The hibernation configured instance memory size is too big."
                    },
                    {
                        "errorCode": "InvalidSystemDiskSize.LessThanMemSize",
                        "errorMessage": "The specified parameter SystemDisk.Size is less than the memory size."
                    },
                    {
                        "errorCode": "InvalidCloudBoxZone.OperationNotSupported",
                        "errorMessage": "The cloud box zone does not support creating prepaid or encrypted resources."
                    },
                    {
                        "errorCode": "ProvisionedIopsForDiskCategoryUnsupported",
                        "errorMessage": "The specified disk category does not support provisioned iops."
                    },
                    {
                        "errorCode": "InvalidProvisionedIops.LimitExceed",
                        "errorMessage": "The provisioned iops exceeds the limit."
                    },
                    {
                        "errorCode": "BurstingEnabledForDiskCategoryUnsupported",
                        "errorMessage": "The specified disk category does not support bursting enabled."
                    },
                    {
                        "errorCode": "BurstingEnabledForMultiAttachDiskUnsupported",
                        "errorMessage": "The multi attach disk does not support bursting enabled."
                    },
                    {
                        "errorCode": "ProvisionedIopsForDiskCategoryRequired",
                        "errorMessage": "The provisioned iops is required for this disk category."
                    },
                    {
                        "errorCode": "NotSupportSnapshotEncrypted.InstanceType",
                        "errorMessage": "The specified instance type does not support creating encrypted disks with native snapshot encrypt."
                    },
                    {
                        "errorCode": "NotSupportSnapshotEncrypted.RegionId",
                        "errorMessage": "The specified region does not support creating encrypted disks with native snapshot encrypt."
                    },
                    {
                        "errorCode": "NotSupportSnapshotEncrypted.ZoneId",
                        "errorMessage": "The specified zone does not support creating encrypted disks with native snapshot encrypt."
                    },
                    {
                        "errorCode": "NotSupportSnapshotEncrypted.ShareImage",
                        "errorMessage": "Shared snapshot creating encrypted disks with native snapshot encrypt is not supported."
                    },
                    {
                        "errorCode": "NotSupportSnapshotEncrypted.ImageOwnerAlias",
                        "errorMessage": "The specified image category does not support creating encrypted disks with native snapshot encrypt."
                    },
                    {
                        "errorCode": "NotSupportSnapshotEncrypted.DiskCategory",
                        "errorMessage": "The specified disk category does not support creating encrypted disks with native snapshot encrypt."
                    },
                    {
                        "errorCode": "NotSupport.SnapshotEncryptedAlgorithmConflict",
                        "errorMessage": "Changing encrypt algorithm with encrypted snapshot is not supported."
                    },
                    {
                        "errorCode": "NoPermission.SystemTag",
                        "errorMessage": "The operator is not permission for the system tag."
                    },
                    {
                        "errorCode": "NumberExceed.Tags",
                        "errorMessage": "The Tags parameter's number is exceed , Valid : 20."
                    },
                    {
                        "errorCode": "InvalidZoneId.NotSupportShareEncryptedImage",
                        "errorMessage": "Creating instances by shared encrypted images is not supported in this zone."
                    },
                    {
                        "errorCode": "InvalidDiskCategory.NotSupported",
                        "errorMessage": "The specified disk category is not supported."
                    },
                    {
                        "errorCode": "InvalidParameter.KMSKeyId.CMKUnauthorized",
                        "errorMessage": "This operation for kmsKeyId is forbidden by KMS. If you need further assistance, you can contact the KMS Technical Support."
                    },
                    {
                        "errorCode": "InvalidParameter.CloudboxNotSupported",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidZoneId.NotSupportCreateWithShareEncryptedImage",
                        "errorMessage": "You cannot use shared encrypted images to create instances in this zone."
                    },
                    {
                        "errorCode": "InvalidParameter.NetworkCardIndexInvalid",
                        "errorMessage": "Invalid network card index, please check your instance type."
                    },
                    {
                        "errorCode": "InvalidOperation.UserNotSupportNetworkCard",
                        "errorMessage": "User not support network card."
                    },
                    {
                        "errorCode": "InvalidAccount.NotSupportSpot",
                        "errorMessage": "According to business rules, this account cannot purchase ECS Spot instances."
                    },
                    {
                        "errorCode": "AccountForbidden.AssociatedWithResellerPartner",
                        "errorMessage": "Your account is associated with your reseller partner. Your account or your reseller partner's account has been forbidden to create orders, please contact your reseller partner."
                    },
                    {
                        "errorCode": "InvalidDestinationZone.DeploymentSetMismatch",
                        "errorMessage": "Error happened, %s."
                    },
                    {
                        "errorCode": "NoPermission.Price",
                        "errorMessage": "The operation requires price permission. Please either apply for permission from your main account, or set the parameter AutoPay as true."
                    },
                    {
                        "errorCode": "InvalidAutoPay.PostPaidUnsupported",
                        "errorMessage": "The specified parameter AutoPay must be set as true for postpaid instance."
                    },
                    {
                        "errorCode": "InvalidParam.EncryptedMismatch",
                        "errorMessage": "Creating encrypted disks with shared encrypted snapshots requires replacing encryption keys."
                    },
                    {
                        "errorCode": "InvalidParameter.DedicatedRegionNotSupported",
                        "errorMessage": "The specified action is rejected  because the specified ECS instance in the dedicated region does not support public IP."
                    },
                    {
                        "errorCode": "InvalidParameter.CpuOptionsTopologyType",
                        "errorMessage": "The specified parameter CpuOptions.TopologyType: %s is not valid."
                    },
                    {
                        "errorCode": "InvalidInstanceType.NotSupportCpuOptionsTopologyType",
                        "errorMessage": "The specified instance type does not support CpuOptions.TopologyType: %s."
                    }
                ],
                "401": [
                    {
                        "errorCode": "InvalidRamRole.NotEcsRole",
                        "errorMessage": "The specified ram role is not authorized for ecs, please check your role policy."
                    }
                ],
                "403": [
                    {
                        "errorCode": "InvalidParameter.PrivateIpAddressRepeated",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidOperation.HighPerformanceEniPerInstanceLimitExceeded",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidParameter.EniNumExceededWithLaunchEcs",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidOperation.InstanceTypeNotSupportHighPerformanceTrafficMode",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidParameter.QueuePairNumberMustEmpty",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidParameter.EniTrafficMode",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidParameter.InvalidQueuePairNumber",
                        "errorMessage": "The parameter of QueuePairNumber is invalid."
                    },
                    {
                        "errorCode": "InvalidParam.IpCount",
                        "errorMessage": "The parameter of ip count is invalid."
                    },
                    {
                        "errorCode": "InvalidParameter.EniType",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidOperation.HighPerformanceTrafficModeIsNotAllowed",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidParameter.NetworkInterface",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidParameter.Combination",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidHostname.SingleAndMultiConflict",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidHostname.SizeInvalid",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidParams.InstanceNameExceed",
                        "errorMessage": "The uniqueSuffix takes three naming places, please shorten your InstanceName."
                    },
                    {
                        "errorCode": "InvalidParams.HostnameExceed",
                        "errorMessage": "The uniqueSuffix takes three naming places, please shorten your Hostname."
                    },
                    {
                        "errorCode": "ImageNotSubscribed",
                        "errorMessage": "The specified image has not be subscribed."
                    },
                    {
                        "errorCode": "InvalidSystemDiskCategory.ValueUnauthorized",
                        "errorMessage": "The disk category is not authorized."
                    },
                    {
                        "errorCode": "InvalidSnapshotId.NotReady",
                        "errorMessage": "The specified snapshot has not completed yet."
                    },
                    {
                        "errorCode": "InstanceDiskCategoryLimitExceed",
                        "errorMessage": "The total size of specified disk category in an instance exceeds."
                    },
                    {
                        "errorCode": "InvalidDevice.InUse",
                        "errorMessage": "The specified device has been occupied."
                    },
                    {
                        "errorCode": "ImageRemovedInMarket",
                        "errorMessage": "The specified market image is not available, Or the specified user defined image includes product code because it is based on an image subscribed from marketplace, and that image in marketplace includeing exact the same product code has been removed."
                    },
                    {
                        "errorCode": "CategoryNotSupported",
                        "errorMessage": "The specified zone does not offer the specified disk category."
                    },
                    {
                        "errorCode": "QuotaExceed.PortableCloudDisk",
                        "errorMessage": "The quota of portable cloud disk exceeds."
                    },
                    {
                        "errorCode": "SecurityGroupInstanceLimitExceed",
                        "errorMessage": "Exceeding the allowed amount of instances of a security group."
                    },
                    {
                        "errorCode": "NodeControllerUnavailable",
                        "errorMessage": "The Node Controller is temporarily unavailable."
                    },
                    {
                        "errorCode": "RegionUnauthorized",
                        "errorMessage": "There is no authority to create instance in the specified region."
                    },
                    {
                        "errorCode": "InvalidSnapshotId.NotDataDiskSnapshot",
                        "errorMessage": "The specified snapshot is system disk snapshot."
                    },
                    {
                        "errorCode": "Forbbiden",
                        "errorMessage": "User not authorized to operate on the specified resource."
                    },
                    {
                        "errorCode": "DeleteWithInstance.Conflict",
                        "errorMessage": "The specified disk is not a portable disk and cannot be set to DeleteWithInstance attribute."
                    },
                    {
                        "errorCode": "InstanceDiskNumLimitExceed",
                        "errorMessage": "The number of specified disk in an instance exceeds."
                    },
                    {
                        "errorCode": "IoOptimized.NotSupported",
                        "errorMessage": "The specified image is not support IoOptimized Instance."
                    },
                    {
                        "errorCode": "InvalidDiskSize.TooSmall",
                        "errorMessage": "Specified disk size is less than the size of snapshot."
                    },
                    {
                        "errorCode": "InvalidDiskCategory.Mismatch",
                        "errorMessage": "The specified disk categories combination is not supported."
                    },
                    {
                        "errorCode": "InvalidDiskCategory.NotSupported",
                        "errorMessage": "The specified disk category is not support the specified instance type."
                    },
                    {
                        "errorCode": "QuotaExceed.BuyImage",
                        "errorMessage": "The specified image is from the image market?You have not bought it or your quota has been exceeded."
                    },
                    {
                        "errorCode": "InvalidResourceId.NotSupported",
                        "errorMessage": "The specified ResourceId does not support tagging."
                    },
                    {
                        "errorCode": "OperationDenied",
                        "errorMessage": "The specified RegionId does not support the creation of the network type ECS instance."
                    },
                    {
                        "errorCode": "OperationDenied.ImageNotValid",
                        "errorMessage": "The specified Image is disabled or is deleted."
                    },
                    {
                        "errorCode": "OperationDenied.SnapshotNotValid",
                        "errorMessage": "The specified snapshot is not allowed to create disk."
                    },
                    {
                        "errorCode": "OperationDenied.SnapshotNotAllowed",
                        "errorMessage": "The specified snapshot is not allowed to create disk."
                    },
                    {
                        "errorCode": "OperationDenied.ZoneNotAllowed",
                        "errorMessage": "The creation of Instance to the specified Zone is not allowed."
                    },
                    {
                        "errorCode": "OperationDenied.ZoneSystemCategoryNotMatch",
                        "errorMessage": "The specified Zone or cluster does not offer the specified disk category or the speicified zone and cluster do not match."
                    },
                    {
                        "errorCode": "OperationDenied.ResourceControl",
                        "errorMessage": "The specified region is in resource control, please try later."
                    },
                    {
                        "errorCode": "OperationDenied.NoStock",
                        "errorMessage": "The resource is out of usage."
                    },
                    {
                        "errorCode": "OperationDenied.SnapshotParamsNotValid",
                        "errorMessage": "The capacity of snapshot exceeds the size limit of the specified disk category or the specified category is not authorizied."
                    },
                    {
                        "errorCode": "OperationDenied.DiskTypeNotSupport",
                        "errorMessage": "The type of the disk does not support the operation."
                    },
                    {
                        "errorCode": "InvalidUserData.Forbidden",
                        "errorMessage": "User not authorized to input the parameter \"UserData\", please apply for permission \"UserData\"."
                    },
                    {
                        "errorCode": "Zone.NotOpen",
                        "errorMessage": "The specified zone is not granted to you to buy resources yet."
                    },
                    {
                        "errorCode": "Zone.NotOnSale",
                        "errorMessage": "The resource in the specified zone is no longer available for sale. Please try other regions and zones."
                    },
                    {
                        "errorCode": "InvalidClusterId.NotFound",
                        "errorMessage": "The specified clusterId does not exist."
                    },
                    {
                        "errorCode": "InvalidResourceType.NotSupported",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidInstanceType.ValueNotSupported",
                        "errorMessage": "The specified InstanceType beyond the permitted range."
                    },
                    {
                        "errorCode": "InvalidInstanceType.ZoneNotSupported",
                        "errorMessage": "The specified zone does not support this instancetype."
                    },
                    {
                        "errorCode": "InstanceType.Offline",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "DependencyViolation.WindowsInstance",
                        "errorMessage": "The instance creating is window, cannot use ssh key pair to login."
                    },
                    {
                        "errorCode": "InvalidNetworkType.MismatchRamRole",
                        "errorMessage": "A RAM role can?t be used for classic instance."
                    },
                    {
                        "errorCode": "InvalidUser.PassRoleForbidden",
                        "errorMessage": "The RAM user does not have the privilege to pass a RAM role."
                    },
                    {
                        "errorCode": "InvalidParam.TrustedSystemMode",
                        "errorMessage": "The specified TrustedSystemMode is invalid."
                    },
                    {
                        "errorCode": "InvalidParam.ConfidentialComputingMode",
                        "errorMessage": "The specified ConfidentialComputingMode is invalid."
                    },
                    {
                        "errorCode": "InvalidInstanceType.NotSupported",
                        "errorMessage": "The specified instance type does not support trusted system."
                    },
                    {
                        "errorCode": "InvalidSecurityOptions.NotSupported",
                        "errorMessage": "SecurityOptions for vTPM and Enclave can not both be set."
                    },
                    {
                        "errorCode": "InvalidImage.NotSupported",
                        "errorMessage": "The specified vTPM instance need UEFI image."
                    },
                    {
                        "errorCode": "Forbidden.RiskControl",
                        "errorMessage": "This operation is forbidden by Aliyun RiskControl system."
                    },
                    {
                        "errorCode": "InvalidInstance.UnPaidOrder",
                        "errorMessage": "The specified Instance has unpaid order."
                    },
                    {
                        "errorCode": "Account.Arrearage",
                        "errorMessage": "Your account has been in arrears."
                    },
                    {
                        "errorCode": "RealNameAuthenticationError",
                        "errorMessage": "Your account has not passed the real-name authentication yet."
                    },
                    {
                        "errorCode": "InvalidPayMethod",
                        "errorMessage": "The specified pay method is not valid."
                    },
                    {
                        "errorCode": "InvalidAccountStatus.NotEnoughBalance",
                        "errorMessage": "Your account does not have enough balance."
                    },
                    {
                        "errorCode": "ImageNotSupportInstanceType",
                        "errorMessage": "The specified image does not support the specified InstanceType."
                    },
                    {
                        "errorCode": "DryRun.InvalidAmount",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "OperationDenied.InvalidNetworkType",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidSpotInterruptionBehavior.ClassicNetworkNotSupport",
                        "errorMessage": "The specified SpotInterruptionBehavior does not support Classic network Instance."
                    },
                    {
                        "errorCode": "InvalidSpotInterruptionBehavior.LocalDiskNotSupport",
                        "errorMessage": "The specified SpotInterruptionBehavior does not support local disk instance."
                    },
                    {
                        "errorCode": "QuotaExceed.PostPaidDisk",
                        "errorMessage": "Living postPaid disks quota exceeded."
                    },
                    {
                        "errorCode": "InvalidParameter.NotMatch",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidVSwitch.DefaultVSwitchNotSupport",
                        "errorMessage": "The specified zone in vpc can't support create default vSwitch."
                    },
                    {
                        "errorCode": "OperationDenied.LocalDiskUnsupported",
                        "errorMessage": "The configuration change is not allowed when the specified instance has local disks mounted."
                    },
                    {
                        "errorCode": "OperationDenied.InconsistentNetwork",
                        "errorMessage": "The specified security group and vswitch are not in the same vpc."
                    },
                    {
                        "errorCode": "DefaultVswitch.Existed",
                        "errorMessage": "The default vswitch for VPC already exists."
                    },
                    {
                        "errorCode": "IncorrectInstanceStatus",
                        "errorMessage": "The current status of the resource does not support this operation."
                    },
                    {
                        "errorCode": "CategoryViolation",
                        "errorMessage": "The specified instance does not support this operation because of its disk category."
                    },
                    {
                        "errorCode": "ResourcesNotInSameZone",
                        "errorMessage": "The specified instance and dedicated host are not in the same zone."
                    },
                    {
                        "errorCode": "InvalidDisk.SystemDiskSize",
                        "errorMessage": "The specified SystemDiskSize beyond the permitted range."
                    },
                    {
                        "errorCode": "InsufficientBalance",
                        "errorMessage": "Your account does not have enough balance."
                    },
                    {
                        "errorCode": "InvalidOperation.NetworkInterface",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "MaxEniIpv6IpsCountExceeded",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidIp.IpRepeated",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidIp.IpAssigned",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidIp.Address",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidOperation.EniCountExceeded",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidOperation.Ipv4CountExceeded",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidOperation.Ipv6CountExceeded",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidOperation.Ipv6NotSupport",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidOperation.Ipv4NotSupport",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidParam.SecondaryIp",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidVSwitch.Ipv6NotTurnOn",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidParam.IpAssign",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidParam.Amount",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidParam.CpuOptionsCore",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidParam.CpuOptionsNuma",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidVSwitchId.IpInvalid",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "Forbidden.RegionId",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "QuotaExceed.DeploymentSetInstanceQuotaFull",
                        "errorMessage": "The instance quota in one deployment set exceeded."
                    },
                    {
                        "errorCode": "InvalidChargeType.ValueNotSupported",
                        "errorMessage": "Deletion protection is only valid for postPaid instance, not for prePaid or spot instance."
                    },
                    {
                        "errorCode": "InvalidRegion.NotSupport",
                        "errorMessage": "The specified region does not support byok."
                    },
                    {
                        "errorCode": "UserNotInTheWhiteList",
                        "errorMessage": "The user is not in byok white list."
                    },
                    {
                        "errorCode": "InvalidParameter.KMSKeyId.CMKNotEnabled",
                        "errorMessage": "The CMK needs to be enabled."
                    },
                    {
                        "errorCode": "InvalidParameter.KMSKeyId.KMSUnauthorized",
                        "errorMessage": "ECS service have no right to access your KMS."
                    },
                    {
                        "errorCode": "SecurityRisk.3DVerification",
                        "errorMessage": "We have detected a security risk with your default credit or debit card. Please proceed with verification via the link in your email."
                    },
                    {
                        "errorCode": "Mayi.InternalError",
                        "errorMessage": "The request processing has failed due to some unknown error."
                    },
                    {
                        "errorCode": "InvalidNetworkType",
                        "errorMessage": "The network type is not support in this region."
                    },
                    {
                        "errorCode": "InvalidAccountStatus",
                        "errorMessage": "Your account status is invalid, please contact customer service."
                    },
                    {
                        "errorCode": "QuotaExceeded.PrivateIpAddress",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "OperationDenied.PerformanceLevelNotMatch",
                        "errorMessage": "The specified DataDisk.n.PerformanceLevel and DataDisk.n.Size do not match."
                    },
                    {
                        "errorCode": "InvalidStorageSetName.Malformed",
                        "errorMessage": "Specified parameter StorageSetName is not valid."
                    },
                    {
                        "errorCode": "InvalidDescription.Malformed",
                        "errorMessage": "Specified parameter Description is not valid."
                    },
                    {
                        "errorCode": "InvalidMaxPartitionNumber.Malformed",
                        "errorMessage": "Specified parameter MaxPartitionNumber is not valid."
                    },
                    {
                        "errorCode": "InvalidParameter.StorageSetPartitionNumber",
                        "errorMessage": "Specified parameter StorageSetPartitionNumber is not valid."
                    },
                    {
                        "errorCode": "InvalidParameter.StorageSetId",
                        "errorMessage": "Specified parameter StorageSetId is not valid."
                    },
                    {
                        "errorCode": "InvalidParameter.StorageSetZoneId",
                        "errorMessage": "Specified parameter StorageSetZoneId is not valid."
                    },
                    {
                        "errorCode": "EnterpriseGroupLimited.MutliGroupType",
                        "errorMessage": "The specified instance can't join multi SecurityGroup types."
                    },
                    {
                        "errorCode": "EnterpriseGroupLimited.InstanceType",
                        "errorMessage": "The specified instance type doesn't support Enterprise SecurityGroup."
                    },
                    {
                        "errorCode": "QuotaExceed.Tags",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "OperationDenied.RegionIdNotSupported",
                        "errorMessage": "The specified region does not support spot duration instance."
                    },
                    {
                        "errorCode": "OperationDenied.FlavorNotSupported",
                        "errorMessage": "Flavor not support spot duration instance."
                    },
                    {
                        "errorCode": "OperationDenied.TimestampNotSupported",
                        "errorMessage": "Timestamp not support spot duration instance."
                    },
                    {
                        "errorCode": "OperationDenied.PaygNotAvailable",
                        "errorMessage": "Pay-as-you-go instance is not available now."
                    },
                    {
                        "errorCode": "OperationDenied.PrepayNotAvailable",
                        "errorMessage": "Prepay instance is not available now."
                    },
                    {
                        "errorCode": "OperationDenied.BidOwnResource",
                        "errorMessage": "Bid user can not own resource."
                    },
                    {
                        "errorCode": "OperationDenied.CloudSSDNotSupported",
                        "errorMessage": "The specified available zone does not offer the cloud_ssd disk, use cloud_essd instead."
                    },
                    {
                        "errorCode": "QuotaExceed.ElasticQuota",
                        "errorMessage": "No additional quota is available for the specified ECS instance type."
                    },
                    {
                        "errorCode": "QuotaExceeded.PostpaidDataDiskCapacity",
                        "errorMessage": "The quota of postpaid data disk capacity exceeds."
                    },
                    {
                        "errorCode": "InvalidImageFamily.MissingAvailableImage",
                        "errorMessage": "There is no available image related to the specified image family."
                    },
                    {
                        "errorCode": "InvalidRegionId.NotSupportEncryptAlgorithm",
                        "errorMessage": "The current region does not support creating encrypted disks with EncryptAlgorithm."
                    },
                    {
                        "errorCode": "InvalidOperation.ResourceManagedByCloudProduct",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidManagedPrivateSpaceId.DedicatedHostIdConflict",
                        "errorMessage": "ManagedPrivateSpaceId and DedicatedHostId cannot be specified at the same time."
                    },
                    {
                        "errorCode": "InvalidManagedPrivateSpaceId.TenancyConflict",
                        "errorMessage": "ManagedPrivateSpaceId and Tenancy cannot be specified at the same time."
                    },
                    {
                        "errorCode": "InvalidParameter.InvalidEniQueueNumber",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidOperation.MaxEniQueueNumberExceeded",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidOperation.ExceedInstanceTypeQueueNumber",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidIspType.ValueNotSupported",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "UnsupportedIspChargeType",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "UnsupportedIspClassicNetwork",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidIspBandwidthOut",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "UnsupportedIspNetworkChargeType",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidIspUID",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "UnsupportedIspRegion",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "Forbidden.OnlySupportEnterpriseGroup",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "HibernationConfigured.InstanceOperationForbidden",
                        "errorMessage": "The operation is not permitted due to limit of the hibernation configured instance."
                    },
                    {
                        "errorCode": "InstanceDiskLimitExceeded",
                        "errorMessage": "The amount of the disk on instance reach its limits."
                    },
                    {
                        "errorCode": "InvalidInstanceType.NotSupportDiskCategory",
                        "errorMessage": "The instanceType of the specified instance does not support this disk category."
                    },
                    {
                        "errorCode": "InvalidOperation.ConfidentialComputingModeInInviteOnlyTesting",
                        "errorMessage": "The specified confidential computing mode is in invite only testing: %s."
                    },
                    {
                        "errorCode": "InvalidOperation.InvalidNetworkInterfaceId",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidOperation.RegionNotSupportNetworkInterfaceId",
                        "errorMessage": "The specific region does not support network interface id."
                    },
                    {
                        "errorCode": "InvalidEniId.NotFound",
                        "errorMessage": "%s"
                    }
                ],
                "404": [
                    {
                        "errorCode": "InvalidStorageClusterId.NotExist",
                        "errorMessage": "The specified StorageClusterId does not exist in current region."
                    },
                    {
                        "errorCode": "InvalidRegionId.NotFound",
                        "errorMessage": "The RegionId provided does not exist in our records."
                    },
                    {
                        "errorCode": "InvalidZoneId.NotFound",
                        "errorMessage": "The ZoneId provided does not exist in our records."
                    },
                    {
                        "errorCode": "InvalidSecurityGroupId",
                        "errorMessage": "The specified SecurityGroupId is invalid or does not exist."
                    },
                    {
                        "errorCode": "InvalidSecurityGroupId.NotFound",
                        "errorMessage": "The SecurityGroupId provided does not exist in our records."
                    },
                    {
                        "errorCode": "InvalidDataDiskSnapshotId.NotFound",
                        "errorMessage": "The specified parameter \"DataDisk.n.SnapshotId\" is not valid."
                    },
                    {
                        "errorCode": "InvalidClusterId.NotFound",
                        "errorMessage": "The ClusterId provided does not exist in our records."
                    },
                    {
                        "errorCode": "InvalidVSwitchId.NotFound",
                        "errorMessage": "Specified virtual switch does not exist."
                    },
                    {
                        "errorCode": "InvalidImageId.NotFound",
                        "errorMessage": "The specified ImageId does not exist."
                    },
                    {
                        "errorCode": "IoOptimized.NotSupported",
                        "errorMessage": "The specified instancetype is not support IoOptimized instance."
                    },
                    {
                        "errorCode": "InvalidInstanceChargeType.NotFound",
                        "errorMessage": "The InstanceChargeType does not exist in our records."
                    },
                    {
                        "errorCode": "DependencyViolation.IoOptimized",
                        "errorMessage": "The specified instancetype must be IoOptimized instance."
                    },
                    {
                        "errorCode": "PaymentMethodNotFound",
                        "errorMessage": "No payment method has been registered on the account."
                    },
                    {
                        "errorCode": "HOSTNAME_ILLEGAL",
                        "errorMessage": "The specified parameter HostName is not valid."
                    },
                    {
                        "errorCode": "InvalidSystemDiskSize.LessThanImageSize",
                        "errorMessage": "The specified parameter SystemDisk.Size is less than the image size."
                    },
                    {
                        "errorCode": "InvalidSystemDiskSize.LessThanMinSize",
                        "errorMessage": "The specified parameter SystemDisk.Size is less than the min size."
                    },
                    {
                        "errorCode": "InvalidSystemDiskSize.MoreThanMaxSize",
                        "errorMessage": "The specified parameter SystemDisk.Size is more than the max size."
                    },
                    {
                        "errorCode": "OperationDenied.ImageNotValid",
                        "errorMessage": "The specified Image is disabled or is deleted."
                    },
                    {
                        "errorCode": "OperationDenied.CreatingConflict",
                        "errorMessage": "Another Instance has been creating."
                    },
                    {
                        "errorCode": "InvalidKeyPairName.NotFound",
                        "errorMessage": "The specified parameter KeyPairName does not exist in our records."
                    },
                    {
                        "errorCode": "InvalidResourceGroup.NotFound",
                        "errorMessage": "The ResourceGroup provided does not exist in our records."
                    },
                    {
                        "errorCode": "InvalidRamRole.NotFound",
                        "errorMessage": "The specified parameter \"RAMRoleName\" does not exist."
                    },
                    {
                        "errorCode": "InvalidLaunchTemplate.NotFound",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidLaunchTemplateVersion.NotFound",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidVSwitchId.NotExist",
                        "errorMessage": "%s"
                    },
                    {
                        "errorCode": "InvalidMarketImage.NotFound",
                        "errorMessage": "The specified marketplace image does not exist, please change the imageId and try again."
                    },
                    {
                        "errorCode": "DeploymentSet.NotFound",
                        "errorMessage": "The specified deployment set does not exist."
                    },
                    {
                        "errorCode": "InvalidParameter.DeploymentSetGroupNo",
                        "errorMessage": "Parameter DeploymentSetGroupNo is invalid."
                    },
                    {
                        "errorCode": "InvalidParameter.KMSKeyId.NotFound",
                        "errorMessage": "The specified KMSKeyId does not exist."
                    },
                    {
                        "errorCode": "InvalidDiskIds.NotPortable",
                        "errorMessage": "The specified DiskId is not portable."
                    },
                    {
                        "errorCode": "InvalidAutoSnapshotPolicyId.NotFound",
                        "errorMessage": "Specified parameter AutoSnapshotPolicyId not found."
                    }
                ],
                "429": [
                    {
                        "errorCode": "Throttling.Resource",
                        "errorMessage": "The request throttle by resource operation."
                    }
                ],
                "500": [
                    {
                        "errorCode": "InternalError",
                        "errorMessage": "The request processing has failed due to some unknown error."
                    },
                    {
                        "errorCode": "InvalidParameter.DataEncryptedKeyCreateFailed",
                        "errorMessage": "Create kms data encrypted key fail. If you need further assistance, you can contact the KMS Technical Support."
                    }
                ]
            },
            "extraInfo": "\n",
            "methods": [
                "post",
                "get"
            ],
            "operationType": "readAndWrite",
            "requestParamsDescription": " ",
            "responseDemo": "[{\"type\":\"json\",\"example\":\"{\\n  \\\"RequestId\\\": \\\"473469C7-AA6F-4DC5-B3DB-A3DC0DE3****\\\",\\n  \\\"OrderId\\\": \\\"123456****\\\",\\n  \\\"TradePrice\\\": 0.165,\\n  \\\"InstanceIdSets\\\": {\\n    \\\"InstanceIdSet\\\": [\\n      \\\"[\\\\\\\"i-bp67acfmxazb4pd2****\\\\\\\", \\\\\\\"i-bp1i43l28m7u48p1****\\\\\\\", \\\\\\\"i-bp12yqg7jdyxl11f****\\\\\\\"]\\\"\\n    ]\\n  }\\n}\",\"errorExample\":\"\"},{\"type\":\"xml\",\"example\":\"<RunInstancesResponse>\\n    <RequestId>473469C7-AA6F-4DC5-B3DB-A3DC0DE3****</RequestId>\\n    <OrderId>123456****</OrderId>\\n    <TradePrice>0.165</TradePrice>\\n    <InstanceIdSets>[\\\"i-bp67acfmxazb4pd2****\\\", \\\"i-bp1i43l28m7u48p1****\\\", \\\"i-bp12yqg7jdyxl11f****\\\"]</InstanceIdSets>\\n</RunInstancesResponse>\",\"errorExample\":\"\"}]",
            "responseParamsDescription": " ",
            "schemes": [
                "http",
                "https"
            ],
            "security": [
                {
                    "AK": []
                }
            ],
            "summary": "创建一台或多台按量付费或者包年包月ECS实例。",
            "systemTags": {
                "operationType": "create"
            },
            "title": "创建一台或多台按量付费或者包年包月ECS实例"
        },
        "externalDocs": {
            "description": "去调试",
            "url": "https://api.aliyun.com/api/Ecs/2014-05-26/RunInstances"
        },
        "method": "post",
        "name": "RunInstances",
        "parameters": [
            {
                "in": "query",
                "name": "RegionId",
                "required": true,
                "schema": {
                    "description": "实例所属的地域ID。您可以调用[DescribeRegions](https://help.aliyun.com/document_detail/25609.html)查看最新的阿里云地域列表。",
                    "example": "cn-hangzhou",
                    "required": true,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "ImageId",
                "required": false,
                "schema": {
                    "description": "镜像ID，启动实例时选择的镜像资源。您可以通过[DescribeImages](https://help.aliyun.com/document_detail/25534.html)查询您可以使用的镜像资源。如果您不指定`LaunchTemplateId`或`LaunchTemplateName`以确定启动模板，也不通过指定`ImageFamily`选用镜像族系最新可用镜像，则`ImageId`为必选参数。",
                    "example": "aliyun_2_1903_x64_20G_alibase_20200324.vhd",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "ImageFamily",
                "required": false,
                "schema": {
                    "description": "镜像族系名称，通过设置该参数来获取当前镜像族系内最新可用镜像来创建实例。\n- 设置了参数`ImageId`，则不能设置该参数。\n- 未设置参数`ImageId`，但指定的`LaunchTemplateId`或`LaunchTemplateName`对应的启动模板设置了`ImageId`，则不能设置该参数。\n- 未设置`ImageId`，且指定的`LaunchTemplateId`或`LaunchTemplateName`对应的启动模板未设置`ImageId`，则可以设置该参数。\n- 未设置`ImageId`，且未设置`LaunchTemplateId`、`LaunchTemplateName`参数，则可以设置该参数。\n> 阿里云官方镜像关联的镜像族系信息请参见[公共镜像概述](https://help.aliyun.com/document_detail/108393.html)。",
                    "example": "hangzhou-daily-update",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "InstanceType",
                "required": false,
                "schema": {
                    "description": "实例的资源规格。如果您不指定`LaunchTemplateId`或`LaunchTemplateName`以确定启动模板，`InstanceType`为必选参数。  \n\n- 产品选型：参见[实例规格族](https://help.aliyun.com/document_detail/25378.html)或调用[DescribeInstanceTypes](https://help.aliyun.com/document_detail/25620.html)查看目标实例规格的性能数据，或者参见[选型配置](https://help.aliyun.com/document_detail/58291.html)了解如何选择实例规格。\n- 查询库存：调用[DescribeAvailableResource](https://help.aliyun.com/document_detail/66186.html)查看指定地域或者可用区内的资源供给情况。",
                    "example": "ecs.g6.large",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "SecurityGroupId",
                "required": false,
                "schema": {
                    "description": "新创建实例所属于的安全组ID。同一个安全组内的实例之间可以互相访问，一个安全组能容纳的实例数量视安全组类型而定，具体请参见[使用限制](https://help.aliyun.com/document_detail/25412.html#SecurityGroupQuota)的安全组章节。\n\n> `SecurityGroupId`决定了实例的网络类型，例如，如果设置的安全组的网络类型为专有网络VPC，实例则为VPC类型，并同时需要指定参数`VSwitchId`。\n\n如果您不设置`LaunchTemplateId`或`LaunchTemplateName`以确定实例启动模板，则安全组ID为必选参数。您需要注意：\n\n- 您可以通过`SecurityGroupId`设置一个安全组，也可以通过`SecurityGroupIds.N`设置一个或多个安全组，但不支持同时设置`SecurityGroupId`和`SecurityGroupIds.N`。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则不能设置`SecurityGroupId`或`SecurityGroupIds.N`，只能设置`NetworkInterface.N.SecurityGroupId`或`NetworkInterface.N.SecurityGroupIds.N`。",
                    "example": "sg-bp15ed6xe1yxeycg7****",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "VSwitchId",
                "required": false,
                "schema": {
                    "description": "虚拟交换机ID。如果您创建的是VPC类型ECS实例，必须指定虚拟交换机ID，且安全组和虚拟交换机在同一个专有网络VPC中。您可以调用[DescribeVSwitches](https://help.aliyun.com/document_detail/35748.html)查询已创建的交换机的相关信息。\n\n您需要注意：\n\n- 如果您设置了`VSwitchId`参数，则设置的`ZoneId`参数必须和交换机所在的可用区保持一致。您也可以不设置`ZoneId`参数，系统将自动选择指定交换机所在的可用区。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则不能设置`VSwitchId`，只能设置`NetworkInterface.N.VSwitchId`。",
                    "example": "vsw-bp1s5fnvk4gn2tws0****",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "InstanceName",
                "required": false,
                "schema": {
                    "description": "实例名称。长度为2~128个字符，必须以大小写字母或中文开头，不能以`http://`和`https://`开头。可以包含中文、英文、数字、半角冒号（:）、下划线（_）、半角句号（.）或者短划线（-）。默认值为实例的`InstanceId`。\n\n创建多台ECS实例时，您可以批量设置有序的实例名称。具体操作，请参见[批量设置有序的实例名称或主机名称](https://help.aliyun.com/document_detail/196048.html)。",
                    "example": "k8s-node-[1,4]-alibabacloud",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "Description",
                "required": false,
                "schema": {
                    "description": "实例的描述。长度为2~256个英文或中文字符，不能以`http://`和`https://`开头。",
                    "example": "Instance_Description",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "InternetMaxBandwidthIn",
                "required": false,
                "schema": {
                    "description": "公网入带宽最大值，单位为Mbit/s。取值范围：\n\n- 当所购公网出带宽小于等于10 Mbit/s时：1~10，默认为10。\n- 当所购公网出带宽大于10 Mbit/s时：1~`InternetMaxBandwidthOut`的取值，默认为`InternetMaxBandwidthOut`的取值。",
                    "example": "10",
                    "format": "int32",
                    "required": false,
                    "type": "integer"
                }
            },
            {
                "in": "query",
                "name": "InternetMaxBandwidthOut",
                "required": false,
                "schema": {
                    "description": "公网出带宽最大值，单位为Mbit/s。取值范围：0~100。\n\n默认值：0。",
                    "example": "10",
                    "format": "int32",
                    "required": false,
                    "type": "integer"
                }
            },
            {
                "in": "query",
                "name": "HostName",
                "required": false,
                "schema": {
                    "description": "实例主机名称。限制说明如下：\n\n- 半角句号（.）和短划线（-）不能作为首尾字符，更不能连续使用。\n- Windows实例：字符长度为2~15，不支持半角句号（.），不能全是数字。允许包含大小写英文字母、数字和短划线（-）。\n- 其他类型实例（Linux等）：\n    - 字符长度为2~64，支持多个半角句号（.），点之间为一段，每段允许包含大小写英文字母、数字和短划线（-）。\n    - 支持通过占位符`${instance_id}`将实例ID写入`HostName`参数。例如：`HostName=k8s-${instance_id}`，并且创建的ECS实例ID为`i-123abc****`，则该实例的主机名为`k8s-i-123abc****`。\n\n创建多台ECS实例时，您可以：\n\n- 批量设置有序的主机名。具体操作，请参见[批量设置有序的实例名称或主机名称](https://help.aliyun.com/document_detail/196048.html)。\n- 通过`HostNames.N`参数，为多台实例分别设置主机名。需要注意`HostName`参数和`HostNames.N`参数不能同时设置。",
                    "example": "k8s-node-[1,4]-ecshost",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "UniqueSuffix",
                "required": false,
                "schema": {
                    "description": "当创建多台实例时，是否为`HostName`和`InstanceName`自动添加有序后缀。有序后缀从001开始递增，最大不能超过999。取值范围：\n- true：添加。\n- false：不添加。\n\n默认值：false。\n\n当`HostName`或`InstanceName`按照指定排序格式设置，未设置命名后缀`name_suffix`，即命名格式为`name_prefix[begin_number,bits]`时，`UniqueSuffix`不生效，名称仅按照指定顺序排序。\n\n更多信息，请参见[批量设置有序的实例名称或主机名称](https://help.aliyun.com/document_detail/196048.html)。",
                    "example": "true",
                    "required": false,
                    "type": "boolean"
                }
            },
            {
                "in": "query",
                "name": "Password",
                "required": false,
                "schema": {
                    "description": "实例的密码。长度为8至30个字符，必须同时包含大小写英文字母、数字和特殊符号中的三类字符。特殊符号可以是：\n\n```\n()`~!@#$%^&*-_+=|{}[]:;'<>,.?/\n```\n\n其中，Windows实例不能以正斜线（/）为密码首字符。\n\n> 如果传入`Password`参数，建议您使用HTTPS协议发送请求，避免密码泄露。",
                    "example": "EcsV587!",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "PasswordInherit",
                "required": false,
                "schema": {
                    "description": "是否使用镜像预设的密码。取值范围：\n\n- true：使用。\n- false：不使用。\n\n默认值：false。\n\n> 使用该参数时，Password参数必须为空，同时您需要确保使用的镜像已经设置了密码。",
                    "example": "false",
                    "required": false,
                    "type": "boolean"
                }
            },
            {
                "in": "query",
                "name": "ZoneId",
                "required": false,
                "schema": {
                    "description": "实例所属的可用区ID，您可以调用[DescribeZones](https://help.aliyun.com/document_detail/25610.html)获取可用区列表。\n\n> 如果您指定了`VSwitchId`参数，则指定的`ZoneId`参数必须和交换机所在的可用区保持一致。您也可以不指定`ZoneId`参数，系统将自动选择指定的交换机所在的可用区。\n\n默认值：系统自动选择。",
                    "example": "cn-hangzhou-g",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "InternetChargeType",
                "required": false,
                "schema": {
                    "description": "网络计费类型。取值范围：\n\n- PayByBandwidth：按固定带宽计费。\n- PayByTraffic：按使用流量计费。\n\n默认值：PayByTraffic。\n\n> **按使用流量计费**模式下的出入带宽峰值都是带宽上限，不作为业务承诺指标。当出现资源争抢时，带宽峰值可能会受到限制。如果您的业务需要有带宽的保障，请使用**按固定带宽计费**模式。\n",
                    "example": "PayByTraffic",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "SystemDisk.Size",
                "required": false,
                "schema": {
                    "description": "系统盘大小，单位为GiB。取值范围：\n\n- 普通云盘：20~500\n\n- 其他类型云盘：20~2048\n\n该参数的取值必须大于或者等于max{20, ImageSize}。\n\n默认值：max{40, 参数ImageId对应的镜像大小}。",
                    "example": "40",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "SystemDisk.Category",
                "required": false,
                "schema": {
                    "description": "系统盘的云盘种类。取值范围：\n\n- cloud_efficiency：高效云盘。\n- cloud_ssd：SSD云盘。\n- cloud_essd：ESSD云盘。\n- cloud：普通云盘。\n- cloud_auto：ESSD AutoPL云盘。\n- cloud_essd_entry：ESSD Entry云盘。\n>仅当`InstanceType`设置为`ecs.u1`或`ecs.e`规格族时，该参数支持`cloud_essd_entry`。\n\n已停售的实例规格且非I/O优化实例默认值为cloud，否则默认值为cloud_efficiency。\n",
                    "example": "cloud_ssd",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "SystemDisk.DiskName",
                "required": false,
                "schema": {
                    "description": "系统盘名称。长度为2~128个英文或中文字符。必须以大小写字母或中文开头，不能以`http://`和`https://`开头。可以包含数字、半角句号（.）、半角冒号（:）、下划线（_）或者短划线（-）。",
                    "example": "cloud_ssdSystem",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "SystemDisk.Description",
                "required": false,
                "schema": {
                    "description": "系统盘的描述。长度为2~256个英文或中文字符，不能以`http://`和`https://`开头。",
                    "example": "SystemDisk_Description",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "SystemDisk.PerformanceLevel",
                "required": false,
                "schema": {
                    "description": "创建ESSD云盘作为系统盘使用时，设置云盘的性能等级。取值范围：\n\n- PL0：单盘最高随机读写IOPS 1万。\n- PL1（默认）：单盘最高随机读写IOPS 5万。\n- PL2：单盘最高随机读写IOPS 10万。\n- PL3：单盘最高随机读写IOPS 100万。\n\n有关如何选择ESSD性能等级，请参见[ESSD云盘](https://help.aliyun.com/document_detail/122389.html)。",
                    "example": "PL0",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "SystemDisk.AutoSnapshotPolicyId",
                "required": false,
                "schema": {
                    "description": "系统盘采用的自动快照策略ID。",
                    "example": "sp-bp67acfmxazb4p****",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "IoOptimized",
                "required": false,
                "schema": {
                    "description": "是否为I/O优化实例。[已停售的实例规格](https://help.aliyun.com/document_detail/55263.html)实例默认值是none，其他实例规格默认值是optimized。取值范围：\n\n- none：非I/O优化。\n- optimized：I/O优化。",
                    "example": "optimized",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "UserData",
                "required": false,
                "schema": {
                    "description": "实例自定义数据。需要以Base64方式编码，原始数据最多为16 KB。\n\n> 若实例满足[实例自定义数据](https://help.aliyun.com/document_detail/49121.html)的限制，您可传入UserData信息。因为传输API请求时，不会加密您设置的UserData，建议不要以明文方式传入机密的信息，例如密码和私钥等。如果必须传入，建议加密后，然后以Base64的方式编码后再传入，在实例内部以同样的方式反解密。",
                    "example": "ZWNobyBoZWxsbyBlY3Mh",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "KeyPairName",
                "required": false,
                "schema": {
                    "description": "密钥对名称。\n>Windows实例，忽略该参数。默认为空。即使填写了该参数，仍旧只执行`Password`的内容。",
                    "example": "KeyPair_Name",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "RamRoleName",
                "required": false,
                "schema": {
                    "description": "实例RAM角色名称。您可以使用RAM API [ListRoles](https://help.aliyun.com/document_detail/28713.html)查询您已创建的实例RAM角色。",
                    "example": "RAM_Name",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "Amount",
                "required": false,
                "schema": {
                    "default": "1",
                    "description": "指定创建ECS实例的数量。取值范围：1~100。\n\n默认值：1。",
                    "example": "3",
                    "format": "int32",
                    "maximum": "1000",
                    "minimum": "1",
                    "required": false,
                    "type": "integer"
                }
            },
            {
                "in": "query",
                "name": "MinAmount",
                "required": false,
                "schema": {
                    "description": "指定ECS实例最小购买数量。取值范围：1~100。\n\n- 当ECS库存数量小于最小购买数量，会创建失败。\n- 当ECS库存数量大于等于最小购买数量，按照库存数量创建。",
                    "example": "2",
                    "format": "int32",
                    "maximum": "100",
                    "minimum": "1",
                    "required": false,
                    "type": "integer"
                }
            },
            {
                "in": "query",
                "name": "AutoReleaseTime",
                "required": false,
                "schema": {
                    "description": "按量付费实例的自动释放时间。按照[ISO 8601](https://help.aliyun.com/document_detail/25696.html)标准表示，使用UTC+0时间。格式为：`yyyy-MM-ddTHH:mm:ssZ`。\n\n- 如果秒（`ss`）取值不是`00`，则自动取为当前分钟（`mm`）开始时。\n\n- 最短释放时间为当前时间半小时之后。\n\n- 最长释放时间不能超过当前时间三年。",
                    "example": "2018-01-01T12:05:00Z",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "SpotStrategy",
                "required": false,
                "schema": {
                    "description": "按量付费实例的竞价策略。当参数`InstanceChargeType`取值为`PostPaid`时生效。取值范围：\n\n- NoSpot：正常按量付费实例。\n- SpotWithPriceLimit：设置上限价格的抢占式实例。\n- SpotAsPriceGo：系统自动出价，跟随当前市场实际价格。\n\n默认值：NoSpot。",
                    "example": "NoSpot",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "SpotDuration",
                "required": false,
                "schema": {
                    "description": "抢占式实例的保留时长，单位为小时。 默认值：1。取值范围：\n- 1：创建后阿里云会保证实例运行1小时不会被自动释放；超过1小时后，系统会自动比较出价与市场价格、检查资源库存，来决定实例的持有和回收。\n- 0：创建后，阿里云不保证实例运行1小时，系统会自动比较出价与市场价格、检查资源库存，来决定实例的持有和回收。\n\n实例回收前5分钟阿里云会通过ECS系统事件向您发送通知。抢占式实例按秒计费，建议您结合具体任务执行耗时来选择合适的保留时长。",
                    "example": "1",
                    "format": "int32",
                    "maximum": "6",
                    "minimum": "0",
                    "required": false,
                    "type": "integer"
                }
            },
            {
                "in": "query",
                "name": "SpotPriceLimit",
                "required": false,
                "schema": {
                    "description": "设置实例的每小时最高价格。支持最大3位小数，参数`SpotStrategy`取值为`SpotWithPriceLimit`时生效。",
                    "example": "0.97",
                    "format": "float",
                    "maximum": "999999",
                    "minimum": "0",
                    "required": false,
                    "type": "number"
                }
            },
            {
                "in": "query",
                "name": "SpotInterruptionBehavior",
                "required": false,
                "schema": {
                    "description": "抢占实例中断模式。目前仅支持Terminate（默认）直接释放实例。",
                    "example": "Terminate",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "SecurityEnhancementStrategy",
                "required": false,
                "schema": {
                    "description": "是否开启安全加固。取值范围：\n\n- Active：启用安全加固，只对公共镜像生效。\n- Deactive：不启用安全加固，对所有镜像类型生效。",
                    "example": "Active",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "ClientToken",
                "required": false,
                "schema": {
                    "description": "保证请求幂等性。从您的客户端生成一个参数值，确保不同请求间该参数值唯一。**ClientToken**只支持ASCII字符，且不能超过64个字符。更多信息，请参见[如何保证幂等性](https://help.aliyun.com/document_detail/25693.html)。",
                    "example": "123e4567-e89b-12d3-a456-426655440000",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "HpcClusterId",
                "required": false,
                "schema": {
                    "description": "实例所属的HPC集群ID。 \n\n创建SCC实例时，该参数为必选参数。您可以参考[CreateHpcCluster](https://help.aliyun.com/document_detail/109138.html)创建HPC集群。\n",
                    "example": "hpc-bp67acfmxazb4p****",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "DryRun",
                "required": false,
                "schema": {
                    "description": "是否只预检此次请求。取值范围：\n\n-  true：发送检查请求，不会创建实例。检查项包括是否填写了必需参数、请求格式、业务限制和ECS库存。如果检查不通过，则返回对应错误。如果检查通过，则返回错误码`DryRunOperation`。\n-  false（默认）：发送正常请求，通过检查后直接创建实例。",
                    "example": "false",
                    "required": false,
                    "type": "boolean"
                }
            },
            {
                "in": "query",
                "name": "DedicatedHostId",
                "required": false,
                "schema": {
                    "description": "是否在专有宿主机上创建ECS实例。由于专有宿主机不支持创建抢占式实例，指定`DedicatedHostId`参数后，会自动忽略请求中的`SpotStrategy`和`SpotPriceLimit`设置。\n\n您可以通过[DescribeDedicatedHosts](https://help.aliyun.com/document_detail/134242.html)查询专有宿主机ID列表。\n",
                    "example": "dh-bp67acfmxazb4p****",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "LaunchTemplateId",
                "required": false,
                "schema": {
                    "description": "启动模板ID。更多信息，请调用[DescribeLaunchTemplates](https://help.aliyun.com/document_detail/73759.html)。\n\n使用启动模板创建实例时，您必须指定`LaunchTemplateId`或`LaunchTemplateName`确定启动模板。",
                    "example": "lt-bp1apo0bbbkuy0rj****",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "LaunchTemplateName",
                "required": false,
                "schema": {
                    "description": "启动模板名称。\n\n使用启动模板创建实例时，您必须指定`LaunchTemplateId`或`LaunchTemplateName`确定启动模板。",
                    "example": "LaunchTemplate_Name",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "LaunchTemplateVersion",
                "required": false,
                "schema": {
                    "description": "启动模板版本。如果您指定了`LaunchTemplateId`或`LaunchTemplateName`而不指定启动模板版本号，则采用默认版本。 ",
                    "example": "3",
                    "format": "int64",
                    "required": false,
                    "type": "integer"
                }
            },
            {
                "in": "query",
                "name": "ResourceGroupId",
                "required": false,
                "schema": {
                    "description": "实例所在的企业资源组ID。",
                    "example": "rg-bp67acfmxazb4p****",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "Period",
                "required": false,
                "schema": {
                    "description": "购买资源的时长，单位由`PeriodUnit`指定。当参数`InstanceChargeType`取值为`PrePaid`时才生效且为必选值。一旦指定了`DedicatedHostId`，则取值范围不能超过专有宿主机的订阅时长。取值范围：\n\n- PeriodUnit=Week时，Period取值：1、2、3、4。\n- PeriodUnit=Month时，Period取值：1、2、3、4、5、6、7、8、9、12、24、36、48、60。",
                    "example": "1",
                    "format": "int32",
                    "required": false,
                    "type": "integer"
                }
            },
            {
                "in": "query",
                "name": "PeriodUnit",
                "required": false,
                "schema": {
                    "description": "包年包月计费方式的时长单位。取值范围： \n\n- Week。\n- Month（默认）。\n",
                    "example": "Month",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "AutoRenew",
                "required": false,
                "schema": {
                    "description": "是否要自动续费。当参数`InstanceChargeType`取值`PrePaid`时才生效。取值范围：\n\n- true：自动续费。\n- false：不自动续费。\n\n默认值：false。",
                    "example": "true",
                    "required": false,
                    "type": "boolean"
                }
            },
            {
                "in": "query",
                "name": "AutoRenewPeriod",
                "required": false,
                "schema": {
                    "description": "单次自动续费的续费时长。取值范围： \n         \n- PeriodUnit=Week时：1、2、3。\n- PeriodUnit=Month时：1、2、3、6、12、24、36、48、60。\n\n默认值：1。",
                    "example": "1",
                    "format": "int32",
                    "required": false,
                    "type": "integer"
                }
            },
            {
                "in": "query",
                "name": "InstanceChargeType",
                "required": false,
                "schema": {
                    "description": "实例的付费方式。取值范围：\n\n-  PrePaid：包年包月。\n-  PostPaid：按量付费。\n\n默认值：PostPaid。\n\n选择包年包月时，您必须确认自己的账号支持余额支付或者信用支付，否则将返回`InvalidPayMethod`的错误提示。",
                    "example": "PrePaid",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "DeploymentSetId",
                "required": false,
                "schema": {
                    "description": "部署集ID。",
                    "example": "ds-bp1brhwhoqinyjd6****",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "DeploymentSetGroupNo",
                "required": false,
                "schema": {
                    "description": "如果您设置的部署集对应的策略为部署集组高可用策略（AvailabilityGroup），可以通过该参数指定实例在部署集中的分组号。取值范围：1~7。",
                    "example": "1",
                    "format": "int32",
                    "required": false,
                    "type": "integer"
                }
            },
            {
                "in": "query",
                "name": "PrivateIpAddress",
                "required": false,
                "schema": {
                    "description": "实例私网IP地址。专有网络VPC类型ECS实例设置私网IP地址时，必须从虚拟交换机（`VSwitchId`）的空闲网段中选择。\n\n您需要注意：\n\n- 设置`PrivateIpAddress`后：\n    - 如果`Amount`参数取值为1，则表示为创建的一台ECS实例分配私网IP地址。\n    - 如果`Amount`参数取值大于1，则表示在批量创建ECS实例时，以指定的私网IP地址为起始地址，依次为多台ECS实例分配连续的私网IP地址，但需要注意，此时不支持再为实例绑定辅助网卡（即不支持再设置`NetworkInterface.N.*`这类参数）。\n\n-  如果`NetworkInterface.N.InstanceType`取值为`Primary`，则不能设置`PrivateIpAddress`，只能设置`NetworkInterface.N.PrimaryIpAddress`。",
                    "example": "10.1.**.**",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "CreditSpecification",
                "required": false,
                "schema": {
                    "description": "设置突发性能实例的运行模式。取值范围：\n\n- Standard：标准模式，实例性能请参见[什么是突发性能实例](https://help.aliyun.com/document_detail/59977.html)下的性能约束模式章节。\n- Unlimited：无性能约束模式，实例性能请参见[什么是突发性能实例](https://help.aliyun.com/document_detail/59977.html)下的无性能约束模式章节。",
                    "example": "Standard",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "Ipv6AddressCount",
                "required": false,
                "schema": {
                    "description": "为主网卡指定随机生成的IPv6地址数量。取值范围：1~10。\n         \n您需要注意：\n\n- 您不能同时设置`Ipv6Address.N`和`Ipv6AddressCount`。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则不能设置`Ipv6Address.N`或`Ipv6AddressCount`，只能设置`NetworkInterface.N.Ipv6Address.N`或`NetworkInterface.N.Ipv6AddressCount`。",
                    "example": "1",
                    "format": "int32",
                    "required": false,
                    "type": "integer"
                }
            },
            {
                "in": "query",
                "name": "NetworkInterfaceQueueNumber",
                "required": false,
                "schema": {
                    "description": "主网卡队列数。您需要注意：\n\n- 不能超过实例规格允许的单块网卡最大队列数。\n\n- 实例的所有网卡累加队列数不能超过实例规格允许的队列数总配额。实例规格的单块网卡最大队列数和总配额可以通过[DescribeInstanceTypes](https://help.aliyun.com/document_detail/25620.html)接口查询`MaximumQueueNumberPerEni`、`TotalEniQueueQuantity`字段。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则不能设置`NetworkInterfaceQueueNumber`，只能设置`NetworkInterface.N.QueueNumber`。",
                    "example": "8",
                    "format": "int32",
                    "minimum": "1",
                    "required": false,
                    "type": "integer"
                }
            },
            {
                "in": "query",
                "name": "DeletionProtection",
                "required": false,
                "schema": {
                    "description": "实例释放保护属性，指定是否支持通过控制台或API（[DeleteInstance](https://help.aliyun.com/document_detail/25507.html)）释放实例。取值范围： \n\n-  true：开启实例释放保护。\n-  false：关闭实例释放保护。\n\n默认值：false。\n\n> 该属性仅适用于按量付费实例，且只能限制手动释放操作，对系统释放操作不生效。",
                    "example": "false",
                    "required": false,
                    "type": "boolean"
                }
            },
            {
                "in": "query",
                "name": "HibernationOptions.Configured",
                "required": false,
                "schema": {
                    "description": ">该参数正在邀测中，暂未开放使用。",
                    "example": "false",
                    "required": false,
                    "type": "boolean"
                }
            },
            {
                "in": "query",
                "name": "Affinity",
                "required": false,
                "schema": {
                    "description": "专有宿主机实例是否与专有宿主机关联。取值范围：\n\n- default：实例不与专有宿主机关联。已启用节省停机模式的实例，停机后再次启动时，若原专有宿主机可用资源不足，则实例被放置在自动部署资源池的其它专有宿主机上。\n\n- host：实例与专有宿主机关联。已启用节省停机模式的实例，停机后再次启动时，仍放置在原专有宿主机上。若原专有宿主机可用资源不足，则实例重启失败。\n\n默认值：default。",
                    "example": "default",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "Tenancy",
                "required": false,
                "schema": {
                    "description": "是否在专有宿主机上创建实例。取值范围：\n\n- default：创建非专有宿主机实例。\n\n- host：创建专有宿主机实例。若您不指定`DedicatedHostId`，则由阿里云自动选择专有宿主机放置实例。\n\n默认值：default。",
                    "example": "default",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "StorageSetId",
                "required": false,
                "schema": {
                    "description": "存储集ID。",
                    "example": "ss-bp67acfmxazb4p****",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "StorageSetPartitionNumber",
                "required": false,
                "schema": {
                    "description": "存储集中的最大分区数量。取值范围：大于等于2。",
                    "example": "2",
                    "format": "int32",
                    "minimum": "1",
                    "required": false,
                    "type": "integer"
                }
            },
            {
                "in": "query",
                "name": "CpuOptions.Core",
                "required": false,
                "schema": {
                    "description": "CPU核心数。该参数不支持自定义设置，只能采用默认值。\n\n默认值：请参见[自定义CPU选项](https://help.aliyun.com/document_detail/145895.html)。",
                    "example": "2",
                    "format": "int32",
                    "required": false,
                    "type": "integer"
                }
            },
            {
                "in": "query",
                "name": "CpuOptions.ThreadsPerCore",
                "required": false,
                "schema": {
                    "description": "CPU线程数。ECS实例的vCPU数=`CpuOptions.Core`取值*`CpuOptions.ThreadsPerCore`取值。\n\n- `CpuOptions.ThreadsPerCore=1`表示关闭CPU超线程。\n\n- 仅部分实例规格支持设置CPU线程数。\n\n取值范围和默认值：请参见[自定义CPU选项](https://help.aliyun.com/document_detail/145895.html)。",
                    "example": "2",
                    "format": "int32",
                    "required": false,
                    "type": "integer"
                }
            },
            {
                "in": "query",
                "name": "CpuOptions.Numa",
                "required": false,
                "schema": {
                    "description": "该参数已弃用。",
                    "example": "1",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "CpuOptions.TopologyType",
                "required": false,
                "schema": {
                    "description": "实例的Cpu拓扑类型。取值范围：\n\n- ContinuousCoreToHTMapping：当选择`ContinuousCoreToHTMapping`时，实例的Cpu拓扑中，实例的同一个Core的HT是连续的。\n- DiscreteCoreToHTMapping：当选择`DiscreteCoreToHTMapping`时，实例的同一个Core的HT是离散的。\n\n默认值：无。\n\n>仅部分实例规格族支持使用本参数，具体支持实例规格族请参见[查看和修改CPU拓扑结构](https://help.aliyun.com/document_detail/2636059.html)。",
                    "example": "DiscreteCoreToHTMapping",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "SecurityOptions.TrustedSystemMode",
                "required": false,
                "schema": {
                    "description": "可信系统模式。取值：vTPM。\n\n目前，可信系统模式支持的实例规格族：\n- g7、c7、r7。\n- 安全增强型（g7t、c7t、r7t）。\n\n当您创建以上实例规格族的ECS实例时，需要设置该参数。具体说明如下：\n\n- 如果您使用阿里云可信系统，请将该参数值设置为vTPM，在实例启动时即可通过阿里云可信系统完成可信校验。\n- 如果您不使用阿里云可信系统，可以不设置该参数值，但您需要注意，如果您所创建的ECS实例使用了Enclave机密计算模式（`SecurityOptions.ConfidentialComputingMode=Enclave`），则该ECS实例也会启用可信系统。\n- 通过OpenAPI创建可信系统的ECS实例时，只能调用`RunInstances`实现，`CreateInstance`目前不支持设置`SecurityOptions.TrustedSystemMode`参数。\n>如果您在创建实例的时候指定其为可信实例，那么当您更换系统盘时只能使用支持可信系统的镜像。\n\n关于可信系统的更多信息，请参见[安全增强型实例可信功能概述](https://help.aliyun.com/document_detail/201394.html)。",
                    "example": "vTPM",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "SecurityOptions.ConfidentialComputingMode",
                "required": false,
                "schema": {
                    "description": "机密计算模式。取值：Enclave。\n\n该参数取值为Enclave时，表示ECS实例使用Enclave构建机密计算环境。目前仅实例规格族c7、g7、r7，支持调用`RunInstances`时指定该参数使用Enclave机密计算。您需要注意：\n\n- 机密计算功能正在邀测中。\n\n- 通过OpenAPI创建Enclave机密计算的ECS实例时，只能调用`RunInstances`实现，`CreateInstance`目前不支持设置`SecurityOptions.ConfidentialComputingMode`参数。\n\n- Enclave机密计算依托可信系统（vTPM）实现，当您指定ECS实例使用Enclave构建机密计算环境时，该实例同时也会启用可信系统。因此，调用该接口时，如果设置了`SecurityOptions.ConfidentialComputingMode=Enclave`，则无论您是否设置了`SecurityOptions.TrustedSystemMode=vTPM`，最终创建的ECS实例均会启用Enclave机密计算模式以及可信系统。\n\n关于机密计算的更多信息，请参见[使用Enclave构建机密计算环境](https://help.aliyun.com/document_detail/203433.html)。\n",
                    "example": "Enclave",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "HttpEndpoint",
                "required": false,
                "schema": {
                    "description": "是否启用实例元数据的访问通道。取值范围：\n- enabled：启用。\n- disabled：禁用。\n\n默认值：enabled。\n>有关实例元数据的信息，请参见[实例元数据概述](https://help.aliyun.com/document_detail/49122.html)。",
                    "example": "enabled",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "HttpTokens",
                "required": false,
                "schema": {
                    "description": "访问实例元数据时是否强制使用加固模式（IMDSv2）。取值范围：\n- optional：不强制使用。\n- required：强制使用。设置该取值后，普通模式无法访问实例元数据。\n\n默认值：optional。\n>有关访问实例元数据的模式，请参见[实例元数据访问模式](https://help.aliyun.com/document_detail/150575.html)。",
                    "example": "optional",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "HttpPutResponseHopLimit",
                "required": false,
                "schema": {
                    "description": "实例元数据请求所需的HTTP PUT响应跃点限制。取值范围：1~64。\n \n默认值：1。\n",
                    "example": "3",
                    "format": "int32",
                    "required": false,
                    "type": "integer"
                }
            },
            {
                "in": "query",
                "name": "PrivatePoolOptions.MatchCriteria",
                "required": false,
                "schema": {
                    "description": "实例启动的私有池容量选项。弹性保障服务或容量预定服务在生效后会生成私有池容量，供实例启动时选择。取值范围：\n\n- Open：开放模式。将自动匹配开放类型的私有池容量。如果没有符合条件的私有池容量，则使用公共池资源启动。该模式下无需设置`PrivatePoolOptions.Id`参数。\n- Target：指定模式。使用指定的私有池容量启动实例，如果该私有池容量不可用，则实例会启动失败。该模式下必须指定私有池ID，即`PrivatePoolOptions.Id`参数为必填项。\n- None：不使用模式。实例启动将不使用私有池容量。\n\n默认值：None。\n\n以下任一场景，实例启动的私有池容量选项只能取值`None`或不传值。\n- 创建抢占式实例。\n- 创建经典网络类型的ECS实例。\n- 在专有宿主机DDH上创建ECS实例。",
                    "example": "Open",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "PrivatePoolOptions.Id",
                "required": false,
                "schema": {
                    "description": "私有池ID。即弹性保障服务ID或容量预定服务ID。",
                    "example": "eap-bp67acfmxazb4****",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "Isp",
                "required": false,
                "schema": {
                    "description": ">该参数正在邀测中，暂未开放使用。",
                    "example": "null",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "SchedulerOptions.DedicatedHostClusterId",
                "required": false,
                "schema": {
                    "description": "指定ECS实例所属的专有宿主机集群，系统会自动选择该专有宿主机集群中的一台专有宿主机部署ECS实例。\n\n> 仅在`Tenancy`设置为`host`时生效。\n\n在您同时指定了专有宿主机（`DedicatedHostId`）和专有宿主机集群（`SchedulerOptions.DedicatedHostClusterId`）时：\n- 如果专有宿主机属于专有宿主机集群，则优先将ECS实例部署在指定的专有宿主机上。\n- 如果专有宿主机不属于专有宿主机集群，则ECS实例创建失败。\n\n您可以通过[DescribeDedicatedHostClusters](https://help.aliyun.com/document_detail/184145.html)查询专有宿主机集群ID列表。\n\n",
                    "example": "dc-bp12wlf6am0vz9v2****",
                    "required": false,
                    "type": "string"
                }
            },
            {
                "in": "query",
                "name": "SecurityGroupIds",
                "required": false,
                "schema": {
                    "description": "将实例同时加入多个安全组。N的取值范围与实例能够加入安全组配额有关。更多信息，请参见[安全组限制](https://help.aliyun.com/document_detail/101348.html)。\n\n您需要注意：\n\n- 不支持同时设置`SecurityGroupId`和`SecurityGroupIds.N`。\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则不能设置`SecurityGroupId`或`SecurityGroupIds.N`，只能设置`NetworkInterface.N.SecurityGroupId`或`NetworkInterface.N.SecurityGroupIds.N`。",
                    "example": "sg-bp15ed6xe1yxeycg7****",
                    "ext": {
                        "style": "repeatList"
                    },
                    "items": {
                        "description": "将实例同时加入多个安全组。N的取值范围与实例能够加入安全组配额有关。更多信息，请参见[安全组限制](https://help.aliyun.com/document_detail/101348.html)。\n\n您需要注意：\n\n- 不支持同时设置`SecurityGroupId`和`SecurityGroupIds.N`。\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则不能设置`SecurityGroupId`或`SecurityGroupIds.N`，只能设置`NetworkInterface.N.SecurityGroupId`或`NetworkInterface.N.SecurityGroupIds.N`。",
                        "example": "sg-bp15ed6xe1yxeycg7****",
                        "required": false,
                        "type": "string"
                    },
                    "maxItems": 16,
                    "required": false,
                    "type": "array"
                }
            },
            {
                "in": "query",
                "name": "HostNames",
                "required": false,
                "schema": {
                    "description": "创建多台实例时，为每台实例指定不同的主机名。",
                    "example": "ecs-host-01",
                    "ext": {
                        "style": "repeatList"
                    },
                    "items": {
                        "description": "创建多台实例时，为每台实例指定不同的主机名。限制说明如下：\n\n- N的个数需要和`Amount`参数值保持一致。例如，`Amount=2`时，通过该参数指定主机名的格式为`HostNames.1=test1`和`HostNames.2=test2`。\n- 不支持同时设置`HostName`参数和`HostNames.N`参数。\n- 半角句号（.）和短划线（-）不能作为首尾字符，更不能连续使用。\n- Windows实例：字符长度为2~15，不支持半角句号（.），不能全是数字。允许包含大小写英文字母、数字和短划线（-）。\n- 其他类型实例（Linux等）：字符长度为2~64，支持多个半角句号（.），点之间为一段，每段允许包含大小写英文字母、数字和短划线（-）。",
                        "example": "ecs-host-01",
                        "required": false,
                        "type": "string"
                    },
                    "maxItems": 1000,
                    "required": false,
                    "type": "array"
                }
            },
            {
                "in": "query",
                "name": "DataDisk",
                "required": false,
                "schema": {
                    "description": "数据盘信息集合。",
                    "ext": {
                        "style": "repeatList"
                    },
                    "items": {
                        "description": "数据盘信息集合。",
                        "properties": {
                            "AutoSnapshotPolicyId": {
                                "description": "数据盘采用的自动快照策略ID。",
                                "example": "sp-bp67acfmxazb4p****",
                                "required": false,
                                "type": "string"
                            },
                            "BurstingEnabled": {
                                "description": "是否开启Burst（性能突发）。取值范围：\n\n- true：是。\n- false：否。\n\n>当DiskCategory取值为cloud_auto时才支持设置该参数。更多信息，请参见[ESSD AutoPL云盘](https://help.aliyun.com/document_detail/368372.html)。",
                                "example": "false",
                                "required": false,
                                "type": "boolean"
                            },
                            "Category": {
                                "description": "数据盘N的云盘种类。取值范围：\n\n- cloud_efficiency：高效云盘。\n- cloud_ssd：SSD云盘。\n- cloud_essd：ESSD云盘。\n- cloud：普通云盘。\n- cloud_auto：ESSD AutoPL云盘。\n- cloud_essd_entry：ESSD Entry云盘。\n>仅当`InstanceType`设置为`ecs.u1`或`ecs.e`规格族时，该参数支持`cloud_essd_entry`。\n\n对于I/O优化实例，默认值为cloud_efficiency。对于非I/O优化实例，默认值为cloud。",
                                "example": "cloud_ssd",
                                "required": false,
                                "type": "string"
                            },
                            "DeleteWithInstance": {
                                "description": "表示数据盘是否随实例释放。取值范围：\n- true：数据盘随实例释放。\n- false：数据盘不随实例释放。\n\n默认值为true。",
                                "example": "true",
                                "required": false,
                                "type": "boolean"
                            },
                            "Description": {
                                "description": "数据盘的描述。长度为2~256个英文或中文字符，不能以`http://`和`https://`开头。",
                                "example": "DataDisk_Description",
                                "required": false,
                                "type": "string"
                            },
                            "Device": {
                                "description": "数据盘的挂载点。挂载的数据盘数量不同，挂载点的命名不同：\n\n- 1~25块数据盘：/dev/xvd`[b-z]`\n\n- 大于25块数据盘：/dev/xvd`[aa-zz]`，例如第26块数据盘会被命名为/dev/xvdaa，第27块数据盘为/dev/xvdab，以此类推。\n\n>该参数仅用于全镜像（整机镜像）场景。您可以通过将此参数设置为全镜像中数据盘对应的挂载点，并修改对应的`DataDisk.N.Size`和`DataDisk.N.Category`参数，达到修改全镜像中数据盘磁盘种类和大小的目的。",
                                "example": "/dev/xvdb",
                                "required": false,
                                "type": "string"
                            },
                            "DiskName": {
                                "description": "数据盘名称。长度为2~128个英文或中文字符。必须以大小写字母或中文开头，不能以`http://`和`https://`开头。可以包含数字、半角句号（.）、半角冒号（:）、下划线（_）或者短划线（-）。",
                                "example": "cloud_ssdData",
                                "required": false,
                                "type": "string"
                            },
                            "EncryptAlgorithm": {
                                "description": ">该参数暂未开放使用。",
                                "example": "null",
                                "required": false,
                                "type": "string"
                            },
                            "Encrypted": {
                                "description": "数据盘N是否加密。取值范围：\n- true：加密。\n- false：不加密。\n\n默认值：false。",
                                "example": "false",
                                "required": false,
                                "type": "string"
                            },
                            "KMSKeyId": {
                                "description": "数据盘对应的KMS密钥ID。",
                                "example": "0e478b7a-4262-4802-b8cb-00d3fb40****",
                                "required": false,
                                "type": "string"
                            },
                            "PerformanceLevel": {
                                "description": "创建ESSD云盘作为数据盘使用时，设置云盘的性能等级。N的取值必须和`DataDisk.N.Category=cloud_essd`中的N保持一致。取值范围：\n\n- PL0：单盘最高随机读写IOPS 1万。\n- PL1（默认）：单盘最高随机读写IOPS 5万。\n- PL2：单盘最高随机读写IOPS 10万。\n- PL3：单盘最高随机读写IOPS 100万。\n\n有关如何选择ESSD性能等级，请参见[ESSD云盘](https://help.aliyun.com/document_detail/122389.html)。",
                                "example": "PL1",
                                "required": false,
                                "type": "string"
                            },
                            "ProvisionedIops": {
                                "description": "ESSD AutoPL云盘预配置的读写IOPS。可能值：0~min{50,000, 1000*容量-基准性能}。\n\n基准性能=min{1,800+50*容量, 50000}。\n\n>当DiskCategory取值为cloud_auto时才支持设置该参数。更多信息，请参见[ESSD AutoPL云盘](https://help.aliyun.com/document_detail/368372.html)。",
                                "example": "40000",
                                "format": "int64",
                                "minimum": "0",
                                "required": false,
                                "type": "integer"
                            },
                            "Size": {
                                "description": "第n个数据盘的容量大小，N的取值范围为1~16，内存单位为GiB。取值范围：\n\n- cloud_efficiency：20~32768。\n- cloud_ssd：20~32768。\n- cloud_essd：具体取值范围与`DataDisk.N.PerformanceLevel`的取值有关。 \n    - PL0：40~32768。\n    - PL1：20~32768。\n    - PL2：461~32768。\n    - PL3：1261~32768。\n- cloud：5~2000。\n- cloud_auto：40~32768。\n- cloud_essd_entry：10~32768。\n\n该参数的取值必须大于等于参数`SnapshotId`指定的快照的大小。\n",
                                "example": "2000",
                                "format": "int32",
                                "required": false,
                                "type": "integer"
                            },
                            "SnapshotId": {
                                "description": "创建数据盘N使用的快照。N的取值范围为1~16。\n\n指定参数`DataDisk.N.SnapshotId`后，参数`DataDisk.N.Size`会被忽略，实际创建的云盘大小为指定的快照的大小。不能使用早于2013年7月15日（含）创建的快照，请求会报错被拒绝。",
                                "example": "s-bp17441ohwka0yuh****",
                                "required": false,
                                "type": "string"
                            },
                            "StorageClusterId": {
                                "description": "专属块存储集群ID。如果您在创建ECS实例时，需要使用专属块存储集群中的云盘资源作为数据盘，请设置该参数。",
                                "example": "dbsc-j5e1sf2vaf5he8m2****",
                                "required": false,
                                "type": "string"
                            }
                        },
                        "required": false,
                        "type": "object"
                    },
                    "maxItems": 16,
                    "required": false,
                    "type": "array"
                }
            },
            {
                "in": "query",
                "name": "Arn",
                "required": false,
                "schema": {
                    "description": "该参数暂未开放使用。",
                    "ext": {
                        "style": "repeatList"
                    },
                    "items": {
                        "description": "该参数暂未开放使用。",
                        "properties": {
                            "AssumeRoleFor": {
                                "description": "该参数暂未开放使用。",
                                "example": "null",
                                "format": "int64",
                                "required": false,
                                "type": "integer"
                            },
                            "RoleType": {
                                "description": "该参数暂未开放使用。",
                                "example": "null",
                                "required": false,
                                "type": "string"
                            },
                            "Rolearn": {
                                "description": "该参数暂未开放使用。",
                                "example": "null",
                                "required": false,
                                "type": "string"
                            }
                        },
                        "required": false,
                        "type": "object"
                    },
                    "maxItems": 16,
                    "required": false,
                    "type": "array"
                }
            },
            {
                "in": "query",
                "name": "NetworkInterface",
                "required": false,
                "schema": {
                    "description": "弹性网卡信息。",
                    "ext": {
                        "style": "repeatList"
                    },
                    "items": {
                        "description": "弹性网卡信息。",
                        "properties": {
                            "DeleteOnRelease": {
                                "description": "释放实例时是否保留网卡。取值范围：\n\n- true：不保留。\n\n- false：保留。\n\n默认值：true。\n\n>该参数只对辅助网卡生效。",
                                "example": "true",
                                "required": false,
                                "type": "boolean"
                            },
                            "Description": {
                                "description": "弹性网卡的描述。\n\n您需要注意：\n\n- N的取值范围为1~2，设置1个弹性网卡时，支持设置1个主网卡或1个辅助网卡；设置2个弹性网卡时，仅支持同时设置1个主网卡和1个辅助网卡。\n- 长度为2~256个英文或中文字符，不能以`http://`或`https://`开头。\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则无需设置该参数。",
                                "example": "Network_Description",
                                "required": false,
                                "type": "string"
                            },
                            "InstanceType": {
                                "description": "弹性网卡类型。N的取值范围为1~2，设置1个弹性网卡时，支持设置1个主网卡或1个辅助网卡；设置2个弹性网卡时，仅支持同时设置1个主网卡和1个辅助网卡。\n\n参数取值范围：\n\n- Primary：主网卡。\n- Secondary：辅助网卡。\n\n默认值：Secondary。",
                                "example": "Secondary",
                                "required": false,
                                "type": "string"
                            },
                            "Ipv6Address": {
                                "description": "为主网卡指定一个或多个IPv6地址。支持设置最多10个IPv6地址，即第二个N的取值范围：1~10。\n\n取值示例：`Ipv6Address.1=2001:db8:1234:1a00::***`\n\n您需要注意：\n\n- `NetworkInterface.N.InstanceType`取值为`Primary`时，设置该参数才会生效。如果`NetworkInterface.N.InstanceType`取值为`Secondary`或空值，则不能设置该参数。\n\n- 设置该参数后，`Amount`取值只能为1，且不能再设置`Ipv6AddressCount`、`Ipv6Address.N`或`NetworkInterface.N.Ipv6AddressCount`。",
                                "items": {
                                    "description": "为主网卡指定一个或多个IPv6地址。支持设置最多10个IPv6地址，即第二个N的取值范围：1~10\n\n取值示例：`Ipv6Address.1=2001:db8:1234:1a00::***`\n\n您需要注意：\n\n- `NetworkInterface.N.InstanceType`取值为`Primary`时，设置该参数才会生效。如果`NetworkInterface.N.InstanceType`取值为`Secondary`或空值，则不能设置该参数。\n\n- 设置该参数后，`Amount`取值只能为1，且不能再设置`Ipv6AddressCount`、`Ipv6Address.N`或`NetworkInterface.N.Ipv6AddressCount`。",
                                    "example": "2001:db8:1234:1a00::***",
                                    "required": false,
                                    "type": "string"
                                },
                                "maxItems": 10,
                                "required": false,
                                "type": "array"
                            },
                            "Ipv6AddressCount": {
                                "description": "为主网卡指定随机生成的IPv6地址数量。取值范围：1~10\n\n您需要注意：\n\n- `NetworkInterface.N.InstanceType`取值为`Primary`时，设置该参数才会生效。如果`NetworkInterface.N.InstanceType`取值为`Secondary`或空值，则不能设置该参数。\n\n- 设置该参数后，您不能再设置`Ipv6AddressCount`、`Ipv6Address.N`或`NetworkInterface.N.Ipv6Address.N`。",
                                "example": "1",
                                "format": "int64",
                                "required": false,
                                "type": "integer"
                            },
                            "NetworkCardIndex": {
                                "description": "网卡指定的物理网卡索引。\n\n您需要注意：\n- 只有特定实例规格支持指定物理网卡索引。\n- NetworkInterface.N.InstanceType取值为Primary时，对于支持物理网卡的实例规格，如果设置此参数，只能设置为0。\n- NetworkInterface.N.InstanceType取值为Secondary或者空值，对于支持物理网卡的实例规格，此参数可以依据实例规格设置。更多信息，请参见[实例规格族](https://help.aliyun.com/document_detail/25378.html)。",
                                "example": "0",
                                "format": "int32",
                                "required": false,
                                "type": "integer"
                            },
                            "NetworkInterfaceId": {
                                "description": "随实例附加的弹性网卡ID。\n\n>该参数只对辅助网卡生效。",
                                "example": "eni-bp1gn106np8jhxhj****",
                                "required": false,
                                "type": "string"
                            },
                            "NetworkInterfaceName": {
                                "description": "弹性网卡名称。\n\n您需要注意：\n\n- N的取值范围为1~2，设置1个弹性网卡时，支持设置1个主网卡或1个辅助网卡；设置2个弹性网卡时，仅支持同时设置1个主网卡和1个辅助网卡。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则无需设置该参数。",
                                "example": "Network_Name",
                                "required": false,
                                "type": "string"
                            },
                            "NetworkInterfaceTrafficMode": {
                                "description": "网卡的通讯模式。参数取值范围：\n\n- Standard：使用TCP通讯模式。\n- HighPerformance：开启ERI（Elastic RDMA Interface）接口，使用RDMA通讯模式。\n\n默认值：Standard。\n\n>RDMA模式的弹性网卡数量不能超过该实例规格族的限制。更多信息，请参见[实例规格族](https://help.aliyun.com/document_detail/25378.html)。",
                                "example": "Standard",
                                "required": false,
                                "type": "string"
                            },
                            "PrimaryIpAddress": {
                                "description": "添加一张弹性网卡并设置主IP地址。\n\n您需要注意：\n\n- N的取值范围为1~2：\n    - 设置1个弹性网卡时，支持设置1个主网卡或1个辅助网卡。如果`Amount`参数取值大于1，且设置了主网卡并设置了该参数，则表示在批量创建ECS实例时，以指定的主IP地址为起始地址，依次为多台ECS实例分配连续的主IP地址，但需要注意，此时不支持再为实例绑定辅助网卡。\n    - 设置2个弹性网卡时，仅支持同时设置1个主网卡和1个辅助网卡，但需要注意，如果`Amount`参数取值大于1且已为主网卡设置了该参数，则不支持再设置辅助网卡（即不支持再设置`NetworkInterface.2.InstanceType=Secondary`）。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则该参数的作用等同于`PrivateIpAddress`，但需要注意不能同时设置`PrivateIpAddress`参数。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Secondary`或空值，表示为辅助网卡设置主IP地址。默认从网卡所属的交换机网段中随机选择一个IP地址。\n\n> 创建ECS实例时，您最多能添加一张辅助网卡。实例创建成功后，您可以调用[CreateNetworkInterface](https://help.aliyun.com/document_detail/58504.html)和[AttachNetworkInterface](https://help.aliyun.com/document_detail/58515.html)添加更多的辅助网卡。",
                                "example": "172.16.**.**",
                                "required": false,
                                "type": "string"
                            },
                            "QueueNumber": {
                                "description": "弹性网卡队列数。\n\n您需要注意：\n\n- N的取值范围为1~2，设置1个弹性网卡时，支持设置1个主网卡或1个辅助网卡；设置2个弹性网卡时，仅支持同时设置1个主网卡和1个辅助网卡。\n\n- 不能超过实例规格允许的单块网卡最大队列数。\n\n- 实例的所有网卡累加队列数不能超过实例规格允许的队列数总配额。实例规格的单块网卡最大队列数和总配额可以通过[DescribeInstanceTypes](https://help.aliyun.com/document_detail/25620.html)接口查询`MaximumQueueNumberPerEni`、`TotalEniQueueQuantity`字段。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，且设置了该参数取值，则不能再设置`NetworkInterfaceQueueNumber`参数。",
                                "example": "8",
                                "format": "int32",
                                "minimum": "1",
                                "required": false,
                                "type": "integer"
                            },
                            "QueuePairNumber": {
                                "description": "RDMA网卡队列数。",
                                "example": "0",
                                "format": "int64",
                                "required": false,
                                "type": "integer"
                            },
                            "SecurityGroupId": {
                                "description": "弹性网卡所属的安全组ID。\n\n您需要注意：\n\n- N的取值范围为1~2，设置1个弹性网卡时，支持设置1个主网卡或1个辅助网卡；设置2个弹性网卡时，仅支持同时设置1个主网卡和1个辅助网卡。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则必须设置该参数。此时该参数的作用等同于`SecurityGroupId`，但需要注意不能再设置`SecurityGroupId`、`SecurityGroupIds.N`或`NetworkInterface.N.SecurityGroupIds.N`。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Secondary`或空值，则该参数为非必填参数。默认值为ECS实例所属的安全组。",
                                "example": "sg-bp67acfmxazb4p****",
                                "required": false,
                                "type": "string"
                            },
                            "SecurityGroupIds": {
                                "description": "弹性网卡所属的一个或多个安全组ID。\n\n- 第一个N的取值范围为1~2，设置1个弹性网卡时，支持设置1个主网卡或1个辅助网卡；设置2个弹性网卡时，仅支持同时设置1个主网卡和1个辅助网卡。\n- 第二个N表示可以指定一个或多个安全组ID。N的取值范围与实例能够加入安全组配额有关。更多信息，请参见[安全组限制](https://help.aliyun.com/document_detail/25412.html#SecurityGroupQuota1)。\n\n您需要注意：\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则必须设置该参数或`NetworkInterface.N.SecurityGroupId`。此时该参数的作用等同于`SecurityGroupIds.N`，但需要注意不能再设置`SecurityGroupId`、`SecurityGroupIds.N`或`NetworkInterface.N.SecurityGroupId`。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Secondary`或空值，则该参数为非必填参数。默认值为ECS实例所属的安全组。",
                                "example": "sg-bp15ed6xe1yxeycg7****",
                                "items": {
                                    "description": "弹性网卡所属的一个或多个安全组ID。\n\n- 第一个N的取值范围为1~2，设置1个弹性网卡时，支持设置1个主网卡或1个辅助网卡；设置2个弹性网卡时，仅支持同时设置1个主网卡和1个辅助网卡。\n- 第二个N表示可以指定一个或多个安全组ID。N的取值范围与实例能够加入安全组配额有关。更多信息，请参见[安全组限制](https://help.aliyun.com/document_detail/25412.html#SecurityGroupQuota1)。\n\n您需要注意：\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则必须设置该参数或`NetworkInterface.N.SecurityGroupId`。此时该参数的作用等同于`SecurityGroupIds.N`，但需要注意不能再设置`SecurityGroupId`、`SecurityGroupIds.N`或`NetworkInterface.N.SecurityGroupId`。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Secondary`或空值，则该参数为非必填参数。默认值为ECS实例所属的安全组。",
                                    "example": "sg-bp15ed6xe1yxeycg7****",
                                    "required": false,
                                    "type": "string"
                                },
                                "maxItems": 16,
                                "required": false,
                                "type": "array"
                            },
                            "VSwitchId": {
                                "description": "弹性网卡所属的虚拟交换机ID。\n\n您需要注意：\n\n- N的取值范围为1~2，设置1个弹性网卡时，支持设置1个主网卡或1个辅助网卡；设置2个弹性网卡时，仅支持同时设置1个主网卡和1个辅助网卡。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则必须设置该参数。此时该参数的作用等同于`VSwitchId`，但需要注意不能同时设置`VSwitchId`参数。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Secondary`或空值，则该参数为非必填参数。默认值为ECS实例所属的虚拟交换机。",
                                "example": "vsw-bp67acfmxazb4p****",
                                "required": false,
                                "type": "string"
                            }
                        },
                        "required": false,
                        "type": "object"
                    },
                    "maxItems": 8,
                    "required": false,
                    "type": "array"
                }
            },
            {
                "in": "query",
                "name": "Tag",
                "required": false,
                "schema": {
                    "description": "实例、云盘和主网卡的标签信息。",
                    "ext": {
                        "style": "repeatList"
                    },
                    "items": {
                        "description": "实例、云盘和主网卡的标签信息。",
                        "properties": {
                            "Key": {
                                "description": "实例、云盘和主网卡的标签键。N的取值范围：1~20。一旦传入该值，则不允许为空字符串。最多支持128个字符，不能以aliyun和acs:开头，不能包含http://或 https://。",
                                "example": "TestKey",
                                "required": false,
                                "type": "string"
                            },
                            "Value": {
                                "description": "实例、云盘和主网卡的标签值。N的取值范围：1~20。一旦传入该值，可以为空字符串。最多支持128个字符，不能以acs:开头，不能包含http://或者https://。",
                                "example": "TestValue",
                                "required": false,
                                "type": "string"
                            }
                        },
                        "required": false,
                        "type": "object"
                    },
                    "maxItems": 71,
                    "required": false,
                    "type": "array"
                }
            },
            {
                "in": "query",
                "name": "Ipv6Address",
                "required": false,
                "schema": {
                    "description": "为主网卡指定一个或多个IPv6地址。支持设置最多10个IPv6地址，即N的取值范围：1~10。\n\n取值示例：`Ipv6Address.1=2001:db8:1234:1a00::***`。\n\n您需要注意：\n\n- 设置了`Ipv6Address.N`时，`Amount`参数取值只能为1，且不能同时设置`Ipv6AddressCount`。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则不能设置`Ipv6Addresses.N`或`Ipv6AddressCount`，而是需要设置`NetworkInterface.N.Ipv6Addresses.N`或`NetworkInterface.N.Ipv6AddressCount`。",
                    "example": "Ipv6Address.1=2001:db8:1234:1a00::***",
                    "ext": {
                        "style": "repeatList"
                    },
                    "items": {
                        "description": "为主网卡指定一个或多个IPv6地址。支持设置最多10个IPv6地址，即N的取值范围：1~10。\n\n取值示例：`Ipv6Address.1=2001:db8:1234:1a00::***`。\n\n您需要注意：\n\n- 设置了`Ipv6Address.N`时，`Amount`参数取值只能为1，且不能同时设置`Ipv6AddressCount`。\n\n- 如果`NetworkInterface.N.InstanceType`取值为`Primary`，则不能设置`Ipv6Addresses.N`或`Ipv6AddressCount`，而是需要设置`NetworkInterface.N.Ipv6Addresses.N`或`NetworkInterface.N.Ipv6AddressCount`。",
                        "example": "2001:db8:1234:1a00::***",
                        "required": false,
                        "type": "string"
                    },
                    "maxItems": 10,
                    "required": false,
                    "type": "array"
                }
            },
            {
                "in": "query",
                "name": "SystemDisk",
                "required": false,
                "schema": {
                    "description": "系统盘相关参数，目前专属块存储集群ID（`StorageClusterId`）需要通过该参数设置参数值。",
                    "ext": {
                        "style": "flat"
                    },
                    "properties": {
                        "BurstingEnabled": {
                            "description": "是否开启Burst（性能突发）。取值范围：\n\n- true：是。\n- false：否。\n\n>当`SystemDisk.Category`取值为`cloud_auto`时才支持设置该参数。更多信息，请参见[ESSD AutoPL云盘](https://help.aliyun.com/document_detail/368372.html)。",
                            "example": "false",
                            "required": false,
                            "type": "boolean"
                        },
                        "EncryptAlgorithm": {
                            "description": ">该参数暂未开放使用。",
                            "example": "null",
                            "required": false,
                            "type": "string"
                        },
                        "Encrypted": {
                            "description": "系统盘是否加密。取值范围：\n\n- true：加密。\n\n- false：不加密。\n\n默认值：false。\n\n>中国（香港）D可用区、新加坡A可用区暂不支持在创建实例时加密系统盘。",
                            "example": "false",
                            "required": false,
                            "type": "string"
                        },
                        "KMSKeyId": {
                            "description": "系统盘对应的KMS密钥ID。",
                            "example": "0e478b7a-4262-4802-b8cb-00d3fb40****",
                            "required": false,
                            "type": "string"
                        },
                        "ProvisionedIops": {
                            "description": "ESSD AutoPL云盘预配置的读写IOPS。可能值：0~min{50,000, 1000*容量-基准性能}。\n\n基准性能=min{1,800+50*容量, 50,000}。\n\n>当`SystemDisk.Category`取值为`cloud_auto`时才支持设置该参数。更多信息，请参见[ESSD AutoPL云盘](https://help.aliyun.com/document_detail/368372.html)。",
                            "example": "40000",
                            "format": "int64",
                            "minimum": "0",
                            "required": false,
                            "type": "integer"
                        },
                        "StorageClusterId": {
                            "description": "专属块存储集群ID。如果您在创建ECS实例时，需要使用专属块存储集群中的云盘资源作为系统盘，请设置该参数。",
                            "example": "dbsc-j5e1sf2vaf5he8m2****",
                            "required": false,
                            "type": "string"
                        }
                    },
                    "required": false,
                    "type": "object"
                }
            },
            {
                "in": "query",
                "name": "ImageOptions",
                "required": false,
                "schema": {
                    "description": "镜像相关属性信息。",
                    "ext": {
                        "style": "flat"
                    },
                    "properties": {
                        "LoginAsNonRoot": {
                            "description": "使用该镜像的实例是否支持使用ecs-user用户登录。可能值：\n\n- true：是\n\n- false：否",
                            "example": "false",
                            "required": false,
                            "type": "boolean"
                        }
                    },
                    "required": false,
                    "type": "object"
                }
            },
            {
                "in": "query",
                "name": "NetworkOptions",
                "required": false,
                "schema": {
                    "description": "网络相关属性参数。",
                    "ext": {
                        "style": "flat"
                    },
                    "properties": {
                        "EnableJumboFrame": {
                            "description": "实例是否开启Jumbo frame特性。参数取值范围：\n\n- false：不开启Jumbo frame, 该实例下的所有网卡（包括主网卡及辅助网卡）MTU取值为1500。\n\n- true：开启Jumbo frame, 该实例下的所有网卡（包括主网卡及辅助网卡）的MTU取值为8500。\n\n默认值：true。\n\n>只有八代以上部分实例规格支持开启Jumbo frame特性。更多信息请参见[ECS实例MTU](https://help.aliyun.com/document_detail/200512.html)。",
                            "example": "false",
                            "required": false,
                            "type": "boolean"
                        }
                    },
                    "required": false,
                    "type": "object"
                }
            },
            {
                "in": "query",
                "name": "AutoPay",
                "required": false,
                "schema": {
                    "description": "创建实例时，是否自动支付。取值范围：\n\n- true：自动支付。\n\n    > 自动支付时，请确保支付方式余额充足，否则会生成异常订单，只能作废订单。如果您的支付方式余额不足，可以将参数`AutoPay`置为`false`，此时会生成未支付订单，您可以登录ECS管理控制台自行支付。\n\n- false：只生成订单不扣费。\n\n    > 当`InstanceChargeType` 取值为`PostPaid`时，`AutoPay`不能设置为`false`。\n\n默认值：true。\n\n",
                    "example": "true",
                    "required": false,
                    "type": "boolean"
                }
            }
        ],
        "responses": {
            "200": {
                "schema": {
                    "properties": {
                        "InstanceIdSets": {
                            "description": "实例ID（`InstanceIdSet`）列表。",
                            "items": {
                                "description": "实例ID（`InstanceIdSet`）列表。",
                                "example": "[\"i-bp67acfmxazb4pd2****\", \"i-bp1i43l28m7u48p1****\", \"i-bp12yqg7jdyxl11f****\"]",
                                "type": "string"
                            },
                            "type": "array"
                        },
                        "OrderId": {
                            "description": "订单ID。该参数只有创建包年包月ECS实例（请求参数`InstanceChargeType=PrePaid`）时有返回值。",
                            "example": "123456****",
                            "type": "string"
                        },
                        "RequestId": {
                            "description": "请求ID。",
                            "example": "473469C7-AA6F-4DC5-B3DB-A3DC0DE3****",
                            "type": "string"
                        },
                        "TradePrice": {
                            "description": "订单成交价。",
                            "example": "0.165",
                            "format": "float",
                            "type": "number"
                        }
                    },
                    "type": "object"
                }
            }
        },
        "summary": "创建一台或多台按量付费或者包年包月ECS实例。",
        "title": "创建一台或多台按量付费或者包年包月ECS实例"
    },
    "name": "RunInstances",
    "pageType": "document",
    "schemaType": "api"
}