import { BaseListRequest, BaseListResponse, BaseResponse } from '../unty';
export declare enum Priority {
    Highest = "Highest",
    High = "High",
    Medium = "Medium",
    Low = "Low",
    Lowest = "Lowest"
}
export declare const priorityOptions: {
    label: string;
    value: Priority;
}[];
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
export declare type GetListTicketRequest = BaseListTicketRequest;
export declare type GetListTicketResponse = BaseListResponse<Ticket>;
export declare type GetOneTicketResponse = BaseResponse<Ticket>;
export declare type CreateTicketRequest = Omit<Ticket, 'id'>;
export declare type CreateTicketResponse = BaseResponse<Ticket>;
export declare type UpdateTicketRequest = Ticket;
export declare type UpdateTicketResponse = BaseResponse<Ticket>;
//# sourceMappingURL=Ticket.d.ts.map