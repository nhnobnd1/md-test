import { Shopify } from "@shopify/shopify-api";

export async function getOfflineSession(reqQueryShop) {
  const shopData = await Shopify.Utils.sanitizeShop(reqQueryShop);
  const offlineSession = await Shopify.Utils.loadOfflineSession(shopData);
  if (!offlineSession) {
    return {
      shop: shopData ?? "",
      offlineSession: null,
    };
  }
  return {
    shop: shopData ?? "",
    offlineSession,
  };
}

export async function getInformationShop(reqQueryShop) {
  try {
    const { offlineSession, shop } = await getOfflineSession(reqQueryShop);
    const client = new Shopify.Clients.Rest(shop, offlineSession.accessToken);
    const data = await client.get({
      path: "shop",
    });
    return {
      shop: data?.body?.shop,
      shopDomain: shop,
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
