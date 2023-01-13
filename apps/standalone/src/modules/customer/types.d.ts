import customerLocales from "src/modules/customer/locales";
import CustomerRoutePaths from "src/modules/customer/routes/paths";

declare global {
  interface RoutePaths {
    Customer: typeof CustomerRoutePaths;
  }

  interface Localizations {
    customer: typeof customerLocales.en & typeof customerLocales.vi;
  }
}
