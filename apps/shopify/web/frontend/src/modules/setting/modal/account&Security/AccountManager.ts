import { BannerProps, BannerStatus } from "@shopify/polaris";
export interface BannerPropsAccessManager extends BannerProps {
  status: BannerStatus;
  isShowBanner: boolean;
  message: string;
}
