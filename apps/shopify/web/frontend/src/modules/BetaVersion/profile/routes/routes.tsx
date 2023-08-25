import ProfileBetaRoutePath from "@moose-beta/profile/routes/paths";
import { IRoute } from "@moose-desk/core";
import { lazy } from "react";

const profileRoutes: IRoute = {
  path: ProfileBetaRoutePath.Index,
  title: "ProfileBeta",
  component: lazy(() => import("src/layouts/MainLayout")),
  routes: [
    {
      path: ProfileBetaRoutePath.Index,
      index: true,
      component: lazy(() => import("@moose-beta/profile/pages/Profile")),
    },
  ],
};

export default profileRoutes;
