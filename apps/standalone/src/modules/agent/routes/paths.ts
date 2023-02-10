import { createRoutePath } from "@moose-desk/core";

const AgentRoutePaths = createRoutePath({
  Index: "agent",
  Agents: {
    Index: "",
    New: "new",
    Detail: ":id",
  },
} as const);

export default AgentRoutePaths;
