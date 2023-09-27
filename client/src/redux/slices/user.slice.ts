import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api/auth.api";
import { toast } from "react-toastify";
import { localStorageUtil } from "../../utils/localStorage";

const initialState = {
  accessToken: localStorageUtil.getItem({ key: "access_token" }),
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        localStorageUtil.setItem({
          key: "access_token",
          value: payload.data.accessToken,
        });

        state.accessToken = payload.data.accessToken;
        state.user = payload.data.user;
        toast.success("Successfully logged in");
      }
    );
    builder.addMatcher(
      api.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        localStorageUtil.setItem({
          key: "access_token",
          value: payload.data.accessToken,
        });

        state.accessToken = payload.data.accessToken;
        state.user = payload.data.user;
        toast.success("Successfully logged in");
      }
    );
    builder.addMatcher(
      api.endpoints.refresh.matchFulfilled,
      (state, { payload }) => {
        localStorageUtil.setItem({
          key: "access_token",
          value: payload.data.accessToken,
        });

        state.user = payload.data.user;
        toast.success("Welcome back!");
      }
    );
    builder.addMatcher(api.endpoints.logout.matchFulfilled, (state) => {
      localStorageUtil.removeItem({ key: "access_token" });

      state.user = null;
      state.accessToken = null;
    });
  },
});
