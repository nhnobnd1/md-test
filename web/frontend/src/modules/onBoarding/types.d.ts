import onBoardingLocales from "src/modules/onBoarding/locales";
import { onBoardingReducer } from "src/modules/onBoarding/redux";
import OnBoardingRoutePaths from "src/modules/onBoarding/routes/paths";

declare global {
  interface ModulesReducers {
    onBoarding: typeof onBoardingReducer;
  }

  interface RoutePaths {
    OnBoarding: typeof OnBoardingRoutePaths;
  }

  interface Localizations {
    onBoarding: typeof onBoardingLocales.en & typeof onBoardingLocales.vi;
  }
}
