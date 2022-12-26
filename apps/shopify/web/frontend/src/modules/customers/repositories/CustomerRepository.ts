import { createRepository } from "@moose-desk/core";
import env from "src/core/env";
import { BaseDeleteList } from "src/models/Request";
import {
  CreateCustomerRequest,
  CreateCustomerResponse,
  DeleteCustomerResponse,
  GetListCustomerRequest,
  GetListCustomerResponse,
  GetOneCustomerResponse,
  UpdateCustomerRequest,
  UpdateCustomerResponse,
} from "src/modules/customers/modal/Customer";

const CustomerRepository = createRepository(
  {
    baseURL: `${env.API_URL}/api/v1/customer`,
  },
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
  }
);

export default CustomerRepository;
