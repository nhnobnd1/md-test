import { createRepository } from "@moose-desk/core";
import env from "../env";
import { BaseResponse } from "../unty";
import {
  CreateEmailIntegrationRequest,
  CreateEmailIntegrationResponse,
  GetEmailGoogleAuthRequest,
  GetEmailGoogleAuthResponse,
  GetListEmailRequest,
  GetListEmailResponse,
  UpdateEmailIntegrationRequest,
  UpdateEmailIntegrationResponse,
} from "./EmailIntegration";

export const EmailIntegrationRepository = createRepository(
  () => ({
    baseURL: `${env.getApiUrl()}/api/v1/email-integration`,
  }),
  {
    getEmailGoogleAuth(api, payload: GetEmailGoogleAuthRequest) {
      return api.get<GetEmailGoogleAuthResponse>("/google-auth", payload);
    },
    getEmailGoogleCallback(api) {
      return api.get<BaseResponse<any>>("/google-callback");
    },
    getListEmail(api, params: GetListEmailRequest) {
      return api.get<GetListEmailResponse>("", params);
    },
    createEmailIntegration(api, payload: CreateEmailIntegrationRequest) {
      return api.post<CreateEmailIntegrationResponse>("", payload);
    },
    updateEmailIntegration(api, id, payload: UpdateEmailIntegrationRequest) {
      return api.put<UpdateEmailIntegrationResponse>(`/${id}`, payload);
    },
    deleteEmailIntegration(api, id) {
      return api.delete<BaseResponse<any>>(`/${id}`);
    },
  }
);

export default EmailIntegrationRepository;
