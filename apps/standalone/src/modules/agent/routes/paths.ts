import { createRoutePath } from "@moose-desk/core";

const AgentRoutePaths = createRoutePath({
  Index: "agent",
  Login: "login",
  OnBoarding: "invitation",
  ForgotPassword: "forgot-password",
  ResetPassword: "reset-password",
} as const);

export default AgentRoutePaths;
