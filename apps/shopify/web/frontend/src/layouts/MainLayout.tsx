import { Outlet, useLocation, useRoutes } from "@moose-desk/core";
import { Frame, Navigation } from "@shopify/polaris";
import { TabDescriptor } from "@shopify/polaris/build/ts/latest/src/components/Tabs/types";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import "src/assets/styles/layouts/main-layout.scss";
import useToggleGlobal from "src/hooks/useToggleGlobal";
import caseNavigation, {
  NavigationItems,
  SubNavigation,
} from "src/layouts/caseNavigation";
import MainLayoutTopBar from "src/layouts/components/MainLayoutTopBar";
import useFullScreen from "src/store/useFullScreen";

interface MainLayoutProps {
  children?: ReactNode;
}

type TabBarMatches = TabDescriptor & { active: boolean; url: string };

const MainLayout = ({ children }: MainLayoutProps) => {
  const { routes } = useRoutes();
  const location = useLocation();
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);
  const [showMainLayout, setShowMainLayout] = useState(true);
  const showNav = useFullScreen((state) => state.showNav);
  const { visible } = useToggleGlobal(); // lấy giá trị visible khi bấm vào nút mở search shopify customer
  useEffect(() => {
    setShowMainLayout(!visible); // set lại khi bấm nút show/hide shopify customer
  }, [visible]);
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
          : routesItem.url.includes(
              location.pathname.split("/").splice(0, 4).join("/")
            );

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

    // build section list
    const sectionList: Array<{ title?: string; items: NavigationItems[] }> = [
      { items: [] },
    ];
    navigationRender.forEach((item) => {
      if (item.subNavigationItems?.length) {
        let checkTabBar = false;
        item.subNavigationItems.forEach((itemK) => {
          if (itemK.tabBarNavigation?.length) {
            checkTabBar = true;
          }
        });

        if (checkTabBar) {
          sectionList.push({
            title: item.label,
            items: [
              ...(item.subNavigationItems?.map((value) => ({
                ...value,
                ...(value.tabBarNavigation?.length && {
                  subNavigationItems: value.tabBarNavigation,
                }),
              })) as NavigationItems[]),
            ],
          });
        } else {
          sectionList[0].items.push(item);
        }
      } else {
        sectionList[0].items.push(item);
      }
    });

    return sectionList;
  }, [caseNavigation, routes, location.pathname]);

  const MainLayoutNavigation = () => {
    return (
      <Navigation location="/">
        {caseNavigationRender.map((item, index) => (
          <Navigation.Section
            key={`navigation-section-${index}`}
            items={item.items}
            title={item.title ?? undefined}
          />
        ))}
      </Navigation>
    );
  };

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  return (
    <div className="Md-Layout ">
      <Frame
        topBar={
          <MainLayoutTopBar
            setShowMainLayout={setShowMainLayout}
            navigationToggle={toggleMobileNavigationActive}
          />
        }
        navigation={
          (showMainLayout || mobileNavigationActive) && showNav ? (
            <MainLayoutNavigation />
          ) : null
        }
        showMobileNavigation={mobileNavigationActive}
        onNavigationDismiss={toggleMobileNavigationActive}
      >
        <div className="pb-8">
          <Outlet />
        </div>
      </Frame>
    </div>
  );
};

export default MainLayout;
