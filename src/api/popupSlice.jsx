//popups states management
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authPopupDisplay: false,
  cardPopupDisplay: false,

  dataForCardPopup: null,
};

const popupSlice = createSlice({
  name: "popup", //namespace of created actions
  initialState,
  reducers: {
    //actionCreators
    showAuthPopup: (state, action) => {
      state.authPopupDisplay = action.payload;
    },

    showCardPopup: (state, action) => {
      state.cardPopupDisplay = action.payload;
    },

    setDataForCardPopup: (state, action) => {
      state.dataForCardPopup = action.payload;
    },
  },
});

const { actions, reducer } = popupSlice;

export default reducer;

export const { showAuthPopup, showCardPopup, setDataForCardPopup } = actions;
