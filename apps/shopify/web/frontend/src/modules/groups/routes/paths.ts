import { createRoutePath } from "@moose-desk/core";

const GroupsRoutePaths = createRoutePath({
  Index: "settings/people/group",
  Create: "new",
  Detail: ":id",
} as const);

export default GroupsRoutePaths;
