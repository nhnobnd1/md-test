<<<<<<< HEAD
import ProfileBetaRoutePath from "@moose-beta/profile/routes/paths";
=======
import ProfileRoutePaths from "@moose-beta/profile/routes/paths";
>>>>>>> 3d619f24 (save: begta)
import { IRoute } from "@moose-desk/core";
import { lazy } from "react";

const profileRoutes: IRoute = {
<<<<<<< HEAD
  path: ProfileBetaRoutePath.Index,
  title: "ProfileBeta",
  component: lazy(() => import("src/layouts/MainLayout")),
  routes: [
    {
      path: ProfileBetaRoutePath.Index,
=======
  path: ProfileRoutePaths.Index,
  title: "profile-beta",
  component: lazy(() => import("src/layouts/MainLayout")),
  routes: [
    {
      path: ProfileRoutePaths.Index,
>>>>>>> 3d619f24 (save: begta)
      index: true,
      component: lazy(() => import("@moose-beta/profile/pages/Profile")),
    },
  ],
};

export default profileRoutes;
