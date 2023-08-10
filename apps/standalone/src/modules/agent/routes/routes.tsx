import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import { lazyRetry } from "src/helper";
import { AppLayout } from "src/layouts/AppLayout";
import AgentRoutePaths from "src/modules/agent/routes/paths";

const agentRoutes: IRoute = {
  path: AgentRoutePaths.Index,
  showInNavigationMenu: false,
  element: <AppLayout />,
  routes: [
    {
      path: AgentRoutePaths.Agents.Index,
      middleware: "user",
      routes: [
        {
          path: AgentRoutePaths.Agents.Index,
          component: lazy(() =>
            lazyRetry(() => import("src/modules/agent/pages/agents/Index"))
          ),
        },
      ],
    },
  ],
};

export default agentRoutes;
