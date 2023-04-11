import { BaseListRequest } from "../unty";

export type BlockDataReportTopFive = {
  agentFirstName: string;
  agentLastName: string;
  agenObjId: string;
  totalTicket: number;
};
export type BlockDataReport = {
  date: string;
  ticketsCreated?: number;
  ticketsResponded?: number;
  ticketsResolved?: number;
  avgResolutionTicket?: number;
  avgFirstResponseTime?: number;
  tagName?: string;
  totalTicket?: number;
  percentage?: number;
  percentageClosed?: number;
  agentClosed?: BlockDataReportTopFive[];
  agentFirstName?: string;
  agentLastName?: string;
  ticketAssigned?: number;
  ticketClosed?: number;
};
export interface ReportResponse {
  data: BlockDataReport[];
}
export interface BaseListReportRequest extends BaseListRequest {
  startTime?: string;
  endTime?: string;
  page?: number;
  limit?: number;
  query?: string;
}
