import { TokenManager } from "@moose-desk/core";
import {
  AccountRepository,
  AgentRepository,
  UserSettingRepository,
} from "@moose-desk/repo";
import axios from "axios";
import { lastValueFrom } from "rxjs";
import env from "src/core/env";
const instance = axios.create({
  baseURL: `${env.API_URL}/api/${env.API_VERSION}`,
  timeout: 30000,
});
export const getProfile = (params: string) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(AgentRepository().getOne(params))
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
export const getStatus2FA = () => {
  return new Promise((resolve, reject) => {
    lastValueFrom(AccountRepository().userGet2FAStatus())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const updateProfile = (payload: any, id: string) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(AgentRepository().update(id, payload))
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
