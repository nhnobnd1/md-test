import { BaseResponse } from '../unty';
export interface GetStoreIdRequest {
    subdomain: string;
}
export declare type GetStoreIdResponse = BaseResponse<{
    storeId: string;
    timezone: string;
}>;
//# sourceMappingURL=Store.d.ts.map