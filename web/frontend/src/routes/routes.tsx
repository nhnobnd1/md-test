import { IRoute } from "src/core/models/routes";
import RoutePaths from "src/routes/paths";

const appRootRoutes: IRoute[] = [
  {
    path: RoutePaths.Index,
    title: "Index page",
    showInNavigationMenu: false,
    index: true,
    element: <></>,
  },
];

export default appRootRoutes;
