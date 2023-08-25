import profileLocales from "src/modules/BetaVersion/profile/locales";
import ProfileBetaRoutePath from "src/modules/BetaVersion/profile/routes/paths";

declare global {
  interface RoutePaths {
    Profile: typeof ProfileBetaRoutePath;
  }

  interface Localizations {
    profile: typeof profileLocales.en & typeof profileLocales.vi;
  }
}
