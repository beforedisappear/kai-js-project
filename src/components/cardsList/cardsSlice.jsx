import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counts: {
    all: 1,
    burgers: 1,
    snacks: 1,
    hotdogs: 1,
    donuts: 1,
  },
};

const cardsSlice = createSlice({
  name: "cards", //namespace of created actions
  initialState,
  reducers: {
    increasePageCounter: (state, action) => {
      state.counts = {
        ...state.counts,
        [action.payload]: (state.counts[action.payload] || 1) + 1,
      };
    },

    setPageCounterValue: (state, action) => {
      state.counts = {
        ...state.counts,
        [action.payload.section]: action.payload.page,
      };
    },

    resetPageCounter: () => initialState,
  },
});

const { actions, reducer } = cardsSlice;

export default reducer;

export const { increasePageCounter, setPageCounterValue, resetPageCounter } =
  actions;
