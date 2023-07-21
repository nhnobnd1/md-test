import { TokenManager } from "@moose-desk/core";
import {
  AccountRepository,
  AgentRepository,
  GetListTagRequest,
  GetListTagResponse,
  TagRepository,
  UserSettingRepository,
} from "@moose-desk/repo";
import { lastValueFrom } from "rxjs";
import instance from "src/api";
import {
  RequestPasswordPayload,
  RequestProfile,
} from "src/modules/setting/helper/interface";

export const getProfile = (params: string) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(AgentRepository().getOne(params))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const updateProfile = (id: string, payload: RequestProfile) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(AgentRepository().update(id, payload))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const updatePassword = (payload: RequestPasswordPayload) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(AccountRepository().changePassword(payload))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const getStatus2FA = () => {
  return new Promise((resolve, reject) => {
    lastValueFrom(AccountRepository().userGet2FAStatus())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const getSettingManager = () => {
  return new Promise((resolve, reject) => {
    lastValueFrom(UserSettingRepository().getAccessManagerSetting())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const updateSettingManager = (payload: any) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(UserSettingRepository().updateAccessManagerSetting(payload))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

export const getListTagFilter = (
  payload: GetListTagRequest
): Promise<GetListTagResponse> => {
  return new Promise((resolve, reject) => {
    lastValueFrom(TagRepository().getList(payload))
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const getRecoveryCodes = () => {
  return new Promise((resolve, reject) => {
    return instance
      .get(
        `/account/2fa-backup-code`,

        {
          headers: {
            Authorization: `Bearer ${TokenManager.getToken("base_token")}`,
          },
        }
      )
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};
