import { API_PATH } from "../../routes/api_routes";
import { api } from "./auth.api";

export const cardApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCurrencies: build.query({
      query: (params) => {
        return {
          url: API_PATH.currency.index,
          method: "get",
          params,
        };
      },
      providesTags: ['Card'],
    }),
  }),
});

export const { useGetCurrenciesQuery, endpoints } = cardApi;
