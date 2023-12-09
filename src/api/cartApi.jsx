import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.0.177:3001" }),
  tagTypes: ["card"],

  endpoints: (builder) => ({
    getCardsFromCart: builder.query({
      keepUnusedDataFor: 0, // Keep unused for longer

      query: () => `/cards?inCart_like=true`,

      providesTags: ["card"],

      transformResponse: (response, meta) => {
        return {
          data: response,
          totalCost: response.reduce((acc, el) => {
            return (acc += el?.price);
          }, 0),
        };
      },
    }),

    removeCardFromCart: builder.mutation({
      query: ({ id }) => ({
        url: `/cards/${id}`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: { inCart: false },
      }),

      invalidatesTags: ["card"],
    }),

    createOrder: builder.mutation({
      query: (data) => ({
        url: `/orders`,
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetCardsFromCartQuery,
  useRemoveCardFromCartMutation,
  useCreateOrderMutation,
} = cartApi;

export default cartApi;
