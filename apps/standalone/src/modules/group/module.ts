import groupLocales from "src/modules/group/locales";
import GroupRoutePaths from "src/modules/group/routes/paths";
import groupRoutes from "src/modules/group/routes/routes";

const module: Module = {
  name: "Group",
  route: {
    item: groupRoutes,
    paths: GroupRoutePaths,
  },
  locales: groupLocales,
};

export default module;
