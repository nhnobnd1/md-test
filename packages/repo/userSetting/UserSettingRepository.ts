import { createRepository } from "@moose-desk/core";
import env from "../env";
import {
  AccessManger,
  GetAccessMangerResponse,
  SetupOtpRequest,
  SetUpResponse,
  UpdateAccessManagerResponse,
  VerifySetupOTPRequest,
} from "./UserSetting";

export const UserSettingRepository = createRepository(
  {
    baseURL: `${env.API_URL}/api/v1/account/setting`,
  },
  {
    getAccessManagerSetting(api, storeId: string) {
      return api.get<GetAccessMangerResponse>(`/access-manager/${storeId}`);
    },
    updateAccessManagerSetting(api, data: AccessManger) {
      return api.post<UpdateAccessManagerResponse>("/access-manager", data);
    },
    setupOtp(api, data: SetupOtpRequest) {
      return api.post<SetUpResponse>("/setup-otp", data);
    },
    verifySetupOTP(api, data: VerifySetupOTPRequest) {
      return api.post<SetUpResponse>("/verify-setup-otp", data);
    },
  }
);

export default UserSettingRepository;
