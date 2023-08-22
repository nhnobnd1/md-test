import agentBetaLocales from "@moose-beta/agentBeta/locales";
import AgentBetaRoutePaths from "@moose-beta/agentBeta/routes/paths";

declare global {
  interface RoutePaths {
    AgentBeta: typeof AgentBetaRoutePaths;
  }

  interface Localizations {
    agentBeta: typeof agentBetaLocales.en & typeof agentBetaLocales.vi;
  }
}
