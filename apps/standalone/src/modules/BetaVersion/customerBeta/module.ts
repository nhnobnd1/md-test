import { Module } from "@moose-desk/core";
import customerBetaLocales from "src/modules/BetaVersion/customerBeta/locales";
import CustomerBetaRoutePaths from "src/modules/BetaVersion/customerBeta/routes/paths";
import customerBetaRoutes from "src/modules/BetaVersion/customerBeta/routes/routes";

const module: Module = {
  name: "CustomerBeta",
  route: {
    item: customerBetaRoutes,
    paths: CustomerBetaRoutePaths,
  },
  locales: customerBetaLocales,
};

export default module;
