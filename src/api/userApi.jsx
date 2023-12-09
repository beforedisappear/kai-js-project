import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.0.177:3001" }),

  endpoints: (builder) => ({
    getUser: builder.query({
      keepUnusedDataFor: 0,

      query: (token) => `/users?token_like=${token}`,
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;

export default userApi;
