import dashboardLocales from "src/modules/dashboard/locales";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";

declare global {
  interface RoutePaths {
    Dashboard: typeof DashboardRoutePaths;
  }

  interface Localizations {
    dashboard: typeof dashboardLocales.en & typeof dashboardLocales.vi;
  }
}
