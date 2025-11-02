import axios, {
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import type { AxiosError } from "axios";
import { authService } from "../auth/auth.s";

export const apiAuthInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = authService.getToken();

  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  config.headers["Accept-Language"] = "en"; // TODO: add dynamic language support

  return config;
};

const responseErrorInterceptor = (error: AxiosError) => {
  if (error.response?.status === 404) {
    throw new Response("err: not found", {
      status: 404,
      statusText: "err: not found",
    });
  }

  if (error.response?.status === 500) {
    throw new Response("err: internal server error", {
      status: 500,
      statusText: "err: internal server error",
    });
  }

  return Promise.reject(error);
};

export const apiService = axios.create({
  baseURL: "https://api.drapireact.loc/v1",
});

export const apiAuthService = axios.create({
  baseURL: "https://api.drapireact.loc/v1/auth",
});

apiService.interceptors.request.use(apiAuthInterceptor);
apiAuthService.interceptors.request.use(apiAuthInterceptor);

apiService.interceptors.response.use(
  (response: AxiosResponse) => response,
  responseErrorInterceptor,
);

apiAuthService.interceptors.response.use(
  (response: AxiosResponse) => response,
  responseErrorInterceptor,
);
