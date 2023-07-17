import { TokenManager } from "@moose-desk/core";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import env from "src/core/env";

const instance = axios.create({
  baseURL: `${env.API_URL}/api/${env.API_VERSION}`,
  timeout: 10000,
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = TokenManager.getToken("base_token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = TokenManager.getToken("refresh_token");

      try {
        const res = await axios.post(
          `${env.API_URL}/api/${env.API_VERSION}/account/refresh-token`,
          {
            refreshToken: refreshToken,
          }
        );
        TokenManager.setToken("base_token", res.data.data.accessToken);
        TokenManager.setToken("refresh_token", res.data.data.refreshToken);

        return instance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
export default instance;
