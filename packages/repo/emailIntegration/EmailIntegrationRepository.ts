import { createRepository } from "@moose-desk/core";
import env from "../env";
import { BaseResponse } from "../unty";
import {
  CreateEmailIntegrationRequest,
  CreateEmailIntegrationResponse,
  GetEmailGoogleAuthRequest,
  GetEmailGoogleAuthResponse,
  UpdateEmailIntegrationRequest,
  UpdateEmailIntegrationResponse,
} from "./EmailIntegration";

const EmailIntegrationRepository = createRepository(
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
    CreateEmailIntegration(api, payload: CreateEmailIntegrationRequest) {
      return api.post<CreateEmailIntegrationResponse>("", payload);
    },
    UpdateEmailIntegration(api, id, payload: UpdateEmailIntegrationRequest) {
      return api.put<UpdateEmailIntegrationResponse>(`/${id}`, payload);
    },
    DeleteEmailIntegration(api, id) {
      return api.delete<BaseResponse<any>>(`/${id}`);
    },
  }
);

export default EmailIntegrationRepository;
