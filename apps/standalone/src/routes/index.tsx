import {
  Navigate,
  RouterGenerator,
  RouterHandler,
  useRoutes,
} from "@moose-desk/core";
import { memo, useEffect, useState } from "react";
import useAuth from "src/hooks/useAuth";
import NotFound from "src/pages/NotFound";
import RoutePaths from "src/routes/paths";

const AppRoutesBased = () => {
  const { isLoggedIn } = useAuth();
  const [isRegisteredMiddleware, setIsRegisteredMiddleware] = useState(false);
  const { routes } = useRoutes();

  useEffect(() => {
    RouterHandler.registerMiddleware({
      guest: () => true,
      user: () => isLoggedIn || <Navigate to={RoutePaths.Login} />,
    });
    setIsRegisteredMiddleware(true);

    return () => {
      setIsRegisteredMiddleware(false);
    };
  }, [isLoggedIn]);

  return (
    <>
      {isRegisteredMiddleware && !!routes.length && (
        <RouterGenerator routes={routes} notFoundElement={<NotFound />} />
      )}
    </>
  );
};

export const AppRoutes = memo(AppRoutesBased);
