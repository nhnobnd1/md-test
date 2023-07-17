import { ConfigProvider } from "antd";
import { ConfigProviderProps } from "antd/es/config-provider";
import antEnLocale from "antd/es/locale/en_US";
import antViLocale from "antd/es/locale/vi_VN";
import enUS from "antd/lib/locale/en_US";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Provider } from "react-redux";
import ErrorBoundary from "src/ErrorBoundary";
import TextEditor from "src/components/UI/Editor/TextEditor";
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
      <ErrorBoundary>
        <Provider store={store}>
          <AppRoutes />
          <div className="hidden">
            <TextEditor />
          </div>
        </Provider>
      </ErrorBoundary>
    </ConfigProvider>
  );
}

export default App;
