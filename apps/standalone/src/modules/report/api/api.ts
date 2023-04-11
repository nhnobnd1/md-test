import ReportRepository from "@moose-desk/repo/report/ReportRepository";
import { lastValueFrom } from "rxjs";

interface IReportFilter {
  startTime?: string;
  endTime?: string;
}
export const getReportSummaryReport = (params: IReportFilter) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(ReportRepository().getReportSummary(params))
      .then((data) => resolve(data))
      .catch((error) => {
        reject(error);
      });
  });
};
export const getSupportVolume = (params: IReportFilter) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(ReportRepository().getSupportVolume(params))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const getResolutionTime = (params: IReportFilter) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(ReportRepository().getResolutionTime(params))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const getFirstResponseTime = (params: IReportFilter) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(ReportRepository().getFirstResponseTime(params))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const getReportByTags = (params: IReportFilter) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(ReportRepository().getReportByTags(params))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const getReportTopFive = (params: IReportFilter) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(ReportRepository().getReportTopFive(params))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const getListAgent = (params: IReportFilter) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(ReportRepository().getListAgent(params))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
