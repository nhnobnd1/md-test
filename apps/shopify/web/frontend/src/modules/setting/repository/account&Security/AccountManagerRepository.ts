import { createRepository } from "@moose-desk/core";
import env from "src/core/env";
import {
  CreateAccountManagerRequest,
  CreateAccountManagerResponse,
  GetAccountManagerResponse,
} from "src/modules/setting/modal/account&Security/AccountManager";

const AccountManagerRepository = createRepository(
  {
    baseURL: `${env.API_URL}/api/v1/account/setting`,
  },
  {
    getData(api, params: string | undefined) {
      return api.get<GetAccountManagerResponse>(`/access-manager/${params}`);
    },
    postData(api, data: CreateAccountManagerRequest) {
      return api.post<CreateAccountManagerResponse>("/access-manager", data);
    },
  }
);

export default AccountManagerRepository;
