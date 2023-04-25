import {
  generatePath,
  Outlet,
  useJob,
  useLocation,
  useNavigate,
  useUser,
} from "@moose-desk/core";
import useToggleGlobal from "@moose-desk/core/hooks/useToggleGlobal";
import { AccountRepository } from "@moose-desk/repo";
import { Layout, Menu } from "antd";
import classNames from "classnames";
import { Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { map } from "rxjs";
import Images from "src/assets/images";
import { Loading } from "src/components/Loading";
import Breadcrumb from "src/components/UI/Breadcrums/Breadcrumb";
import TextEditor from "src/components/UI/Editor/TextEditor";
import useAuth from "src/hooks/useAuth";
import { usePermission } from "src/hooks/usePerrmisson";
import AgentRoutePaths from "src/modules/agent/routes/paths";
import CustomersRoutePaths from "src/modules/customer/routes/paths";
import DashboardRoutePaths from "src/modules/dashboard/routes/paths";
import GroupRoutePaths from "src/modules/group/routes/paths";
import ReportRoutePaths from "src/modules/report/routes/paths";
import SettingRoutePaths from "src/modules/setting/routes/paths";
import SettingChannelRoutePaths from "src/modules/settingChannel/routes/paths";
import TicketRoutePaths from "src/modules/ticket/routes/paths";
import { useAppConfig } from "src/providers/AppConfigProviders";
import RoutePaths from "src/routes/paths";
import ClarityUsersSolid from "~icons/clarity/users-solid";
import FeUsers from "~icons/fe/users";
import IconoirReports from "~icons/iconoir/reports";
import IonTicketSharp from "~icons/ion/ticket-sharp";
import JamDashboard from "~icons/jam/dashboard";
import MaterialSymbolsSettings from "~icons/material-symbols/settings";
import MaterialSymbolsSettingsInputComponentOutline from "~icons/material-symbols/settings-input-component-outline";
import MdiFolderNetworkOutline from "~icons/mdi/folder-network-outline";
import MdiSecurity from "~icons/mdi/security";
import RiLogoutCircleRLine from "~icons/ri/logout-circle-r-line";
import "./AppLayout.scss";

interface AppLayoutProps {}

export const AppLayout = (props: AppLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { breadCrumb, setBreadCrumb } = useAppConfig();
  const { visible } = useToggleGlobal(); // lấy giá trị visible khi bấm vào nút mở search shopify customer
  const [collapsed, setCollapsed] = useState(false);
  const { logout } = useAuth();
  const { isAdmin, isLead, isAgent } = usePermission();
  const user = useUser();
  console.log({ user });
  const caseTopMenu = useMemo<any["items"]>(() => {
    return [
      {
        key: `case-${DashboardRoutePaths.Index}`,
        label: "Home",
        link: DashboardRoutePaths.Index,
        icon: <JamDashboard />,
        onClick: () => navigate(generatePath(DashboardRoutePaths.Index)),
      },
      {
        key: `case-${TicketRoutePaths.Index}`,
        label: "Tickets",
        link: TicketRoutePaths.Index,
        icon: <IonTicketSharp />,
        onClick: () => navigate(generatePath(TicketRoutePaths.Index)),
      },
      {
        key: `case-${CustomersRoutePaths.Index}`,
        icon: <ClarityUsersSolid />,
        link: CustomersRoutePaths.Index,
        label: "Customers",
        onClick: () => navigate(generatePath(CustomersRoutePaths.Index)),
      },
      !isAgent
        ? {
            key: `case-2`,
            icon: <IconoirReports />,
            label: "Reporting",
            children: [
              {
                key: `case-${ReportRoutePaths.Overview}`,
                label: "Overview",
                link: ReportRoutePaths.Overview,
                onClick: () =>
                  navigate(generatePath(ReportRoutePaths.Overview)),
              },
              {
                key: `case-${ReportRoutePaths.ByAgent}`,
                label: "By Agents",
                link: ReportRoutePaths.ByAgent,
                onClick: () => navigate(generatePath(ReportRoutePaths.ByAgent)),
              },
              {
                key: `case-${ReportRoutePaths.ByTags}`,
                label: "By Tags",
                link: ReportRoutePaths.ByTags,
                onClick: () => navigate(generatePath(ReportRoutePaths.ByTags)),
              },
            ],
          }
        : "",
      {
        key: `case-3`,
        label: "Settings",
        icon: <MaterialSymbolsSettings />,
        children: [
          isAdmin
            ? {
                key: `case-3-0`,
                label: "General Settings",
                icon: <MaterialSymbolsSettingsInputComponentOutline />,
                children: [
                  {
                    key: `case-${SettingChannelRoutePaths.Index}`,
                    label: "Channels",
                    link: SettingChannelRoutePaths.Index,
                    onClick: () =>
                      navigate(generatePath(SettingChannelRoutePaths.Index)),
                  },
                  {
                    key: `case-${SettingRoutePaths.GenaralSetting.BusinessHours.Index}`,
                    label: "Business Hours",
                    link: SettingRoutePaths.GenaralSetting.BusinessHours.Index,
                    onClick: () =>
                      navigate(
                        generatePath(
                          SettingRoutePaths.GenaralSetting.BusinessHours.Index
                        )
                      ),
                  },
                ],
              }
            : "",
          {
            key: `case-3-1`,
            label: "People",
            icon: <FeUsers />,
            children: [
              {
                key: `case-${AgentRoutePaths.Agents.Index}`,
                label: "Agents",
                link: AgentRoutePaths.Agents.Index,
                onClick: () =>
                  navigate(generatePath(AgentRoutePaths.Agents.Index)),
              },
              {
                key: `case-${GroupRoutePaths.Index}`,
                label: "Groups",
                link: GroupRoutePaths.Index,
                onClick: () => navigate(generatePath(GroupRoutePaths.Index)),
              },
            ],
          },
          {
            key: `case-3-2`,
            label: "Workdesk",
            icon: <MdiFolderNetworkOutline />,
            children: [
              {
                key: `case-${SettingRoutePaths.Workdesk.Tag.Index}`,
                label: "Tags",
                link: SettingRoutePaths.Workdesk.Tag.Index,
                onClick: () =>
                  navigate(generatePath(SettingRoutePaths.Workdesk.Tag.Index)),
              },
            ],
          },
          {
            key: `case-3-3`,
            label: "Account & Security",
            icon: <MdiSecurity />,
            children: [
              {
                key: `case-${SettingRoutePaths.AccountSecurity.Profile.Index}`,
                label: "Profile",
                link: SettingRoutePaths.AccountSecurity.Profile.Index,
                onClick: () =>
                  navigate(
                    generatePath(
                      SettingRoutePaths.AccountSecurity.Profile.Index
                    )
                  ),
              },
              {
                key: `case-${SettingRoutePaths.AccountSecurity.Security.Index}`,
                label: "Security",
                link: SettingRoutePaths.AccountSecurity.Security.Index,
                onClick: () =>
                  navigate(
                    generatePath(
                      SettingRoutePaths.AccountSecurity.Security.Index
                    )
                  ),
              },
              isAdmin
                ? {
                    key: `case-${SettingRoutePaths.AccountSecurity.AccessManager.Index}`,
                    label: "Access Manager",
                    link: SettingRoutePaths.AccountSecurity.AccessManager.Index,
                    onClick: () =>
                      navigate(
                        generatePath(
                          SettingRoutePaths.AccountSecurity.AccessManager.Index
                        )
                      ),
                  }
                : "",
            ],
          },
        ],
      },
    ];
  }, [AgentRoutePaths, DashboardRoutePaths, SettingRoutePaths, RoutePaths]);
  useEffect(() => {
    setCollapsed(visible); // set lại khi bấm nút show/hide shopify customer
  }, [visible]);

  useEffect(() => {
    function handleResize() {
      setCollapsed(window.innerWidth < 1000);
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
      const activeKey = list.find((item) => {
        return item.key === key || key.includes(item.key);
      });
      if (activeKey) {
        return {
          activeKey: activeKey.key,
          defaultOpenKeys: parentListKey,
          breadCrumb: [
            ...breadCrumb,
            {
              label: activeKey.label,
              key: activeKey.key,
              link: activeKey.link,
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
                  ...(it.link && { link: it.link }),
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
                    className={classNames({
                      active: bread.link === location.pathname,
                    })}
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
  }, [caseTopMenu, keys, location.pathname]);

  const { run: SignOutApi } = useJob(
    () => {
      return AccountRepository()
        .signOut()
        .pipe(
          map(() => {
            logout();
            navigate(RoutePaths.Login);
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
      <Layout.Header className="header p-0 pr-10">
        <div className="flex justify-between items-center">
          <div
            className="logo hover:cursor-pointer"
            onClick={() => {
              window.location.reload();
            }}
          >
            <img src={Images.Logo.LogoMooseDesk} width="150"></img>
          </div>
          <div className="user-action">
            <div className="flex gap-3">
              <div className="flex ">
                <span>
                  {user?.subdomain} / {user?.email}
                </span>
              </div>
              <div className="btn-logout" onClick={handleLogout}>
                <RiLogoutCircleRLine />
                Logout
              </div>
            </div>
          </div>
        </div>
      </Layout.Header>
      <Layout>
        <Layout.Sider
          width={260}
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
              <Suspense
                fallback={
                  <Loading fullPage>
                    <div className="w-[100vw] h-[100vh]"></div>
                  </Loading>
                }
              >
                <Outlet />
              </Suspense>
            </div>
          </Layout.Content>
        </div>
      </Layout>
      <div className="hidden">
        <TextEditor />
      </div>
    </Layout>
  );
};

export default AppLayout;
