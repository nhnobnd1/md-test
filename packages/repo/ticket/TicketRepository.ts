import { createRepository } from '@moose-desk/core';
import env from '../env';
import { BaseDeleteList } from '../unty';
import {
	BaseListTicketFilterRequest,
	CreateReplyTicketRequest,
	CreateReplyTicketResponse,
	CreateTicketRequest,
	CreateTicketResponse,
	DeleteTicketResponse,
	GetListTicketConversationResponse,
	GetListTicketRequest,
	GetListTicketResponse,
	GetOneTicketResponse,
	RestoreTicketResponse,
	StatisticTicketResponse,
	UpdateTicketRequest,
	UpdateTicketResponse,
	UploadFileResponse,
} from './Ticket';
export const TicketRepository = createRepository(
	() => ({
		baseURL: `${env.getApiUrl()}/api/v1/ticket`,
	}),
	{
		getList(api, params: GetListTicketRequest) {
			return api.get<GetListTicketResponse>('', params);
		},
		getListFilter(api, params: BaseListTicketFilterRequest) {
			return api.get<GetListTicketResponse>('/filters', params);
		},
		getListTrash(api, params: GetListTicketRequest) {
			return api.get<GetListTicketResponse>('/trash', params);
		},
		getOne(api, id: string | undefined) {
			return api.get<GetOneTicketResponse>(`/${id}`);
		},
		getStatistic(api) {
			return api.get<StatisticTicketResponse>(`/status-statistics`);
		},
		getConversations(api, id: string | undefined) {
			return api.get<GetListTicketConversationResponse>(`/${id}/conversations`);
		},
		create(api, data: CreateTicketRequest) {
			return api.post<CreateTicketResponse>('', data);
		},
		postReply(api, data: CreateReplyTicketRequest) {
			return api.post<CreateReplyTicketResponse>(`/${data.id}/reply`, data);
		},
		postAttachment(api, data: any) {
			return api.post<UploadFileResponse>(
				`/attachments`,
				{ file: data },
				{
					contentType: 'formData',
					data: { file: data },
				}
			);
		},
		update(api, data: UpdateTicketRequest) {
			return api.put<UpdateTicketResponse>(``, data);
		},
		delete(api, data: BaseDeleteList) {
			return api.delete<DeleteTicketResponse>('', {}, { data });
		},
		restore(api, data: BaseDeleteList) {
			return api.put<RestoreTicketResponse>('/restore', data);
		},
		deletePermanently(api, data: BaseDeleteList) {
			return api.delete<DeleteTicketResponse>('/permanently', {}, { data });
		},
	}
);

export default TicketRepository;
