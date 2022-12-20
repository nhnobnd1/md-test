import env from "src/core/env";
import { createRepository } from "src/core/repository";
import { BaseDeleteList } from "src/models/Request";
import {
  CreateTagRequest,
  CreateTagResponse,
  DeleteTagResponse,
  GetListTagRequest,
  GetListTagResponse,
  UpdateTagRequest,
  UpdateTagResponse,
} from "src/modules/setting/modal/workDesk/Tag";

const TagRepository = createRepository(
  {
    baseURL: `${env.API_URL}/api/v1/tag`,
  },
  {
    getList(api, params: GetListTagRequest) {
      return api.get<GetListTagResponse>("", params);
    },
    getOne(api, id: string | undefined) {
      return api.get(`/${id}`);
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
