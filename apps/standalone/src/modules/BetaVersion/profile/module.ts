import { Module } from "@moose-desk/core";
import profileLocales from "src/modules/BetaVersion/profile/locales";
import ProfileRoutePaths from "src/modules/BetaVersion/profile/routes/paths";
import profileRoutes from "src/modules/BetaVersion/profile/routes/routes";

const module: Module = {
  name: "Profile",
  route: {
    item: profileRoutes,
    paths: ProfileRoutePaths,
  },
  locales: profileLocales,
};

export default module;
