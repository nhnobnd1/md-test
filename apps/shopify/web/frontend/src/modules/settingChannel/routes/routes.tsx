import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import StorageManager from "src/core/utilities/StorageManager";
import OnBoardingRoutePaths from "src/modules/onBoarding/routes/paths";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";

const settingChannelRoutes: IRoute = {
  path: SettingChannelRoutePaths.Index,
  title: "SettingChannel",
  component: lazy(() => import("src/layouts/MainLayout")),
  middleware: (route, navigate) => {
    if (StorageManager.getToken("isAcceptUsing")) {
      return true;
    } else {
      navigate(OnBoardingRoutePaths.Index);
      return false;
    }
  },
  routes: [
    {
      path: SettingChannelRoutePaths.Index,
      index: true,
      component: lazy(() => import("src/modules/settingChannel/pages/Index")),
    },
    {
      path: SettingChannelRoutePaths.ChannelEmail.Index,
      component: lazy(
        () =>
          import("src/modules/settingChannel/pages/channelEmail/ChannelEmail")
      ),
    },
    {
      path: SettingChannelRoutePaths.ChannelEmail.Create,
      component: lazy(
        () =>
          import(
            "src/modules/settingChannel/pages/channelEmail/ChannelEmailCreate"
          )
      ),
    },
    {
      path: SettingChannelRoutePaths.ChannelEmail.Update,
      component: lazy(
        () =>
          import(
            "src/modules/settingChannel/pages/channelEmail/ChannelEmailUpdate"
          )
      ),
    },
    {
      path: SettingChannelRoutePaths.EmailIntegration,
      component: lazy(
        () =>
          import(
            "src/modules/settingChannel/pages/channelEmail/ChannelEmailIntegration"
          )
      ),
    },
    {
      path: SettingChannelRoutePaths.MicrosoftIntegration,
      component: lazy(
        () =>
          import(
            "src/modules/settingChannel/pages/channelEmail/ChannelOutlookIntegration"
          )
      ),
    },
  ],
};

export default settingChannelRoutes;
