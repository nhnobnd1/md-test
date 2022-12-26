import { useCallback } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";
import { IRoute } from "../models/routes";
import RouterHandler from "../routes/RouterHandler";

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
