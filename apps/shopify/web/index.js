// @ts-check
import express from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import serveStatic from 'serve-static';
import { api, registerUser } from './helpers/api-services.js';

import compression from 'compression';
import { config } from 'dotenv';
import GDPRWebhookHandlers from './gdpr.js';
import { getInformationShop } from './helpers/shop.js';
import shopify from './shopify.js';
config();

const PORT = parseInt(
	(process.env.BACKEND_PORT || process.env.PORT) ?? '3000',
	10
);

const STATIC_PATH =
	process.env.NODE_ENV === 'production'
		? `${process.cwd()}/frontend/dist`
		: `${process.cwd()}/frontend/`;

const app = express();
app.use(compression());
// Set up Shopify authentication and webhook handling
app.get(shopify.config.auth.path, shopify.auth.begin());

app.get(
	shopify.config.auth.callbackPath,
	shopify.auth.callback(),
	async (req, res, next) => {
		console.log('req', req.query.shop);
		const { shop, offlineSession } = await getInformationShop(req.query.shop);
		console.log({ shop, offlineSession });
		if (shop && offlineSession) {
			// const timezone = shop.timezone
			//   .replace("(", "")
			//   .replace(")", "")
			//   .split(" ");
			// const timeGTM = timezone.find((item) => item.includes("GMT+"));

			let payloadTimeZone = shop?.iana_timezone;

			// for (const [key, value] of Object.entries(TIME_ZONES_GMT)) {
			//   if (value === timeGTM) {
			//     payloadTimeZone = TIME_ZONES[key];
			//     break;
			//   }
			// }

			console.log('payloadTimeZone', payloadTimeZone);

			const payload = {
				subdomain: shop.myshopify_domain.replace('.myshopify.com', ''),
				storeId: String(shop.id),
				shopifyToken: offlineSession.accessToken,
				email: shop.email,
				password: process.env.PASS_DEFAULT,
				firstName: shop.shop_owner,
				lastName: 'admin',
				phoneNumber: shop.phone,
				companyName: null,
				timezone: payloadTimeZone,
			};
			console.log('install callback');
			const tourGuide = await api().get(
				`/v1/general/info?subdomain=${payload.subdomain}`
			);
			console.log({ tourGuide });
			// if dont' have tour guide
			if (tourGuide?.data?.storeId) {
			} else {
				await registerUser(payload);
			}

			res.cookie(
				process.env.HOST ?? '',
				{
					offlineToken: offlineSession.accessToken ?? '',
					email: shop.email ?? '',
					shop: shop ?? null,
				},
				{
					maxAge: 900000000,
					secure: true,
					sameSite: 'none',
				}
			);
		}
		next();
	},
	shopify.redirectToShopifyOrAppRoot()
);

app.post(
	shopify.config.webhooks.path,
	// @ts-ignore
	shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
);
// All endpoints after this point will require an active session
app.use('/api/*', shopify.validateAuthenticatedSession());

app.use(async (req, res, next) => {
	const { shop, offlineSession, shopDomain } = await getInformationShop(
		req.query?.shop
	);
		
	// signup insall app -> offlineSession null
	if (shop && offlineSession) {
		res.cookie(
			process.env.HOST,
			{
				offlineToken: offlineSession.accessToken ?? '',
				email: shop.email ?? '',
				shop: shop ?? null,
			},
			{
				maxAge: 900000000,
				secure: true,
				sameSite: 'none',
			}
		);
	}
	next();
});

app.use(express.json());

app.use(serveStatic(STATIC_PATH, { index: false }));

const addSessionShopToReqParams = (req, res, next) => {
	const shop = res.locals?.shopify?.session?.shop;
	if (shop && !req.query.shop) {
		req.query.shop = shop;
	}
	return next();
};

app.use('/api/*', shopify.validateAuthenticatedSession());
// we have to add our new middleware *after* the shopify.validateAuthenticatedSession middleware, like so:
app.use('/*', addSessionShopToReqParams);

app.use('/*', shopify.ensureInstalledOnShop(), async (_req, res, _next) => {
	console.log('request', _req.query);
	if (!_req.query?.shop) {
		return;
	}
	const { shop, offlineSession, shopDomain } = await getInformationShop(
		_req.query?.shop
	);
	const html = readFileSync(join(STATIC_PATH, 'index.html'), 'utf8');
	const data = {
		offlineToken: offlineSession?.accessToken ?? '',
		email: shop?.email ?? '',
		shop: shop ?? null,
		subdomain: shop?.name,
	};

	const script = `
 
  `;
	const modifiedHtml = html.replace('</body>', `${script}</body>`);
	return res.status(200).set('Content-Type', 'text/html').send(modifiedHtml);
});

app.listen(PORT);
