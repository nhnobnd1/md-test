import { lazy } from "react";
import { IRoute } from "src/core/models/routes";
import SettingRoutePaths from "src/modules/setting/routes/paths";

const settingRoutes: IRoute = {
  path: SettingRoutePaths.Index,
  title: "Setting",
  showInNavigationMenu: true,
  routes: [
    {
      path: SettingRoutePaths.Index,
      index: true,
      component: lazy(() => import("src/modules/setting/pages/Index")),
    },
  ],
};

export default settingRoutes;
