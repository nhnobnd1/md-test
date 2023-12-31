import { createRepository } from '@moose-desk/core';
import env from '../env';
import { GetStoreIdRequest, GetStoreIdResponse } from './Store';

export const StoreRepository = createRepository(
	() => ({
		baseURL: `${env.getApiUrl()}/api/v1/general/info`,
	}),
	{
		getStore(api, params: GetStoreIdRequest) {
			return api.get<GetStoreIdResponse>('', params);
		},
	}
);

export default StoreRepository;
