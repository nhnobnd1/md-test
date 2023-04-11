import { CustomerRepository } from "@moose-desk/repo";
import { lastValueFrom } from "rxjs";
import {
  CreateCustomerRequest,
  Customer,
  GetListCustomerRequest,
} from "./../../../../../../packages/repo/customer/Customer";
import { ListTicketCustomerFilter } from "./../helper/interface";

export const getListCustomer = (params: GetListCustomerRequest) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(CustomerRepository().getList(params))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const getListTicketCustomer = (
  id: string,
  params: ListTicketCustomerFilter
) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(CustomerRepository().getListTicket(id, params))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const deleteCustomer = (payload: { ids: string[] }) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(CustomerRepository().delete(payload))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const createCustomer = (payload: CreateCustomerRequest) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(CustomerRepository().create(payload))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const updateCustomer = (id: string, payload: Customer) => {
  return new Promise((resolve, reject) => {
    lastValueFrom(CustomerRepository().update(id, payload))
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};
