import { createRepository } from "@moose-desk/core";
import env from "../env";
import { BaseResponse } from "../unty";
import {
  CreateUserGroupRequest,
  CreateUserGroupResponse,
  GetListUserGroupRequest,
  GetListUserGroupResponse,
  GetMembersGroupRequest,
  GetMembersGroupResponse,
  GetOneUserGroupResponse,
  UpdateUserGroupRequest,
  UpdateUserGroupResponse,
} from "./UserGroup";

export const UserGroupRepository = createRepository(
  () => ({
    baseURL: `${env.getApiUrl()}/api/v1/account/group`,
  }),
  {
    getList(api, params: GetListUserGroupRequest) {
      return api.get<GetListUserGroupResponse>("", params);
    },
    getOne(api, id: string) {
      return api.get<GetOneUserGroupResponse>(`/${id}`);
    },
    create(api, data: CreateUserGroupRequest) {
      return api.post<CreateUserGroupResponse>("", data);
    },
    update(api, id: string, data: UpdateUserGroupRequest) {
      return api.put<UpdateUserGroupResponse>(`/${id}`, data);
    },
    delete(api, id: string) {
      return api.delete<BaseResponse<{}>>(`/${id}`);
    },
    getListMembers(api, id: string, params: GetMembersGroupRequest) {
      return api.get<GetMembersGroupResponse>(`/${id}/members`, params);
    },
  }
);

export default UserGroupRepository;
