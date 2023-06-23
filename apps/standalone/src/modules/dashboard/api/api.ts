import { GetDashboardRequest } from "@moose-desk/repo/dashboard/Dashboard";
import { DashboardRepository } from "@moose-desk/repo/dashboard/DashboardRepository";
import { lastValueFrom } from "rxjs";
export const getDashboardSummary = (params: GetDashboardRequest) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(DashboardRepository().getSummary(params))
      .then((data) => resolve(data))
      .catch((error) => {
        reject(error);
      });
  });
};
export const getActivities = (params: GetDashboardRequest) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(DashboardRepository().getActivities(params))
      .then((data) => resolve(data))
      .catch((error) => {
        reject(error);
      });
  });
};
export const getTodoList = (params: GetDashboardRequest) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(DashboardRepository().getTodoList(params))
      .then((data) => resolve(data))
      .catch((error) => {
        reject(error);
      });
  });
};
