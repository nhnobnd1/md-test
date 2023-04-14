import { createRoutePath } from "@moose-desk/core";

const ReportRoutePaths = createRoutePath({
  Index: "report",
  Overview: "overview",
  ByAgent: "by-agent",
  ByTags: "by-tags",
} as const);

export default ReportRoutePaths;
