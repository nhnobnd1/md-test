import {
  BaseListRequest,
  BaseListResponse,
  BaseResponse,
} from "src/models/Request";

export type Customer = {
  id: string;
  _id: string;
  createdDatetime: string;
  createdTimestamp: string;
  createdBy: string;
  updatedDatetime?: string;
  updatedTimestamp?: string;
  updatedBy?: string;
  deleted: boolean;
  deletedDatetime?: string;
  deletedTimestamp?: string;
  deletedBy?: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  storeId: string;
};
export interface BaseListCustomerRequest extends BaseListRequest {
  sortBy: string;
  sortOder: number;
}
export type GetListCustomerRequest = BaseListCustomerRequest;
export type GetListCustomerResponse = BaseListResponse<Customer>;
export type GetOneCustomerResponse = BaseListResponse<Customer>;
export type CreateCustomerRequest = Omit<Customer, "id">;
export type CreateCustomerResponse = BaseResponse<Customer>;
export type UpdateCustomerRequest = Customer;
export type UpdateCustomerResponse = BaseListResponse<Customer>;
export type DeleteCustomerResponse = BaseListResponse<Customer>;
