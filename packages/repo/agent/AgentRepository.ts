import { createRepository } from "@moose-desk/core";
import env from "../env";
import {
  ActiveNewAgentRequest,
  ActiveNewAgentResponse,
  CheckTokenNewAgentRequest,
  CheckTokenNewAgentResponse,
  CreateAgentRequest,
  CreateAgentResponse,
  DeActiveAgentResponse,
  DeleteAgentResponse,
  GetListAgentRequest,
  GetListAgentResponse,
  GetOneAgentResponse,
  ReActiveResponse,
  ResendEmailInvitationRequest,
  ResendEmailInvitationResponse,
  UpdateAgentRequest,
  UpdateAgentResponse,
} from "./Agent";

export const AgentRepository = createRepository(
  {
    baseURL: `${env.API_URL}/api/v1/account/agent`,
  },
  {
    getList(api, params: GetListAgentRequest) {
      return api.get<GetListAgentResponse>("", params);
    },
    getOne(api, id: string | undefined) {
      return api.get<GetOneAgentResponse>(`/${id}`);
    },
    create(api, data: CreateAgentRequest) {
      return api.post<CreateAgentResponse>("", data);
    },
    update(api, id: string, data: UpdateAgentRequest) {
      return api.put<UpdateAgentResponse>(`/${id}`, data);
    },
    delete(api, id: string) {
      return api.delete<DeleteAgentResponse>(`/${id}`);
    },

    activeNewAgent(api, data: ActiveNewAgentRequest) {
      return api.put<ActiveNewAgentResponse>("/active-new-agent", data);
    },

    resendEmailInvitation(api, data: ResendEmailInvitationRequest) {
      return api.put<ResendEmailInvitationResponse>("/resend-invitation", data);
    },

    deActiveAgent(api, id: string) {
      return api.put<DeActiveAgentResponse>(`/deactive/${id}`, {});
    },

    reActiveAgent(api, id: string) {
      return api.put<ReActiveResponse>(`/reactive/${id}`, {});
    },
    checkTokenActiveNewAgent(api, payload: CheckTokenNewAgentRequest) {
      return api.put<CheckTokenNewAgentResponse>(
        "/check-token-active-new-agent",
        payload
      );
    },
  }
);

export default AgentRepository;
