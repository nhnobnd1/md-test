import env from "src/core/env";
import { createRepository } from "src/core/repository";
import {
  ActiveNewAgentRequest,
  ActiveNewAgentResponse,
  CreateAgentRequest,
  CreateAgentResponse,
  DeActiveAgentResponse,
  DeleteAgentResponse,
  GetListAgentRequest,
  GetListAgentResponse,
  GetOneAgentResponse,
  ResendEmailInvitationRequest,
  ResendEmailInvitationResponse,
  UpdateAgentRequest,
  UpdateAgentResponse,
} from "src/modules/agent/models/Agent";

const AgentRepository = createRepository(
  {
    baseURL: `${env.API_URL}/api/v1/account/agent`,
  },
  {
    getList(api, params: GetListAgentRequest) {
      return api.get<GetListAgentResponse>("", params);
    },
    getOne(api, id: string) {
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
      return api.put(`/reactive/${id}`, {});
    },
  }
);

export default AgentRepository;
