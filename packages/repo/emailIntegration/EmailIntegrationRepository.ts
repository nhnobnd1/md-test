import { createRepository } from "@moose-desk/core";
import env from "../env";
import { BaseResponse } from "../unty";
import {
  CheckConnectionRequest,
  CreateEmailIntegrationRequest,
  CreateEmailIntegrationResponse,
  GetEmailGoogleAuthRequest,
  GetEmailGoogleAuthResponse,
  GetEmailMicrosoftAuthRequest,
  GetListEmailRequest,
  GetListEmailResponse,
  GetOneEmailResponse,
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
    getEmailMicrosoftAuth(api, payload: GetEmailMicrosoftAuthRequest) {
      return api.get<BaseResponse<string>>("/microsoft-auth", payload);
    },
    getListEmail(api, params: GetListEmailRequest) {
      return api.get<GetListEmailResponse>("", params);
    },
    createEmailIntegration(api, payload: CreateEmailIntegrationRequest) {
      return api.post<CreateEmailIntegrationResponse>("", payload);
    },
    getOneEmail(api, id: string) {
      return api.get<GetOneEmailResponse>(`/${id}`);
    },
    updateEmailIntegration(api, id, payload: UpdateEmailIntegrationRequest) {
      return api.put<UpdateEmailIntegrationResponse>(`/${id}`, payload);
    },
    deleteEmailIntegration(api, id) {
      return api.delete<BaseResponse<any>>(`/${id}`);
    },
    checkConnectionImap(api, payload: CheckConnectionRequest) {
      return api.post<
        BaseResponse<{
          success: boolean;
        }>
      >("/imap-check-connection", payload);
    },
    checkConnectionSmtp(api, payload: CheckConnectionRequest) {
      return api.post<
        BaseResponse<{
          success: boolean;
        }>
      >("/smtp-check-connection", payload);
    },
  }
);

export default EmailIntegrationRepository;
