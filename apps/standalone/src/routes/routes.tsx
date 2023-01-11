import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import RoutePaths from "src/routes/paths";

const appRootRoutes: IRoute[] = [
  {
    path: RoutePaths.Index,
    title: "Index page",
    component: lazy(() => import("src/pages/RedirectPage")),
    index: true,
  },
];

export default appRootRoutes;
