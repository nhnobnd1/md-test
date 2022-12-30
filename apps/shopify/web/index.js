// @ts-check
import express from "express";
import { readFileSync } from "fs";
import { join } from "path";
import serveStatic from "serve-static";
import { registerUser } from "./helpers/api-services.js";

import { config } from "dotenv";
import GDPRWebhookHandlers from "./gdpr.js";
import { getInformationShop } from "./helpers/shop.js";
import shopify from "./shopify.js";

config();

const PORT = parseInt(
  (process.env.BACKEND_PORT || process.env.PORT) ?? "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();

// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  async (req, res, next) => {
    const { shop, offlineSession } = await getInformationShop(req.query.shop);

    console.log("Offline session", offlineSession);

    if (shop && offlineSession) {
      const payload = {
        subdomain: shop.myshopify_domain.replace(".myshopify.com", ""),
        storeId: String(shop.id),
        shopifyToken: offlineSession.accessToken,
        email: shop.email,
        password: process.env.PASS_DEFAULT,
        firstName: shop.shop_owner,
        lastName: "admin",
        phoneNumber: shop.phone,
        companyName: null,
        timezone: shop.timezone,
      };

      await registerUser(payload);

      res.cookie(
        process.env.HOST ?? "",
        {
          offlineToken: offlineSession.accessToken ?? "",
          email: shop.email ?? "",
          shop: shop ?? null,
        },
        {
          maxAge: 900000000,
          secure: true,
          sameSite: "none",
        }
      );
    }

    next();
  },
  shopify.redirectToShopifyOrAppRoot()
);

app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);

// All endpoints after this point will require an active session
app.use("/api/*", shopify.validateAuthenticatedSession());

app.use(async (req, res, next) => {
  const { shop, offlineSession, shopDomain } = await getInformationShop(
    req.query.shop
  );

  // signup insall app -> offlineSession null
  if (shop && offlineSession) {
    res.cookie(
      process.env.HOST,
      {
        offlineToken: offlineSession.accessToken ?? "",
        email: shop.email ?? "",
        shop: shop ?? null,
      },
      {
        maxAge: 900000000,
        secure: true,
        sameSite: "none",
      }
    );
  }
  next();
});

app.use(express.json());

app.use(serveStatic(STATIC_PATH, { index: false }));

app.use("/*", shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.listen(PORT);
