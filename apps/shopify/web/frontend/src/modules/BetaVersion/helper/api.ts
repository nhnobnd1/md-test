import { TicketRepository } from "@moose-desk/repo";
import { lastValueFrom } from "rxjs";
export const uploadImage = (payload: any) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(TicketRepository().postAttachment(payload))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
