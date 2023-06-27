import { BaseListRequest, BaseListResponse, BaseResponse } from "../unty";

export interface Activities {
  _id: string;
  storeId: string;
  module: string;
  performer: {
    name: string;
    email: string;
    isAgent: boolean;
    id: string;
  };
  performedDatetime: string;
  performedTimestamp: number;
  actions: {
    type: string;
    ticketSubject: string;
    ticketObjectId: string;
  };
}
export interface TodoList {
  _id: string;
  createdDatetime?: string;
  createdTimestamp?: number;
  createdBy?: string;
  updatedDatetime?: string;
  updatedTimestamp?: number;
  updatedBy?: string;
  deleted: boolean;
  deletedDatetime?: string | null;
  deletedTimestamp?: number | null;
  deletedBy?: string | null;
  storeId: string;
  incoming: boolean;
  subject: string;
  ticketId: number;
  description: string;
  status: string;
  priority: string;
  fromEmail: {
    email: string;
    name: string;
  };
  fromEmailStr: string;
  senderConfigId: string;
  customerObjectId: string;
  agentObjectId: string;
  agentEmail: string;
  toEmails: [
    {
      email: string;
      name: string;
    }
  ];
  toEmailStr: string;
  attachmentIds: any[];
  sendEmailFailureCount: number;
  createdViaWidget: boolean;
  permanentlyDeleted: boolean;
  mailMessageId: string;
}
export interface Summary {
  ticketCreatedCount: number;
  ticketRepliedCount: number;
  ticketClosedCount: number;
  avgFirstResponseTime: number;
  avgResolutionTime: number;
}
export interface BaseDashboardRequest extends BaseListRequest {
  startTime?: string;
  endTime?: string;
}
export type GetDashboardRequest = BaseDashboardRequest;
export type GetListActivitiesResponse = BaseListResponse<Activities>;
export type GetTodoListResponse = BaseResponse<TodoList>;
export type GetSummaryResponse = BaseResponse<Summary>;
