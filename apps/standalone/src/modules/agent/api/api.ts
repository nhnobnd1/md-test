import {
  AgentRepository,
  GetListAgentRequest,
  GetListAgentResponse,
  ResendEmailInvitationRequest,
  UpdateAgentRequest,
} from "@moose-desk/repo";
import { lastValueFrom } from "rxjs";

export const getOneAgent = (id: string) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(AgentRepository().getOne(id))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const updateAgent = (id: string, payload: UpdateAgentRequest) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(AgentRepository().update(id, payload))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const getListAgentFilter = (
  payload: GetListAgentRequest
): Promise<GetListAgentResponse> => {
  return new Promise((resolve, reject) => {
    lastValueFrom(AgentRepository().getList(payload))
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const deActiveAgent = (id: string) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(AgentRepository().deActiveAgent(id))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const activeAgent = (id: string) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(AgentRepository().reActiveAgent(id))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const resendInviteEmail = (payload: ResendEmailInvitationRequest) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(AgentRepository().resendEmailInvitation(payload))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const removeAgent = (id: string) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(AgentRepository().delete(id))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
