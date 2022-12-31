import { generatePath, Navigate } from "@moose-desk/core";
import AgentRoutePaths from "src/modules/agent/routes/paths";

interface RedirectPageProps {
  children?: React.ReactElement | React.ReactNode;
}

const RedirectPage = ({ children }: RedirectPageProps) => {
  return <Navigate to={generatePath(AgentRoutePaths.Login)} replace />;
};

export default RedirectPage;
