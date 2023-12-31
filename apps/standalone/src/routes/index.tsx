import {
  Navigate,
  RouterGenerator,
  RouterHandler,
  useRole,
  useRoutes,
} from "@moose-desk/core";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";

import { memo, useEffect, useState } from "react";
import { RolePermission } from "src/constaint/RolePermission";
import useAuth from "src/hooks/useAuth";
import { useSubdomain } from "src/hooks/useSubdomain";
import NotFound from "src/pages/NotFound";
import RoutePaths from "src/routes/paths";

const AppRoutesBased = () => {
  const { isLoggedIn } = useAuth();
  const [isRegisteredMiddleware, setIsRegisteredMiddleware] = useState(false);
  const { routes } = useRoutes();
  const { subDomain } = useSubdomain();
  const role = useRole();
  useGlobalData(isLoggedIn, subDomain || "");

  useEffect(() => {
    RouterHandler.registerMiddleware({
      guest: () => true,
      user: () => isLoggedIn || <Navigate to={RoutePaths.Login} />,
      admin: () =>
        (isLoggedIn && role === RolePermission.Admin) || (
          <Navigate to={RoutePaths.Dashboard.Index} />
        ),
      notBasic: () =>
        (isLoggedIn && role !== RolePermission.BasicAgent) || (
          <Navigate to={RoutePaths.Dashboard.Index} />
        ),
    });
    setIsRegisteredMiddleware(true);

    return () => {
      setIsRegisteredMiddleware(false);
    };
  }, [isLoggedIn, role]);
  return (
    <>
      {isRegisteredMiddleware && !!routes.length && (
        <RouterGenerator routes={routes} notFoundElement={<NotFound />} />
      )}
    </>
  );
};

export const AppRoutes = memo(AppRoutesBased);
