import agentLocales from "src/modules/agent/locales";
import AgentRoutePaths from "src/modules/agent/routes/paths";

declare global {
  interface RoutePaths {
    Agent: typeof AgentRoutePaths;
  }

  interface Localizations {
    agent: typeof agentLocales.en & typeof agentLocales.vi;
  }
}
