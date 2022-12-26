import { uniqBy } from "lodash-es";
import { NavigateFunction } from "react-router-dom";
import { IRoute, MiddlewareHandler } from "../models/routes";
import { EventListenersManager } from "../utilities";

const defaultMiddlewareHandler: MiddlewareHandler = () => true;

class RouterHandler extends EventListenersManager<{
  routeChange: [IRoute[]];
}> {
  private middlewareHandler: MiddlewareHandler = defaultMiddlewareHandler;
  private _routes: IRoute[] = [];

  get routes() {
    return this._routes;
  }

  registerMiddleware(handler: Record<RouteMiddleware, MiddlewareHandler>) {
    this.middlewareHandler = (route, navigate) => {
      if (!route.middleware) {
        return true;
      }

      return typeof route.component?.middleware === "string"
        ? handler[route.component?.middleware] &&
            handler[route.component?.middleware](route, navigate)
        : typeof route.middleware === "string"
        ? handler[route.middleware] &&
          handler[route.middleware](route, navigate)
        : route.middleware(route, navigate);
    };
  }

  canPassMiddleware(route: IRoute, navigate: NavigateFunction) {
    if (
      route.component?.middleware &&
      typeof route.component.middleware === "function"
    ) {
      return route.component.middleware(route, navigate);
    }

    return this.middlewareHandler(route, navigate);
  }

  addRoute(...routes: IRoute[]) {
    const newRoutes = uniqBy([...routes, ...this._routes], "path");

    this._routes = newRoutes;
    this.trigger("routeChange", newRoutes);
  }

  removeRoute(path: string) {
    const index = this._routes.findIndex((route) => {
      return route.path === path;
    });

    if (index > -1) {
      const newRoutes = [...this._routes];
      newRoutes.splice(index, 1);
      this._routes = newRoutes;
      this.trigger("routeChange", newRoutes);
    }
  }
}

export default new RouterHandler();
