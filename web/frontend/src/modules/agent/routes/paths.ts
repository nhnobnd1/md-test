import createRoutePath from "src/core/routes/createRoutePath";

const AgentRoutePaths = createRoutePath({
  Index: "agent",
  Create: "agent/new",
  Detail: "agent/:id",
} as const);

export default AgentRoutePaths;
