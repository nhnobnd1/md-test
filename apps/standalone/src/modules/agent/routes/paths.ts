import { createRoutePath } from "@moose-desk/core";

const AgentRoutePaths = createRoutePath({
  Index: "agent",
  Login: "login",
  OnBoarding: "invitation",
} as const);

export default AgentRoutePaths;
