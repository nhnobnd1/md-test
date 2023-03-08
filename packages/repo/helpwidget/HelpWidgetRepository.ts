import { createRepository } from '@moose-desk/core';
import env from '../env';
import {
	CreateHelpWidgetRequest,
	CreateHelpWidgetResponse,
	DeleteHelpWidgetResponse,
	GetListHelpWidgetRequest,
	GetListHelpWidgetResponse,
	GetOneHelpWidgetResponse,
	UpdateHelpWidgetRequest,
	UpdateHelpWidgetResponse,
} from './HelpWidget';

export const HelpWidgetRepository = createRepository(
	() => ({
		baseURL: `${env.getApiUrl()}/api/v1/help-widget`,
	}),
	{
		getList(api, params: GetListHelpWidgetRequest) {
			return api.get<GetListHelpWidgetResponse>('', params);
		},
		getOne(api, id: string | undefined) {
			return api.get<GetOneHelpWidgetResponse>(`/${id}`);
		},
		create(api, data: CreateHelpWidgetRequest) {
			return api.post<CreateHelpWidgetResponse>('', data);
		},
		update(api, id: string, data: UpdateHelpWidgetRequest) {
			return api.put<UpdateHelpWidgetResponse>(`/${id}`, data);
		},
		delete(api, id: string) {
			return api.delete<DeleteHelpWidgetResponse>(`/${id}`);
		},
	}
);

export default HelpWidgetRepository;
