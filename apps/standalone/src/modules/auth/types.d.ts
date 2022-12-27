import authLocales from "src/modules/auth/locales";
import AuthRoutePaths from "src/modules/auth/routes/paths";

declare global {
  interface RoutePaths {
    Auth: typeof AuthRoutePaths;
  }

  interface Localizations {
    auth: typeof authLocales.en & typeof authLocales.vi;
  }
}
