import { BaseListRequest, BaseListResponse, BaseResponse } from '../unty';

export enum Priority {
	Highest = 'Highest',
	High = 'High',
	Medium = 'Medium',
	Low = 'Low',
	Lowest = 'Lowest',
}

export const priorityOptions = [
	{
		label: 'Highest',
		value: Priority.Highest,
	},
	{
		label: 'High',
		value: Priority.High,
	},
	{
		label: 'Medium',
		value: Priority.Medium,
	},
	{
		label: 'Low',
		value: Priority.Low,
	},
	{
		label: 'Lowest',
		value: Priority.Lowest,
	},
];

export type Ticket = {
	id: string;
	createdDatetime: string;
	createdTimestamp: number;
	createdBy: string;
	updatedDatetime?: string;
	updatedTimestamp?: string;
	updatedBy?: string;
	deleted: boolean;
	deletedDatetime?: string;
	deletedTimestamp?: string;
	deletedBy?: string;
	subject: string;
	description: string;
	storeId: string;
	ticketId: number;
	status: string;
	priority: string;
	fromEmail: {
		address: string;
		name: string;
	};
	senderConfigId: string;
	agentObjectId: string;
	customerObjectId: string;
	toEmails: string[];
	ccEmails: string[];
	bccEmails: string[];
	sendEmailFailureCount: number;
	createdViaWidget: boolean;
	mailMessageId: string;
	_id: string;
};
export interface BaseListTicketRequest extends BaseListRequest {
	sortBy?: string;
	sortOrder?: number;
}
export type GetListTicketRequest = BaseListTicketRequest;
export type GetListTicketResponse = BaseListResponse<Ticket>;
export type GetOneTicketResponse = BaseResponse<Ticket>;
export type CreateTicketRequest = Omit<Ticket, 'id'>;
export type CreateTicketResponse = BaseResponse<Ticket>;
export type UpdateTicketRequest = Ticket;
export type UpdateTicketResponse = BaseResponse<Ticket>;
