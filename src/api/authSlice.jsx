//popups states management
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: null,
  authData: null,
};

const authSlice = createSlice({
  name: "auth", //namespace of created actions
  initialState,
  reducers: {
    //actionCreators
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },

    setAuthData: (state, action) => {
      state.authData = action.payload;
    },
  },
});

const { actions, reducer } = authSlice;

export default reducer;

export const { setAccessToken, setAuthData } = actions;
