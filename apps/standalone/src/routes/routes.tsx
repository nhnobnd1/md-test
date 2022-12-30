import { IRoute } from "@moose-desk/core";
import RedirectPage from "src/pages/RedirectPage";
import RoutePaths from "src/routes/paths";

const appRootRoutes: IRoute[] = [
  {
    path: RoutePaths.Index,
    title: "Index page",
    element: <RedirectPage />,
    index: true,
  },
];

export default appRootRoutes;
