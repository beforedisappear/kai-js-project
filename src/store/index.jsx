import { configureStore } from "@reduxjs/toolkit";

import cardsApi from "../api/cardsApi";
import cartApi from "../api/cartApi";

import popup from "../api/popupSlice";
import cards from "../components/cardsList/cardsSlice";

// redux store creation | метод, упрощающий процесс создания и настройки хранилища
export const store = configureStore({
  //reducers list
  reducer: {
    cards,
    popup,

    [cardsApi.reducerPath]: cardsApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    //middleware connection for the work of RTK query
    getDefaultMiddleware({}).concat([cardsApi.middleware, cartApi.middleware]),
  devTools: process.env.NODE_ENV !== "production",
});
