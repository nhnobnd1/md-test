import agentLocales from "src/modules/agent/locales";
import AgentRoutePaths from "src/modules/agent/routes/paths";
import agentRoutes from "src/modules/agent/routes/routes";

const module: Module = {
  name: "Agent",
  route: {
    item: agentRoutes,
    paths: AgentRoutePaths,
  },
  locales: agentLocales,
};

export default module;
