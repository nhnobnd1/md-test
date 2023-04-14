import { Module } from "@moose-desk/core";
import reportLocales from "src/modules/report/locales";
import ReportRoutePaths from "src/modules/report/routes/paths";
import reportRoutes from "src/modules/report/routes/routes";

const module: Module = {
  name: "Report",
  route: {
    item: reportRoutes,
    paths: ReportRoutePaths,
  },
  locales: reportLocales,
};

export default module;
