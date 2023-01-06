import {
  ApiLoadingHandlerProvider,
  AuthProvider,
  BrowserRouter,
  LoadingProvider,
  TokenManager,
} from "@moose-desk/core";
import LazyComponent from "@moose-desk/core/components/LazyComponent";
import { Env } from "@moose-desk/repo";
import { lazy, Suspense } from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";
import { Loading } from "src/components/Loading";
import env from "src/core/env";
import ModuleLoader from "src/core/utilities/ModuleLoader";
import ErrorBoundary from "src/ErrorBoundary";
import("src/styles/tailwind.scss").then(() =>
  import("antd/dist/reset.css").then(() => import("src/styles/index.scss"))
);

Env.setApiUrl(env.API_URL);

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <Suspense fallback={<Loading fullPage />}>
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
              <AuthProvider
                defaultTokens={{
                  base_token: TokenManager.getToken("base_token"),
                  refresh_token: TokenManager.getToken("refresh_token"),
                }}
              >
                <ModuleLoader>
                  <LazyComponent component={lazy(() => import("src/App"))} />
                </ModuleLoader>
              </AuthProvider>
            </CookiesProvider>
          </ApiLoadingHandlerProvider>
        </LoadingProvider>
      </Suspense>
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById("root")
);
