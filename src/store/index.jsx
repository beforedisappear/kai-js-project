import { configureStore } from "@reduxjs/toolkit";

// redux store creation | метод, упрощающий процесс создания и настройки хранилища
export const store = configureStore({
  //reducers list
  reducer: {},
  middleware: (getDefaultMiddleware) =>
    //middleware connection for the work of RTK query
    getDefaultMiddleware({}).concat([]),
  devTools: process.env.NODE_ENV !== "production",
});
