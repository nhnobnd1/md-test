import agentBetaLocales from "@moose-beta/agentBeta/locales";
import AgentBetaRoutePaths from "@moose-beta/agentBeta/routes/paths";
import agentBetaRoutes from "@moose-beta/agentBeta/routes/routes";
import { Module } from "@moose-desk/core";

const module: Module = {
  name: "AgentBeta",
  route: {
    item: agentBetaRoutes,
    paths: AgentBetaRoutePaths,
  },
  locales: agentBetaLocales,
};

export default module;
