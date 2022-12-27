import {
  ApiLoadingHandlerProvider,
  AuthProvider,
  BrowserRouter,
  LoadingProvider,
  TokenManager,
} from "@moose-desk/core";
import LazyComponent from "@moose-desk/core/components/LazyComponent";
import { ConfigProvider } from "antd";
import { lazy, Suspense } from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";
import ModuleLoader from "src/core/utilities/ModuleLoader";
import ErrorBoundary from "src/ErrorBoundary";
import configAnt from "src/hooks/useConfigAntd";
import("antd/dist/reset.css").then(() => import("src/styles/index.scss"));

ReactDOM.render(
  <ErrorBoundary>
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex items-center content-center w-screen h-screen">
            Loading...
          </div>
        }
      >
        <LoadingProvider
          component={({ state }) => <>{state && "Loading..."}</>}
        >
          <ConfigProvider {...configAnt}>
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
          </ConfigProvider>
        </LoadingProvider>
      </Suspense>
    </BrowserRouter>
  </ErrorBoundary>,
  document.getElementById("root")
);
