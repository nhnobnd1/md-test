import { createRoutePath } from "@moose-desk/core";

const AgentRoutePaths = createRoutePath({
  Index: "agent",
  Detail: "detail",
} as const);

export default AgentRoutePaths;
