import ShopifyRepository from "@moose-desk/repo/shopify/ShopifyRepository";
import { lastValueFrom } from "rxjs";
export const getListTheme = () => {
  return new Promise((resolve, reject) => {
    lastValueFrom(ShopifyRepository().getTheme())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
