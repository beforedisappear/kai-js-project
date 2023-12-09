import { configureStore } from "@reduxjs/toolkit";

import authApi from "../api/authApi";
import cardsApi from "../api/cardsApi";
import cartApi from "../api/cartApi";
import userApi from "../api/userApi";

import auth from "../api/authSlice";
import popup from "../api/popupSlice";
import cards from "../components/cardsList/cardsSlice";

// redux store creation | метод, упрощающий процесс создания и настройки хранилища
export const store = configureStore({
  //reducers list
  reducer: {
    cards,
    popup,
    auth,

    [authApi.reducerPath]: authApi.reducer,
    [cardsApi.reducerPath]: cardsApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    //middleware connection for the work of RTK query
    getDefaultMiddleware({}).concat([
      cardsApi.middleware,
      cartApi.middleware,
      authApi.middleware,
      userApi.middleware,
    ]),
  devTools: process.env.NODE_ENV !== "production",
});
