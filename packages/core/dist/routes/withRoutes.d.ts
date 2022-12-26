import { ComponentPropsWithoutRef, ComponentType } from "react";
import { IRoute } from "../models/routes";
export default function withRoutes<C extends ComponentType<any>>(Comp: C): ComponentType<ComponentPropsWithoutRef<C> & {
    routes: IRoute[];
}>;
