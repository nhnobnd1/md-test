import authLocales from "src/modules/auth/locales";
import AuthRoutePaths from "src/modules/auth/routes/paths";
import authRoutes from "src/modules/auth/routes/routes";

const module: Module = {
  name: "Auth",
  route: {
    item: authRoutes,
    paths: AuthRoutePaths,
  },
  locales: authLocales,
};

export default module;
