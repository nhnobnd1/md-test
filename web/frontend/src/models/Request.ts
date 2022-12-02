export interface BaseResponse<T> {
  data: T[];
  statusCode: boolean;
  metadata: BaseMetaDataListResponse;
  datetime: string;
  errorCode?: string;
}

export interface BaseListRequest {
  page?: number;
  limit?: number;
}

export interface BaseMetaDataListResponse {
  page: number;
  totalPage: number;
  totalCount: number;
  resultsPerPage: number;
}
