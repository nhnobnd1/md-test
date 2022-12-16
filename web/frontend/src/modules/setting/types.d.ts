import settingLocales from "src/modules/setting/locales";
import { settingReducer } from "src/modules/setting/redux";
import SettingRoutePaths from "src/modules/setting/routes/paths";

declare global {
  interface ModulesReducers {
    setting: typeof settingReducer;
  }

  interface RoutePaths {
    Setting: typeof SettingRoutePaths;
  }

  interface Localizations {
    setting: typeof settingLocales.en & typeof settingLocales.vi;
  }
}
