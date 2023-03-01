import reportLocales from "src/modules/report/locales";
import ReportRoutePaths from "src/modules/report/routes/paths";

declare global {
  interface RoutePaths {
    Report: typeof ReportRoutePaths;
  }

  interface Localizations {
    report: typeof reportLocales.en & typeof reportLocales.vi;
  }
}
