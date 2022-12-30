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
    {
      path: SettingRoutePaths.Index,
      index: true,
      component: lazy(() => import("src/modules/setting/pages/Index")),
    },
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
      path: SettingRoutePaths.AccountSecurity.Index,
      component: lazy(
        () =>
          import(
            "src/modules/setting/pages/account&Security/IndexAccountManager"
          )
      ),
    },
    {
      path: SettingRoutePaths.AccountSecurity.Index,
      component: lazy(
        () =>
          import(
            "src/modules/setting/pages/account&Security/IndexAccountManager"
          )
      ),
    },
    {
      path: SettingRoutePaths.AccountSecurity.Index,
      component: lazy(
        () =>
          import(
            "src/modules/setting/pages/account&Security/IndexAccountManager"
          )
      ),
    },
  ],
};

export default settingRoutes;
