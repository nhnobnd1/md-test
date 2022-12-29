export interface BaseListResponse<T> {
  data: T[];
  statusCode: number;
  metadata: BaseMetaDataListResponse;
  datetime: string;
  errorCode?: string;
}
export interface BaseResponse<T> {
  data: T;
  message?: string;
  error: string | string[];
  statusCode: number;
  errorCode?: string;
  datetime: string;
}
export interface BaseListRequest {
  page?: number;
  limit?: number;
  query?: string;
  sortBy?: string;
  sortOrder?: string | number;
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
