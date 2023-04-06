import { createRepository } from "@moose-desk/core";
import env from "../env";
import { BaseDeleteList } from "../unty";
import {
  CreateCustomerRequest,
  CreateCustomerResponse,
  DeleteCustomerResponse,
  GetListCustomerRequest,
  GetListCustomerResponse,
  GetOneCustomerResponse,
  UpdateCustomerRequest,
  UpdateCustomerResponse,
} from "./Customer";

export const CustomerRepository = createRepository(
  () => ({
    baseURL: `${env.getApiUrl()}/api/v1/customer`,
  }),
  {
    getList(api, params: GetListCustomerRequest) {
      return api.get<GetListCustomerResponse>("", params);
    },
    getOne(api, id: string | undefined) {
      return api.get<GetOneCustomerResponse>(`/${id}`);
    },
    create(api, data: CreateCustomerRequest) {
      return api.post<CreateCustomerResponse>("", data);
    },
    update(api, id: string, data: UpdateCustomerRequest) {
      return api.put<UpdateCustomerResponse>(`/${id}`, data);
    },
    delete(api, data: BaseDeleteList) {
      return api.delete<DeleteCustomerResponse>("", {}, { data });
    },
    getListTicket(api, id: string, params: GetListCustomerRequest) {
      return api.get(`/all-tickets/${id}`, params);
    },
  }
);

export default CustomerRepository;
