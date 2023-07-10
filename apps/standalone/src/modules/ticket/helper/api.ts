import {
  Agent,
  AgentRepository,
  BaseDeleteList,
  BaseListTicketFilterRequest,
  Conversation,
  Customer,
  CustomerRepository,
  EmailIntegration,
  EmailIntegrationRepository,
  GetListAgentRequest,
  GetListCustomerRequest,
  GetListEmailRequest,
  GetListTagRequest,
  GetListTicketRequest,
  GetListTicketResponse,
  Tag,
  TagRepository,
  Ticket,
  TicketRepository,
  TicketStatistic,
  UpdateTicket,
} from "@moose-desk/repo";
import { useQueries } from "react-query";
import { lastValueFrom } from "rxjs";
import { ItemConversation } from "src/modules/ticket/helper/interface";
export const getStatisticTicket = (): Promise<TicketStatistic> => {
  return new Promise((resolve, reject) => {
    lastValueFrom(TicketRepository().getStatistic())
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const fetchConversationApi = (id: string): Promise<ItemConversation> => {
  return new Promise((resolve, reject) => {
    lastValueFrom(TicketRepository().getConversations(id))
      .then(({ data }) => resolve({ id, conversations: data.data }))
      .catch((error) => reject(error));
  });
};

export const getTagsTicket = (payload: GetListTagRequest): Promise<Tag[]> => {
  return new Promise((resolve, reject) => {
    lastValueFrom(TagRepository().getList(payload))
      .then(({ data }) => resolve(data.data))
      .catch((error) => reject(error));
  });
};
export const forceDeleteApi = (payload: BaseDeleteList) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(TicketRepository().deletePermanently(payload))
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const getListTrashApi = (
  payload: GetListTicketRequest
): Promise<GetListTicketResponse> => {
  return new Promise((resolve, reject) => {
    lastValueFrom(TicketRepository().getListTrash(payload))
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getListTicketFilter = (
  payload: GetListTicketRequest
): Promise<GetListTicketResponse> => {
  return new Promise((resolve, reject) => {
    lastValueFrom(TicketRepository().getListFilter(payload))
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getOneTicket = (payload: string): Promise<Ticket> => {
  return new Promise((resolve, reject) => {
    lastValueFrom(TicketRepository().getOne(payload))
      .then(({ data }) => resolve(data.data))
      .catch((error) => reject(error));
  });
};

export const getListConversation = (
  payload: string
): Promise<Conversation[]> => {
  return new Promise((resolve, reject) => {
    lastValueFrom(TicketRepository().getConversations(payload))
      .then(({ data }) => resolve(data.data))
      .catch((error) => reject(error));
  });
};
export const restoreTicketApi = (payload: BaseDeleteList) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(TicketRepository().restore(payload))
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getListTicketApi = (
  payload: GetListTicketRequest
): Promise<GetListTicketResponse> => {
  return new Promise((resolve, reject) => {
    lastValueFrom(TicketRepository().getListFilter(payload))
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const updateTicketApi = (payload: UpdateTicket) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(TicketRepository().update(payload))
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getListTicketFilterApi = (
  payload: BaseListTicketFilterRequest
) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(TicketRepository().getListFilter(payload))
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getListCustomerApi = (
  payload: GetListCustomerRequest
): Promise<Customer[]> => {
  return new Promise((resolve, reject) => {
    lastValueFrom(CustomerRepository().getList(payload))
      .then(({ data }) => resolve(data.data))
      .catch((error) => reject(error));
  });
};

export const getListAgentApi = (
  payload: GetListAgentRequest
): Promise<Agent[]> => {
  return new Promise((resolve, reject) => {
    lastValueFrom(AgentRepository().getList(payload))
      .then(({ data }) => resolve(data.data))
      .catch((error) => reject(error));
  });
};
export const emailIntegrationApi = (): Promise<EmailIntegration> => {
  return new Promise((resolve, reject) => {
    lastValueFrom(EmailIntegrationRepository().getPrimaryEmail())
      .then(({ data }) => resolve(data.data))
      .catch((error) => reject(error));
  });
};

export const getListEmailIntegration = (
  payload: GetListEmailRequest
): Promise<EmailIntegration[]> => {
  return new Promise((resolve, reject) => {
    lastValueFrom(EmailIntegrationRepository().getListEmail(payload))
      .then(({ data }) => resolve(data.data))
      .catch((error) => reject(error));
  });
};

export function useExportTicket(
  arrayString: string[]
): [ItemConversation[], boolean] {
  const queries = useQueries(
    arrayString.map((id) => ({
      queryKey: ["fetchConversation", id],
      queryFn: () => fetchConversationApi(id),
      staleTime: 10000,
    }))
  );
  const isLoading: boolean = queries.some((query) => query.isLoading);

  const data = queries.map((query) => query.data);
  return [data as ItemConversation[], isLoading];
}
