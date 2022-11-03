import React, { useCallback } from "react";

export interface AuthorizationContextType {
  userPermissions: string[];
  can: (permissions: string | string[]) => boolean;
}

export const AuthorizationContext = React.createContext<
  AuthorizationContextType | undefined
>(undefined);

interface AuthorizationProviderProps {
  userPermissions: string[];
  isUser: boolean;
  children?: React.ReactNode;
}

const AuthorizationProvider = ({
  userPermissions,
  isUser,
  children,
}: AuthorizationProviderProps) => {
  const can = useCallback(
    (permissions: string | string[]) => {
      let listPermissions: string[] = [];

      if (!Array.isArray(permissions)) {
        listPermissions = permissions.split(",");
      } else {
        listPermissions = permissions;
      }

      if (!listPermissions.length) {
        return true;
      }

      if (!isUser) {
        return false;
      }

      const granted =
        userPermissions.filter((perm) => listPermissions.includes(perm))
          .length > 0;

      return granted;
    },
    [isUser, userPermissions]
  );

  return (
    <AuthorizationContext.Provider value={{ userPermissions, can }}>
      {children}
    </AuthorizationContext.Provider>
  );
};

export default AuthorizationProvider;
