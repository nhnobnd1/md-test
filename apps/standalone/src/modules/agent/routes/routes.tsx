import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import AgentRoutePaths from "src/modules/agent/routes/paths";

const agentRoutes: IRoute = {
  path: AgentRoutePaths.Index,
  showInNavigationMenu: false,
  component: lazy(() => import("src/layouts/BlankLayout")),
  routes: [
    {
      path: AgentRoutePaths.Index,
      component: lazy(() => import("src/layouts/MainLayout/MainLayout")),
      routes: [
        {
          path: AgentRoutePaths.Login,
          component: lazy(
            () => import("src/modules/agent/pages/auth/signIn/SignIn")
          ),
        },
        {
          path: AgentRoutePaths.OnBoarding,
          component: lazy(
            () => import("src/modules/agent/pages/auth/onBoarding/OnBoarding")
          ),
        },
        {
          path: AgentRoutePaths.ForgotPassword,
          component: lazy(
            () =>
              import(
                "src/modules/agent/pages/auth/forgotPassword/ForgotPassword"
              )
          ),
        },
        {
          path: AgentRoutePaths.ResetPassword,
          component: lazy(
            () =>
              import("src/modules/agent/pages/auth/resetPassword/ResetPassword")
          ),
        },
      ],
    },
    {
      path: AgentRoutePaths.Agents.Index,
      component: lazy(() => import("src/layouts/AppLayout/AppLayout")),
      middleware: "user",
      routes: [
        {
          path: AgentRoutePaths.Agents.Index,
          component: lazy(() => import("src/modules/agent/pages/agents/Index")),
        },
      ],
    },
  ],
};

export default agentRoutes;
