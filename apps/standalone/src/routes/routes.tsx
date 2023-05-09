import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import { MainLayout } from "src/layouts/MainLayout";
import RoutePaths from "src/routes/paths";

const appRootRoutes: IRoute[] = [
  {
    path: RoutePaths.Index,
    element: <MainLayout />,
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
      {
        path: RoutePaths.VerifyEmailSuccess,
        component: lazy(
          () =>
            import(
              "src/modules/agent/pages/auth/verifyEmailSuccess/VerifyEmailSuccess"
            )
        ),
      },
      {
        path: RoutePaths.VerifyEmailFail,
        component: lazy(
          () =>
            import(
              "src/modules/agent/pages/auth/verifyEmailFail/VerifyEmailFail"
            )
        ),
      },
    ],
  },
];

export default appRootRoutes;
