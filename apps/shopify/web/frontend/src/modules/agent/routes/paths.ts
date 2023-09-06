import { createRoutePath } from "@moose-desk/core";

const AgentRoutePaths = createRoutePath({
  Index: "settings/people/agent",
  Create: "new",
  Detail: "detail",
} as const);

export default AgentRoutePaths;
