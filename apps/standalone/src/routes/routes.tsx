import { IRoute } from "@moose-desk/core";
import RoutePaths from "src/routes/paths";

const appRootRoutes: IRoute[] = [
  {
    path: RoutePaths.Index,
    title: "Index page",
    index: true,
  },
];

export default appRootRoutes;
