import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import AuthRoutePaths from "src/modules/auth/routes/paths";

const authRoutes: IRoute = {
  path: AuthRoutePaths.Index,
  title: "Auth",
  showInNavigationMenu: true,
  routes: [
    {
      path: AuthRoutePaths.Index,
      index: true,
      component: lazy(() => import("src/modules/auth/pages/Index")),
    },
    {
      path: AuthRoutePaths.Child,
      component: lazy(() => import("src/modules/auth/pages/Child")),
    },
  ],
};

export default authRoutes;
