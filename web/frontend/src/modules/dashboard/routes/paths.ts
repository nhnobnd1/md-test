import createRoutePath from "src/core/routes/createRoutePath";

const DashboardRoutePaths = createRoutePath({
  Index: "dashboard",
} as const);

export default DashboardRoutePaths;
