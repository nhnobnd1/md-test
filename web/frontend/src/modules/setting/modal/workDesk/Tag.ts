import {
  BaseListRequest,
  BaseListResponse,
  BaseResponse,
} from "src/models/Request";

export type Tag = {
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

export type GetListTagRequest = BaseListRequest;
export type GetListTagResponse = BaseListResponse<Tag>;
export type GetOneTagResponse = BaseListResponse<Tag>;
export type CreateTagRequest = Omit<Tag, "id">;
export type CreateTagResponse = BaseResponse<Tag>;
export type UpdateTagRequest = Tag;
export type UpdateTagResponse = BaseListResponse<Tag>;
export type DeleteTagResponse = BaseListResponse<Tag>;
