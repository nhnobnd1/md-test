import { FunctionComponent, ReactElement } from "react";
import { NavigateFunction, RouteObject } from "react-router";

export type MiddlewareHandler = (
  route: IRoute,
  navigate: NavigateFunction
) => boolean | Promise<boolean> | ReactElement | Promise<ReactElement>;

export type PageComponent<Props = {}> = FunctionComponent<Props> & {
  middleware?: RouteMiddleware | MiddlewareHandler;
};

export interface IRoute
  extends Omit<RouteObject, "path" | "element" | "children"> {
  path: string;
  title?: string;
  showInNavigationMenu?: boolean;
  routes?: IRoute[];
  permissions?: string | string[];
  element?: ReactElement;
  component?: PageComponent;
  middleware?: RouteMiddleware | MiddlewareHandler;
}
