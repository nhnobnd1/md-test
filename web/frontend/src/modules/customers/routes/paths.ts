import createRoutePath from "src/core/routes/createRoutePath";

const CustomersRoutePaths = createRoutePath({
  Index: "customers",
  Create: "create",
  Details: "detail/:id",
} as const);

export default CustomersRoutePaths;
