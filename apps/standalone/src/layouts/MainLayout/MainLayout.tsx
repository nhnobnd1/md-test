import {
  generatePath,
  Outlet,
  useLocation,
  useNavigate,
  useUser,
} from "@moose-desk/core";
import { Layout } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useAuth from "src/hooks/useAuth";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";
import "./MainLayout.scss";

export const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isInvitation = location.pathname === "/invitation";
  const { isLoggedIn, logout } = useAuth();
  const { t } = useTranslation();
  const user = useUser();
  useEffect(() => {
    if (user && !isInvitation) {
      // fix create password agent auto redirect to dashboard because have token
      navigate(generatePath(DashboardRoutePaths.Index));
    }
  }, [user, isInvitation]);

  return (
    <Layout className="main-layout min-h-screen">
      <div className="wrap-main-content">
        <Outlet />
      </div>
    </Layout>
  );
};

export default MainLayout;
