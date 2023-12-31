import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import RoutePaths from "src/routes/paths";

const appRootRoutes: IRoute[] = [
  {
    path: RoutePaths.Index,
    title: "Index page",
    showInNavigationMenu: false,
    index: true,
    component: lazy(() => import("src/pages/RedirectPage")),
  },

  // Don't remove this route
  {
    path: "/exit-iframe",
    index: true,
    component: lazy(() => import("src/pages/ExitIframe")),
  },
];

export default appRootRoutes;
