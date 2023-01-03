import { generatePath, Navigate } from "@moose-desk/core";
import useAuth from "src/hooks/useAuth";
import AgentRoutePaths from "src/modules/agent/routes/paths";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";

interface RedirectPageProps {
  children?: React.ReactElement | React.ReactNode;
}

const RedirectPage = ({ children }: RedirectPageProps) => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return <Navigate to={generatePath(DashboardRoutePaths.Index)} replace />;
  } else {
    return <Navigate to={generatePath(AgentRoutePaths.Login)} replace />;
  }
};

export default RedirectPage;
