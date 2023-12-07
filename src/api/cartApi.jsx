import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createEntityAdapter } from "@reduxjs/toolkit";

// // Create Adapter For Posts To Avoid Duplicates
// const cardsAdapter = createEntityAdapter({
//   selectId: (card) => card.id,
// });

// const cardsSelector = cardsAdapter.getSelectors();

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

      // forceRefetch: ({ currentArg, previousArg }) => {
      //   return (
      //     currentArg?.page !== previousArg?.page ||
      //     currentArg?.section != previousArg?.section
      //   );
      // },

      // serializeQueryArgs: ({ endpointName, queryArgs }) => {
      //   return `${endpointName}-${queryArgs?.section || "all"}`;
      // },

      // merge: (currentState, incomingState, arg) => {
      //   //if we don't use search and request the first n feedback items,
      //   //then we use setMany to reset our cache with data
      //   if (arg.arg?.page > 0) {
      //     cardsAdapter.setMany(
      //       currentState.data,
      //       cardsSelector.selectAll(incomingState.data)
      //     );
      //   }
      //   //else we use pagination by page increasing,
      //   //so we merge our cache with data (new feedback items selection)
      //   else {
      //     cardsAdapter.setAll(
      //       currentState.data,
      //       cardsSelector.selectAll(incomingState.data)
      //     );
      //   }
      //   // currentState.size = incomingState;
      // },
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
  }),
});

export const { useGetCardsFromCartQuery, useRemoveCardFromCartMutation } =
  cartApi;

export default cartApi;
