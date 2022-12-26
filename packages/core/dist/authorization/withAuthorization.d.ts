import { FunctionComponent } from "react";
export default function withAuthorization<C extends FunctionComponent<any>>(permissions: string | string[]): (component: C) => C;
