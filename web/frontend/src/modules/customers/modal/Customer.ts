import { BaseListRequest, BaseResponse } from "src/models/Request";

export interface Customer {
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
}

export type GetListCustomerRequest = BaseListRequest;
export type GetListCustomerResponse = BaseResponse<Customer>;
export type GetOneCustomerResponse = BaseResponse<Customer>;
export type CreateCustomerRequest = Omit<Customer, "id">;
export type CreateCustomerResponse = Customer;
export type UpdateCustomerRequest = Customer;
export type UpdateCustomerResponse = Customer;
export type DeleteCustomerResponse = boolean;
