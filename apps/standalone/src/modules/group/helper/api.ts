import {
  GetListUserGroupRequest,
  GetListUserGroupResponse,
  UserGroup,
  UserGroupRepository,
} from "@moose-desk/repo";
import { lastValueFrom } from "rxjs";

export const getListGroupFilter = (
  payload: GetListUserGroupRequest
): Promise<GetListUserGroupResponse> => {
  return new Promise((resolve, reject) => {
    lastValueFrom(UserGroupRepository().getList(payload))
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};
export const getOneGroup = (id: string): Promise<UserGroup> => {
  return new Promise((resolve, reject) => {
    lastValueFrom(UserGroupRepository().getOne(id))
      .then(({ data }) => resolve(data.data))
      .catch((error) => reject(error));
  });
};
