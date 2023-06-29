import {
  GetListUserGroupRequest,
  GetListUserGroupResponse,
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
