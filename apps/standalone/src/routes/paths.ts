import { createRoutePath } from "@moose-desk/core";

const DefaultRoutes = createRoutePath({
  Index: "",
  Login: "login",
  OnBoarding: "invitation",
  ForgotPassword: "forgot-password",
  ResetPassword: "reset-password",
  VerifyEmailSuccess: "sender-verification-successful",
  VerifyEmailFail: "sender-verification-failure",
} as const);

const RoutePaths = {
  ...DefaultRoutes,
} as unknown as RoutePaths & typeof DefaultRoutes;

export default RoutePaths;
