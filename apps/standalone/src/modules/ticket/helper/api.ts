import {
  AgentRepository,
  BaseDeleteList,
  BaseListTicketFilterRequest,
  CustomerRepository,
  EmailIntegrationRepository,
  GetListAgentRequest,
  GetListCustomerRequest,
  GetListTagRequest,
  GetListTicketRequest,
  TagRepository,
  TicketRepository,
  UpdateTicket,
} from "@moose-desk/repo";
import { lastValueFrom } from "rxjs";

export const getStatisticTicket = () => {
  return new Promise((resolve, reject) => {
    lastValueFrom(TicketRepository().getStatistic())
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const getTagsTicket = (payload: GetListTagRequest) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(TagRepository().getList(payload))
      .then(({ data }) => resolve(data))
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
export const getListTrashApi = (payload: GetListTicketRequest) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(TicketRepository().getListTrash(payload))
      .then(({ data }) => resolve(data))
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

export const getListTicketApi = (payload: GetListTicketRequest) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(TicketRepository().getList(payload))
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

export const getListCustomerApi = (payload: GetListCustomerRequest) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(CustomerRepository().getList(payload))
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getListAgentApi = (payload: GetListAgentRequest) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(AgentRepository().getList(payload))
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const emailIntegrationApi = () => {
  return new Promise((resolve, reject) => {
    lastValueFrom(EmailIntegrationRepository().getPrimaryEmail())
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};
