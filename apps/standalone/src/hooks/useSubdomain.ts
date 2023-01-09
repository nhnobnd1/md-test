import { useMount } from "@moose-desk/core";
import { useCallback, useState } from "react";

export function useSubdomain() {
  const [subDomain, setSubDomain] = useState<string | undefined>();

  const getSubDomain = useCallback(() => {
    const domain = window.location.hostname;
    if (domain.includes(".moosedesk.net")) {
      return domain.replace(".moosedesk.net", "");
    } else if (domain.includes("-dev.moosedesk.net")) {
      return domain.replace("-dev.moosedesk.net", "");
    } else {
      return "";
    }
  }, [window.location]);

  useMount(() => {
    setSubDomain(getSubDomain());
  });

  return {
    subDomain,
    setSubDomain,
    getSubDomain,
  };
}
