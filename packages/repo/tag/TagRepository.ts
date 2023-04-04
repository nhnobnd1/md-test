import { createRepository } from '@moose-desk/core';
import env from '../env';
import { BaseDeleteList, DeleteTagsRequest } from '../unty';
import {
	CreateTagRequest,
	CreateTagResponse,
	DeleteTagResponse,
	GetListTagRequest,
	GetListTagResponse,
	GetListTicketByTagResponse,
	GetOneTagResponse,
	UpdateTagRequest,
	UpdateTagResponse,
} from './Tag';

export const TagRepository = createRepository(
	() => ({
		baseURL: `${env.getApiUrl()}/api/v1/tag`,
	}),
	{
		getList(api, params: GetListTagRequest) {
			return api.get<GetListTagResponse>('', params);
		},
		getListTicket(api, id: string, params: GetListTagRequest) {
			return api.get<GetListTicketByTagResponse>(`/view-tickets/${id}`, params);
		},
		getOne(api, id: string | undefined) {
			return api.get<GetOneTagResponse>(`/${id}`);
		},
		create(api, data: CreateTagRequest) {
			return api.post<CreateTagResponse>('', data);
		},
		update(api, id: string, data: UpdateTagRequest) {
			return api.put<UpdateTagResponse>(`/${id}`, data);
		},
		delete(api, data: DeleteTagsRequest) {
			return api.delete<DeleteTagResponse>('', {}, { data });
		},
		deleteForce(api, id: string) {
			return api.delete<DeleteTagResponse>(`/remove-from-all-tickets/${id}`);
		},
	}
);

export default TagRepository;
