import createRoutePath from "src/core/routes/createRoutePath";

const CustomersRoutePaths = createRoutePath({
  Index: "customers",
  Create: "create",
  Details: "detail",
} as const);

export default CustomersRoutePaths;
