import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Observable } from "rxjs";
import { useJob, useMount } from "src/core/hooks";
import TokenManager from "src/core/utilities/TokenManager";

type Tokens = Partial<Record<TokenTypes, string>>;

interface AuthContextType<AccountType> {
  login: (tokens: Tokens, user?: AccountType) => void;
  logout: () => void;
  tokens: Tokens;
  user?: AccountType;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType<any> | undefined>(undefined);

interface AuthProviderProps {
  children?: ReactNode;
  defaultTokens?: Tokens;
  fetchUserOnLogin?: (tokens: Tokens) => Observable<any>;
}

const AuthProvider = ({
  children,
  defaultTokens = {},
  fetchUserOnLogin = () =>
    new Observable((observable) => observable.next(undefined)),
}: AuthProviderProps) => {
  const [user, setUser] = useState<any>();
  const [tokens, setTokens] = useState<Tokens>(defaultTokens);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { run: fetchUser, result: fetchedUser } = useJob(fetchUserOnLogin);

  const login = useCallback(
    (newTokens: Tokens, user?: any) => {
      setIsLoggedIn(true);
      setTokens(newTokens);
      if (user) {
        setUser(user);
      } else {
        fetchUser(newTokens);
      }
    },
    [fetchUser]
  );

  const logout = useCallback(() => {
    setUser(undefined);
    setTokens({});
    setIsLoggedIn(false);
  }, []);

  // Fetch user and change login state on mount
  useMount(() => {
    if (Object.values(defaultTokens)[0]?.length) {
      fetchUser(defaultTokens);
      setIsLoggedIn(true);
    }
  });

  // Set fetched user
  useEffect(() => {
    if (fetchedUser) {
      setUser(fetchedUser);
    }
  }, [fetchedUser]);

  // Update tokens
  useEffect(() => {
    for (const key in tokens) {
      if (Object.prototype.hasOwnProperty.call(tokens, key)) {
        const token = tokens[key as TokenTypes];
        TokenManager.setToken(key as TokenTypes, token || "");
      }
    }

    // Clear old token
    return () => {
      for (const key in tokens) {
        if (Object.prototype.hasOwnProperty.call(tokens, key)) {
          TokenManager.setToken(key as TokenTypes, "");
        }
      }
    };
  }, [tokens]);

  return (
    <AuthContext.Provider value={{ user, tokens, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export function useAuthContext<AccountType>() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used in AuthProvider");
  }

  return context as AuthContextType<AccountType>;
}
