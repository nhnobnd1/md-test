import { createRoutePath } from "@moose-desk/core";

const TicketRoutePaths = createRoutePath({
  Index: "ticket",
} as const);

export default TicketRoutePaths;
