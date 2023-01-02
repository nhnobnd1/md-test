import { ConfigProvider } from "antd";
import { ConfigProviderProps } from "antd/es/config-provider";
import antEnLocale from "antd/es/locale/en_US";
import antViLocale from "antd/es/locale/vi_VN";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AppRoutes } from "src/routes";

function App() {
  const { i18n } = useTranslation();

  const config = useMemo<ConfigProviderProps>(() => {
    return {
      locale: i18n.resolvedLanguage === "en" ? antEnLocale : antViLocale,
    };
  }, [i18n]);

  return (
    <ConfigProvider {...config}>
      <AppRoutes />
    </ConfigProvider>
  );
}

export default App;
