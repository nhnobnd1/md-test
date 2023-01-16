import settingLocales from "src/modules/setting/locales";
import SettingRoutePaths from "src/modules/setting/routes/paths";

declare global {
  interface RoutePaths {
    Setting: typeof SettingRoutePaths;
  }

  interface Localizations {
    setting: typeof settingLocales.en & typeof settingLocales.vi;
  }
}
