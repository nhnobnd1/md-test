import { createRoutePath } from "@moose-desk/core";

const GroupRoutePaths = createRoutePath({
  Index: "group",
  Create: "new",
  Detail: ":id",
} as const);

export default GroupRoutePaths;
