import createRoutePath from "src/core/routes/createRoutePath";

const AgentRoutePaths = createRoutePath({
  Index: "settings/people/agent",
  Create: "new",
  Detail: ":id",
} as const);

export default AgentRoutePaths;
