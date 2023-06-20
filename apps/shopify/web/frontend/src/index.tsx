import {
  ApiLoadingHandlerProvider,
  AuthProvider,
  BrowserRouter,
  LoadingProvider,
  TokenManager,
} from "@moose-desk/core";
import LazyComponent from "@moose-desk/core/components/LazyComponent";
import {
  AccountRepository,
  Env,
  SignInAccountShopifyRequest,
} from "@moose-desk/repo";
import * as Sentry from "@sentry/react";
import { Loading } from "@shopify/polaris";
import { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as ReduxProvider } from "react-redux";
import ErrorBoundary from "src/ErrorBoundary";
import { AppBridgeProvider, PolarisProvider } from "src/components";
import env from "src/core/env";
import ModuleLoader from "src/core/utilities/ModuleLoader";
import InitApp from "src/providers/InitAppProviders";
import { StoreProviders } from "src/providers/StoreProviders";
import { store } from "src/redux";
import("src/styles/index.scss").then(() => {
  import("@shopify/polaris/build/esm/styles.css");
});
Sentry.init({
  dsn: env.DSN_SENTRY,
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
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
      <ErrorBoundary>
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
        </BrowserRouter>
      </ErrorBoundary>
    </PolarisProvider>
    {/* <ReactQueryDevtools initialIsOpen={false} /> */}
  </QueryClientProvider>,
  document.getElementById("app")
);
