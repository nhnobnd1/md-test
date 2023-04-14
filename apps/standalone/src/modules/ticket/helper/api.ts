import {
  BaseDeleteList,
  GetListTagRequest,
  GetListTicketRequest,
  TagRepository,
  TicketRepository,
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
