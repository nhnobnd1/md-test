import { Module } from "@moose-desk/core";
import settingChannelLocales from "src/modules/settingChannel/locales";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";
import settingChannelRoutes from "src/modules/settingChannel/routes/routes";
import { store } from "./redux";

const module: Module = {
  name: "SettingChannel",
  route: {
    item: settingChannelRoutes,
    paths: SettingChannelRoutePaths,
  },
  locales: settingChannelLocales,
  store: store,
};

export default module;
