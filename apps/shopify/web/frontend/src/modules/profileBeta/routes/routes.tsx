import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import ProfileBetaRoutePaths from "src/modules/profileBeta/routes/paths";

const profileBetaRoutes: IRoute = {
  path: ProfileBetaRoutePaths.Index,
  title: "ProfileBeta",
  showInNavigationMenu: true,
  component: lazy(() => import("src/layouts/MainLayout")),
  routes: [
    {
      path: ProfileBetaRoutePaths.Index,
      index: true,
      component: lazy(() => import("src/modules/profileBeta/pages/Index")),
    },
  ],
};

export default profileBetaRoutes;
