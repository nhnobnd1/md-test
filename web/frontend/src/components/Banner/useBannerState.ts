import { BannerStatus } from "@shopify/polaris";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BannerState } from "src/hooks/useBanner";

export function useBannerState(
  showBanner: (
    status: BannerStatus,
    options: Omit<BannerState, "status" | "visible">
  ) => void
) {
  const { state } = useLocation();

  useEffect(() => {
    if (state?.banner && state.banner?.status) {
      showBanner &&
        showBanner(state.banner.status, {
          title: state.banner.title ?? undefined,
          message: state.banner.message ?? "",
        });
    }
  }, [state]);
}
