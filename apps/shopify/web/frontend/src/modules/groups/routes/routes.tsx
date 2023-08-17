import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import GroupsRoutePaths from "src/modules/groups/routes/paths";

const groupsRoutes: IRoute = {
  path: GroupsRoutePaths.Index,
  title: "Groups",
  component: lazy(() => import("src/layouts/MainLayout")),

  routes: [
    {
      path: GroupsRoutePaths.Index,
      index: true,
      component: lazy(() => import("src/modules/groups/pages/Index")),
    },
    {
      path: GroupsRoutePaths.Create,
      component: lazy(() => import("src/modules/groups/pages/CreateGroup")),
    },
    {
      path: GroupsRoutePaths.Detail,
      component: lazy(() => import("src/modules/groups/pages/DetailGroup")),
    },
  ],
};

export default groupsRoutes;
