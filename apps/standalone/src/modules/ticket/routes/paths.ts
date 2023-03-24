import { createRoutePath } from "@moose-desk/core";

const TicketRoutePaths = createRoutePath({
  Index: "ticket",
  Create: "new",
  Detail: ":id",
  Trash: "trash",
} as const);

export default TicketRoutePaths;
