import {
  ApiLoadingHandlerProvider,
  AuthProvider,
  BrowserRouter,
  LoadingProvider,
} from "@moose-desk/core";
import LazyComponent from "@moose-desk/core/components/LazyComponent";
import {
  AccountRepository,
  Env,
  SignInAccountShopifyRequest,
} from "@moose-desk/repo";
import { Loading } from "@shopify/polaris";
import { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as ReduxProvider } from "react-redux";
// import ErrorBoundary from "src/ErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";
import { AppBridgeProvider, PolarisProvider } from "src/components";
import env from "src/core/env";
import ModuleLoader from "src/core/utilities/ModuleLoader";
import ErrorBoundaryComponent from "src/ErrorBoundaryComponent";
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
    <PolarisProvider>
      <BrowserRouter>
        <ErrorBoundary fallback={<ErrorBoundaryComponent />}>
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
                  <InitApp>
                    <AuthProvider
                      // defaultTokens={() => ({
                      //   base_token: TokenManager.getToken("base_token"),
                      //   refresh_token: TokenManager.getToken("refresh_token"),
                      // })}
                      fetchRefreshToken={(refreshToken: string) =>
                        AccountRepository().refreshToken({
                          refreshToken,
                        })
                      }
                      reLogin={(payload: SignInAccountShopifyRequest) =>
                        AccountRepository().shopifySignIn({
                          email: payload.email,
                          password: payload.password,
                          storeId: payload.storeId,
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
                </ApiLoadingHandlerProvider>
              </LoadingProvider>
            </Suspense>
            {/* </QueryProvider> */}
          </AppBridgeProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </PolarisProvider>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </QueryClientProvider>,
  document.getElementById("app")
);
