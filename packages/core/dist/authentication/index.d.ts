import { ReactNode } from "react";
import { Observable } from "rxjs";
type Tokens = Partial<Record<TokenTypes, string>>;
interface AuthContextType<AccountType> {
    login: (tokens: Tokens, user?: AccountType) => void;
    logout: () => void;
    tokens: Tokens;
    user?: AccountType;
    isLoggedIn: boolean;
}
interface AuthProviderProps {
    children?: ReactNode;
    defaultTokens?: () => Tokens;
    fetchUserOnLogin?: (tokens: Tokens) => Observable<any>;
    fetchRefreshToken?: (refreshToken: string) => Observable<any>;
    reLogin?: (payload: any) => Observable<any>;
}
export declare const AuthProvider: ({ children, defaultTokens, fetchUserOnLogin, fetchRefreshToken, reLogin, }: AuthProviderProps) => JSX.Element;
export declare function useAuthContext<AccountType>(): AuthContextType<AccountType>;
export {};
