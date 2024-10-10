import main from "./main";
import provider from "./provider";
import src from "./src";
import plugins from "./plugins";
import xconsole from "./xconsole";
import TryAPI from "./TryAPI";
import components from "./components";
import ProfileManager from "./ProfileManager";
import TrySDK from "./TrySDK";

const ide = {
  main,
};

export default {
  TryAPI,
  TrySDK,
  ProfileManager,
  components,
  ide,
  xconsole,
  src,
  plugins,
  provider,
};
