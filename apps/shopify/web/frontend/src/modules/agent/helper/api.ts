import {
  AgentRepository,
  GetListAgentRequest,
  GetListAgentResponse,
} from "@moose-desk/repo";
import { lastValueFrom } from "rxjs";

export const getListAgentFilter = (
  payload: GetListAgentRequest
): Promise<GetListAgentResponse> => {
  return new Promise((resolve, reject) => {
    lastValueFrom(AgentRepository().getList(payload))
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};
