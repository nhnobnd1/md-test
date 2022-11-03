import { Module } from "src/core/models/Module";
import dashboardLocales from "src/modules/dashboard/locales";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";
import dashboardRoutes from "src/modules/dashboard/routes/routes";

const module: Module = {
  name: "Dashboard",
  route: {
    item: dashboardRoutes,
    paths: DashboardRoutePaths,
  },
  locales: dashboardLocales,
};

export default module;
