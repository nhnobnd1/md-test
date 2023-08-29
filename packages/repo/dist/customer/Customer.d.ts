import { BaseListRequest, BaseListResponse, BaseResponse } from '../unty';
export type Customer = {
    id: string;
    _id: string;
    createdDatetime: string;
    createdTimestamp: string;
    createdBy: string;
    updatedDatetime?: string;
    updatedTimestamp?: string;
    updatedBy?: string;
    deleted?: boolean;
    deletedDatetime?: string;
    deletedTimestamp?: string;
    deletedBy?: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    storeId: string;
    ticketsCount?: number;
    honorific: string;
    avatar?: string;
};
export interface BaseListCustomerRequest extends BaseListRequest {
    sortBy?: string;
    sortOrder?: number;
    getTicket?: number;
}
export type GetListCustomerRequest = BaseListCustomerRequest;
export type GetListCustomerResponse = BaseListResponse<Customer>;
export type GetOneCustomerResponse = BaseResponse<Customer>;
export type CreateCustomerRequest = Omit<Customer, 'id'>;
export type CreateCustomerResponse = BaseResponse<Customer>;
export type UpdateCustomerRequest = Customer;
export type UpdateCustomerResponse = BaseResponse<Customer>;
export type DeleteCustomerResponse = BaseListResponse<Customer>;
//# sourceMappingURL=Customer.d.ts.map