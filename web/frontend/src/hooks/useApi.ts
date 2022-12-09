import { Api } from "src/core/api/index";
import { ApiRequestConfig } from "src/core/models/api";

export function useApi(baseUrl?: string, config?: ApiRequestConfig) {
  const api = new Api(baseUrl, config);
  return api;
}
