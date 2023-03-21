import { createRepository } from '@moose-desk/core';
import env from '../env';
import {
	CreateTicketRequest,
	CreateTicketResponse,
	GetListTicketRequest,
	GetListTicketResponse,
	GetOneTicketResponse,
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
		getOne(api, id: string | undefined) {
			return api.get<GetOneTicketResponse>(`/${id}`);
		},
		create(api, data: CreateTicketRequest) {
			return api.post<CreateTicketResponse>('', data);
		},
		update(api, id: string, data: UpdateTicketRequest) {
			return api.put<UpdateTicketResponse>(`/${id}`, data);
		},
	}
);

export default TicketRepository;
