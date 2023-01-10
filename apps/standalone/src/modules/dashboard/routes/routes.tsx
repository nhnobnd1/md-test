import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";

const dashboardRoutes: IRoute = {
  path: DashboardRoutePaths.Index,
  title: "Dashboard",
  showInNavigationMenu: true,
  middleware: "user",
  component: lazy(() => import("src/layouts/AppLayout/AppLayout")),
  routes: [
    {
      path: DashboardRoutePaths.Index,
      index: true,
      component: lazy(() => import("src/modules/dashboard/pages/Index")),
    },
  ],
};

export default dashboardRoutes;
