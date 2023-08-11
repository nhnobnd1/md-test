import { IRoute } from "@moose-desk/core";
import { lazy } from "react";
import { AppLayout } from "src/layouts/AppLayout";
import CustomerRoutePaths from "src/modules/customer/routes/paths";

const customerRoutes: IRoute = {
  path: CustomerRoutePaths.Index,
  title: "Customer",
  showInNavigationMenu: true,
  middleware: "user",
  element: <AppLayout />,
  routes: [
    {
      path: CustomerRoutePaths.Index,
      index: true,
      component: lazy(() => import("src/modules/customer/pages/IndexCustomer")),
    },
  ],
};

export default customerRoutes;
