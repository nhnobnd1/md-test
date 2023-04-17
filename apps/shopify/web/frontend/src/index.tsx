import {
  ApiLoadingHandlerProvider,
  AuthProvider,
  BrowserRouter,
  LoadingProvider,
  TokenManager,
} from "@moose-desk/core";
import LazyComponent from "@moose-desk/core/components/LazyComponent";
import { AccountRepository, Env } from "@moose-desk/repo";
import { Loading } from "@shopify/polaris";
import { lazy, Suspense } from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider as ReduxProvider } from "react-redux";
import { AppBridgeProvider, PolarisProvider } from "src/components";
import env from "src/core/env";
import ModuleLoader from "src/core/utilities/ModuleLoader";
import ErrorBoundary from "src/ErrorBoundary";
import InitApp from "src/providers/InitAppProviders";
import { StoreProviders } from "src/providers/StoreProviders";
import { store } from "src/redux";
import("src/styles/index.scss").then(() => {
  import("@shopify/polaris/build/esm/styles.css");
});

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
  <QueryClientProvider client={queryClient}>
    <ErrorBoundary>
      <PolarisProvider>
        <BrowserRouter>
          <AppBridgeProvider>
            {/* <QueryProvider> */}
            <Suspense
              fallback={
                <div
                  className="flex items-center content-center w"
                  style={{ width: "100vw", height: "100vh" }}
                >
                  <Loading />
                </div>
              }
            >
              <LoadingProvider
                component={({ state }) => <>{state && <Loading />}</>}
              >
                <ApiLoadingHandlerProvider>
                  <CookiesProvider>
                    <InitApp>
                      <AuthProvider
                        defaultTokens={() => ({
                          base_token: TokenManager.getToken("base_token"),
                          refresh_token: TokenManager.getToken("refresh_token"),
                        })}
                        fetchRefreshToken={(refreshToken: string) =>
                          AccountRepository().refreshToken({
                            refreshToken,
                          })
                        }
                      >
                        <StoreProviders>
                          <ModuleLoader>
                            <ReduxProvider store={store}>
                              <LazyComponent
                                component={lazy(() => import("src/App"))}
                              />
                            </ReduxProvider>
                          </ModuleLoader>
                        </StoreProviders>
                      </AuthProvider>
                    </InitApp>
                  </CookiesProvider>
                </ApiLoadingHandlerProvider>
              </LoadingProvider>
            </Suspense>
            {/* </QueryProvider> */}
          </AppBridgeProvider>
        </BrowserRouter>
      </PolarisProvider>
    </ErrorBoundary>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
  document.getElementById("app")
);
