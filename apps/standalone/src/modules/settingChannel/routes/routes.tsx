import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";

const settingChannelRoutes: IRoute = {
  path: SettingChannelRoutePaths.Index,
  showInNavigationMenu: false,
  component: lazy(() => import("src/layouts/AppLayout/AppLayout")),
  routes: [
    {
      path: SettingChannelRoutePaths.Index,
      index: true,
      middleware: "user",
      component: lazy(() => import("src/modules/settingChannel/pages/Index")),
    },
    {
      path: SettingChannelRoutePaths.ChannelEmail.Index,
      middleware: "user",
      component: lazy(
        () =>
          import("src/modules/settingChannel/pages/ChannelEmail/ChannelEmail")
      ),
    },
    {
      path: SettingChannelRoutePaths.ChannelEmail.Create,
      middleware: "user",
      component: lazy(
        () =>
          import(
            "src/modules/settingChannel/pages/ChannelEmail/ChannelEmailCreate"
          )
      ),
    },
    {
      path: SettingChannelRoutePaths.ChannelEmail.Update,
      middleware: "user",
      component: lazy(
        () =>
          import(
            "src/modules/settingChannel/pages/ChannelEmail/ChannelEmailUpdate"
          )
      ),
    },
    {
      path: SettingChannelRoutePaths.EmailIntegration,
      component: lazy(
        () =>
          import(
            "src/modules/settingChannel/pages/ChannelEmail/ChannelEmailIntegration"
          )
      ),
    },
  ],
};

export default settingChannelRoutes;
