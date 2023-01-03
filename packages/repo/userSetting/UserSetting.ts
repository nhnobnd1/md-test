import { BaseResponse } from "../unty";

export interface AccessManger {
  autoJoinEnabled: boolean;
  whitelistDomains: string[];
  twoFactorAuthEnabled: boolean;
}
export interface BaseAccessManagerRequest {
  storeId?: string;
}
export type GetAccessMangerResponse = BaseResponse<AccessManger>;
export type GetAccessManagerResponse = BaseResponse<AccessManger>;
export type UpdateAccessManagerResponse = BaseResponse<AccessManger>;
export type CreateAccessManagerRequest = Omit<AccessManger, "storeId">;
export enum MethodOTP {
  Disabled = "Disabled",
  Email = "Email",
  Authenticator = "Authenticator",
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
