import { createSlice } from "@reduxjs/toolkit";

export const serviceSlice = createSlice({
  name: "service",
  initialState: {
    list: [],
  },
  reducers: {
    setListService: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setListService } = serviceSlice.actions;
export default serviceSlice.reducer;
