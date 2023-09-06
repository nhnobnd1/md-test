import profileBetaLocales from "src/modules/profileBeta/locales";
import ProfileBetaRoutePaths from "src/modules/profileBeta/routes/paths";
import profileBetaRoutes from "src/modules/profileBeta/routes/routes";

const module: Module = {
  name: "ProfileBeta",
  route: {
    item: profileBetaRoutes,
    paths: ProfileBetaRoutePaths,
  },
  locales: profileBetaLocales,
};

export default module;
