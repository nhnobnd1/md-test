import { BaseResponse } from "../unty";
import { CreateEmailIntegrationRequest, CreateEmailIntegrationResponse, GetEmailGoogleAuthRequest, GetEmailGoogleAuthResponse, GetEmailMicrosoftAuthRequest, GetListEmailRequest, GetListEmailResponse, GetOneEmailResponse, UpdateEmailIntegrationRequest, UpdateEmailIntegrationResponse } from "./EmailIntegration";
export declare const EmailIntegrationRepository: () => {
    getEmailGoogleAuth: (payload: GetEmailGoogleAuthRequest) => import("rxjs").Observable<import("axios").AxiosResponse<GetEmailGoogleAuthResponse, any>>;
    getEmailMicrosoftAuth: (payload: GetEmailMicrosoftAuthRequest) => import("rxjs").Observable<import("axios").AxiosResponse<BaseResponse<string>, any>>;
    getListEmail: (params: GetListEmailRequest) => import("rxjs").Observable<import("axios").AxiosResponse<GetListEmailResponse, any>>;
    createEmailIntegration: (payload: CreateEmailIntegrationRequest) => import("rxjs").Observable<import("axios").AxiosResponse<CreateEmailIntegrationResponse, any>>;
    getOneEmail: (id: string) => import("rxjs").Observable<import("axios").AxiosResponse<GetOneEmailResponse, any>>;
    updateEmailIntegration: (id: any, payload: UpdateEmailIntegrationRequest) => import("rxjs").Observable<import("axios").AxiosResponse<UpdateEmailIntegrationResponse, any>>;
    deleteEmailIntegration: (id: any) => import("rxjs").Observable<import("axios").AxiosResponse<BaseResponse<any>, any>>;
};
export default EmailIntegrationRepository;
//# sourceMappingURL=EmailIntegrationRepository.d.ts.map