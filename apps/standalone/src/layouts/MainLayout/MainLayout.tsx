import {
  generatePath,
  Outlet,
  useLocation,
  useNavigate,
} from "@moose-desk/core";
import { Layout, Menu, MenuProps } from "antd";
import { useMemo } from "react";
import AgentRoutePaths from "src/modules/agent/routes/paths";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";
import "./MainLayout.scss";

interface MainLayoutProps {}

export const MainLayout = (props: MainLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const caseTopMenu = useMemo<MenuProps["items"]>(() => {
    return [
      {
        key: `case-top-1`,
        label: "Our Solutions",
        onClick: () => navigate(generatePath(DashboardRoutePaths.Index)),
      },
      {
        key: `case-top-2`,
        label: "Pricing",
      },
      {
        key: `case-top-3`,
        label: "Product Demo",
      },
      {
        key: `case-top-4`,
        label: "Resource",
      },
      {
        key: `case-top-5`,
        label: "Company",
      },
      {
        key: `case-${AgentRoutePaths.Login}`,
        label: "Login",
        onClick: () => navigate(generatePath(AgentRoutePaths.Login)),
      },
      {
        key: `case-top-7`,
        label: "Register",
      },
    ];
  }, [AgentRoutePaths]);

  const activeKeys = useMemo(() => {
    return caseTopMenu?.find(
      (item) => item?.key === `case-${location.pathname}`
    )?.key as string;
  }, [caseTopMenu, location]);

  return (
    <Layout className="main-layout min-h-screen">
      <Layout.Header className="header">
        <div className="logo" />
        <Menu
          className="main-layout__menu"
          mode="horizontal"
          theme="dark"
          selectedKeys={[activeKeys]}
          items={caseTopMenu}
        />
      </Layout.Header>
      <Layout className="p-6">
        <Layout.Content>
          <div className="wrap-main-content">
            <Outlet />
          </div>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
