import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import { AppLayout } from "src/layouts/AppLayout";
import ReportRoutePaths from "src/modules/report/routes/paths";

const reportRoutes: IRoute = {
  path: ReportRoutePaths.Index,
  title: "Report",
  showInNavigationMenu: false,
  element: <AppLayout />,
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
  ],
};

export default reportRoutes;
