import { Module } from "@moose-desk/core";
import onBoardingLocales from "src/modules/onBoarding/locales";
import OnBoardingRoutePaths from "src/modules/onBoarding/routes/paths";
import onBoardingRoutes from "src/modules/onBoarding/routes/routes";

const module: Module = {
  name: "OnBoarding",
  route: {
    item: onBoardingRoutes,
    paths: OnBoardingRoutePaths,
  },
  locales: onBoardingLocales,
};

export default module;
