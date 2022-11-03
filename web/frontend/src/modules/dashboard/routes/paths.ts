import createRoutePath from "src/core/routes/createRoutePath";

const DashboardRoutePaths = createRoutePath({
  Index: "dashboard",
  Child: "child",
} as const);

export default DashboardRoutePaths;
