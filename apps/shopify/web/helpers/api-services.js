import { config } from 'dotenv';
import fetch from 'node-fetch';

config();

export function api() {
	const config = {
		mode: 'cors',
		cache: 'no-cache',
		headers: {
			'Content-Type': 'application/json',
		},

		referrerPolicy: 'no-referrer',
	};

	return {
		get: async (url, customConfig) => {
			const response = await fetch(process.env.API_URL + url, {
				...config,
				...customConfig,
				method: 'GET',
			});
			const data = await response.json();
			return data;
		},

		post: async (url, customConfig) => {
			try {
				console.log('process.env.API_URL + url: ', process.env.API_URL + url);
				const response = await fetch(process.env.API_URL + url, {
					...config,
					...customConfig,
					method: 'POST',
					body: JSON.stringify(customConfig.body),
				});
				const data = await response.json();
				return data;
			} catch (e) {
				console.log('error registerUser: ', e);
			}
		},
	};
}

// list function api
export async function registerUser(payload) {
	try {
		const tourGuide = await api().get(
			`/v1/general/info?subdomain=${payload.subdomain}`
		);
		if (tourGuide.data.isOnboardingComplete) {
			return;
		}

		const response = await api().post('/v1/account/shopify/sign-up', {
			body: payload,
		});
		if (response.statusCode === 200) {
			console.log('sign up success', response);
		} else {
			console.log('sign up failed', response);
		}
		return response;
	} catch (error) {
		// const response = await api().post('/v1/account/shopify/sign-up', {
		// 	body: payload,
		// });
		console.log(' register first', response);
	}
}

export const uninstall = async (storeId) => {
	try {
		console.log('Call Api uninstall');
		const res = await api().post('/v1/shopify/uninstall-app', {
			headers: {
				storeId: storeId,
			},
		});

		if (res.status < 200 || res.status > 304) {
			console.log('Call api error');
		}
		return console.log('success', res.status);
	} catch (e) {
		console.log('Api uninstall fail: ', e);
		return null;
	}
};
