import { MarketingMinor } from "@shopify/polaris-icons";
import { lazy } from "react";
import { IRoute } from "src/core/models/routes";
import AgentRoutePaths from "src/modules/agent/routes/paths";

const agentRoutes: IRoute = {
  path: AgentRoutePaths.Index,
  title: "Agent",
  showInNavigationMenu: true,
  component: lazy(() => import("src/layouts/MainLayout")),
  navigation: {
    icon: () => <MarketingMinor />,
  },
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
