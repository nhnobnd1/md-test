import settingChannelLocales from "src/modules/settingChannel/locales";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";

declare global {
  interface RoutePaths {
    SettingChannel: typeof SettingChannelRoutePaths;
  }

  interface Localizations {
    settingChannel: typeof settingChannelLocales.en & typeof settingChannelLocales.vi;
  }
}
