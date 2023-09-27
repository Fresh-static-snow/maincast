import { createApi } from "@reduxjs/toolkit/query/react";
import { appConfig } from "../../configs/app.config";
import { API_PATH } from "../../routes/api_routes";
import { axiosBaseQuery } from "../axiosBaseQuery";

export type PasswordType = { password: string };
export type LoginRequest = PasswordType & { email: string };
export type LoginBbidRequest = PasswordType & { bbid: string };

export const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: appConfig.baseUrl,
  }),
  tagTypes: ['Card'],
  reducerPath: "api",
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: API_PATH.auth.login,
        method: "post",
        data,
      }),
    }),
    register: build.mutation({
      query: (data) => ({
        url: API_PATH.auth.register,
        method: "post",
        data,
      }),
    }),
    refresh: build.mutation({
      query: () => ({
        url: API_PATH.auth.refresh,
        method: "get",
      }),
    }),
    logout: build.mutation({
      query: () => {
        return {
          url: API_PATH.auth.logout,
          method: "post",
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshMutation,
  useLogoutMutation,
  useRegisterMutation,
  endpoints,
} = api;
