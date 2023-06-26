import { ResponseGlobal } from "../unty";
import { GlobalProps } from "./Global";
export declare const GlobalRepository: () => {
    get: (payload: {
        subdomain: string;
    }) => import("rxjs").Observable<import("axios").AxiosResponse<ResponseGlobal<GlobalProps>, any>>;
};
export default GlobalRepository;
//# sourceMappingURL=GlobalRepository.d.ts.map