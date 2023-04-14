export default interface ChartFirstResponseTimeRes {
  date: string;
  avgFirstResponseTime?: number;
}
export default interface ChartResolutionTimeRes {
  date: string;
  avgResolutionTicket: number;
}
export default interface ChartSupportVolumeRes {
  date: string;
  ticketsCreated: number;
  ticketsResolved: number;
  ticketsResponded: number;
}
export default interface ListAgentTableRes {
  agentFirstName: string;
  agentLastName: string;
  percentage: number;
  ticketAssigned: number;
  ticketClosed: number;
}
export default interface SummaryReportRes {
  avgFirstResponseTime?: number;
  avgResolutionTime?: number;
  ticketClosedCount: number;
  ticketCreatedCount: number;
  ticketRepliedCount: number;
}
type AgentClosedData = {
  agentFirstName: string;
  agentLastName: string;
  agentObjectId: string;
  totalTicket: number;
};
export default interface ChartTopFiveRes {
  date: string;
  agentClosed: AgentClosedData[];
}
