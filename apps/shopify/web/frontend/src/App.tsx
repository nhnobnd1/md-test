import { TokenManager, useRoutes } from "@moose-desk/core";
import { NavigationMenu, useToast } from "@shopify/app-bridge-react";
import { NavigationLink } from "@shopify/app-bridge-react/components/NavigationMenu/NavigationMenu";
import { useEffect, useMemo } from "react";
import { useCookies } from "react-cookie";
import env from "src/core/env";
import { useApi, useShopDomain } from "src/hooks";
import useAuth from "src/hooks/useAuth";
import { LoginResponse } from "src/models/Auth";
import { AppRoutes } from "src/routes";

export default function App() {
  const { routes } = useRoutes();

  const shop = useShopDomain();
  const api = useApi();
  const [cookies, setCookie] = useCookies();
  const { show } = useToast();
  const { login, isLoggedIn, user } = useAuth();

  useEffect(() => {
    console.log("isLoggedIn: ", isLoggedIn);
    console.log("user: ", user);
    if ((shop && !isLoggedIn) || (!user && shop)) {
      console.log("Start login with token...");
      const payload = cookies[process.env.HOST ?? shop];
      console.log(payload, "cookies");
      if (payload && payload.email && payload.offlineToken) {
        console.log("Processing login");
        api
          .request<LoginResponse>({
            url: "/v1/account/shopify/sign-in",
            method: "POST",
            baseURL: env.API_URL + "/api",
            data: {
              email: payload.email,
              password: payload.offlineToken,
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
  }, [shop, isLoggedIn, user, cookies]);

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
      <NavigationMenu navigationLinks={navigationLinks} />
      <AppRoutes />
    </>
  );
}
