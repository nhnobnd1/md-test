import { Shopify } from "@shopify/shopify-api";

export default async function redirectToAuth(req, res, app) {
  if (!req.query.shop) {
    res.status(500);
    return res.send("No shop provided");
  }

  if (req.query.embedded === "1") {
    console.log("clientSideRedirect");
    return clientSideRedirect(req, res);
  }

  return await serverSideRedirect(req, res, app);
}

function clientSideRedirect(req, res) {
  const shop = Shopify.Utils.sanitizeShop(req.query.shop);
  const redirectUriParams = new URLSearchParams({
    shop,
    host: req.query.host,
  }).toString();
  const queryParams = new URLSearchParams({
    ...req.query,
    shop,
    redirectUri: `https://${Shopify.Context.HOST_NAME}/api/auth?${redirectUriParams}`,
  }).toString();
  console.log("queryParams: ", queryParams);

  return res.redirect(`/exitiframe?${queryParams}`);
}

async function serverSideRedirect(req, res, app) {
  const redirectUrl = await Shopify.Auth.beginAuth(
    req,
    res,
    req.query.shop,
    "/auth/callback",
    app.get("use-online-tokens")
  );
  console.log("redirectUrl: ", redirectUrl);

  return res.redirect(redirectUrl);
}
