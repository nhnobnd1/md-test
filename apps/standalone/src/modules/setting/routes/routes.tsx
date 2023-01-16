import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import SettingRoutePaths from "src/modules/setting/routes/paths";

const settingRoutes: IRoute = {
  path: SettingRoutePaths.Index,
  title: "Setting",
  showInNavigationMenu: true,
  middleware: "user",
  component: lazy(() => import("src/layouts/AppLayout/AppLayout")),
  routes: [
    // tag
    {
      path: SettingRoutePaths.Workdesk.Tag.Index,
      component: lazy(
        () => import("src/modules/setting/pages/workDesk/tag/IndexTag")
      ),
    },
    // account & security
    // {
    //   path: SettingRoutePaths.AccountSecurity.Index,
    //   component: lazy(
    //     () =>
    //       import(
    //         "src/modules/setting/pages/account&Security/IndexProfileManager"
    //       )
    //   ),
    // },
    // {
    //   path: SettingRoutePaths.AccountSecurity.AccessManager.Index,
    //   component: lazy(
    //     () =>
    //       import(
    //         "src/modules/setting/pages/account&Security/IndexAccountManager"
    //       )
    //   ),
    // },
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
