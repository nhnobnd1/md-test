import { createRepository } from "@moose-desk/core";
import env from "../env";
import { BaseResponse } from "../unty";
import {
  ForgotPasswordRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
  SignInAccountAgentRequest,
  SignInAccountResponse,
  SignInAccountShopifyRequest,
  SignupAccountAgentRequest,
  SignupAccountResponse,
  SignupAccountShopifyRequest,
  UpdatePasswordRequest,
} from "./Account";

export const AccountRepository = createRepository(
  () => ({
    baseURL: `${env.getApiUrl()}/api/v1/account`,
  }),
  {
    agentSignUp(api, data: SignupAccountAgentRequest) {
      return api.post<SignupAccountResponse>("/sign-up", data);
    },
    shopifySignup(api, data: SignupAccountShopifyRequest) {
      return api.post<SignupAccountResponse>("/shopify/sign-up", data);
    },
    agentSignIn(api, data: SignInAccountAgentRequest) {
      console.log(env.getApiUrl(), "api url reppo");
      return api.post<SignInAccountResponse>("/sign-in", data);
    },
    shopifySignIn(api, data: SignInAccountShopifyRequest) {
      return api.post<SignInAccountResponse>("/shopify/sign-in", data);
    },
    unlockAccount(api, data: { email: string }) {
      return api.post<BaseResponse<{}>>("/unlock", data);
    },
    forgotPasswordReset(api, data: { email: string }) {
      return api.post<BaseResponse<{}>>("/forgot-password-reset-code", data);
    },
    forgotPasswordResetWithToken(api, data: ForgotPasswordRequest) {
      return api.post<BaseResponse<{}>>("/forgot-password-reset", data);
    },
    refreshToken(api, data: RefreshTokenRequest) {
      return api.post<RefreshTokenResponse>("/refresh-token", data);
    },
    signOut(api) {
      return api.get<BaseResponse<{}>>("/sign-out");
    },
    changePassword(api, params: UpdatePasswordRequest) {
      return api.post<BaseResponse<{}>>("/update-password", params);
    },
  }
);

export default AccountRepository;
