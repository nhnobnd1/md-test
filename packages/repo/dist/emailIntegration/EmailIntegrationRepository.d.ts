import { BaseResponse } from "../unty";
import { CreateEmailIntegrationRequest, CreateEmailIntegrationResponse, GetEmailGoogleAuthRequest, GetEmailGoogleAuthResponse, GetListEmailRequest, GetListEmailResponse, UpdateEmailIntegrationRequest, UpdateEmailIntegrationResponse } from "./EmailIntegration";
export declare const EmailIntegrationRepository: () => {
    getEmailGoogleAuth: (payload: GetEmailGoogleAuthRequest) => import("rxjs").Observable<import("axios").AxiosResponse<GetEmailGoogleAuthResponse, any>>;
    getEmailGoogleCallback: () => import("rxjs").Observable<import("axios").AxiosResponse<BaseResponse<any>, any>>;
    getListEmail: (params: GetListEmailRequest) => import("rxjs").Observable<import("axios").AxiosResponse<GetListEmailResponse, any>>;
    createEmailIntegration: (payload: CreateEmailIntegrationRequest) => import("rxjs").Observable<import("axios").AxiosResponse<CreateEmailIntegrationResponse, any>>;
    updateEmailIntegration: (id: any, payload: UpdateEmailIntegrationRequest) => import("rxjs").Observable<import("axios").AxiosResponse<UpdateEmailIntegrationResponse, any>>;
    deleteEmailIntegration: (id: any) => import("rxjs").Observable<import("axios").AxiosResponse<BaseResponse<any>, any>>;
};
export default EmailIntegrationRepository;
//# sourceMappingURL=EmailIntegrationRepository.d.ts.map