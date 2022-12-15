import agentLocales from "src/modules/agent/locales";
import { agentReducer } from "src/modules/agent/redux";
import AgentRoutePaths from "src/modules/agent/routes/paths";

declare global {
  interface ModulesReducers {
    agent: typeof agentReducer;
  }

  interface RoutePaths {
    Agent: typeof AgentRoutePaths;
  }

  interface Localizations {
    agent: typeof agentLocales.en & typeof agentLocales.vi;
  }
}
