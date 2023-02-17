import shopify from "../shopify.js";

export async function getOfflineSession(shopDomain) {
  const offlineSessionId = await shopify.api.session.getOfflineId(shopDomain);
  const offlineSession = await shopify.config.sessionStorage.loadSession(
    offlineSessionId
  );
  const customer = await shopify.api.rest.Customer.all({
    session: offlineSession,
  });
  console.log("customer", customer);

  if (offlineSession) {
    return {
      shopDomain: shopDomain ?? "",
      offlineSession: offlineSession,
    };
  }

  return {
    shopDomain: shopDomain ?? "",
    offlineSession: null,
  };
}

export async function getInformationShop(reqQueryShop) {
  try {
    const { offlineSession } = await getOfflineSession(reqQueryShop);
    const client = new shopify.api.clients.Rest({
      session: offlineSession,
    });
    const data = await client.get({
      path: "shop",
    });

    return {
      shop: data?.body?.shop,
      shopDomain: reqQueryShop,
      offlineSession,
    };
  } catch (error) {
    console.error("Get shop information error", error);
    return {
      shop: null,
      shopDomain: null,
      offlineSession: null,
    };
  }
}
