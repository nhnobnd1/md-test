import { AxiosRequestConfig, AxiosResponse } from "axios";
import { Subject } from "rxjs";
import { AxiosObservable } from "../../api/AxiosObservable";

export interface AxiosObservableRequestConfig<D = any>
  extends AxiosRequestConfig<D> {
  uploadProgressSubscriber?: Subject<ProgressEvent>;
  downloadProgressSubscriber?: Subject<ProgressEvent>;
}

export interface ApiRequestConfig<D = any>
  extends AxiosObservableRequestConfig<D> {
  tokenType?: TokenTypes | null;
  cache?: boolean;
  showLoading?: boolean;
  preparedData?: boolean;
  contentType?: "formData" | "urlEncoded" | "json";
  header?: {};
}

export interface Interceptor {
  request?: (
    config: ApiRequestConfig
  ) => ApiRequestConfig | Promise<AxiosRequestConfig>;
  response?: {
    success?: (
      response: AxiosResponse<any>
    ) => AxiosResponse<any> | Promise<AxiosResponse<any>>;

    error?: (error: any, axios: AxiosObservable) => any;
  };
}

export enum RequestHeaderContentType {
  Json = "application/json",
  UrlEncoded = "application/x-www-form-urlencoded",
}
