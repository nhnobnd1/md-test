import { SettingsMajor } from "@shopify/polaris-icons";
import { lazy } from "react";
import { IRoute } from "src/core/models/routes";
import SettingRoutePaths from "src/modules/setting/routes/paths";

const settingRoutes: IRoute = {
  path: SettingRoutePaths.Index,
  title: "Setting",
  showInNavigationMenu: true,
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
      title: "Workdesk",
      showInNavigationMenu: true,
      component: lazy(
        () => import("src/modules/setting/pages/workDesk/Tag/IndexTag")
      ),
      routes: [
        {
          path: SettingRoutePaths.Workdesk.Tag.Index,
          title: "Tag",
          showInNavigationMenu: true,
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
            () => import("src/modules/setting/pages/workDesk/Tag/IndexTag")
          ),
        },
      ],
    },
  ],
};

export default settingRoutes;
