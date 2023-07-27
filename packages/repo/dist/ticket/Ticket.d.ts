import { BaseListRequest, BaseListResponse, BaseResponse } from '../unty';
export declare enum Priority {
    URGENT = "URGENT",
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
}
export declare enum StatusTicket {
    PENDING = "PENDING",
    OPEN = "OPEN",
    RESOLVED = "RESOLVED",
    NEW = "NEW"
}
export declare const statusOptions: {
    label: string;
    value: StatusTicket;
}[];
export declare const priorityOptions: {
    label: string;
    value: Priority;
}[];
export declare type AttachFile = {
    attachmentUrl: string;
    contentType: string;
    createdTimestamp: number;
    deleted: boolean;
    name: string;
    size: string;
    thumbUrl?: string;
    _id: string;
};
export declare type Ticket = {
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
    toEmails: [{
        email: string;
        name: string;
    }];
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
export declare type Conversation = {
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
    toEmails: [{
        email: string;
        name: string;
    }];
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
};
export declare type ReplyTicket = {
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
    toEmails: [{
        name: string;
        email: string;
    }];
};
export declare type TicketStatistic = {
    statusCode: number;
    data: {
        OPEN: number;
        PENDING: number;
        RESOLVED: number;
        TRASH: number;
        NEW: number;
    };
};
export declare type RestoreTicketResponse = {
    statusCode: number;
};
export declare type UpdateTicket = {
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
export declare type GetListTicketRequest = BaseListTicketRequest;
export declare type GetListTicketResponse = BaseListResponse<Ticket>;
export declare type GetListTicketConversationResponse = BaseListResponse<Conversation>;
export declare type GetOneTicketResponse = BaseResponse<Ticket>;
export declare type CreateTicketRequest = Omit<Ticket, 'id'>;
export declare type CreateReplyTicketRequest = ReplyTicket;
export declare type CreateReplyTicketResponse = BaseResponse<Conversation>;
export declare type CreateTicketResponse = BaseResponse<Ticket>;
export declare type UpdateTicketRequest = UpdateTicket;
export declare type UpdateTicketResponse = BaseResponse<Ticket>;
export declare type DeleteTicketResponse = BaseListResponse<Ticket>;
export declare type StatisticTicketResponse = TicketStatistic;
export declare type UploadFileResponse = {
    data: {
        ids: string[];
        urls: string[];
    };
    statusCode: number;
    datetime: string;
};
//# sourceMappingURL=Ticket.d.ts.map