import { BaseResponse } from "../unty";

export type GetEmailIntegration = BaseResponse<string>;

export enum AuthenticationSMTP {
  Plain = "Plain",
  Login = "Login",
  MD5 = "CRAM - MD5",
}
