import settingLocales from "src/modules/setting/locales";
import SettingRoutePaths from "src/modules/setting/routes/paths";
import settingRoutes from "src/modules/setting/routes/routes";

const module: Module = {
  name: "Setting",
  route: {
    item: settingRoutes,
    paths: SettingRoutePaths,
  },
  locales: settingLocales,
};

export default module;
