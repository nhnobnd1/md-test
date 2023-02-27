import { createRoutePath } from "@moose-desk/core";

const TicketRoutePaths = createRoutePath({
  Index: "ticket",
  Create: "new",
  Detail: ":id",
} as const);

export default TicketRoutePaths;
