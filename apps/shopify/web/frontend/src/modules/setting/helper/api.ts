import {
  GetListTicketByTagResponse,
  Tag,
  TagRepository,
} from "@moose-desk/repo";
import BusinessCalendarRepository from "@moose-desk/repo/businessCalendar/BusinessCalendarRepository";
import { lastValueFrom } from "rxjs";

export const getListBusinessCalendar = () => {
  return new Promise((resolve, reject) => {
    lastValueFrom(
      BusinessCalendarRepository().getListBusinessCalendar({
        page: 1,
        limit: 10,
      })
    )
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const updateListBusinessCalendar = (dataSubmit: any) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(
      BusinessCalendarRepository().updateBusinessCalendar(
        dataSubmit._id,
        dataSubmit
      )
    )
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getListTicketByTag = (
  id: string,
  filter: any
): Promise<GetListTicketByTagResponse> => {
  return new Promise((resolve, reject) => {
    lastValueFrom(TagRepository().getListTicket(id, filter))
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const deleteForceTag = (id: string): Promise<Tag> => {
  return new Promise((resolve, reject) => {
    lastValueFrom(TagRepository().deleteForce(id))
      .then(({ data }) => resolve(data.data))
      .catch((error) => reject(error));
  });
};
