import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import { AppLayout } from "src/layouts/AppLayout";
import AgentRoutePaths from "src/modules/agent/routes/paths";

const agentRoutes: IRoute = {
  path: AgentRoutePaths.Index,
  showInNavigationMenu: false,
  title: "Agents",
  middleware: "user",
  element: <AppLayout />,
  routes: [
    {
      path: AgentRoutePaths.Index,
      component: lazy(() => import("src/modules/agent/pages/agents/Index")),
      index: true,
    },
    {
      path: AgentRoutePaths.Detail,
      index: true,
      component: lazy(() => import("@moose-beta/agentBeta/pages/Index")),
    },
  ],
};

export default agentRoutes;
