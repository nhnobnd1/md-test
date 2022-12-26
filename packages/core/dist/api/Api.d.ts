import { AxiosResponse } from "axios";
import { ApiRequestConfig, Interceptor } from "../models/api";
export declare class Api<GlobalResponse = any> {
    private axiosInstance;
    private defaultConfig;
    private tokenType?;
    private static tokenType?;
    static setAuthorizationTokenType(type: TokenTypes): void;
    private static globalParams;
    static setGlobalParams(data: {
        [key: string]: string;
    }): void;
    private static globalData;
    static setGlobalData(data: {
        [key: string]: any;
    }): void;
    private static globalHeaders;
    static setGlobalHeaders(headers: {
        [key: string]: string;
    }): void;
    private static interceptors;
    static addInterceptor(interceptor: Interceptor): () => void;
    static removeInterceptor(interceptor: Interceptor): void;
    constructor(url: string, config?: ApiRequestConfig);
    setAuthorizationTokenType(type: TokenTypes | null): void;
    private getTokenType;
    /**
     * Set up interceptors
     */
    setupInterceptor(): void;
    private useRequestInterceptors;
    private useErrorResponseInterceptor;
    private useSuccessResponseInterceptor;
    /**
     * End setup interceptors
     */
    request<Response = any>(config: ApiRequestConfig): import("rxjs").Observable<AxiosResponse<Response, any>>;
    post<Response = GlobalResponse>(url: string, data: {
        [key: string]: any;
    }, config?: ApiRequestConfig): import("rxjs").Observable<AxiosResponse<Response, any>>;
    put<Response = GlobalResponse>(url: string, data: {
        [key: string]: any;
    }, config?: ApiRequestConfig): import("rxjs").Observable<AxiosResponse<Response, any>>;
    patch<Response = GlobalResponse>(url: string, data: {
        [key: string]: any;
    }, config?: ApiRequestConfig): import("rxjs").Observable<AxiosResponse<Response, any>>;
    get<Response = GlobalResponse>(url: string, data?: any, config?: ApiRequestConfig): import("rxjs").Observable<AxiosResponse<Response, any>>;
    delete<Response = GlobalResponse>(url: string, data?: any, config?: ApiRequestConfig): import("rxjs").Observable<AxiosResponse<Response, any>>;
}
