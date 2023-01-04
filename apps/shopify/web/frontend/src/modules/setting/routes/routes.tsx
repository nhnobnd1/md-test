import { IRoute } from "@moose-desk/core";
import { SettingsMajor } from "@shopify/polaris-icons";
import { lazy } from "react";
import StorageManager from "src/core/utilities/StorageManager";
import OnBoardingRoutePaths from "src/modules/onBoarding/routes/paths";
import SettingRoutePaths from "src/modules/setting/routes/paths";

const settingRoutes: IRoute = {
  path: SettingRoutePaths.Index,
  title: "Setting",
  component: lazy(() => import("src/layouts/MainLayout")),
  middleware: (route, navigate) => {
    if (StorageManager.getToken("isAcceptUsing")) {
      return true;
    } else {
      navigate(OnBoardingRoutePaths.Index);
      return false;
    }
  },
  navigation: {
    icon: () => <SettingsMajor />,
  },
  routes: [
    {
      path: SettingRoutePaths.Index,
      index: true,
      component: lazy(() => import("src/modules/setting/pages/Index")),
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
    // account & security
    {
      path: SettingRoutePaths.AccountSecurity.Index,
      component: lazy(
        () =>
          import(
            "src/modules/setting/pages/account&Security/IndexProfileManager"
          )
      ),
    },
    {
      path: SettingRoutePaths.AccountSecurity.AccessManager,
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
