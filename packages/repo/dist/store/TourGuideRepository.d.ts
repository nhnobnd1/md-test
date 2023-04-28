import { BaseResponse } from '../unty';
import { GetTourGuideRequest } from './Store';
export declare const TourGuideRepository: () => {
    updateTourGuide: (params: GetTourGuideRequest) => import("rxjs").Observable<import("axios").AxiosResponse<BaseResponse<any>, any>>;
};
export default TourGuideRepository;
//# sourceMappingURL=TourGuideRepository.d.ts.map