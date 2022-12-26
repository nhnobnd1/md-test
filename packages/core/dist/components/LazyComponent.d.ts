import { ComponentProps, ComponentType, LazyExoticComponent } from "react";
interface LazyComponentProps<C extends ComponentType<any>> {
    component: LazyExoticComponent<C>;
    props?: ComponentProps<C>;
}
declare function LazyComponent<C extends ComponentType<any>>({ component: Component, props, }: LazyComponentProps<C>): JSX.Element;
export default LazyComponent;
