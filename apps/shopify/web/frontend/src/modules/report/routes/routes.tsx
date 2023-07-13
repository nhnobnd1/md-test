import { IRoute } from "@moose-desk/core";
import { SettingsMajor } from "@shopify/polaris-icons";
import { lazy } from "react";
import ReportRoutePaths from "src/modules/report/routes/paths";
const reportRoutes: IRoute = {
  path: ReportRoutePaths.Index,
  title: "Report",
  // showInNavigationMenu: false,

  navigation: {
    icon: () => <SettingsMajor />,
  },
  component: lazy(() => import("src/layouts/MainLayout")),
  routes: [
    {
      path: ReportRoutePaths.Overview,
      index: true,
      component: lazy(() => import("src/modules/report/pages/Index")),
    },
    {
      path: ReportRoutePaths.ByAgent,
      component: lazy(() => import("src/modules/report/pages/ByAgent")),
    },
    {
      path: ReportRoutePaths.ByTags,
      component: lazy(() => import("src/modules/report/pages/ByTags")),
    },
  ],
};

export default reportRoutes;
