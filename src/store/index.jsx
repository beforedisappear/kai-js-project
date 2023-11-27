import { configureStore } from "@reduxjs/toolkit";

import cardsApi from "../api/cardsApi";
import cards from "../components/cardsList/cardsSlice";

// redux store creation | метод, упрощающий процесс создания и настройки хранилища
export const store = configureStore({
  //reducers list
  reducer: {
    cards,

    [cardsApi.reducerPath]: cardsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    //middleware connection for the work of RTK query
    getDefaultMiddleware({}).concat([cardsApi.middleware]),
  devTools: process.env.NODE_ENV !== "production",
});
