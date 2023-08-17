import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";

const settingChannelRoutes: IRoute = {
  path: SettingChannelRoutePaths.Index,
  title: "SettingChannel",
  component: lazy(() => import("src/layouts/MainLayout")),

  routes: [
    {
      path: SettingChannelRoutePaths.Index,
      index: true,
      component: lazy(() => import("src/modules/settingChannel/pages/Index")),
    },
    // for review
    // {
    //   path: SettingChannelRoutePaths.ChannelEmail.Index,
    //   component: lazy(
    //     () =>
    //       import("src/modules/settingChannel/pages/channelEmail/ChannelEmail")
    //   ),
    // },
    {
      path: SettingChannelRoutePaths.Widgets.Index,
      component: lazy(
        () => import("src/modules/settingChannel/pages/widgets/Widgets")
      ),
    },
  ],
};

export default settingChannelRoutes;
