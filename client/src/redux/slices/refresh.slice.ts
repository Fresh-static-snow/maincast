import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type IsRefreshState = {
  isRefresh: boolean;
};

const initialState: IsRefreshState = {
  isRefresh: false,
};

export const isRefreshSlice = createSlice({
  name: "isRefresh",
  initialState,
  reducers: {
    setIsRefresh(state, payload: PayloadAction<IsRefreshState>) {
      state.isRefresh = payload.payload.isRefresh;
    },
  },
});

