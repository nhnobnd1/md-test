import customersLocales from "src/modules/customers/locales";
import CustomersRoutePaths from "src/modules/customers/routes/paths";

declare global {
  interface RoutePaths {
    Customers: typeof CustomersRoutePaths;
  }

  interface Localizations {
    customers: typeof customersLocales.en & typeof customersLocales.vi;
  }
}
