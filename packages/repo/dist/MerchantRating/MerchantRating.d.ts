import { BaseResponse } from '../unty';
import { MerchantRating } from './MerchantRepository';
export declare const MerchantRepository: () => {
    getMerchantRating: () => import("rxjs").Observable<import("axios").AxiosResponse<BaseResponse<MerchantRating>, any>>;
    postMerchantRating: (params: MerchantRating) => import("rxjs").Observable<import("axios").AxiosResponse<BaseResponse<MerchantRating>, any>>;
};
export default MerchantRepository;
//# sourceMappingURL=MerchantRating.d.ts.map