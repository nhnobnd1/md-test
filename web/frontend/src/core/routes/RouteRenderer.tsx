import { memo } from "react";
import { Outlet } from "react-router-dom";
import { IRoute } from "src/core/models/routes";

interface RouteRendererProps {
  route: IRoute;
}

const RouteRenderer = ({
  route: { component: Component, ...route },
}: RouteRendererProps) => {
  return (
    <>
      {route.routes?.length && !route.element && !Component ? (
        <Outlet />
      ) : (
        route.element || (Component ? <Component /> : null)
      )}
    </>
  );
};

export default memo(RouteRenderer);
