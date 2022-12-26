import { Shopify } from "@shopify/shopify-api";

export async function getOfflineSession(reqQueryShop) {
  const shopData = await Shopify.Utils.sanitizeShop(reqQueryShop);
  const offlineSession = await Shopify.Utils.loadOfflineSession(shopData);
  if (!offlineSession) {
    return {
      shopDomain: shopData ?? "",
      offlineSession: null,
    };
  }
  return {
    shopDomain: shopData ?? "",
    offlineSession,
  };
}

export async function getInformationShop(reqQueryShop) {
  try {
    const { offlineSession, shopDomain } = await getOfflineSession(
      reqQueryShop
    );
    const client = new Shopify.Clients.Rest(
      shopDomain,
      offlineSession.accessToken
    );
    const data = await client.get({
      path: "shop",
    });
    return {
      shop: data?.body?.shop,
      shopDomain: shopDomain,
      offlineSession,
    };
  } catch (error) {
    return {
      shop: null,
      shopDomain: null,
      offlineSession: null,
    };
  }
}
