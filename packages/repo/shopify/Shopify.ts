import { BaseListRequest } from "../unty";

export type Shopify = {};
export interface BaseShopifyCustomerRequest extends BaseListRequest {
  sortBy?: string;
  sortOrder?: number;
}
export interface ShopifyCustomerResponse {}
