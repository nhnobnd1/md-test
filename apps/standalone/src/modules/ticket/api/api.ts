import ShopifyRepository from "@moose-desk/repo/shopify/ShopifyRepository";
import { lastValueFrom } from "rxjs";
interface FormRequest {
  query: string;
  page?: number;
  limit?: number;
}
export const getListShopifyCustomer = (params: FormRequest) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(ShopifyRepository().getList(params))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const getDetailShopifyCustomer = (id: string) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(ShopifyRepository().getDetail(id))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const getOrderShopifyCustomer = (id: string) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(ShopifyRepository().getOrder(id))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
