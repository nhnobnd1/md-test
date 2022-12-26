import { Api, ApiRequestConfig } from "@moose-desk/core";
import env from "src/core/env";

export function useApi(baseUrl?: string, config?: ApiRequestConfig) {
  const api = new Api(baseUrl ?? env.API_URL, config);
  return api;
}
