import { createRepository } from "@moose-desk/core";
import env from "../env";
import { GetStoreIdRequest, GetStoreIdResponse } from "./Store";

export const StoreRepository = createRepository(
  () => ({
    baseURL: `${env.getApiUrl()}/api/v1/store`,
  }),
  {
    getStore(api, params: GetStoreIdRequest) {
      return api.get<GetStoreIdResponse>("/store-id", params);
    },
  }
);

export default StoreRepository;
