import {
  ApiLoadingHandlerProvider,
  AuthProvider,
  BrowserRouter,
  LoadingProvider,
  TokenManager,
} from "@moose-desk/core";
import LazyComponent from "@moose-desk/core/components/LazyComponent";
import { lazy, Suspense } from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom";
import ModuleLoader from "src/core/utilities/ModuleLoader";
import ErrorBoundary from "src/ErrorBoundary";
import("src/styles/index.scss");

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
        <LoadingProvider component={() => <>Loading...</>}>
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
