import groupLocales from "src/modules/group/locales";
import GroupRoutePaths from "src/modules/group/routes/paths";

declare global {
  interface RoutePaths {
    Group: typeof GroupRoutePaths;
  }

  interface Localizations {
    group: typeof groupLocales.en & typeof groupLocales.vi;
  }
}
