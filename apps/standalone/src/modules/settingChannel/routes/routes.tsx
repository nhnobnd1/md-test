import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import { AppLayout } from "src/layouts/AppLayout";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";

const settingChannelRoutes: IRoute = {
  path: SettingChannelRoutePaths.Index,
  showInNavigationMenu: false,
  element: <AppLayout />,
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
      path: SettingChannelRoutePaths.Widgets.Index,
      middleware: "user",
      component: lazy(
        () => import("src/modules/settingChannel/pages/Widgets/Widgets")
      ),
    },
    {
      path: SettingChannelRoutePaths.Widgets.Update,
      middleware: "user",
      component: lazy(
        () => import("src/modules/settingChannel/pages/Widgets/WidgetDetail")
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
    {
      path: SettingChannelRoutePaths.MicrosoftIntegration,
      component: lazy(
        () =>
          import(
            "src/modules/settingChannel/pages/ChannelEmail/ChannelOutlookIntegration"
          )
      ),
    },
    {
      path: SettingChannelRoutePaths.ChannelEmail.Redirect,
      component: lazy(
        () =>
          import(
            "src/modules/settingChannel/pages/ChannelEmail/ChannelEmailRedirect"
          )
      ),
    },
  ],
};

export default settingChannelRoutes;
