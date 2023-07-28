import { createRepository } from '@moose-desk/core';
import env from '../env';
import { BaseResponse } from '../unty';
import { MerchantRating } from './MerchantRepository';

export const MerchantRepository = createRepository(
	() => ({
		baseURL: `${env.getApiUrl()}/api/v1/merchant-rating`,
	}),
	{
		getMerchantRating(api) {
			return api.get<BaseResponse<MerchantRating>>('');
		},
		postMerchantRating(api, params: MerchantRating) {
			return api.post<BaseResponse<MerchantRating>>('', params);
		},
	}
);

export default MerchantRepository;
