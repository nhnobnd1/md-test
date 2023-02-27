import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import StorageManager from "src/core/utilities/StorageManager";
import OnBoardingRoutePaths from "src/modules/onBoarding/routes/paths";
import TicketRoutePaths from "src/modules/ticket/routes/paths";

const ticketRoutes: IRoute = {
  path: TicketRoutePaths.Index,
  title: "Ticket",
  component: lazy(() => import("src/layouts/MainLayout")),
  middleware: (route, navigate) => {
    if (StorageManager.getToken("isAcceptUsing")) {
      return true;
    } else {
      navigate(OnBoardingRoutePaths.Index);
      return false;
    }
  },
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
  ],
};

export default ticketRoutes;
