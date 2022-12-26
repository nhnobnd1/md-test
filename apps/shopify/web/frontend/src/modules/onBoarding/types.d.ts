import onBoardingLocales from "src/modules/onBoarding/locales";
import OnBoardingRoutePaths from "src/modules/onBoarding/routes/paths";

declare global {
  interface RoutePaths {
    OnBoarding: typeof OnBoardingRoutePaths;
  }

  interface Localizations {
    onBoarding: typeof onBoardingLocales.en & typeof onBoardingLocales.vi;
  }
}
