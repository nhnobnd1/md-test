import {
  ApiLoadingHandlerProvider,
  AuthProvider,
  BrowserRouter,
  LoadingProvider,
} from "@moose-desk/core";
import LazyComponent from "@moose-desk/core/components/LazyComponent";
import { AccountRepository, Env } from "@moose-desk/repo";
import { lazy, Suspense } from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";
import { Loading } from "src/components/Loading";
import env from "src/core/env";
import ModuleLoader from "src/core/utilities/ModuleLoader";
import ErrorBoundary from "src/ErrorBoundary";
import AppConfigProviders from "src/providers/AppConfigProviders";
import InitApp from "src/providers/InitAppProviders";
import { StoreProviders } from "src/providers/StoreProviders";
import { getBaseToken, getRefreshToken } from "src/utils/localValue";
import("src/styles/tailwind.scss").then(() =>
  import("antd/dist/reset.css").then(() => import("src/styles/index.scss"))
);

Env.setApiUrl(env.API_URL);

ReactDOM.render(
  <BrowserRouter>
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
  </BrowserRouter>,
  document.getElementById("root")
);
