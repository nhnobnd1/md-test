import { TokenManager, useRoutes } from "@moose-desk/core";
import {
  NavigationMenu,
  useAppBridge,
  useToast,
} from "@shopify/app-bridge-react";
import { Fullscreen } from "@shopify/app-bridge/actions";

import { NavigationLink } from "@shopify/app-bridge-react/components/NavigationMenu/NavigationMenu";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import env from "src/core/env";
import { useApi, useShopDomain } from "src/hooks";
import useAuth from "src/hooks/useAuth";
import { useSubdomain } from "src/hooks/useSubdomain";
import { LoginResponse } from "src/models/Auth";
import { useStore } from "src/providers/StoreProviders";
import { AppRoutes } from "src/routes";
import useFullScreen from "src/store/useFullScreen";

export default function App() {
  const { routes } = useRoutes();
  const app = useAppBridge();
  const fullscreen = Fullscreen.create(app);
  const shop = useShopDomain();
  const { subDomain } = useSubdomain();
  const api = useApi();
  const { show } = useToast();
  const { login, isLoggedIn, user } = useAuth();
  const { storeId } = useStore();
  const fullScreen = useFullScreen((state) => state.fullScreen);
  const { t, i18n } = useTranslation();

  // useGlobalData(isLoggedIn);
  useEffect(() => {
    fullScreen
      ? fullscreen.dispatch(Fullscreen.Action.ENTER)
      : fullscreen.dispatch(Fullscreen.Action.EXIT);
  }, [fullscreen, fullScreen]);

  useEffect(() => {
    if ((shop && !isLoggedIn) || (!user && shop)) {
      const payload = {
        email: localStorage.getItem("email"),
        offlineToken: localStorage.getItem("offlineToken"),
        shop: JSON.parse(localStorage.getItem("shop") as string),
      };
      if (payload && payload.email && payload.offlineToken && storeId) {
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
              show(t("messages:error.login"), {
                isError: true,
              });
              TokenManager.setToken("refresh_token", "");
              TokenManager.setToken("base_token", "");
            },
          });
      }
    }
  }, [shop, isLoggedIn, user, storeId]);

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
