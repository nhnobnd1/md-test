import { memo, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import RouterGenerator from "src/core/routes/RouterGenerator";
import RouterHandler from "src/core/routes/RouterHandler";
import useRoutes from "src/core/routes/useRoutes";
import useAuth from "src/hooks/useAuth";
import NotFound from "src/pages/NotFound";

import("./routes").then(({ default: newRoutes }) => {
  RouterHandler.addRoute(...newRoutes);
});

const AppRoutesBased = () => {
  const { isLoggedIn } = useAuth();
  const [isRegisteredMiddleware, setIsRegisteredMiddleware] = useState(false);
  const { routes } = useRoutes();

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
