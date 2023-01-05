import { BaseDeleteList } from "../unty";
import { CreateCustomerRequest, CreateCustomerResponse, DeleteCustomerResponse, GetListCustomerResponse, GetOneCustomerResponse, UpdateCustomerResponse } from "./Customer";
export declare const CustomerRepository: {
    delete: (data: BaseDeleteList) => import("rxjs").Observable<import("axios").AxiosResponse<DeleteCustomerResponse, any>>;
    getList: (params: import("./Customer").BaseListCustomerRequest) => import("rxjs").Observable<import("axios").AxiosResponse<GetListCustomerResponse, any>>;
    getOne: (id: string | undefined) => import("rxjs").Observable<import("axios").AxiosResponse<GetOneCustomerResponse, any>>;
    create: (data: CreateCustomerRequest) => import("rxjs").Observable<import("axios").AxiosResponse<CreateCustomerResponse, any>>;
    update: (id: string, data: import("./Customer").Customer) => import("rxjs").Observable<import("axios").AxiosResponse<UpdateCustomerResponse, any>>;
};
export default CustomerRepository;
//# sourceMappingURL=CustomerRepository.d.ts.map