//popups states management
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authPopupDisplay: false,
  cardPopupDisplay: false,
  orderPopupDisplay: false,

  dataForCardPopup: null,
  newFormStep: false, //form step (input number/input code)
  phoneNumber: "", //state with user phone number
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

    showOrderPopup: (state, action) => {
      state.orderPopupDisplay = action.payload;
    },

    setDataForCardPopup: (state, action) => {
      state.dataForCardPopup = action.payload;
    },

    nextFormStep: (state) => {
      state.newFormStep = true;
    },

    prevFormStep: (state) => {
      state.newFormStep = false;
    },

    setPhoneNumber: (state, action) => {
      state.phoneNumber = action.payload;
    },
  },
});

const { actions, reducer } = popupSlice;

export default reducer;

export const {
  showAuthPopup,
  showCardPopup,
  showOrderPopup,
  setDataForCardPopup,
  nextFormStep,
  prevFormStep,
  setPhoneNumber,
} = actions;
