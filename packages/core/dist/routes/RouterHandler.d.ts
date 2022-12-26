import { NavigateFunction } from "react-router-dom";
import { IRoute, MiddlewareHandler } from "../models/routes";
import { EventListenersManager } from "../utilities";
declare class RouterHandler extends EventListenersManager<{
    routeChange: [IRoute[]];
}> {
    private middlewareHandler;
    private _routes;
    get routes(): IRoute[];
    registerMiddleware(handler: Record<RouteMiddleware, MiddlewareHandler>): void;
    canPassMiddleware(route: IRoute, navigate: NavigateFunction): boolean | import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>> | Promise<boolean> | Promise<import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>>;
    addRoute(...routes: IRoute[]): void;
    removeRoute(path: string): void;
}
declare const _default: RouterHandler;
export default _default;
