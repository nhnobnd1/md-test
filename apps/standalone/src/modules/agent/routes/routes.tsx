import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import AgentRoutePaths from "src/modules/agent/routes/paths";

const agentRoutes: IRoute = {
  path: AgentRoutePaths.Index,
  showInNavigationMenu: false,
  component: lazy(() => import("src/layouts/MainLayout/MainLayout")),
  routes: [
    {
      path: AgentRoutePaths.Index,
      index: true,
      component: lazy(() => import("src/modules/agent/pages/Index")),
    },
    {
      path: AgentRoutePaths.OnBoarding,
      component: lazy(
        () => import("src/modules/agent/pages/auth/onBoarding/OnBoarding")
      ),
    },
    {
      path: AgentRoutePaths.Login,
      component: lazy(
        () => import("src/modules/agent/pages/auth/signIn/SignIn")
      ),
    },
    {
      path: AgentRoutePaths.ForgotPassword,
      component: lazy(
        () =>
          import("src/modules/agent/pages/auth/forgotPassword/ForgotPassword")
      ),
    },
    {
      path: AgentRoutePaths.ResetPassword,
      component: lazy(
        () => import("src/modules/agent/pages/auth/resetPassword/ResetPassword")
      ),
    },
  ],
};

export default agentRoutes;
