import { IRoute } from "@moose-desk/core";
import { CustomersMajor } from "@shopify/polaris-icons";
import { lazy } from "react";
import StorageManager from "src/core/utilities/StorageManager";
import CustomersRoutePaths from "src/modules/customers/routes/paths";
import OnBoardingRoutePaths from "src/modules/onBoarding/routes/paths";

const customersRoutes: IRoute = {
  path: CustomersRoutePaths.Index,
  title: "Customers",
  middleware: (route, navigate) => {
    if (StorageManager.getToken("isAcceptUsing")) {
      return true;
    } else {
      navigate(OnBoardingRoutePaths.Index);
      return false;
    }
  },
  navigation: {
    icon: () => <CustomersMajor />,
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
      component: lazy(
        () => import("src/modules/customers/pages/CreateCustomer")
      ),
    },
  ],
};

export default customersRoutes;
