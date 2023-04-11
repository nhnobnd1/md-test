import { createRepository } from "@moose-desk/core";
import env from "../env";
import { BaseListReportRequest, ReportResponse } from "./Report";

const ReportRepository = createRepository(
  () => ({
    baseURL: `${env.getApiUrl()}/api/v1/report`,
  }),
  {
    getReportSummary(api, params: BaseListReportRequest) {
      return api.get<ReportResponse>("/overview/summary", params);
    },
    getSupportVolume(api, params: BaseListReportRequest) {
      return api.get<ReportResponse>("/overview/support-volume", params);
    },
    getResolutionTime(api, params: BaseListReportRequest) {
      return api.get<ReportResponse>("/overview/resolution-time", params);
    },
    getFirstResponseTime(api, params: BaseListReportRequest) {
      return api.get<ReportResponse>("/overview/first-response-time", params);
    },
    getReportByTags(api, params: BaseListReportRequest) {
      return api.get<ReportResponse>("/by-tags", params);
    },
    getReportTopFive(api, params: BaseListReportRequest) {
      return api.get<ReportResponse>("/by-agents/top5", params);
    },
    getListAgent(api, params: BaseListReportRequest) {
      return api.get<ReportResponse>("/by-agents/list-agent", params);
    },
  }
);
export default ReportRepository;
