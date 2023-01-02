import { createRoutePath } from "@moose-desk/core";

const DashboardRoutePaths = createRoutePath({
  Index: "dashboard",
  Child: "child",
} as const);

export default DashboardRoutePaths;
