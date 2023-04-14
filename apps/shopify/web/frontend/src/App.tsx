import { TokenManager, useRoutes } from "@moose-desk/core";
import useGlobalData from "@moose-desk/core/hooks/useGlobalData";
import { NavigationMenu, useToast } from "@shopify/app-bridge-react";
import { NavigationLink } from "@shopify/app-bridge-react/components/NavigationMenu/NavigationMenu";
import { useEffect, useMemo } from "react";
import { useCookies } from "react-cookie";
import { QueryClient, QueryClientProvider } from "react-query";
import { RichText } from "src/components/RichText";
import env from "src/core/env";
import { useApi, useShopDomain } from "src/hooks";
import useAuth from "src/hooks/useAuth";
import { useSubdomain } from "src/hooks/useSubdomain";
import { LoginResponse } from "src/models/Auth";
import { useStore } from "src/providers/StoreProviders";
import { AppRoutes } from "src/routes";
export default function App() {
  const { routes } = useRoutes();
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
  const shop = useShopDomain();
  const { subDomain } = useSubdomain();
  const api = useApi();
  const [cookies, setCookie] = useCookies();
  const { show } = useToast();
  const { login, isLoggedIn, user } = useAuth();
  const { storeId } = useStore();
  useGlobalData(isLoggedIn);
  useEffect(() => {
    if ((shop && !isLoggedIn) || (!user && shop)) {
      console.log("Start login with token...");
      const payload = cookies[process.env.HOST ?? shop];
      if (payload && payload.email && payload.offlineToken && storeId) {
        console.log("Processing login");
        api
          .request<LoginResponse>({
            url: "/v1/account/shopify/sign-in",
            method: "POST",
            baseURL: env.API_URL + "/api",
            data: {
              email: payload.email,
              password: payload.offlineToken,
              storeId: storeId,
            },
          })
          .subscribe({
            next({ data }) {
              TokenManager.setToken("base_token", data.data.accessToken);
              TokenManager.setToken("refresh_token", data.data.refreshToken);
              login(
                {
                  base_token: data.data.accessToken,
                  refresh_token: data.data.refreshToken,
                },
                payload.shop
              );
            },
            error() {
              show("Login app failed !", {
                isError: true,
              });
              TokenManager.setToken("refresh_token", "");
              TokenManager.setToken("base_token", "");
            },
          });
      }
    }
  }, [shop, isLoggedIn, user, cookies, storeId]);

  const navigationLinks = useMemo((): NavigationLink[] => {
    return routes
      .filter((route) => route.showInNavigationMenu ?? false)
      .map((route) => {
        return {
          label: route.title ?? "Page have no title",
          destination: route.path,
        };
      });
  }, [routes]);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <NavigationMenu navigationLinks={navigationLinks} />
        <AppRoutes />
        <div className="hidden">
          <RichText
            labelProps={{ children: "aaa", as: "h1", variant: "bodyLg" }}
          />
        </div>
      </QueryClientProvider>
    </>
  );
}
