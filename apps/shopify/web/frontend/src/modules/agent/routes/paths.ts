import { createRoutePath } from "@moose-desk/core";

const AgentRoutePaths = createRoutePath({
  // for review
  // Index: "settings/people/agent",
  Index: "dashboard",

  // Create: "new",
  // Detail: ":id",
} as const);

export default AgentRoutePaths;
