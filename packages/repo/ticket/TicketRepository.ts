import { createRepository } from '@moose-desk/core';
import env from '../env';
import { BaseDeleteList } from '../unty';
import {
	CreateReplyTicketRequest,
	CreateReplyTicketResponse,
	CreateTicketRequest,
	CreateTicketResponse,
	DeleteTicketResponse,
	GetListTicketConversationResponse,
	GetListTicketRequest,
	GetListTicketResponse,
	GetOneTicketResponse,
	UpdateTicket,
	UpdateTicketRequest,
	UpdateTicketResponse,
} from './Ticket';
export const TicketRepository = createRepository(
	() => ({
		baseURL: `${env.getApiUrl()}/api/v1/ticket`,
	}),
	{
		getList(api, params: GetListTicketRequest) {
			return api.get<GetListTicketResponse>('', params);
		},
		getListTrash(api, params: GetListTicketRequest) {
			return api.get<GetListTicketResponse>('/trash', params);
		},
		getOne(api, id: string | undefined) {
			return api.get<GetOneTicketResponse>(`/${id}`);
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
		update(api, id: string, data: UpdateTicket) {
			return api.put<UpdateTicketResponse>(`/${id}`, data);
		},
		delete(api, data: BaseDeleteList) {
			return api.delete<DeleteTicketResponse>('', {}, { data });
		},
		deletePermanently(api, data: BaseDeleteList) {
			return api.delete<DeleteTicketResponse>('/permanently', {}, { data });
		},
	}
);

export default TicketRepository;
