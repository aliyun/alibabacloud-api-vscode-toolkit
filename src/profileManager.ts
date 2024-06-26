import os from "os";
import fs from "fs";
import fsx from "fs/promises";
import path from "path";

let profileInfo = null;

export class ProfileManager {
  profileInfo: {
    current: string;
    profiles: Array<{
      mode: string;
      name: string;
      output_format: string;
      private_key: string;
      process_command: string;
      ram_role_arn: string;
      ram_role_name: string;
      ram_session_name: string;
      region_id: string;
      retry_count: string;
      retry_timeout: string;
      site: string;
      source_profile: string;
      sts_region: string;
      sts_token: string;
      verified: string;
    }>;
  };

  async saveProfiles(config) {
    const configFilePath = path.join(os.homedir(), ".aliyun/config.json");
    await fsx.writeFile(configFilePath, JSON.stringify(config, null, 2));
    // emitter.fire();
  }

  async refreshProfiles() {
    profileInfo = createProfileInfoInstance();
  }

  async addProfile(profile: { profileName: string; accessKey: string; secretKey: string; defaultRegionId: string }) {
    const config = await this.loadProfiles();
    config.profiles.push({
      name: profile?.profileName,
      mode: "AK",
      access_key_id: profile?.accessKey,
      access_key_secret: profile?.secretKey,
      sts_token: "",
      ram_role_name: "",
      ram_role_arn: "",
      ram_session_name: "",
      private_key: "",
      key_pair_name: "",
      expired_seconds: 0,
      verified: "",
      region_id: profile?.defaultRegionId,
      output_format: "json",
      language: "zh",
      site: "",
      retry_timeout: 0,
      retry_count: 0,
    });
    config.current = profile?.profileName;
    await this.saveProfiles(config);
    await this.refreshProfiles();
  }

  async deleteProfile(accessKey: string) {
    const config = await this.loadProfiles();
    config.profiles = config.profiles.filter((profile) => profile.access_key_id !== accessKey);
    await this.saveProfiles(config);
  }

  async checkAliyunDir() {
    const filePath = path.join(os.homedir(), ".aliyun");
    const { R_OK, W_OK } = fs.constants;
    try {
      // 检测写入权限
      await fsx.access(os.homedir(), R_OK | W_OK);
      // 检查文件夹是否存在
      fs.stat(filePath, async (err) => {
        if (err && err.code === "ENOENT") {
          // 不存在，创建它
          await fs.promises.mkdir(filePath);
        }
      });
    } catch (ex) {
      console.error("创建文件夹时出错:", ex);
    }
  }

  async loadProfiles() {
    const configFilePath = path.join(os.homedir(), ".aliyun/config.json");
    const { R_OK, W_OK } = fs.constants;
    try {
      await this.checkAliyunDir();
      await fsx.access(configFilePath, R_OK | W_OK);
      // 检查 dirTest 文件夹是否存在
      const content = await fsx.readFile(configFilePath, "utf-8");
      return JSON.parse(content);
    } catch (ex) {
      // empty profiles
      return { current: "", profiles: [] };
    }
  }

  getProfileInfo() {
    return this.profileInfo;
  }

  constructor() {
    this.loadProfiles().then((res) => {
      this.profileInfo = res;
    });
  }
}

function createProfileInfoInstance() {
  var instance = new ProfileManager();
  return instance;
}

export function getProfileInfoInstance(): ProfileManager {
  if (!profileInfo) {
    profileInfo = createProfileInfoInstance();
  }
  return profileInfo;
}
