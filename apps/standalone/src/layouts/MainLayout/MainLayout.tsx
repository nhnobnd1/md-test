import {
  generatePath,
  Outlet,
  useJob,
  useLocation,
  useNavigate,
  useUser,
} from "@moose-desk/core";
import { AccountRepository } from "@moose-desk/repo";
import { Layout, MenuProps } from "antd";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { catchError, map, of } from "rxjs";
import useAuth from "src/hooks/useAuth";
import useNotification from "src/hooks/useNotification";
import AgentRoutePaths from "src/modules/agent/routes/paths";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";
import RoutePaths from "src/routes/paths";
import "./MainLayout.scss";

export const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();
  const notification = useNotification();
  const { t } = useTranslation();
  const user = useUser();
  useEffect(() => {
    if (user) {
      navigate(generatePath(DashboardRoutePaths.Index));
    }
  }, [user]);

  const { run: signOut } = useJob(() => {
    return AccountRepository()
      .signOut()
      .pipe(
        map(() => {
          logout();
          navigate(generatePath(RoutePaths.Login));
          notification.success(t("messages:success.logout"));
        }),
        catchError((err) => {
          notification.error(t("messages:error.logout"));

          return of(err);
        })
      );
  });

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
        key: `case-${RoutePaths.Login}`,
        label: isLoggedIn ? "Logout" : "Login",
        onClick: () => (isLoggedIn ? signOut() : navigate(RoutePaths.Login)),
      },
      {
        key: `case-top-7`,
        label: "Register",
      },
    ];
  }, [AgentRoutePaths, isLoggedIn]);

  const activeKeys = useMemo(() => {
    return caseTopMenu?.find(
      (item) => item?.key === `case-${location.pathname}`
    )?.key as string;
  }, [caseTopMenu, location]);
  return (
    <Layout className="main-layout min-h-screen">
      {/* {location.pathname === RoutePaths.VerifyEmailFail ||
      location.pathname === RoutePaths.VerifyEmailSuccess ? (
        <></>
      ) : (
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
      )} */}
      {/* <Layout className="p-6"> */}
      {/* <Layout.Content> */}
      <div className="wrap-main-content">
        <Outlet />
      </div>
      {/* </Layout.Content> */}
      {/* </Layout> */}
    </Layout>
  );
};

export default MainLayout;
