import { BaseResponse } from '../unty';
export interface GetStoreIdRequest {
    subdomain: string;
}
export interface GetTourGuideRequest {
    subdomain: string;
    isOnboardingComplete: boolean;
}
export type GetStoreIdResponse = BaseResponse<{
    storeId: string;
    timezone: string;
    isOnboardingComplete: boolean;
}>;
//# sourceMappingURL=Store.d.ts.map