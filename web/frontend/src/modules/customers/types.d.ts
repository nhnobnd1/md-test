import customersLocales from "src/modules/customers/locales";
import { customersReducer } from "src/modules/customers/redux";
import CustomersRoutePaths from "src/modules/customers/routes/paths";

declare global {
  interface ModulesReducers {
    customers: typeof customersReducer;
  }

  interface RoutePaths {
    Customers: typeof CustomersRoutePaths;
  }

  interface Localizations {
    customers: typeof customersLocales.en & typeof customersLocales.vi;
  }
}
