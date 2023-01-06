import { BaseResponse } from "../unty";
export interface User {
    _id: string;
    subdomain: string;
    storeId: string;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string | null;
    companyName: string | null;
    isActive: true;
    emailConfirmed: false;
    timezone: string;
}
export interface SignupAccountAgentRequest {
    subdomain: string;
    storeId: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phoneNumber?: null | string;
    companyName?: null | string;
    timezone?: string;
}
export interface SignupAccountShopifyRequest {
    subdomain: string;
    storeId: string;
    email: string;
    shopifyToken: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string | null;
    companyName?: string | null;
    timezone?: string;
}
export declare type SignupAccountResponse = BaseResponse<User>;
export interface SignInAccountAgentRequest {
    email: string;
    password: string;
    subdomain?: string;
    twoFactorCode?: string;
}
export interface SignInAccountShopifyRequest {
    email: string;
    password: string;
}
export declare type SignInAccountResponse = BaseResponse<{
    accessToken: string;
    expiresIn: number;
    refreshToken: string;
    tokenType: "Bearer";
}>;
export interface SignOutRequest {
    authorization: string;
}
export interface ForgotPasswordRequest {
    userId: string;
    resetToken: string;
    password: string;
}
export interface RefreshTokenRequest {
    refreshToken: string;
}
export declare type RefreshTokenResponse = BaseResponse<{
    accessToken: string;
    tokenType: "Bearer";
    expiresIn: number;
    refreshToken: string;
}>;
export interface UpdatePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}
//# sourceMappingURL=Account.d.ts.map