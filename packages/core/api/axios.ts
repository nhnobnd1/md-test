import { AxiosObservable } from "./AxiosObservable";

export default function createAxiosInstance(url: string): AxiosObservable {
  return AxiosObservable.create({
    baseURL: url,
  });
}
