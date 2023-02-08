import { GetListBusinessCalendarResponse, UpdateBusinessCalendarResponse } from "./BusinessCalendar";
declare const BusinessCalendarRepository: () => {
    getListBusinessCalendar: (params?: import("..").BaseListRequest | undefined) => import("rxjs").Observable<import("axios").AxiosResponse<GetListBusinessCalendarResponse, any>>;
    updateBusinessCalendar: (id: string, data: import("./BusinessCalendar").UpdateBusinessCalendar) => import("rxjs").Observable<import("axios").AxiosResponse<UpdateBusinessCalendarResponse, any>>;
};
export default BusinessCalendarRepository;
//# sourceMappingURL=BusinessCalendarRepository.d.ts.map