import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import GroupRoutePaths from "src/modules/group/routes/paths";

const groupRoutes: IRoute = {
  path: GroupRoutePaths.Index,
  showInNavigationMenu: false,
  component: lazy(() => import("src/layouts/AppLayout/AppLayout")),
  routes: [
    {
      path: GroupRoutePaths.Index,
      index: true,
      component: lazy(() => import("src/modules/group/pages/Index")),
    },
  ],
};

export default groupRoutes;
