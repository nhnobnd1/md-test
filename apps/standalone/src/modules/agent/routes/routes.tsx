import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import AgentRoutePaths from "src/modules/agent/routes/paths";

const agentRoutes: IRoute = {
  path: AgentRoutePaths.Index,
  showInNavigationMenu: false,
  component: lazy(() => import("src/layouts/BlankLayout")),
  routes: [
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
