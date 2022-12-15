export interface BaseListResponse<T> {
  data: T[];
  statusCode: number;
  metadata: BaseMetaDataListResponse;
  datetime: string;
  errorCode?: string;
}
export interface BaseResponse<T> {
  data: T;
  statusCode: number;
  datetime: string;
}
export interface BaseListRequest {
  page?: number;
  limit?: number;
  query?: string;
}

export interface BaseMetaDataListResponse {
  page: number;
  totalPage: number;
  totalCount: number;
  resultsPerPage: number;
}
export interface BaseDeleteList {
  ids: string[];
}
