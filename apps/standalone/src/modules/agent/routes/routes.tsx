import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import { AppLayout } from "src/layouts/AppLayout";
import BlankLayout from "src/layouts/BlankLayout";
import AgentRoutePaths from "src/modules/agent/routes/paths";

const agentRoutes: IRoute = {
  path: AgentRoutePaths.Index,
  showInNavigationMenu: false,
  element: <BlankLayout />,
  routes: [
    {
      path: AgentRoutePaths.Agents.Index,
      element: <AppLayout />,
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
