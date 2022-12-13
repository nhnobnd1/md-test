import { MarketingMinor } from "@shopify/polaris-icons";
import { lazy } from "react";
import { IRoute } from "src/core/models/routes";
import CustomersRoutePaths from "src/modules/customers/routes/paths";

const customersRoutes: IRoute = {
  path: CustomersRoutePaths.Index,
  title: "Customers",
  showInNavigationMenu: true,
  navigation: {
    icon: () => <MarketingMinor />,
  },
  component: lazy(() => import("src/layouts/MainLayout")),
  routes: [
    {
      path: CustomersRoutePaths.Index,
      index: true,
      component: lazy(() => import("src/modules/customers/pages/Index")),
    },
    {
      path: CustomersRoutePaths.Details,
      component: lazy(
        () => import("src/modules/customers/pages/DetailsCustomer")
      ),
    },
    {
      path: CustomersRoutePaths.Create,
      showInNavigationMenu: true,
      title: "Create Customer",
      component: lazy(
        () => import("src/modules/customers/pages/CreateCustomer")
      ),
    },
  ],
};

export default customersRoutes;
