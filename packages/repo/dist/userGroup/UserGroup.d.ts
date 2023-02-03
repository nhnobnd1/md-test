import { BaseListRequest, BaseListResponse, BaseResponse } from "../unty";
export interface UserGroup {
    _id: string;
    name: string;
    memberCount: number;
    creationTime: string;
    description?: string;
    memberIds: string[];
}
export interface GroupMembers {
    _id: string;
    name: string;
    email: string;
}
export interface GetListUserGroupRequest extends BaseListRequest {
}
export declare type GetListUserGroupResponse = BaseListResponse<UserGroup>;
export interface CreateUserGroupRequest {
    storeId: string;
    name: string;
    description: string;
    groupMembers: string[];
}
export declare type CreateUserGroupResponse = BaseResponse<Required<UserGroup>>;
export interface UpdateUserGroupRequest {
    name: string;
    description: string;
    groupMembers: string[];
}
export declare type UpdateUserGroupResponse = BaseResponse<Required<UserGroup>>;
export declare type GetOneUserGroupResponse = BaseResponse<Required<UserGroup>>;
export interface GetMembersGroupRequest extends BaseListRequest {
    id?: string;
}
export declare type GetMembersGroupResponse = BaseListResponse<GroupMembers>;
//# sourceMappingURL=UserGroup.d.ts.map