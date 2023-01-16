import { PageComponent } from "@moose-desk/core";
import useAuth from "src/hooks/useAuth";

interface DashboardIndexPageProps {}

const DashboardIndexPage: PageComponent<DashboardIndexPageProps> = () => {
  const { isLoggedIn } = useAuth();
  return <>DashboardIndexPage</>;
};

export default DashboardIndexPage;
