import { AxiosResponse } from "axios";
import { Observable } from "rxjs";
import { Api } from "../api";
import { ApiRequestConfig } from "../models/api";
interface RepositoryInputFunc<D, P extends any[]> {
    (api: Api, ...params: P): Observable<AxiosResponse<D>>;
}
declare type CreateRepositoryInput = {
    [key: string]: RepositoryInputFunc<any, any>;
};
declare type CreateRepositoryOutput<Input, Keys extends keyof Input = keyof Input> = {
    [P in Keys]: Input[P] extends RepositoryInputFunc<infer D, infer P> ? (...params: P) => Observable<AxiosResponse<D>> : any;
};
declare type RequireProperties<Ob, K extends keyof Ob> = {
    [P in K]-?: Ob[P];
};
export declare function createRepository<Input extends CreateRepositoryInput>(config: () => RequireProperties<ApiRequestConfig, "baseURL">, input: Input): () => CreateRepositoryOutput<Input>;
export {};
