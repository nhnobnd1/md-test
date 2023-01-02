import { IRoute } from "@moose-desk/core";
import { MarketingMinor } from "@shopify/polaris-icons";
import { lazy } from "react";
import StorageManager from "src/core/utilities/StorageManager";
import AgentRoutePaths from "src/modules/agent/routes/paths";
import OnBoardingRoutePaths from "src/modules/onBoarding/routes/paths";

const agentRoutes: IRoute = {
  path: AgentRoutePaths.Index,
  title: "Agent",
  component: lazy(() => import("src/layouts/MainLayout")),
  middleware: (route, navigate) => {
    if (StorageManager.getToken("isAcceptUsing")) {
      return true;
    } else {
      navigate(OnBoardingRoutePaths.Index);
      return false;
    }
  },
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
