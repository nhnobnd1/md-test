import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import RoutePaths from "src/routes/paths";

const appRootRoutes: IRoute[] = [
  {
    path: RoutePaths.Index,
    component: lazy(() => import("src/layouts/MainLayout/MainLayout")),

    routes: [
      {
        path: RoutePaths.Index,
        component: lazy(() => import("src/pages/RedirectPage")),
      },
      {
        path: RoutePaths.Login,
        title: "Login",
        component: lazy(
          () => import("src/modules/agent/pages/auth/signIn/SignIn")
        ),
      },
      {
        path: RoutePaths.OnBoarding,
        component: lazy(
          () => import("src/modules/agent/pages/auth/onBoarding/OnBoarding")
        ),
      },
      {
        path: RoutePaths.ForgotPassword,
        component: lazy(
          () =>
            import("src/modules/agent/pages/auth/forgotPassword/ForgotPassword")
        ),
      },
      {
        path: RoutePaths.ResetPassword,
        component: lazy(
          () =>
            import("src/modules/agent/pages/auth/resetPassword/ResetPassword")
        ),
      },
    ],
  },
];

export default appRootRoutes;
