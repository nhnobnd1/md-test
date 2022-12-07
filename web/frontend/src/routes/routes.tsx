import { lazy } from "react";
import { IRoute } from "src/core/models/routes";
import RoutePaths from "src/routes/paths";

const appRootRoutes: IRoute[] = [
  {
    path: RoutePaths.Index,
    title: "Index page",
    showInNavigationMenu: false,
    index: true,
    component: lazy(() => import("src/modules/onBoarding/pages/Index")),
  },
];

export default appRootRoutes;
