import { BaseListRequest, BaseListResponse, BaseResponse } from '../unty';

export enum Priority {
	URGENT = 'URGENT',
	HIGH = 'HIGH',
	MEDIUM = 'MEDIUM',
	LOW = 'LOW',
}

export enum StatusTicket {
	PENDING = 'PENDING',
	OPEN = 'OPEN',
	RESOLVED = 'RESOLVED',
	NEW = 'NEW',
}

export const statusOptions = [
	{
		label: 'Pending',
		value: StatusTicket.PENDING,
	},
	{
		label: 'Open',
		value: StatusTicket.OPEN,
	},
	{
		label: 'Resolved',
		value: StatusTicket.RESOLVED,
	},
];

export const priorityOptions = [
	{
		label: 'Urgent',
		value: Priority.URGENT,
	},
	{
		label: 'High',
		value: Priority.HIGH,
	},
	{
		label: 'Medium',
		value: Priority.MEDIUM,
	},
	{
		label: 'Low',
		value: Priority.LOW,
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
	agentEmail: string;
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
	text: string;
	meta: {
		isSample: boolean;
	};
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
	text: string;
	senderConfigId: string;
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
		NEW: number;
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
	agentEmail?: string;
};

export interface BaseListTicketRequest extends BaseListRequest {
	sortBy?: string;
	sortOrder?: number;
}
export interface BaseListTicketFilterRequest extends BaseListRequest {
	sortBy?: string;
	sortOrder?: number;
	customer?: string;
	tags?: string;
	status?: string;
	priority?: string;
	agentObjectId?: string;
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
export type UploadFileResponse = {
	data: {
		ids: string[];
		urls: string[];
	};
	statusCode: number;
	datetime: string;
};
