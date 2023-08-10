import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import { lazyRetry } from "src/helper";
import { AppLayout } from "src/layouts/AppLayout";
import GroupRoutePaths from "src/modules/group/routes/paths";

const groupRoutes: IRoute = {
  path: GroupRoutePaths.Index,
  showInNavigationMenu: false,
  element: <AppLayout />,
  routes: [
    {
      path: GroupRoutePaths.Index,
      index: true,
      middleware: "user",
      component: lazy(() =>
        lazyRetry(() => import("src/modules/group/pages/Index"))
      ),
    },
    {
      path: GroupRoutePaths.Create,
      middleware: "user",
      component: lazy(() =>
        lazyRetry(() => import("src/modules/group/pages/Create"))
      ),
    },
    {
      path: GroupRoutePaths.Detail,
      middleware: "user",
      component: lazy(() =>
        lazyRetry(() => import("src/modules/group/pages/Detail"))
      ),
    },
  ],
};

export default groupRoutes;
