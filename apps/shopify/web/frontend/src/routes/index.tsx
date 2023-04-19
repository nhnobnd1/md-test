import {
  Navigate,
  RouterGenerator,
  RouterHandler,
  useRoutes,
} from "@moose-desk/core";
import { memo, useEffect, useState } from "react";
import useAuth from "src/hooks/useAuth";
import useGlobalData from "src/hooks/useGlobalData";
import { useSubdomain } from "src/hooks/useSubdomain";
import NotFound from "src/pages/NotFound";
import("./routes").then(({ default: newRoutes }) => {
  RouterHandler.addRoute(...newRoutes);
});

const AppRoutesBased = () => {
  const { isLoggedIn } = useAuth();
  const { subDomain } = useSubdomain();
  const [isRegisteredMiddleware, setIsRegisteredMiddleware] = useState(false);
  const { routes } = useRoutes();
  useGlobalData(isLoggedIn, subDomain || "");
  useEffect(() => {
    RouterHandler.registerMiddleware({
      guest: () => true,
      user: () => isLoggedIn || <Navigate to="/" />,
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
