import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import { AppLayout } from "src/layouts/AppLayout";
import CustomerBetaRoutePaths from "src/modules/BetaVersion/customerBeta/routes/paths";

const customerBetaRoutes: IRoute = {
  path: CustomerBetaRoutePaths.Index,
  title: "CustomerBeta",
  showInNavigationMenu: true,
  middleware: "user",
  element: <AppLayout />,
  routes: [
    {
      path: CustomerBetaRoutePaths.Index,
      index: true,
      component: lazy(
        () => import("src/modules/BetaVersion/customerBeta/pages/Index")
      ),
    },
  ],
};

export default customerBetaRoutes;
