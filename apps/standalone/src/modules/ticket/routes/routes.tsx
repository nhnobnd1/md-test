import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import { AppLayout } from "src/layouts/AppLayout";
import TicketRoutePaths from "src/modules/ticket/routes/paths";

const ticketRoutes: IRoute = {
  path: TicketRoutePaths.Index,
  showInNavigationMenu: false,
  element: <AppLayout />,
  routes: [
    {
      path: TicketRoutePaths.Index,
      title: "Ticket",
      middleware: "user",
      index: true,
      component: lazy(() => import("src/modules/ticket/pages/Index")),
    },
    {
      path: TicketRoutePaths.Create,
      middleware: "user",
      component: lazy(() => import("src/modules/ticket/pages/CreateTicket")),
    },
    {
      path: TicketRoutePaths.Detail,
      middleware: "user",
      component: lazy(() => import("src/modules/ticket/pages/DetailTicket")),
    },
    {
      path: TicketRoutePaths.Trash,
      middleware: "user",
      component: lazy(() => import("src/modules/ticket/pages/TrashTicket")),
    },
  ],
};

export default ticketRoutes;
