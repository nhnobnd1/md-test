import { useContext, useMemo } from "react";
import { AuthorizationContext } from "src/core/authorization/AuthorizationProvider";

const useAuthorization = (permissions?: string | string[]) => {
  const context = useContext(AuthorizationContext);

  if (!context) {
    throw new Error("useAuthorization must be used in AuthorizationProvider");
  }

  const granted = useMemo(() => {
    if (!permissions) {
      return true;
    }

    return context.can(permissions);
  }, [permissions, context.can]);

  return {
    granted,
    ...context,
  };
};

export default useAuthorization;
