import { IRoute } from "@moose-desk/core";
import { SettingsMajor } from "@shopify/polaris-icons";
import { lazy } from "react";
import SettingRoutePaths from "src/modules/setting/routes/paths";

const settingRoutes: IRoute = {
  path: SettingRoutePaths.Index,
  title: "Setting",
  component: lazy(() => import("src/layouts/MainLayout")),

  navigation: {
    icon: () => <SettingsMajor />,
  },
  routes: [
    // genaral setting
    {
      path: SettingRoutePaths.GenaralSetting.BusinessHours.Index,
      component: lazy(
        () =>
          import(
            "src/modules/setting/pages/genaralSetting/BusinessHours/BusinessHours"
          )
      ),
    },
    // tag
    {
      path: SettingRoutePaths.Workdesk.Tag.Index,
      component: lazy(
        () => import("src/modules/setting/pages/workDesk/Tag/IndexTag")
      ),
    },
    {
      path: SettingRoutePaths.Workdesk.Tag.Create,
      component: lazy(
        () => import("src/modules/setting/pages/workDesk/Tag/CreateTag")
      ),
    },
    {
      path: SettingRoutePaths.Workdesk.Tag.Edit,
      component: lazy(
        () => import("src/modules/setting/pages/workDesk/Tag/EditTag")
      ),
    },
    {
      path: SettingRoutePaths.Workdesk.Tag.Edit,
      component: lazy(
        () => import("src/modules/setting/pages/workDesk/Tag/EditTag")
      ),
    },
    {
      path: SettingRoutePaths.Workdesk.Tag.ViewTicket,
      component: lazy(
        () => import("src/modules/setting/pages/workDesk/Tag/ViewTicket")
      ),
    },

    // account & security
    // {
    //   path: SettingRoutePaths.AccountSecurity.Profile.Index,
    //   component: lazy(
    //     () =>
    //       import(
    //         "src/modules/setting/pages/account&Security/IndexProfileManager"
    //       )
    //   ),
    // },
    {
      path: SettingRoutePaths.AccountSecurity.AccessManager.Index,
      component: lazy(
        () =>
          import(
            "src/modules/setting/pages/account&Security/IndexAccountManager"
          )
      ),
    },
    // {
    //   path: SettingRoutePaths.AccountSecurity.Security.Index,
    //   component: lazy(
    //     () =>
    //       import(
    //         "src/modules/setting/pages/account&Security/IndexSecurityManager"
    //       )
    //   ),
    // },
  ],
};

export default settingRoutes;
