import { IRoute } from "@moose-desk/core";
import { HomeMinor } from "@shopify/polaris-icons";
import { lazy } from "react";
import StorageManager from "src/core/utilities/StorageManager";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";
import OnBoardingRoutePaths from "src/modules/onBoarding/routes/paths";

const dashboardRoutes: IRoute = {
  path: DashboardRoutePaths.Index,
  title: "Home",
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
    icon: () => <HomeMinor />,
  },
  routes: [
    {
      path: DashboardRoutePaths.Index,
      index: true,
      component: lazy(() => import("src/modules/dashboard/pages/Index")),
    },
  ],
};

export default dashboardRoutes;
