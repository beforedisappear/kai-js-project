import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createEntityAdapter } from "@reduxjs/toolkit";

// Create Adapter For Posts To Avoid Duplicates
const cardsAdapter = createEntityAdapter({
  selectId: (card) => card.id,
});

const cardsSelector = cardsAdapter.getSelectors();

const cardsApi = createApi({
  reducerPath: "cardsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.0.177:3001" }),

  endpoints: (builder) => ({
    //  getCard: builder.query({
    //    keepUnusedDataFor: 0,
    //    query: (id) => ({ url: `/api/v2/supplier/facilities/${id}` }),
    //  }),

    getCards: builder.query({
      keepUnusedDataFor: 0, // Keep unused for longer

      query: ({ page, section }) =>
        `/cards?_page=${page}&_limit=12${
          section ? `&section_like=${section}` : ""
        }`,

      transformResponse: (response, meta) => {
        //the first addition of data to the cache
        return {
          data: cardsAdapter.addMany(cardsAdapter.getInitialState(), response),
          totalCount: Number(meta.response.headers.get("X-Total-Count")),
        };
      },

      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          currentArg?.page !== previousArg?.page ||
          currentArg?.section != previousArg?.section
        );
      },

      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return `${endpointName}-${queryArgs?.section || "all"}`;
      },

      merge: (currentState, incomingState, arg) => {
        //if we don't use search and request the first n feedback items,
        //then we use setMany to reset our cache with data
        if (arg.arg?.page > 0) {
          cardsAdapter.setMany(
            currentState.data,
            cardsSelector.selectAll(incomingState.data)
          );
        }
        //else we use pagination by page increasing,
        //so we merge our cache with data (new feedback items selection)
        else {
          cardsAdapter.setAll(
            currentState.data,
            cardsSelector.selectAll(incomingState.data)
          );
        }
        // currentState.size = incomingState;
      },
    }),

    addToCart: builder.mutation({
      query: (id) => ({
        url: `/cards/${id}`,
        method: "PUT",
        body: { isCard: true },
      }),
    }),
  }),
});

export const { useGetCardsQuery, useAddToCartMutation } = cardsApi;

const cardsSelectors = cardsAdapter.getSelectors((state) => state);

export { cardsSelectors, cardsAdapter };

export default cardsApi;
