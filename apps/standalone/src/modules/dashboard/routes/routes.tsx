import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import { lazyRetry } from "src/helper";
import { AppLayout } from "src/layouts/AppLayout";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";

const dashboardRoutes: IRoute = {
  path: DashboardRoutePaths.Index,
  title: "Dashboard",
  showInNavigationMenu: true,
  middleware: "user",
  element: <AppLayout />,
  routes: [
    {
      path: DashboardRoutePaths.Index,
      index: true,
      component: lazy(() =>
        lazyRetry(() => import("src/modules/dashboard/pages/Index"))
      ),
    },
  ],
};

export default dashboardRoutes;
