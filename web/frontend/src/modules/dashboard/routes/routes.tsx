import { lazy } from "react";
import { IRoute } from "src/core/models/routes";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";

const dashboardRoutes: IRoute = {
  path: DashboardRoutePaths.Index,
  title: "Dashboard",
  showInNavigationMenu: true,
  component: lazy(() => import("src/layouts/MainLayout")),
  routes: [
    {
      path: DashboardRoutePaths.Index,
      index: true,
      component: lazy(() => import("src/modules/dashboard/pages/Index")),
    },
    {
      path: DashboardRoutePaths.Child,
      component: lazy(() => import("src/modules/dashboard/pages/Child")),
    },
  ],
};

export default dashboardRoutes;
