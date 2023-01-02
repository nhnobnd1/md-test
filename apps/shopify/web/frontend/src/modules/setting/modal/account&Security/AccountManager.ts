import { BannerProps, BannerStatus } from "@shopify/polaris";
import { BaseResponse } from "src/models/Request";

export type AccountManager = {
  autoJoinEnabled: boolean;
  twoFactorAuthEnabled: boolean;
  whitelistDomains: string[];
};
export interface BaseAccountManagerRequest {
  storeId?: string;
}
export type GetAccountManagerRequest = BaseAccountManagerRequest;
export type GetAccountManagerResponse = BaseResponse<AccountManager>;
export type CreateAccountManagerRequest = Omit<AccountManager, "id">;
export type CreateAccountManagerResponse = BaseResponse<AccountManager>;

export interface BannerPropsAccessManager extends BannerProps {
  status: BannerStatus;
  isShowBanner: boolean;
  message: string;
}
