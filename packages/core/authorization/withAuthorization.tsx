import { ComponentProps, FunctionComponent } from "react";
import { AuthorizationContext } from "./AuthorizationProvider";

export default function withAuthorization<C extends FunctionComponent<any>>(
  permissions: string | string[]
): (component: C) => C {
  return (Component: C) => {
    return ((props: ComponentProps<C>) => {
      return (
        <AuthorizationContext.Consumer>
          {(context) => (
            <>{context?.can(permissions || []) && <Component {...props} />}</>
          )}
        </AuthorizationContext.Consumer>
      );
    }) as C;
  };
}
