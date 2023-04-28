import { createRepository } from '@moose-desk/core';
import env from '../env';
import { BaseResponse } from '../unty';
import { GetTourGuideRequest } from './Store';

export const TourGuideRepository = createRepository(
	() => ({
		baseURL: `${env.getApiUrl()}/api/v1/tour-guide`,
	}),
	{
		updateTourGuide(api, params: GetTourGuideRequest) {
			return api.post<BaseResponse<any>>('', params);
		},
	}
);

export default TourGuideRepository;
