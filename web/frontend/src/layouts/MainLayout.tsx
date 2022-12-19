import { useNavigate } from "@shopify/app-bridge-react";
import { Frame, Navigation, Tabs } from "@shopify/polaris";
import { TabDescriptor } from "@shopify/polaris/build/ts/latest/src/components/Tabs/types";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { generatePath, Outlet, useLocation } from "react-router-dom";
import "src/assets/styles/layouts/main-layout.scss";
import useRoutes from "src/core/routes/useRoutes";
import caseNavigation, {
  NavigationItems,
  SubNavigation,
} from "src/layouts/caseNavigation";
import MainLayoutTopBar from "src/layouts/components/MainLayoutTopBar";

interface MainLayoutProps {
  children?: ReactNode;
}

type TabBarMatches = TabDescriptor & { active: boolean; url: string };

const MainLayout = ({ children }: MainLayoutProps) => {
  const { routes } = useRoutes();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [tabBar, setTabBar] = useState<Array<TabBarMatches>>([]);
  const [selected, setSelected] = useState(0);

  const getItemRouteNavigation = useCallback(
    (
      routesItem: NavigationItems | SubNavigation,
      type: "main" | "sub" | "tab"
    ) => {
      const subNavigationList: any[] = [];

      if (routesItem.subNavigationItems?.length) {
        routesItem.subNavigationItems.forEach((subItem) => {
          const subNavigation = getItemRouteNavigation(subItem, "sub");
          subNavigationList.push(subNavigation);
        });
      }

      const tabBarNavigationList: SubNavigation[] = [];
      if (routesItem.tabBarNavigation?.length) {
        routesItem.tabBarNavigation.forEach((tabBarItem) => {
          const tabBarNavigation = getItemRouteNavigation(tabBarItem, "tab");
          tabBarNavigationList.push(tabBarNavigation);
        });
      }

      const matches =
        type === "main"
          ? location.pathname.includes(routesItem.url ?? "")
          : routesItem.tabBarNavigation &&
            routesItem.tabBarNavigation.length > 0
          ? location.pathname.includes(routesItem.url ?? "")
          : location.pathname === routesItem.url;

      if (matches && tabBarNavigationList.length > 0) {
        const tabBar = tabBarNavigationList.map((item, index) => ({
          id: item.url,
          content: item.label,
          panelID: `${item.label}-${index}`,
          active: item.matches,
        })) as TabBarMatches[];

        setTabBar(tabBar);
      }
      return {
        ...routesItem,
        matches: matches,

        expanded: type === "main",
        ...(subNavigationList.length > 0 && {
          subNavigationItems: subNavigationList,
        }),
        ...(tabBarNavigationList.length > 0 && {
          tabBarNavigation: tabBarNavigationList,
        }),
      };
    },
    [location.pathname]
  );

  const caseNavigationRender = useMemo(() => {
    const navigationRender: NavigationItems[] = [];
    caseNavigation.forEach((routesItem) => {
      const router = getItemRouteNavigation(routesItem, "main");
      router && navigationRender.push(router);
    });
    return navigationRender;
  }, [caseNavigation, routes, location.pathname]);

  const MainLayoutNavigation = () => {
    return (
      <Navigation location="/">
        <Navigation.Section items={caseNavigationRender} />
      </Navigation>
    );
  };

  const handleTabChange = useCallback(
    (selectedTabIndex) => {
      navigate(generatePath(tabBar[selectedTabIndex].id));
      setSelected(selectedTabIndex);
    },
    [tabBar]
  );

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  useEffect(() => {
    tabBar.forEach((item, index) => {
      item.active ? setSelected(index) : setSelected(0);
    });
  }, [tabBar]);

  return (
    <div className="Md-Layout">
      <Frame
        topBar={
          <MainLayoutTopBar navigationToggle={toggleMobileNavigationActive} />
        }
        navigation={<MainLayoutNavigation />}
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigationActive}
      >
        {tabBar.length > 0 ? (
          <Tabs tabs={tabBar} selected={selected} onSelect={handleTabChange}>
            <div>
              <Outlet />
            </div>
          </Tabs>
        ) : (
          <div>
            <Outlet />
          </div>
        )}
      </Frame>
    </div>
  );
};

export default MainLayout;
