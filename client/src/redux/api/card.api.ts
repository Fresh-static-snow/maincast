import { API_PATH } from "../../routes/api_routes";
import { api } from "./auth.api";

export const cardApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCards: build.query({
      query: (params) => {
        return {
          url: API_PATH.card.index,
          method: "get",
          params,
        };
      },
      providesTags: ["Card"],
    }),
    createCard: build.mutation({
      query: (data) => {
        return {
          url: API_PATH.card.index,
          method: "post",
          data,
        };
      },
    }),
  }),
});

export const { useCreateCardMutation, useGetCardsQuery, endpoints } = cardApi;
