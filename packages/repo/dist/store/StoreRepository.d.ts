import { GetStoreIdRequest, GetStoreIdResponse } from './Store';
export declare const StoreRepository: () => {
    getStore: (params: GetStoreIdRequest) => import("rxjs").Observable<import("axios").AxiosResponse<GetStoreIdResponse, any>>;
};
export default StoreRepository;
//# sourceMappingURL=StoreRepository.d.ts.map