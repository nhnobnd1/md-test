import React from "react";
export interface AuthorizationContextType {
    userPermissions: string[];
    can: (permissions: string | string[]) => boolean;
}
export declare const AuthorizationContext: React.Context<AuthorizationContextType | undefined>;
interface AuthorizationProviderProps {
    userPermissions: string[];
    isUser: boolean;
    children?: React.ReactNode;
}
declare const AuthorizationProvider: ({ userPermissions, isUser, children, }: AuthorizationProviderProps) => JSX.Element;
export default AuthorizationProvider;
