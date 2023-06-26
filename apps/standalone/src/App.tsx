import { ConfigProvider } from "antd";
import { ConfigProviderProps } from "antd/es/config-provider";
import antEnLocale from "antd/es/locale/en_US";
import antViLocale from "antd/es/locale/vi_VN";
import enUS from "antd/lib/locale/en_US";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ReactQueryDevtools } from "react-query/devtools";
import { Provider } from "react-redux";
import { AppRoutes } from "src/routes";
import { store } from "./redux";

function App() {
  const { i18n } = useTranslation();

  const config = useMemo<ConfigProviderProps>(() => {
    return {
      locale: i18n.resolvedLanguage === "en" ? antEnLocale : antViLocale,
      theme: {
        token: {
          colorPrimary: "rgba(242, 117, 34, 1)",
        },
      },
    };
  }, [i18n]);

  return (
    <ConfigProvider {...config} locale={enUS}>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
      {import.meta.env.DEV ? (
        <ReactQueryDevtools initialIsOpen={false} />
      ) : (
        <></>
      )}
    </ConfigProvider>
  );
}

export default App;
