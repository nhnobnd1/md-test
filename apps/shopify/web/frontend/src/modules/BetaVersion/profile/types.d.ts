<<<<<<< HEAD
import profileLocales from "src/modules/BetaVersion/profile/locales";
import ProfileBetaRoutePath from "src/modules/BetaVersion/profile/routes/paths";

declare global {
  interface RoutePaths {
    Profile: typeof ProfileBetaRoutePath;
  }

  interface Localizations {
    profile: typeof profileLocales.en & typeof profileLocales.vi;
=======
import profileLocales from "@moose-beta/profile/locales";
import ProfileRoutePaths from "src/modules/customers/routes/paths";

declare global {
  interface RoutePaths {
    Profiles: typeof ProfileRoutePaths;
  }

  interface Localizations {
    profiles: typeof profileLocales.en & typeof profileLocales.vi;
>>>>>>> 3d619f24 (save: begta)
  }
}
