import {
  ApiLoadingHandlerProvider,
  AuthProvider,
  BrowserRouter,
  LoadingProvider,
  TokenManager,
} from "@moose-desk/core";
import LazyComponent from "@moose-desk/core/components/LazyComponent";
import { Loading } from "@shopify/polaris";
import { lazy, Suspense } from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";
import {
  AppBridgeProvider,
  PolarisProvider,
  QueryProvider,
} from "src/components";
import ModuleLoader from "src/core/utilities/ModuleLoader";
import ErrorBoundary from "src/ErrorBoundary";
import("src/styles/index.scss").then(() => {
  import("@shopify/polaris/build/esm/styles.css");
});

ReactDOM.render(
  <ErrorBoundary>
    <PolarisProvider>
      <BrowserRouter>
        <AppBridgeProvider>
          <QueryProvider>
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
                    <AuthProvider
                      defaultTokens={{
                        base_token: TokenManager.getToken("base_token"),
                        refresh_token: TokenManager.getToken("refresh_token"),
                      }}
                    >
                      <ModuleLoader>
                        <LazyComponent
                          component={lazy(() => import("src/App"))}
                        />
                      </ModuleLoader>
                    </AuthProvider>
                  </CookiesProvider>
                </ApiLoadingHandlerProvider>
              </LoadingProvider>
            </Suspense>
          </QueryProvider>
        </AppBridgeProvider>
      </BrowserRouter>
    </PolarisProvider>
  </ErrorBoundary>,
  document.getElementById("app")
);
