import {
  ApiLoadingHandlerProvider,
  AuthProvider,
  BrowserRouter,
  LoadingProvider,
} from "@moose-desk/core";
import LazyComponent from "@moose-desk/core/components/LazyComponent";
import { AccountRepository, Env } from "@moose-desk/repo";
import * as Sentry from "@sentry/react";
import { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga4";
import { QueryClient, QueryClientProvider } from "react-query";
import { createWebStoragePersistor } from "react-query/createWebStoragePersistor-experimental";
import { persistQueryClient } from "react-query/persistQueryClient-experimental";
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
    },
  },
});
const localStoragePersistor = createWebStoragePersistor({
  storage: window.localStorage,
});

persistQueryClient({
  queryClient,
  persistor: localStoragePersistor,
});
ReactGA.initialize(env.TRACKING_ID);
Sentry.init({
  dsn: env.DSN_SENTRY,
  integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
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
                <StoreProviders>
                  <AppConfigProviders>
                    <ModuleLoader>
                      <LazyComponent
                        component={lazy(() => import("src/App"))}
                      />
                    </ModuleLoader>
                  </AppConfigProviders>
                </StoreProviders>
              </AuthProvider>
            </InitApp>
          </ApiLoadingHandlerProvider>
        </LoadingProvider>
      </Suspense>
    </QueryClientProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
