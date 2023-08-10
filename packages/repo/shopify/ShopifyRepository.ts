import { createRepository } from "@moose-desk/core";
import env from "../env";
import { BaseShopifyCustomerRequest } from "./Shopify";

export const ShopifyRepository = createRepository(
  () => ({
    baseURL: `${env.getApiUrl()}/api/v1/shopify`,
  }),
  {
    getList(api, params: BaseShopifyCustomerRequest) {
      return api.get<any>("/customer", params);
    },
    getDetail(api, id: string) {
      return api.get(`/customer/${id}`);
    },
    getOrder(api, id: string) {
      return api.get(`/order/${id}`);
    },
    getTheme(api) {return api.get("/theme")}
  }
);

export default ShopifyRepository;
