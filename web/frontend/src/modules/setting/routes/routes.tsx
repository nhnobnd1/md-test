import { lazy } from "react";
import { IRoute } from "src/core/models/routes";
import SettingRoutePaths from "src/modules/setting/routes/paths";

const settingRoutes: IRoute = {
  path: SettingRoutePaths.Index,
  title: "Setting",
  showInNavigationMenu: true,
  component: lazy(() => import("src/layouts/MainLayout")),
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
        () => import("src/modules/setting/pages/workDesk/tag/IndexTag")
      ),
      routes: [
        {
          path: SettingRoutePaths.Workdesk.Tag.Index,
          title: "Tag",
          showInNavigationMenu: true,
          component: lazy(
            () => import("src/modules/setting/pages/workDesk/tag/IndexTag")
          ),
        },
        {
          path: SettingRoutePaths.Workdesk.Tag.Create,
          component: lazy(
            () => import("src/modules/setting/pages/workDesk/tag/CreateTag")
          ),
        },
        {
          path: SettingRoutePaths.Workdesk.Tag.Edit,
          component: lazy(
            () => import("src/modules/setting/pages/workDesk/tag/IndexTag")
          ),
        },
      ],
    },
  ],
};

export default settingRoutes;
