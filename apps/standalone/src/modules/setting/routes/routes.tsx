import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import { AppLayout } from "src/layouts/AppLayout";
import SettingRoutePaths from "src/modules/setting/routes/paths";

const settingRoutes: IRoute = {
  path: SettingRoutePaths.Index,
  title: "Setting",
  showInNavigationMenu: true,
  middleware: "user",
  element: <AppLayout />,
  routes: [
    // tag
    {
      path: SettingRoutePaths.Workdesk.Tag.Index,
      component: lazy(
        () => import("src/modules/setting/pages/workDesk/tag/IndexTag")
      ),
    },
    {
      path: SettingRoutePaths.Workdesk.Tag.DetailViewTicket,
      component: lazy(
        () =>
          import("src/modules/setting/pages/workDesk/tag/ViewTicket/ViewTicket")
      ),
    },
    // account & security
    {
      path: SettingRoutePaths.AccountSecurity.Profile.Index,
      component: lazy(
        () =>
          import(
            "src/modules/setting/pages/account&Security/IndexProfileManager"
          )
      ),
    },
    {
      path: SettingRoutePaths.AccountSecurity.AccessManager.Index,
      middleware: "admin",
      component: lazy(
        () =>
          import(
            "src/modules/setting/pages/account&Security/IndexAccountManager"
          )
      ),
    },
    {
      path: SettingRoutePaths.AccountSecurity.Security.Index,
      component: lazy(
        () => import("src/modules/setting/pages/account&Security/IndexSecurity")
      ),
    },
    // genaral setting
    {
      path: SettingRoutePaths.GenaralSetting.BusinessHours.Index,
      middleware: "admin",
      component: lazy(
        () =>
          import(
            "src/modules/setting/pages/genaralSetting/BusinessHours/BusinessHours"
          )
      ),
    },
  ],
};

export default settingRoutes;
