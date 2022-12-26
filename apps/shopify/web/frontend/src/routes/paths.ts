import { createRoutePath } from "@moose-desk/core";

const DefaultRoutes = createRoutePath({
  Index: "",
} as const);

const RoutePaths = {
  ...DefaultRoutes,
} as unknown as RoutePaths & typeof DefaultRoutes;

export default RoutePaths;
