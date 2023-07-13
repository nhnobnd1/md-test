import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import TicketRoutePaths from "src/modules/ticket/routes/paths";

const ticketRoutes: IRoute = {
  path: TicketRoutePaths.Index,
  title: "Ticket",
  component: lazy(() => import("src/layouts/MainLayout")),

  routes: [
    {
      path: TicketRoutePaths.Index,
      index: true,
      component: lazy(() => import("src/modules/ticket/pages/Index")),
    },
    {
      path: TicketRoutePaths.Create,
      component: lazy(() => import("src/modules/ticket/pages/CreateTicket")),
    },
    {
      path: TicketRoutePaths.Detail,
      component: lazy(() => import("src/modules/ticket/pages/DetailTicket")),
    },
    {
      path: TicketRoutePaths.Trash,

      component: lazy(() => import("src/modules/ticket/pages/TrashTicket")),
    },
  ],
};

export default ticketRoutes;
