import { IRoute } from "@moose-desk/core";
import { SettingsMajor } from "@shopify/polaris-icons";
import { lazy } from "react";
import StorageManager from "src/core/utilities/StorageManager";
import OnBoardingRoutePaths from "src/modules/onBoarding/routes/paths";
import ReportRoutePaths from "src/modules/report/routes/paths";
const reportRoutes: IRoute = {
  path: ReportRoutePaths.Index,
  title: "Report",
  // showInNavigationMenu: false,
  middleware: (route, navigate) => {
    if (StorageManager.getToken("isAcceptUsing")) {
      return true;
    } else {
      navigate(OnBoardingRoutePaths.Index);
      return false;
    }
  },
  navigation: {
    icon: () => <SettingsMajor />,
  },
  component: lazy(() => import("src/layouts/MainLayout")),
  routes: [
    {
      path: ReportRoutePaths.Overview,
      index: true,
      component: lazy(() => import("src/modules/report/pages/Index")),
    },
    {
      path: ReportRoutePaths.ByAgent,
      component: lazy(() => import("src/modules/report/pages/ByAgent")),
    },
    {
      path: ReportRoutePaths.ByTags,
      component: lazy(() => import("src/modules/report/pages/ByTags")),
    },
  ],
};

export default reportRoutes;
