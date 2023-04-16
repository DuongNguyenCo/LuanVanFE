import { createSlice } from "@reduxjs/toolkit";

export const LanguegeSlice = createSlice({
  name: "language",
  initialState: {
    list: [],
  },
  reducers: {
    setListLanguage: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setListLanguage } = LanguegeSlice.actions;
export default LanguegeSlice.reducer;
