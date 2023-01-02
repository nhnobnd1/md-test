import { AccessManger, GetAccessMangerResponse, SetupOtpRequest, SetUpResponse, UpdateAccessManagerResponse, VerifySetupOTPRequest } from "./UserSetting";
export declare const UserSettingRepository: {
    getAccessManagerSetting: (storeId: string) => import("rxjs").Observable<import("axios").AxiosResponse<GetAccessMangerResponse, any>>;
    updateAccessManagerSetting: (data: AccessManger) => import("rxjs").Observable<import("axios").AxiosResponse<UpdateAccessManagerResponse, any>>;
    setupOtp: (data: SetupOtpRequest) => import("rxjs").Observable<import("axios").AxiosResponse<SetUpResponse, any>>;
    verifySetupOTP: (data: VerifySetupOTPRequest) => import("rxjs").Observable<import("axios").AxiosResponse<SetUpResponse, any>>;
};
export default UserSettingRepository;
//# sourceMappingURL=UserSettingRepository.d.ts.map