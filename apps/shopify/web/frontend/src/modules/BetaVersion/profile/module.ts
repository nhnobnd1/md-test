<<<<<<< HEAD
import ProfileBetaRoutePath from "@moose-beta/profile/routes/paths";
import profileRoutes from "@moose-beta/profile/routes/routes";
import { Module } from "@moose-desk/core";
import profileLocales from "src/modules/BetaVersion/profile/locales";

const module: Module = {
  name: "ProfileBeta",
  route: {
    item: profileRoutes,
    paths: ProfileBetaRoutePath,
=======
import profileLocales from "@moose-beta/profile/locales";
import ProfileRoutePaths from "@moose-beta/profile/routes/paths";
import { Module } from "@moose-desk/core";

import profileRoutes from "src/modules/customers/routes/routes";

const module: Module = {
  name: "profiles",
  route: {
    item: profileRoutes,
    paths: ProfileRoutePaths,
>>>>>>> 3d619f24 (save: begta)
  },
  locales: profileLocales,
};

export default module;
