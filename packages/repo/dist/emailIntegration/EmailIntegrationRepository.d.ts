import { GetEmailIntegration } from "./EmailIntegration";
declare const EmailIntegrationRepository: () => {
    getEmail: (subdomainForTest?: string | undefined) => import("rxjs").Observable<import("axios").AxiosResponse<GetEmailIntegration, any>>;
    getGoogleCallback: () => import("rxjs").Observable<import("axios").AxiosResponse<any, any>>;
};
export default EmailIntegrationRepository;
//# sourceMappingURL=EmailIntegrationRepository.d.ts.map