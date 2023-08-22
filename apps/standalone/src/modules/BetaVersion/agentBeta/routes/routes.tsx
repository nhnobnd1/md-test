import AgentBetaRoutePaths from "@moose-beta/agentBeta/routes/paths";
import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import { AppLayout } from "src/layouts/AppLayout";

const agentBetaRoutes: IRoute = {
  path: AgentBetaRoutePaths.Index,
  title: "AgentBeta",
  showInNavigationMenu: true,
  middleware: "user",
  element: <AppLayout />,
  routes: [
    {
      path: AgentBetaRoutePaths.Index,
      index: true,
      component: lazy(() => import("@moose-beta/agentBeta/pages/Index")),
    },
  ],
};

export default agentBetaRoutes;
