import { AxiosResponse } from "axios";
import { mapValues } from "lodash-es";
import { Observable } from "rxjs";
import { Api } from "../api";
import { ApiRequestConfig } from "../models/api";

interface RepositoryInputFunc<D, P extends any[]> {
  (api: Api, ...params: P): Observable<AxiosResponse<D>>;
}

type CreateRepositoryInput = {
  [key: string]: RepositoryInputFunc<any, any>;
};

type CreateRepositoryOutput<Input, Keys extends keyof Input = keyof Input> = {
  [P in Keys]: Input[P] extends RepositoryInputFunc<infer D, infer P>
    ? (...params: P) => Observable<AxiosResponse<D>>
    : any;
};

type RequireProperties<Ob, K extends keyof Ob> = {
  [P in K]-?: Ob[P];
};

export function createRepository<Input extends CreateRepositoryInput>(
  config: () => RequireProperties<ApiRequestConfig, "baseURL">,
  input: Input
): () => CreateRepositoryOutput<Input> {
  return () => {
    const api = new Api(config().baseURL, config());
    return mapValues(input, (resourceCreator) => {
      return (...params: any[]) => {
        return resourceCreator(api, ...params);
      };
    }) as CreateRepositoryOutput<Input>;
  };
}
