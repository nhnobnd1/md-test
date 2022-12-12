import { lazy } from "react";
import { IRoute } from "src/core/models/routes";
import OnBoardingRoutePaths from "src/modules/onBoarding/routes/paths";

const onBoardingRoutes: IRoute = {
  path: OnBoardingRoutePaths.Index,
  title: "OnBoarding",
  showInNavigationMenu: false,
  routes: [
    {
      path: OnBoardingRoutePaths.Index,
      index: true,
      component: lazy(() => import("src/modules/onBoarding/pages/Index")),
    },
  ],
};

export default onBoardingRoutes;
