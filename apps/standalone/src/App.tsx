import { ConfigProvider } from "antd";
import { ConfigProviderProps } from "antd/es/config-provider";
import antEnLocale from "antd/es/locale/en_US";
import antViLocale from "antd/es/locale/vi_VN";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
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

  return (
    <ConfigProvider {...config}>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </ConfigProvider>
  );
}

export default App;
