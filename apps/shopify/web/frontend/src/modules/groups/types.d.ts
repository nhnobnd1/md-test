import groupsLocales from "src/modules/groups/locales";
import GroupsRoutePaths from "src/modules/groups/routes/paths";

declare global {
  interface RoutePaths {
    Groups: typeof GroupsRoutePaths;
  }

  interface Localizations {
    groups: typeof groupsLocales.en & typeof groupsLocales.vi;
  }
}
