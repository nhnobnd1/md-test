import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import AgentRoutePaths from "src/modules/agent/routes/paths";

const agentRoutes: IRoute = {
  path: AgentRoutePaths.Index,
  title: "Agents",
  component: lazy(() => import("src/layouts/MainLayout")),

  routes: [
    {
      path: AgentRoutePaths.Index,
      index: true,
      component: lazy(() => import("src/modules/agent/pages/Index")),
    },
    {
      path: AgentRoutePaths.Create,
      component: lazy(() => import("src/modules/agent/pages/CreateAgent")),
    },
    {
      path: AgentRoutePaths.Detail,
      component: lazy(() => import("src/modules/agent/pages/DetailAgent")),
    },
  ],
};

export default agentRoutes;
