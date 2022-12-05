import { Module } from "src/core/models/Module";
import customersLocales from "src/modules/customers/locales";
import CustomersRoutePaths from "src/modules/customers/routes/paths";
import customersRoutes from "src/modules/customers/routes/routes";

const module: Module = {
  name: "Customers",
  route: {
    item: customersRoutes,
    paths: CustomersRoutePaths,
  },
  locales: customersLocales,
};

export default module;
