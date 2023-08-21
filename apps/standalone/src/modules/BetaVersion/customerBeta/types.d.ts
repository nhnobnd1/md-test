import customerBetaLocales from "src/modules/BetaVersion/customerBeta/locales";
import CustomerBetaRoutePaths from "src/modules/BetaVersion/customerBeta/routes/paths";

declare global {
  interface RoutePaths {
    CustomerBeta: typeof CustomerBetaRoutePaths;
  }

  interface Localizations {
    customerBeta: typeof customerBetaLocales.en & typeof customerBetaLocales.vi;
  }
}
