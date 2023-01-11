import { generatePath, Navigate } from "@moose-desk/core";
import useAuth from "src/hooks/useAuth";
import AgentRoutePaths from "src/modules/agent/routes/paths";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";

interface RedirectPageProps {}

const RedirectPage = (props: RedirectPageProps) => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      {isLoggedIn ? (
        <Navigate to={generatePath(DashboardRoutePaths.Index)} replace />
      ) : (
        <Navigate to={generatePath(AgentRoutePaths.Login)} replace />
      )}
    </>
  );
};

export default RedirectPage;
