import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { AxiosObservableRequestConfig } from "../models";
export declare class AxiosObservable<GlobalResponseType = any> {
    private config?;
    private axios;
    constructor(config?: AxiosObservableRequestConfig);
    get interceptors(): {
        request: import("axios").AxiosInterceptorManager<import("axios").AxiosRequestConfig<any>>;
        response: import("axios").AxiosInterceptorManager<AxiosResponse<any, any>>;
    };
    static create<ResponseType = any>(config?: AxiosObservableRequestConfig): AxiosObservable<ResponseType>;
    request<ResponseType = GlobalResponseType>(config: AxiosObservableRequestConfig): Observable<AxiosResponse<ResponseType, any>>;
    get<ResponseType = GlobalResponseType>(url: string, config?: AxiosObservableRequestConfig): Observable<AxiosResponse<ResponseType, any>>;
    delete<ResponseType = GlobalResponseType>(url: string, config?: AxiosObservableRequestConfig): Observable<AxiosResponse<ResponseType, any>>;
    post<ResponseType = GlobalResponseType>(url: string, data?: any, config?: AxiosObservableRequestConfig): Observable<AxiosResponse<ResponseType, any>>;
    put<ResponseType = GlobalResponseType>(url: string, data?: any, config?: AxiosObservableRequestConfig): Observable<AxiosResponse<ResponseType, any>>;
    patch<ResponseType = GlobalResponseType>(url: string, data?: any, config?: AxiosObservableRequestConfig): Observable<AxiosResponse<ResponseType, any>>;
}
