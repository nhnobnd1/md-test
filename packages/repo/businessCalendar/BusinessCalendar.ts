import { BaseListRequest, BaseListResponse, BaseResponse } from "../unty";

export enum BusinessHoursType {
  Full = "24/7",
  Custom = "CUSTOM",
}

export enum Day {
  Monday = "MONDAY",
  Tuesday = "TUESDAY",
  Wednesday = "WEDNESDAY",
  Thursday = "THURSDAY",
  Friday = "FRIDAY",
  Saturday = "SATURDAY",
  Sunday = "SUNDAY",
}

export interface BusinessHours {
  day: Day;
  timeRanges: {
    startTime: string;
    endTime: string;
  };
}

export interface Holidays {
  name: string;
  startDate: string;
  endDate: string;
  autoReplyCode: string;
}

export interface AutoReply {
  code: string;
  name: string;
  content: string;
  createAt: Date;
}

export interface BusinessCalendar {
  _id: string;
  createdDatetime: string;
  createdTimestamp: string;
  createdBy: string;
  updatedDatetime: null | string;
  updatedTimestamp: null | string;
  updatedBy: null | string;
  deleted: boolean;
  deletedDatetime: null | string;
  deletedTimestamp: null | string;
  deletedBy: null | string;
  name: string;
  description: string;
  timezone: string;
  businessHoursType: BusinessHoursType;
  businessHours: BusinessHours[];
  holidays: Holidays[];
  autoReply: AutoReply[];
  businessHoursAutoReplyCode: string;
  storeId: string;
}

export interface UpdateBusinessCalendar {
  name: string;
  timezone: string;
  businessHoursType: BusinessHoursType.Custom;
  businessHours: BusinessHours[];
  businessHoursAutoReplyCode: string;
  holidays: Holidays[];
  autoReply: AutoReply[];
}

export type GetListBusinessCalendarRequest = BaseListRequest;
export type GetListBusinessCalendarResponse =
  BaseListResponse<BusinessCalendar>;

export type UpdateBusinessCalendarRequest = UpdateBusinessCalendar;
export type UpdateBusinessCalendarResponse = BaseResponse<BusinessCalendar>;
