import { createRoutePath } from "@moose-desk/core";

const CustomersRoutePaths = createRoutePath({
  Index: "customers",
  Create: "create",
  Details: "detail",
} as const);

export default CustomersRoutePaths;
