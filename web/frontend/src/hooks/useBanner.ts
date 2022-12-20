import { BannerStatus } from "@shopify/polaris";
import { useCallback, useState } from "react";

export interface BannerState {
  visible: boolean;
  status: BannerStatus;
  title: string;
  message: string | string[];
}

export function useBanner(defaultState?: BannerState) {
  const [banner, setBanner] = useState<BannerState>(
    defaultState ?? {
      visible: false,
      status: "info",
      title: "",
      message: [""],
    }
  );

  const show = useCallback(
    (
      status: BannerStatus,
      options: Omit<BannerState, "status" | "visible">
    ) => {
      setBanner({
        visible: true,
        status: status,
        title: options.title,
        message: options.message,
      });
    },
    [banner]
  );

  const close = useCallback(() => {
    setBanner({
      visible: false,
      status: "info",
      title: "",
      message: "",
    });
  }, []);

  return {
    banner,
    show,
    close,
  };
}
