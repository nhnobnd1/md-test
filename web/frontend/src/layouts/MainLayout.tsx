import {
  Frame,
  Navigation,
  NavigationItemProps,
  SubNavigationItem,
} from "@shopify/polaris";
import { ReactNode, useCallback, useMemo } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "src/assets/styles/layouts/main-layout.scss";
import { IRoute } from "src/core/models/routes";
import useRoutes from "src/core/routes/useRoutes";
import MainLayoutTopBar from "src/layouts/components/MainLayoutTopBar";

interface MainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { routes } = useRoutes();
  const location = useLocation();

  const getItemRouteNavigation = useCallback(
    (routesItem: IRoute, type: "main" | "sub") => {
      if (routesItem.showInNavigationMenu && routesItem.title) {
        const subNavigationList: SubNavigationItem[] = [];
        if (routesItem.routes?.length) {
          routesItem.routes.forEach((subItem) => {
            const subNavigation = getItemRouteNavigation(subItem, "sub");
            if (subNavigation) {
              subNavigationList.push(subNavigation);
            }
          });
        }

        return {
          url: routesItem.path,
          label: routesItem.title,
          matches:
            type === "main"
              ? location.pathname.includes(routesItem.path)
              : location.pathname === routesItem.path,
          expanded: type === "main",
          ...(subNavigationList.length > 0 && {
            subNavigationItems: subNavigationList,
          }),
          ...routesItem.navigation,
          ...(routesItem.navigation?.badge && {
            badge: String(routesItem.navigation?.badge),
          }),
        };
      }
      return null;
    },
    [location.pathname]
  );

  const routesRender = useMemo(() => {
    const routesRender: NavigationItemProps[] = [];
    routes.forEach((routesItem) => {
      const router = getItemRouteNavigation(routesItem, "main");
      router && routesRender.push(router);
    });
    return routesRender;
  }, [routes, location.pathname]);

  const MainLayoutNavigation = () => {
    return (
      <Navigation location="/">
        <Navigation.Section items={routesRender} />
      </Navigation>
    );
  };

  return (
    <div className="Md-Layout">
      <Frame
        topBar={<MainLayoutTopBar />}
        navigation={<MainLayoutNavigation />}
      >
        <div>
          <Outlet />
        </div>
      </Frame>
    </div>
  );
};

export default MainLayout;
