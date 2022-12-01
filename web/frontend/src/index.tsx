import { Loading } from "@shopify/polaris";
import { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import {
  AppBridgeProvider,
  PolarisProvider,
  QueryProvider,
} from "src/components";
import AuthProvider from "src/core/authentication";
import LazyComponent from "src/core/components/LazyComponent";
import { LoadingProvider } from "src/core/loading";
import ApiLoadingHandlerProvider from "src/core/providers/ApiLoadingHandlerProvider";
import ModuleLoader from "src/core/utilities/ModuleLoader";
import TokenManager from "src/core/utilities/TokenManager";
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
              <LoadingProvider>
                <ApiLoadingHandlerProvider>
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
