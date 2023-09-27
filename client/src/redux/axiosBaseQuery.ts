import { BaseQueryFn } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import type { AxiosRequestConfig, AxiosError } from "axios";
import axios from "axios";
import { endpoints } from "./api/auth.api";
import { RootState } from "./store";
import { isRefreshSlice } from "./slices/refresh.slice";
import { localStorageUtil } from "../utils/localStorage";

const setIsRefresh = isRefreshSlice.actions.setIsRefresh;
const axiosBaseQuery =
  ({
    baseUrl,
  }: {
    baseUrl: string;
  }): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    AxiosError
  > =>
  async ({ url, method, data, params }, baseQueryApi) => {
    const { isRefresh } = baseQueryApi.getState() as RootState;
    const _api = axios.create({
      baseURL: baseUrl,
      withCredentials: false,
    });
    const accessToken = localStorageUtil.getItem({ key: "access_token" })
    if (accessToken) {
      _api.interceptors.request.use((config) => {
        config.headers.set("Authorization", `Bearer ${accessToken}`);
        return config;
      });
    }
    try {
      const result = await _api({ url: baseUrl + url, method, data, params });

      return { data: result.data };
    } catch (e) {
      const error = e as AxiosError;
      if (
        error?.response?.status === 401 &&
        error.config &&
        !isRefresh.isRefresh
      ) {
        try {
          const originalRequest = error.config;

          baseQueryApi.dispatch(setIsRefresh({ isRefresh: true }));
          await baseQueryApi.dispatch(endpoints.refresh.initiate({}));
          baseQueryApi.dispatch(setIsRefresh({ isRefresh: false }));

          if (accessToken) {
            originalRequest.headers.set(
              "Authorization",
              `Bearer ${accessToken}`
            );
            await _api.request(originalRequest);
          }
        } catch (e) {
          console.error(e, "refresh error");
        }
      }
      return { error };
    }
  };

export { axiosBaseQuery };
