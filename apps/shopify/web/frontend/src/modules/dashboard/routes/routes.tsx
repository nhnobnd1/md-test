import { IRoute } from "@moose-desk/core";
import { HomeMinor } from "@shopify/polaris-icons";
import { lazy } from "react";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";

const dashboardRoutes: IRoute = {
  path: DashboardRoutePaths.Index,
  title: "Dashboard",
  component: lazy(() => import("src/layouts/MainLayout")),

  navigation: {
    icon: () => <HomeMinor />,
  },
  routes: [
    {
      path: DashboardRoutePaths.Index,
      index: true,
      component: lazy(() => import("src/modules/dashboard/pages/Index")),
    },
  ],
};

export default dashboardRoutes;
