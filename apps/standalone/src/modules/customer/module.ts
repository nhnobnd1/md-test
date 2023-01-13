import { Module } from "@moose-desk/core";
import customerLocales from "src/modules/customer/locales";
import CustomerRoutePaths from "src/modules/customer/routes/paths";
import customerRoutes from "src/modules/customer/routes/routes";

const module: Module = {
  name: "Customer",
  route: {
    item: customerRoutes,
    paths: CustomerRoutePaths,
  },
  locales: customerLocales,
};

export default module;
