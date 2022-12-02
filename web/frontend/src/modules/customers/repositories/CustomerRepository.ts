import env from "src/core/env";
import { createRepository } from "src/core/repository";
import {
  CreateCustomerRequest,
  CreateCustomerResponse,
  DeleteCustomerResponse,
  GetListCustomerRequest,
  GetListCustomerResponse,
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
    getOne(api, id: string) {
      return api.get(`/${id}`);
    },
    create(api, data: CreateCustomerRequest) {
      return api.post<CreateCustomerResponse>("", data);
    },
    update(api, id: string, data: UpdateCustomerRequest) {
      return api.put<UpdateCustomerResponse>(`/${id}`, data);
    },
    delete(api, id: string) {
      return api.delete<DeleteCustomerResponse>(`/${id}`);
    },
  }
);

export default CustomerRepository;
