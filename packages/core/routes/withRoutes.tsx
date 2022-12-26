import { ComponentPropsWithoutRef, ComponentType } from "react";
import { IRoute } from "../models/routes";
import useRoutes from "../routes/useRoutes";

export default function withRoutes<C extends ComponentType<any>>(
  Comp: C
): ComponentType<ComponentPropsWithoutRef<C> & { routes: IRoute[] }> {
  const Component = Comp as any;
  return (props: ComponentPropsWithoutRef<C>) => {
    const routes = useRoutes();

    return <Component {...props} routes={routes} />;
  };
}
