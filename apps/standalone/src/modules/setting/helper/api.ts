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
