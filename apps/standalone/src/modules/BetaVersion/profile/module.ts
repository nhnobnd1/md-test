import { Module } from "@moose-desk/core";
import customerLocales from "src/modules/BetaVersion/profile/locales";
import CustomerRoutePaths from "src/modules/BetaVersion/profile/routes/paths";
import customerRoutes from "src/modules/BetaVersion/profile/routes/routes";

const module: Module = {
  name: "Profile",
  route: {
    item: customerRoutes,
    paths: CustomerRoutePaths,
  },
  locales: customerLocales,
};

export default module;
