import { IRoute } from "@moose-desk/core";
import { AppLayout } from "src/layouts/AppLayout";
import ProfileRoutePaths from "src/modules/BetaVersion/profile/routes/paths";

const profileRoutes: IRoute = {
  path: ProfileRoutePaths.Index,
  title: "Setting Account",
  showInNavigationMenu: true,
  middleware: "user",
  element: <AppLayout />,
  routes: [
    // {
    //   path: ProfileRoutePaths.Index,
    //   index: true,
    //   component: lazy(
    //     () => import("src/modules/BetaVersion/profile/pages/Profile")
    //   ),
    // },
  ],
};

export default profileRoutes;
