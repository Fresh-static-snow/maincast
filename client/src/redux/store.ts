import {
  bindActionCreators,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook, useDispatch } from "react-redux";
import { api } from "./api/auth.api";
import { userSlice } from "./slices/user.slice";
import { isRefreshSlice } from "./slices/refresh.slice";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  user: userSlice.reducer,
  isRefresh: isRefreshSlice.reducer,
});

export const allActions = { ...userSlice.actions, ...isRefreshSlice.actions };

export const myStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
});

export type RootState = ReturnType<typeof myStore.getState>;
export type AppDispatch = typeof myStore.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActions, dispatch);
};
