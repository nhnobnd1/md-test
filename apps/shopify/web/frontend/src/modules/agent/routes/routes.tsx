import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import StorageManager from "src/core/utilities/StorageManager";
import AgentRoutePaths from "src/modules/agent/routes/paths";
import OnBoardingRoutePaths from "src/modules/onBoarding/routes/paths";

const agentRoutes: IRoute = {
  path: AgentRoutePaths.Index,
  title: "Agents",
  component: lazy(() => import("src/layouts/MainLayout")),
  middleware: (route, navigate) => {
    if (StorageManager.getToken("isAcceptUsing")) {
      return true;
    } else {
      navigate(OnBoardingRoutePaths.Index);
      return false;
    }
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
