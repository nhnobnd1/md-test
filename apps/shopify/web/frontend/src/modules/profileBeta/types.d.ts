import profileBetaLocales from "src/modules/profileBeta/locales";
import ProfileBetaRoutePaths from "src/modules/profileBeta/routes/paths";

declare global {
  interface RoutePaths {
    ProfileBeta: typeof ProfileBetaRoutePaths;
  }

  interface Localizations {
    profileBeta: typeof profileBetaLocales.en & typeof profileBetaLocales.vi;
  }
}
