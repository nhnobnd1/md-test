import dashboardLocales from "src/modules/dashboard/locales";
import { dashboardReducer } from "src/modules/dashboard/redux";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";

declare global {
  interface ModulesReducers {
    dashboard: typeof dashboardReducer;
  }

  interface RoutePaths {
    Dashboard: typeof DashboardRoutePaths;
  }

  interface Localizations {
    dashboard: typeof dashboardLocales.en & typeof dashboardLocales.vi;
  }
}
