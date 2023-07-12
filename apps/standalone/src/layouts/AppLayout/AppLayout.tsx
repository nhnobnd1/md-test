import {
  generatePath,
  Link,
  MediaScreen,
  Outlet,
  useJob,
  useLocation,
  useNavigate,
  useUser,
} from "@moose-desk/core";
import { AccountRepository } from "@moose-desk/repo";
import { Layout, Menu } from "antd";
import classNames from "classnames";
import { Suspense, useCallback, useMemo, useState } from "react";
import { map } from "rxjs";
import Images from "src/assets/images";
import { Loading } from "src/components/Loading";
import { MDButton } from "src/components/UI/Button/MDButton";
import Icon from "src/components/UI/Icon";
import { MenuIcon } from "src/components/UI/Icon/MenuIcon";
import LayoutPageContent from "src/components/UI/LayoutPageContent/LayoutPageContent";
import useAuth from "src/hooks/useAuth";
import { usePermission } from "src/hooks/usePerrmisson";
import useScreenType from "src/hooks/useScreenType";
import useViewport from "src/hooks/useViewport";
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
import "./AppLayout.scss";

export const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { breadCrumb, setBreadCrumb } = useAppConfig();
  // const { visible } = useToggleGlobal(); // lấy giá trị visible khi bấm vào nút mở search shopify customer
  const [collapsed, setCollapsed] = useState(true);
  const { logout } = useAuth();
  const { isAdmin, isAgent } = usePermission();
  const [screenType, screenWidth] = useScreenType();
  const { isMobile } = useViewport(MediaScreen.LG);
  const user = useUser();
  const caseTopMenu = useMemo<any["items"]>(() => {
    return [
      {
        key: `case-${DashboardRoutePaths.Index}`,
        label: "Dashboard",
        link: DashboardRoutePaths.Index,
        icon: <Icon name="home" />,
        onClick: () => {
          navigate(generatePath(DashboardRoutePaths.Index));
          handleCollapseMobile(true);
        },
      },
      {
        key: `case-${TicketRoutePaths.Index}`,
        label: "Tickets",
        link: TicketRoutePaths.Index,
        icon: <Icon name="ticket" />,
        onClick: () => {
          navigate(generatePath(TicketRoutePaths.Index));
          handleCollapseMobile(true);
        },
      },
      {
        key: `case-${CustomersRoutePaths.Index}`,
        icon: <Icon name="customer" />,
        link: CustomersRoutePaths.Index,
        label: "Customers",
        onClick: () => {
          navigate(generatePath(CustomersRoutePaths.Index));
          handleCollapseMobile(true);
        },
      },
      !isAgent
        ? {
            key: `case-2`,
            icon: <Icon name="reporting" />,
            label: "Reporting",
            children: [
              {
                key: `case-${ReportRoutePaths.Overview}`,
                label: "Overview",
                link: ReportRoutePaths.Overview,
                onClick: () => {
                  navigate(generatePath(ReportRoutePaths.Overview));
                  handleCollapseMobile(true);
                },
              },
              {
                key: `case-${ReportRoutePaths.ByAgent}`,
                label: "By Agents",
                link: ReportRoutePaths.ByAgent,
                onClick: () => {
                  navigate(generatePath(ReportRoutePaths.ByAgent));
                  handleCollapseMobile(true);
                },
              },
              {
                key: `case-${ReportRoutePaths.ByTags}`,
                label: "By Tags",
                link: ReportRoutePaths.ByTags,
                onClick: () => {
                  navigate(generatePath(ReportRoutePaths.ByTags));
                  handleCollapseMobile(true);
                },
              },
            ],
          }
        : "",
      {
        key: `case-3`,
        label: "Settings",
        icon: <Icon name="settings" />,
        children: [
          isAdmin
            ? {
                key: `case-3-0`,
                label: "General Settings",
                // icon: <MaterialSymbolsSettingsInputComponentOutline />,
                children: [
                  {
                    key: `case-${SettingChannelRoutePaths.Index}`,
                    label: "Channels",
                    link: SettingChannelRoutePaths.Index,
                    onClick: () => {
                      navigate(generatePath(SettingChannelRoutePaths.Index));
                      handleCollapseMobile(true);
                    },
                  },
                  {
                    key: `case-${SettingRoutePaths.GenaralSetting.BusinessHours.Index}`,
                    label: "Business Hours",
                    link: SettingRoutePaths.GenaralSetting.BusinessHours.Index,
                    onClick: () => {
                      navigate(
                        generatePath(
                          SettingRoutePaths.GenaralSetting.BusinessHours.Index
                        )
                      );
                      handleCollapseMobile(true);
                    },
                  },
                ],
              }
            : "",
          {
            key: `case-3-1`,
            label: "People",
            // icon: <FeUsers />,
            children: [
              {
                key: `case-${AgentRoutePaths.Agents.Index}`,
                label: "Agents",
                link: AgentRoutePaths.Agents.Index,
                onClick: () => {
                  navigate(generatePath(AgentRoutePaths.Agents.Index));
                  handleCollapseMobile(true);
                },
              },
              {
                key: `case-${GroupRoutePaths.Index}`,
                label: "Groups",
                link: GroupRoutePaths.Index,
                onClick: () => {
                  navigate(generatePath(GroupRoutePaths.Index));
                  handleCollapseMobile(true);
                },
              },
            ],
          },
          {
            key: `case-3-2`,
            label: "Workdesk",
            // icon: <MdiFolderNetworkOutline />,
            children: [
              {
                key: `case-${SettingRoutePaths.Workdesk.Tag.Index}`,
                label: "Tags",
                link: SettingRoutePaths.Workdesk.Tag.Index,
                onClick: () => {
                  navigate(generatePath(SettingRoutePaths.Workdesk.Tag.Index));
                  handleCollapseMobile(true);
                },
              },
            ],
          },
          {
            key: `case-3-3`,
            label: "Account & Security",
            // icon: <MdiSecurity />,
            children: [
              {
                key: `case-${SettingRoutePaths.AccountSecurity.Profile.Index}`,
                label: "Profile",
                link: SettingRoutePaths.AccountSecurity.Profile.Index,
                onClick: () => {
                  navigate(
                    generatePath(
                      SettingRoutePaths.AccountSecurity.Profile.Index
                    )
                  );
                  handleCollapseMobile(true);
                },
              },
              {
                key: `case-${SettingRoutePaths.AccountSecurity.Security.Index}`,
                label: "Security",
                link: SettingRoutePaths.AccountSecurity.Security.Index,
                onClick: () => {
                  navigate(
                    generatePath(
                      SettingRoutePaths.AccountSecurity.Security.Index
                    )
                  );
                  handleCollapseMobile(true);
                },
              },
              isAdmin
                ? {
                    key: `case-${SettingRoutePaths.AccountSecurity.AccessManager.Index}`,
                    label: "Access Manager",
                    link: SettingRoutePaths.AccountSecurity.AccessManager.Index,
                    onClick: () => {
                      navigate(
                        generatePath(
                          SettingRoutePaths.AccountSecurity.AccessManager.Index
                        )
                      );
                      handleCollapseMobile(true);
                    },
                  }
                : "",
            ],
          },
        ],
      },
    ];
  }, [
    AgentRoutePaths,
    DashboardRoutePaths,
    SettingRoutePaths,
    RoutePaths,
    isMobile,
    // screenType,
    isAdmin,
  ]);

  // useEffect(() => {
  //   if (isMobile) return;
  //   setCollapsed(visible); // set lại khi bấm nút show/hide shopify customer
  // }, [visible]);

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
  // useEffect(() => {
  //   setBreadCrumb({
  //     items: keys.breadCrumb.map((bread) => {
  //       return {
  //         key: bread.key,
  //         props: {
  //           children: (
  //             <>
  //               {bread.link ? (
  //                 <a
  //                   className={classNames({
  //                     active: bread.link === location.pathname,
  //                   })}
  //                   onClick={() =>
  //                     bread.link && navigate(generatePath(bread.link))
  //                   }
  //                 >
  //                   {bread.label}
  //                 </a>
  //               ) : (
  //                 bread.label
  //               )}
  //             </>
  //           ),
  //         },
  //       };
  //     }),
  //   });
  // }, [caseTopMenu, keys, location.pathname]);
  // useEffect(() => {
  //   if (isMobile) {
  //     setCollapsed(true);
  //   }
  // }, [isMobile]);

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
  const handleCollapseMobile = (boolean = true) => {
    if (isMobile) {
      setCollapsed(boolean);
    }
  };
  const handleToggleMenu = () => {
    setCollapsed((pre) => !pre);
  };
  return (
    <Layout
      className={classNames("app-layout min-h-screen", {
        "overflow-hidden": !collapsed && isMobile,
      })}
    >
      <Layout.Header
        className={classNames("header p-0 ", {
          "no-touch": !collapsed && isMobile,
        })}
      >
        <div className="flex justify-between items-center px-20px full-height-header">
          <div className="logo hover:cursor-pointer flex justify-center items-center gap-2">
            <MDButton
              icon={<MenuIcon visible={!collapsed} />}
              type="text"
              onClick={handleToggleMenu}
            ></MDButton>
            <Link to="/dashboard">
              <img
                src={Images.Logo.LogoMooseDesk}
                width="130"
                alt="home logo"
              />
            </Link>
          </div>
          <div className="user-action">
            <div className="flex gap-3 align-center">
              <div className="md:flex hidden">
                <Link
                  className="md-link-ant"
                  to="/setting/account&security/profile"
                >
                  {user?.subdomain} / {user?.email}
                </Link>
              </div>
              <MDButton
                icon={<Icon name="logout" />}
                className="btn-logout"
                onClick={handleLogout}
                type="text"
              >
                Logout
              </MDButton>
            </div>
          </div>
        </div>
      </Layout.Header>
      <Layout className="md-layout-contain-menu">
        {!collapsed && isMobile && (
          <div onClick={() => setCollapsed(true)} className="md-overlay"></div>
        )}
        <Layout.Sider
          width={isMobile ? screenWidth : 260}
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          className={collapsed && isMobile ? "hidden" : "block"}
        >
          <div className="md-top-menu-on-mobile">
            <img src={Images.Logo.LogoMooseDesk} width="150" alt="home logo" />
            <MDButton
              icon={<MenuIcon visible={!collapsed} />}
              type="text"
              onClick={handleToggleMenu}
            ></MDButton>
          </div>
          <Menu
            className="layout-menu"
            mode="inline"
            theme="light"
            style={{
              height: "100%",
              overflow: "scroll",

              background: "#F0F2F5",
            }}
            selectedKeys={[keys.activeKeys]}
            // defaultOpenKeys={keys.defaultOpenKeys}
            items={caseTopMenu}
          />
        </Layout.Sider>

        <div
          className="md-layout-content"
          style={{
            maxHeight: "calc(100vh - 64px)",
            overflow: !collapsed && isMobile ? "hidden" : "auto",
            background: "#F0F2F5",
          }}
        >
          {/* <Breadcrumb className="mb-4" {...breadCrumb} /> */}
          {/* <Layout.Content
            style={{
              padding: 24,
              margin: 0,
              // minHeight: 280,
              // background: "#fff",
            }}
          >
            <div className="wrap-main-content pb-[32px]"> */}
          <LayoutPageContent mainLayout>
            <Suspense
              fallback={
                <Loading fullPage>
                  <div className="w-[100vw] h-[100vh]"></div>
                </Loading>
              }
            >
              <Outlet />
            </Suspense>
          </LayoutPageContent>

          {/* </div>
          </Layout.Content> */}
        </div>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
