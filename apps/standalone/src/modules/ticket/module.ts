import { Module } from "@moose-desk/core";
import ticketLocales from "src/modules/ticket/locales";
import TicketRoutePaths from "src/modules/ticket/routes/paths";
import ticketRoutes from "src/modules/ticket/routes/routes";

const module: Module = {
  name: "Ticket",
  route: {
    item: ticketRoutes,
    paths: TicketRoutePaths,
  },
  locales: ticketLocales,
};

export default module;
