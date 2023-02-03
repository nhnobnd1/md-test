import { createRepository } from "@moose-desk/core";
import env from "../env";
import { GetEmailIntegration } from "./EmailIntegration";

const EmailIntegrationRepository = createRepository(
  () => ({
    baseURL: `${env.getApiUrl()}/api/v1/email-integration`,
  }),
  {
    getEmail(api, subdomainForTest?: string) {
      return api.get<GetEmailIntegration>("", {
        subdomainForTest,
      });
    },
    getGoogleCallback(api) {
      return api.get<any>("/google-callback");
    },
  }
);

export default EmailIntegrationRepository;
