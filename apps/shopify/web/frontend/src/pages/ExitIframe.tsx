import { useLocation } from "@moose-desk/core";
import { Loading, useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions";
import { useEffect } from "react";

export default function ExitIframe() {
  const app = useAppBridge();
  const { search } = useLocation();

  useEffect(() => {
    if (!!app && !!search) {
      const params = new URLSearchParams(search);
      const redirectUri = params.get("redirectUri");
      if (!redirectUri) {
        return;
      }

      const url = new URL(decodeURIComponent(redirectUri));

      if (url.hostname === location.hostname) {
        const redirect = Redirect.create(app);
        redirect.dispatch(
          Redirect.Action.REMOTE,
          decodeURIComponent(redirectUri)
        );
      }
    }
  }, [app, search]);

  return <Loading />;
}
