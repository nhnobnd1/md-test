import { BaseListRequest, BaseListResponse, BaseResponse } from "../unty";
export declare type Customer = {
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
    sortBy?: string;
    sortOrder?: number;
}
export declare type GetListCustomerRequest = BaseListCustomerRequest;
export declare type GetListCustomerResponse = BaseListResponse<Customer>;
export declare type GetOneCustomerResponse = BaseResponse<Customer>;
export declare type CreateCustomerRequest = Omit<Customer, "id">;
export declare type CreateCustomerResponse = BaseResponse<Customer>;
export declare type UpdateCustomerRequest = Customer;
export declare type UpdateCustomerResponse = BaseResponse<Customer>;
export declare type DeleteCustomerResponse = BaseListResponse<Customer>;
//# sourceMappingURL=Customer.d.ts.map