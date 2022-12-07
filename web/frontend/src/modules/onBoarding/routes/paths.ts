import createRoutePath from "src/core/routes/createRoutePath";

const OnBoardingRoutePaths = createRoutePath({
  Index: "on-boarding",
  Child: "child",
} as const);

export default OnBoardingRoutePaths;
