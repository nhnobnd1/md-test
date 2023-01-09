import { BaseResponse } from "../unty";

export interface GetStoreIdRequest {
  subdomain: string;
}

export type GetStoreIdResponse = BaseResponse<{
  storeId: string;
}>;
