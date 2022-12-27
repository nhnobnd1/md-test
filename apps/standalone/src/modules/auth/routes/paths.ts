import { createRoutePath } from "@moose-desk/core";

const AuthRoutePaths = createRoutePath({
  Index: "auth",
  Child: "child",
} as const);

export default AuthRoutePaths;
