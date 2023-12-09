import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.0.177:3001" }),
  endpoints: (builder) => ({
    sendPhone: builder.mutation({
      query: (data) => `/users?phone_like=${data.phone}`,
    }),
    sendCode: builder.mutation({
      query: (data) => `/users?phone_like=${data.phone}&code_like=${data.code}`,
    }),
    // logoutUser: builder.mutation({
    //   query: (data) => ({
    //     url: "/logout",
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
  }),
});

export const {
  useSendPhoneMutation,
  useSendCodeMutation,
  // useLogoutUserMutation,
} = authApi;
export default authApi;
