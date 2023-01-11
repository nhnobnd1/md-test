import {
  generatePath,
  Outlet,
  useJob,
  useLocation,
  useNavigate,
} from "@moose-desk/core";
import { AccountRepository } from "@moose-desk/repo";
import { Layout, Menu, MenuProps } from "antd";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { map } from "rxjs";
import Images from "src/assets/images";
import { Loading } from "src/components/Loading";
import Breadcrumb from "src/components/UI/Breadcrums/Breadcrumb";
import useAuth from "src/hooks/useAuth";
import AgentRoutePaths from "src/modules/agent/routes/paths";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";
import { useAppConfig } from "src/providers/AppConfigProviders";
import ClarityUsersSolid from "~icons/clarity/users-solid";
import FeUsers from "~icons/fe/users";
import JamDashboard from "~icons/jam/dashboard";
import MaterialSymbolsSettings from "~icons/material-symbols/settings";
import MdiFolderNetworkOutline from "~icons/mdi/folder-network-outline";
import MdiSecurity from "~icons/mdi/security";
import RiLogoutCircleRLine from "~icons/ri/logout-circle-r-line";
import "./AppLayout.scss";

interface AppLayoutProps {}

export const AppLayout = (props: AppLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { breadCrumb, setBreadCrumb } = useAppConfig();
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const caseTopMenu = useMemo<MenuProps["items"]>(() => {
    return [
      {
        key: `case-${DashboardRoutePaths.Index}`,
        label: "Home",
        icon: <JamDashboard />,
        onClick: () => navigate(generatePath(DashboardRoutePaths.Index)),
      },
      {
        key: `case-2`,
        icon: <ClarityUsersSolid />,
        label: "Customers",
      },
      {
        key: `case-3`,
        label: "Settings",
        icon: <MaterialSymbolsSettings />,
        children: [
          {
            key: `case-3-1`,
            label: "People",
            icon: <FeUsers />,
            children: [
              {
                key: `case-${AgentRoutePaths.Agents.Index}`,
                label: "Agents",
                onClick: () =>
                  navigate(generatePath(AgentRoutePaths.Agents.Index)),
              },
            ],
          },
          {
            key: `case-3-2`,
            label: "Workdesk",
            icon: <MdiFolderNetworkOutline />,
            children: [
              {
                key: `case-3-2-1`,
                label: "Tags",
              },
            ],
          },
          {
            key: `case-3-3`,
            label: "Account & Security",
            icon: <MdiSecurity />,
            children: [
              { key: `case-3-3-1`, label: "Profile" },
              { key: `case-3-3-2`, label: "Security" },
              { key: `case-3-3-3`, label: "Access Manager" },
            ],
          },
        ],
      },
    ];
  }, [AgentRoutePaths, DashboardRoutePaths]);

  const getDefaultOpenKeys = useCallback(
    (
      list: any[],
      key: string,
      parentListKey: string[] = [],
      breadCrumb: Array<{
        label: string;
        key: string;
        link?: string;
      }> = []
    ) => {
      const activeKey = list.find((item) => item.key === key);
      if (activeKey) {
        return {
          activeKey: activeKey.key,
          defaultOpenKeys: parentListKey,
          breadCrumb: [
            ...breadCrumb,
            {
              label: activeKey.label,
              key: activeKey.key,
              link: location.pathname,
            },
          ],
        };
      } else {
        let keysReturn = {
          activeKey: "",
          defaultOpenKeys: parentListKey,
          breadCrumb: breadCrumb,
        };
        list.forEach((it) => {
          if (it.children && it.children.length) {
            const atk = getDefaultOpenKeys(
              it.children,
              key,
              [...parentListKey, it.key],
              [
                ...breadCrumb,
                {
                  key: it.key,
                  label: it.label,
                },
              ]
            );
            if (atk && atk.activeKey) {
              keysReturn = {
                activeKey: atk?.activeKey,
                defaultOpenKeys: atk.defaultOpenKeys,
                breadCrumb: atk.breadCrumb,
              };
            }
          }
        });
        return keysReturn;
      }
    },
    []
  );

  const keys = useMemo(() => {
    const keyActive = `case-${location.pathname}`;
    const atk = getDefaultOpenKeys(caseTopMenu as any[], keyActive);
    return {
      activeKeys: atk.activeKey,
      defaultOpenKeys: atk.defaultOpenKeys,
      breadCrumb: atk.breadCrumb,
    };
  }, [caseTopMenu, location.pathname, getDefaultOpenKeys]);

  useEffect(() => {
    setBreadCrumb({
      items: keys.breadCrumb.map((bread) => {
        return {
          key: bread.key,
          props: {
            children: (
              <>
                {bread.link ? (
                  <a
                    onClick={() =>
                      bread.link && navigate(generatePath(bread.link))
                    }
                  >
                    {bread.label}
                  </a>
                ) : (
                  bread.label
                )}
              </>
            ),
          },
        };
      }),
    });
  }, [caseTopMenu, keys]);

  const { run: SignOutApi } = useJob(
    () => {
      return AccountRepository()
        .signOut()
        .pipe(
          map(() => {
            logout();
            navigate(AgentRoutePaths.Login);
          })
        );
    },
    {
      showLoading: true,
    }
  );

  const handleLogout = () => {
    SignOutApi();
  };

  return (
    <Layout className="app-layout min-h-screen">
      <Layout.Header className="header">
        <div className="flex justify-between items-center">
          <div className="logo">
            <img src={Images.Logo.LogoMooseDesk} width="150"></img>
          </div>
          <div className="user-action">
            <div className="btn-logout" onClick={handleLogout}>
              <RiLogoutCircleRLine />
              Logout
            </div>
          </div>
        </div>
      </Layout.Header>
      <Layout>
        <Layout.Sider
          width={200}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu
            className="layout-menu"
            mode="inline"
            theme="dark"
            style={{ height: "100%", borderRight: 0 }}
            selectedKeys={[keys.activeKeys]}
            defaultOpenKeys={keys.defaultOpenKeys}
            items={caseTopMenu}
          />
        </Layout.Sider>

        <div
          className="w-full p-6"
          style={{
            maxHeight: "calc(100vh - 64px)",
            overflow: "auto",
          }}
        >
          <Breadcrumb className="mb-4" {...breadCrumb} />
          <Layout.Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "#fff",
            }}
          >
            <div className="wrap-main-content pb-[32px]">
              <Suspense fallback={<Loading spinning={true} fullPage />}>
                <Outlet />
              </Suspense>
            </div>
          </Layout.Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
