import { BaseResponse } from "../unty";
export interface AccessManger {
    autoJoinEnabled: boolean;
    whitelistDomains: string[];
    twoFactorAuthEnabled: boolean;
}
export declare type GetAccessMangerResponse = BaseResponse<AccessManger>;
export declare type UpdateAccessManagerResponse = BaseResponse<AccessManger>;
export declare enum MethodOTP {
    Disabled = "Disabled",
    Email = "Email",
    Authenticator = "Authenticator"
}
export interface SetupOtpRequest {
    method: MethodOTP;
}
export interface VerifySetupOTPRequest {
    method: MethodOTP;
    code: string;
}
export interface SetUpResponse {
    statusCode: number;
}
//# sourceMappingURL=UserSetting.d.ts.map