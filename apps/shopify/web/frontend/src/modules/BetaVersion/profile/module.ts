import ProfileBetaRoutePath from "@moose-beta/profile/routes/paths";
import profileRoutes from "@moose-beta/profile/routes/routes";
import { Module } from "@moose-desk/core";
import profileLocales from "src/modules/BetaVersion/profile/locales";

const module: Module = {
  name: "ProfileBeta",
  route: {
    item: profileRoutes,
    paths: ProfileBetaRoutePath,
  },
  locales: profileLocales,
};

export default module;
