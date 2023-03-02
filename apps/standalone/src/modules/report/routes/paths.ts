import { createRoutePath } from "@moose-desk/core";

const ReportRoutePaths = createRoutePath({
  Index: "report",
  Overview: "overview",
  ByAgent: "by-agent",
} as const);

export default ReportRoutePaths;
