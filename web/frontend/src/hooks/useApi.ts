import { Api } from "src/core/api/index";

export function useApi() {
  const api = new Api();
  return api;
}
