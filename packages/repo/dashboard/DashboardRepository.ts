import { createRepository } from "@moose-desk/core";
import env from "../env";
import {
  GetDashboardRequest,
  GetListActivitiesResponse,
  GetSummaryResponse,
} from "./Dashboard";

export const DashboardRepository = createRepository(
  () => ({
    baseURL: `${env.getApiUrl()}/api/v1/dashboard`,
  }),
  {
    getSummary(api, params: GetDashboardRequest) {
      return api.get<GetSummaryResponse>("/summary", params);
    },
    getActivities(api, params: GetDashboardRequest) {
      return api.get<GetListActivitiesResponse>("/recent-activities", params);
    },
    getTodoList(api, params: GetDashboardRequest) {
      return api.get("/todo-list", params);
    },
  }
);

export default DashboardRepository;
