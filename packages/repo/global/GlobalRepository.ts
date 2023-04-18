import { createRepository } from "@moose-desk/core";
import env from "../env";
import { ResponseGlobal } from "../unty";
import { GlobalProps } from "./Global";

export const GlobalRepository = createRepository(
  () => ({
    baseURL: `${env.getApiUrl()}/api/v1/general/info`,
  }),
  {
    get(api, payload: { subdomain: string }) {
      return api.get<ResponseGlobal<GlobalProps>>("", payload);
    },
  }
);

export default GlobalRepository;
