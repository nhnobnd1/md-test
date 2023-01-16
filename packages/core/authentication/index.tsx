import { AxiosError } from "axios";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { lastValueFrom, Observable } from "rxjs";
import { Api } from "../api";
import config from "../config";
import { useJob, useMount } from "../hooks";
import { TokenManager } from "../utilities/StorageManager";

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
  defaultTokens?: () => Tokens;
  fetchUserOnLogin?: (tokens: Tokens) => Observable<any>;
  fetchRefreshToken?: (refreshToken: string) => Observable<any>;
}

export const AuthProvider = ({
  children,
  defaultTokens = () => ({}),
  fetchUserOnLogin = () =>
    new Observable((observable) => observable.next(undefined)),
  fetchRefreshToken,
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
  useEffect(() => {
    if (Object.values(defaultTokens())[0]?.length) {
      fetchUser(defaultTokens());
      setIsLoggedIn(true);
    }
  }, [config.subdomain]);

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

  //handle refresh token
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [failedQueue, setFailedQueue] = useState<
    {
      resolve: (value: any) => void;
      reject: (error: any) => void;
    }[]
  >([]);

  const processQueue = (error: any, token?: string) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue.splice(0);
  };

  const signRefreshToken = Api.addInterceptor({
    response: {
      error: (error, axios) => {
        if (!(error instanceof AxiosError)) {
          return error;
        }
        const { config, response } = error;

        if (!config || !response) {
          return Promise.reject(error);
        }
        if (response.status === 401) {
          if (isRefreshing) {
            return new Promise(function (resolve, reject) {
              failedQueue.push({ resolve, reject });
            })
              .then(() => {
                return lastValueFrom(axios.request(config));
              })
              .catch((err) => {
                return err;
              });
          }

          setIsRefreshing(true);

          const token = TokenManager.getToken("refresh_token");
          if (!token) {
            console.log("Not found refresh token app");
            return Promise.reject(error);
          }

          if (fetchRefreshToken) {
            return new Promise((resolve, reject) => {
              lastValueFrom(fetchRefreshToken(token))
                .then(({ data }) => {
                  setIsRefreshing(false);
                  processQueue(null, data.data.accessToken);
                  login({
                    base_token: data.data.accessToken,
                    refresh_token: data.data.refreshToken,
                  });
                  resolve(lastValueFrom(axios.request(config)));
                })
                .catch((error) => {
                  setIsRefreshing(true);
                  logout();
                  processQueue(error);
                  reject(error);
                });
            });
          } else {
            return Promise.reject(error);
          }
        }
        return Promise.reject(error);
      },
    },
  });

  useMount(() => {
    return signRefreshToken();
  });

  return (
    <AuthContext.Provider value={{ user, tokens, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext<AccountType>() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used in AuthProvider");
  }

  return context as AuthContextType<AccountType>;
}
