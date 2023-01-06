import { BaseResponse } from "../unty";
import { CreateUserGroupRequest, CreateUserGroupResponse, GetListUserGroupRequest, GetListUserGroupResponse, GetMembersGroupRequest, GetMembersGroupResponse, GetOneUserGroupResponse, UpdateUserGroupRequest, UpdateUserGroupResponse } from "./UserGroup";
export declare const UserGroupRepository: () => {
    delete: (id: string) => import("rxjs").Observable<import("axios").AxiosResponse<BaseResponse<{}>, any>>;
    getList: (params: GetListUserGroupRequest) => import("rxjs").Observable<import("axios").AxiosResponse<GetListUserGroupResponse, any>>;
    getOne: (id: string) => import("rxjs").Observable<import("axios").AxiosResponse<GetOneUserGroupResponse, any>>;
    create: (data: CreateUserGroupRequest) => import("rxjs").Observable<import("axios").AxiosResponse<CreateUserGroupResponse, any>>;
    update: (id: string, data: UpdateUserGroupRequest) => import("rxjs").Observable<import("axios").AxiosResponse<UpdateUserGroupResponse, any>>;
    getListMembers: (id: string, params: GetMembersGroupRequest) => import("rxjs").Observable<import("axios").AxiosResponse<GetMembersGroupResponse, any>>;
};
export default UserGroupRepository;
//# sourceMappingURL=UserGroupRepository.d.ts.map