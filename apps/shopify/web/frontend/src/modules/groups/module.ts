import groupsLocales from "src/modules/groups/locales";
import GroupsRoutePaths from "src/modules/groups/routes/paths";
import groupsRoutes from "src/modules/groups/routes/routes";

const module: Module = {
  name: "Groups",
  route: {
    item: groupsRoutes,
    paths: GroupsRoutePaths,
  },
  locales: groupsLocales,
};

export default module;
