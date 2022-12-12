import { NavigationMenu, useToast } from "@shopify/app-bridge-react";
import { NavigationLink } from "@shopify/app-bridge-react/components/NavigationMenu/NavigationMenu";
import { useEffect, useMemo } from "react";
import { useCookies } from "react-cookie";
import env from "src/core/env";
import useRoutes from "src/core/routes/useRoutes";
import TokenManager from "src/core/utilities/TokenManager";
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
  const { login } = useAuth();

  useEffect(() => {
    if (shop) {
      const payload = cookies[process.env.HOST?.replace("https://", "") ?? ""];
      if (payload && payload.email && payload.offlineToken) {
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
              login(
                {
                  base_token: data.data.accessToken,
                  refresh_token: "",
                },
                payload.shop
              );
            },
            error() {
              show("Login app failed !");
              TokenManager.setToken("base_token", "");
            },
          });
      }
    }
  }, [shop]);

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
