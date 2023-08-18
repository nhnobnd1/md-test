import profileLocales from "src/modules/BetaVersion/profile/locales";
import ProfileRoutePaths from "src/modules/BetaVersion/profile/routes/paths";

declare global {
  interface RoutePaths {
    Profile: typeof ProfileRoutePaths;
  }

  interface Localizations {
    profile: typeof profileLocales.en & typeof profileLocales.vi;
  }
}
