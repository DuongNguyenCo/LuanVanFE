import { createSlice } from "@reduxjs/toolkit";

export const typeJobSlice = createSlice({
  name: "typejob",
  initialState: {
    list: [],
  },
  reducers: {
    setTypejob: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setTypejob } = typeJobSlice.actions;
export default typeJobSlice.reducer;
