import { BaseResponse } from "../unty";
import { ForgotPasswordRequest, RefreshTokenRequest, RefreshTokenResponse, SignInAccountAgentRequest, SignInAccountResponse, SignInAccountShopifyRequest, SignupAccountAgentRequest, SignupAccountResponse, SignupAccountShopifyRequest, UpdatePasswordRequest } from "./Account";
export declare const AccountRepository: {
    agentSignUp: (data: SignupAccountAgentRequest) => import("rxjs").Observable<import("axios").AxiosResponse<SignupAccountResponse, any>>;
    shopifySignup: (data: SignupAccountShopifyRequest) => import("rxjs").Observable<import("axios").AxiosResponse<SignupAccountResponse, any>>;
    agentSignIn: (data: SignInAccountAgentRequest) => import("rxjs").Observable<import("axios").AxiosResponse<SignInAccountResponse, any>>;
    shopifySignIn: (data: SignInAccountShopifyRequest) => import("rxjs").Observable<import("axios").AxiosResponse<SignInAccountResponse, any>>;
    unlockAccount: (data: {
        email: string;
    }) => import("rxjs").Observable<import("axios").AxiosResponse<BaseResponse<{}>, any>>;
    forgotPasswordReset: (data: {
        email: string;
    }) => import("rxjs").Observable<import("axios").AxiosResponse<BaseResponse<{}>, any>>;
    forgotPasswordResetWithToken: (data: ForgotPasswordRequest) => import("rxjs").Observable<import("axios").AxiosResponse<BaseResponse<{}>, any>>;
    refreshToken: (data: RefreshTokenRequest) => import("rxjs").Observable<import("axios").AxiosResponse<RefreshTokenResponse, any>>;
    signOut: (params: {
        Authorization: string;
    }) => import("rxjs").Observable<import("axios").AxiosResponse<BaseResponse<{}>, any>>;
    changePassword: (params: UpdatePasswordRequest) => import("rxjs").Observable<import("axios").AxiosResponse<BaseResponse<{}>, any>>;
};
export default AccountRepository;
//# sourceMappingURL=AccountRepository.d.ts.map