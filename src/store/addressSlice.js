import { createSlice } from "@reduxjs/toolkit";

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    list: [],
    listB: [],
  },
  reducers: {
    setListAddress: (state, action) => {
      state.list = action.payload;
    },
    listAddressBusiness: (state, action) => {
      state.listB = action.payload;
    },
  },
});

export const { setListAddress, listAddressBusiness } = addressSlice.actions;
export default addressSlice.reducer;
