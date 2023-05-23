import { generatePath, Navigate } from "@moose-desk/core";
import useAuth from "src/hooks/useAuth";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";
import RoutePaths from "src/routes/paths";

const RedirectPage = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <Navigate to={generatePath(DashboardRoutePaths.Index)} replace />
      ) : (
        <Navigate to={generatePath(RoutePaths.Login)} replace />
      )}
    </>
  );
};

export default RedirectPage;
