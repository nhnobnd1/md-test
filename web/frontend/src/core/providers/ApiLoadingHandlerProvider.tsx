import { ReactNode } from "react";
import { Api } from "src/core/api";
import { useMount } from "src/core/hooks";
import { useLoading } from "src/core/loading";
import { ApiRequestConfig } from "src/core/models/api";

interface ApiLoadingHandlerProviderProps {
  children?: ReactNode;
}

export default function ApiLoadingHandlerProvider({
  children,
}: ApiLoadingHandlerProviderProps) {
  const { startLoading, stopLoading } = useLoading();

  useMount(() => {
    const removeInterceptor = Api.addInterceptor({
      request(config) {
        if (config.showLoading) {
          startLoading();
        }

        return config;
      },
      response: {
        success: (response) => {
          const config = response.config as ApiRequestConfig;

          if (config.showLoading) {
            stopLoading();
          }

          return response;
        },
        error: (error) => {
          const { config } = error;
          if (config?.showLoading) {
            stopLoading();
          }

          return error;
        },
      },
    });

    return removeInterceptor;
  });

  return <>{children}</>;
}
