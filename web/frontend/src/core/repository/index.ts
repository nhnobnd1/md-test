import { AxiosResponse } from "axios";
import { mapValues } from "lodash";
import { Observable } from "rxjs";
import { Api } from "src/core/api";
import { ApiRequestConfig } from "src/core/models/api";

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

export function createRepository<Input extends CreateRepositoryInput>(
  config: ApiRequestConfig,
  input: Input
): CreateRepositoryOutput<Input> {
  const api = new Api(config.baseURL, config);
  return mapValues(input, (resourceCreator) => {
    return (...params: any[]) => {
      return resourceCreator(api, ...params);
    };
  }) as CreateRepositoryOutput<Input>;
}
