import { HomeMinor } from "@shopify/polaris-icons";
import { lazy } from "react";
import { IRoute } from "src/core/models/routes";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";

const dashboardRoutes: IRoute = {
  path: DashboardRoutePaths.Index,
  title: "Home",
  showInNavigationMenu: true,
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
