import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import { MainLayout } from "src/layouts/MainLayout";
import AgentRoutePaths from "src/modules/agent/routes/paths";

const agentRoutes: IRoute = {
  path: AgentRoutePaths.Index,
  showInNavigationMenu: false,
  element: <MainLayout />,
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
  ],
};

export default agentRoutes;
