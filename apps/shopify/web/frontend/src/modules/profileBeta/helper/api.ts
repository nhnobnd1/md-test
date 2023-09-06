import { AccountRepository, UpdatePasswordRequest } from "@moose-desk/repo";
import { lastValueFrom } from "rxjs";
export const updatePassword = (payload: UpdatePasswordRequest) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(AccountRepository().changePassword(payload))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
