import { createRoutePath } from "@moose-desk/core";

const OnBoardingRoutePaths = createRoutePath({
  Index: "on-boarding",
  Child: "child",
} as const);

export default OnBoardingRoutePaths;
