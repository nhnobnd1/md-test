import { createRepository } from "@moose-desk/core";
import env from "../env";
import {
  GetListBusinessCalendarRequest,
  GetListBusinessCalendarResponse,
  UpdateBusinessCalendarRequest,
  UpdateBusinessCalendarResponse,
} from "./BusinessCalendar";

const BusinessCalendarRepository = createRepository(
  () => ({
    baseURL: `${env.getApiUrl()}/business-calendar`,
  }),
  {
    getListBusinessCalendar(api, params: GetListBusinessCalendarRequest) {
      return api.get<GetListBusinessCalendarResponse>("", params);
    },
    updateBusinessCalendar(
      api,
      id: string,
      data: UpdateBusinessCalendarRequest
    ) {
      return api.put<UpdateBusinessCalendarResponse>(`/${id}`, data);
    },
  }
);

export default BusinessCalendarRepository;
