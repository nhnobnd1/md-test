import {
  ApiLoadingHandlerProvider,
  AuthProvider,
  BrowserRouter,
  LoadingProvider,
} from "@moose-desk/core";
import LazyComponent from "@moose-desk/core/components/LazyComponent";
import { AccountRepository, Env } from "@moose-desk/repo";
import { Suspense, lazy } from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ErrorBoundary from "src/ErrorBoundary";
import { Loading } from "src/components/Loading";
import env from "src/core/env";
import ModuleLoader from "src/core/utilities/ModuleLoader";
import AppConfigProviders from "src/providers/AppConfigProviders";
import InitApp from "src/providers/InitAppProviders";
import { StoreProviders } from "src/providers/StoreProviders";
import { getBaseToken, getRefreshToken } from "src/utils/localValue";
import("src/styles/tailwind.scss").then(() =>
  import("antd/dist/reset.css").then(() => import("src/styles/index.scss"))
);

Env.setApiUrl(env.API_URL);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 24 * 3600 * 1000, // cache for 1 day
      retry: false,
      // enabled: import.meta.env.VITE_USER_NODE_ENV === "development",
    },
  },
});

ReactDOM.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Suspense
        fallback={
          <Loading fullPage>
            <div className="w-[100vw] h-[100vh]"></div>
          </Loading>
        }
      >
        <LoadingProvider
          isWrap
          component={({ state, children }) => (
            <Loading spinning={state} fullPage>
              {children as any}
            </Loading>
          )}
        >
          <ApiLoadingHandlerProvider>
            <CookiesProvider>
              <InitApp>
                <AuthProvider
                  defaultTokens={() => ({
                    base_token: getBaseToken(),
                    refresh_token: getRefreshToken(),
                  })}
                  fetchRefreshToken={(refreshToken: string) =>
                    AccountRepository().refreshToken({
                      refreshToken,
                    })
                  }
                >
                  <ErrorBoundary>
                    <StoreProviders>
                      <AppConfigProviders>
                        <ModuleLoader>
                          <LazyComponent
                            component={lazy(() => import("src/App"))}
                          />
                        </ModuleLoader>
                      </AppConfigProviders>
                    </StoreProviders>
                  </ErrorBoundary>
                </AuthProvider>
              </InitApp>
            </CookiesProvider>
          </ApiLoadingHandlerProvider>
        </LoadingProvider>
      </Suspense>
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
