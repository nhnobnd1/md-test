import { createRepository } from "@moose-desk/core";
import env from "../env";
import { BaseDeleteList } from "../unty";
import {
  CreateTagRequest,
  CreateTagResponse,
  DeleteTagResponse,
  GetListTagRequest,
  GetListTagResponse,
  GetOneTagResponse,
  UpdateTagRequest,
  UpdateTagResponse,
} from "./Tag";

export const TagRepository = createRepository(
  {
    baseURL: `${env.API_URL}/api/v1/tag`,
  },
  {
    getList(api, params: GetListTagRequest) {
      return api.get<GetListTagResponse>("", params);
    },
    getOne(api, id: string | undefined) {
      return api.get<GetOneTagResponse>(`/${id}`);
    },
    create(api, data: CreateTagRequest) {
      return api.post<CreateTagResponse>("", data);
    },
    update(api, id: string, data: UpdateTagRequest) {
      return api.put<UpdateTagResponse>(`/${id}`, data);
    },
    delete(api, data: BaseDeleteList) {
      return api.delete<DeleteTagResponse>("", {}, { data });
    },
  }
);

export default TagRepository;
