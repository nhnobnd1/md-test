import { useSearchParams } from "@moose-desk/core";
import { useEffect, useRef } from "react";

export function useShopDomain() {
  const shopDomain = useRef<null | string>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    shopDomain.current = searchParams.get("shop");
  }, [searchParams]);

  return shopDomain.current;
}
