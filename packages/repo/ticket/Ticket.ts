import { BaseListRequest, BaseListResponse, BaseResponse } from '../unty';

export enum Priority {
	Highest = 'Highest',
	High = 'High',
	Medium = 'Medium',
	Low = 'Low',
	Lowest = 'Lowest',
}

export enum StatusTicket {
	PENDING = 'PENDING',
	OPEN = 'OPEN',
	RESOLVED = 'RESOLVED',
}

export const statusOptions = [
	{
		label: 'PENDING',
		value: StatusTicket.PENDING,
	},
	{
		label: 'OPEN',
		value: StatusTicket.OPEN,
	},
	{
		label: 'RESOLVED',
		value: StatusTicket.RESOLVED,
	},
];

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

export type AttachFile = {
	attachmentUrl: string;
	contentType: string;
	createdTimestamp: number;
	deleted: boolean;
	name: string;
	size: string;
	thumbUrl?: string;
	_id: string;
};

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
		email: string;
		name: string;
	};
	senderConfigId: string;
	agentObjectId: string;
	customerObjectId: string;
	toEmails: [{ email: string; name: string }];
	ccEmails: string[];
	bccEmails: string[];
	tags: string[];
	sendEmailFailureCount: number;
	createdViaWidget: boolean;
	mailMessageId: string;
	incoming: boolean;
	attachments: AttachFile[];
	_id: string;
};

export type Conversation = {
	id: string;
	createdDatetime: string;
	createdTimestamp: number;
	createdBy?: string;
	deleted: boolean;
	incoming: boolean;
	sendEmailFailureCount: number;
	storeId: string;
	body: string;
	bodyText: string;
	description: string;
	fromEmail?: {
		email: string;
		name: string;
	};
	toEmails: [{ email: string; name: string }];
	ccEmails: string[];
	bccEmails: string[];
	attachmentIds: string[];
	ticketId: number;
	ticketObjectId: string;
	referenceMailMessageId: string;
	mailMessageId: string;
	attachments: AttachFile[];
	_id: string;
};

export type ReplyTicket = {
	id: string;
	attachmentIds?: string[];
	bccEmails?: string[];
	description: string;
	senderConfigId: string;
	ccEmails?: string[];
	fromEmail: {
		email: string;
		name: string;
	};
	toEmails: [{ name: string; email: string }];
};

export type TicketStatistic = {
	statusCode: number;
	data: {
		OPEN: number;
		PENDING: number;
		RESOLVED: number;
		TRASH: number;
	};
};

export type RestoreTicketResponse = {
	statusCode: number;
};

export type UpdateTicket = {
	priority?: string;
	status?: string;
	tags?: string[];
	agentObjectId?: string;
	ids: string[];
};

export interface BaseListTicketRequest extends BaseListRequest {
	sortBy?: string;
	sortOrder?: number;
}
export type GetListTicketRequest = BaseListTicketRequest;
export type GetListTicketResponse = BaseListResponse<Ticket>;
export type GetListTicketConversationResponse = BaseListResponse<Conversation>;
export type GetOneTicketResponse = BaseResponse<Ticket>;
export type CreateTicketRequest = Omit<Ticket, 'id'>;
export type CreateReplyTicketRequest = ReplyTicket;
export type CreateReplyTicketResponse = BaseResponse<Conversation>;
export type CreateTicketResponse = BaseResponse<Ticket>;
export type UpdateTicketRequest = UpdateTicket;
export type UpdateTicketResponse = BaseResponse<Ticket>;
export type DeleteTicketResponse = BaseListResponse<Ticket>;
export type StatisticTicketResponse = TicketStatistic;
