import { BaseResponse } from "../unty";
import { CreateEmailIntegrationRequest, CreateEmailIntegrationResponse, GetEmailGoogleAuthRequest, GetEmailGoogleAuthResponse, UpdateEmailIntegrationRequest, UpdateEmailIntegrationResponse } from "./EmailIntegration";
export declare const EmailIntegrationRepository: () => {
    getEmailGoogleAuth: (payload: GetEmailGoogleAuthRequest) => import("rxjs").Observable<import("axios").AxiosResponse<GetEmailGoogleAuthResponse, any>>;
    getEmailGoogleCallback: () => import("rxjs").Observable<import("axios").AxiosResponse<BaseResponse<any>, any>>;
    CreateEmailIntegration: (payload: CreateEmailIntegrationRequest) => import("rxjs").Observable<import("axios").AxiosResponse<CreateEmailIntegrationResponse, any>>;
    UpdateEmailIntegration: (id: any, payload: UpdateEmailIntegrationRequest) => import("rxjs").Observable<import("axios").AxiosResponse<UpdateEmailIntegrationResponse, any>>;
    DeleteEmailIntegration: (id: any) => import("rxjs").Observable<import("axios").AxiosResponse<BaseResponse<any>, any>>;
};
export default EmailIntegrationRepository;
//# sourceMappingURL=EmailIntegrationRepository.d.ts.map