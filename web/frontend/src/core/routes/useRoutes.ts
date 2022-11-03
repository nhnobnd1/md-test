import { useCallback } from "react";
import { IRoute } from "src/core/models/routes";
import RouterHandler from "src/core/routes/RouterHandler";
import { useSyncExternalStore } from "use-sync-external-store/shim";

export default function useRoutes<I extends IRoute>(): {
  routes: I[];
  addRoutes: (...routes: I[]) => void;
  removeRoute: (path: string) => void;
} {
  const addRoutes = useCallback((...routes: I[]) => {
    RouterHandler.addRoute(...routes);
  }, []);

  const removeRoute = useCallback((path: string) => {
    RouterHandler.removeRoute(path);
  }, []);

  const subscribeRouteChange = useCallback((fn: () => void) => {
    return RouterHandler.on("routeChange", fn);
  }, []);

  const routes = useSyncExternalStore(
    subscribeRouteChange,
    () => RouterHandler.routes
  );

  return { routes: routes as I[], addRoutes, removeRoute };
}
