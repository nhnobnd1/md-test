import { ConfigProvider } from "antd";
import { ConfigProviderProps } from "antd/es/config-provider";
import antEnLocale from "antd/es/locale/en_US";
import antViLocale from "antd/es/locale/vi_VN";
import enUS from "antd/lib/locale/en_US";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { AppRoutes } from "src/routes";
import { store } from "./redux";

function App() {
  const { i18n } = useTranslation();

  const config = useMemo<ConfigProviderProps>(() => {
    return {
      locale: i18n.resolvedLanguage === "en" ? antEnLocale : antViLocale,
    };
  }, [i18n]);
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: 24 * 3600 * 1000, // cache for 1 day
        retry: false,
        enabled: import.meta.env.VITE_USER_NODE_ENV === "development",
      },
    },
  });
  return (
    <ConfigProvider {...config} locale={enUS}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
