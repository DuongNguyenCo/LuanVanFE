import { createSlice } from "@reduxjs/toolkit";

export const jobSlice = createSlice({
  name: "Job",
  initialState: {
    current: null,
  },
  reducers: {
    setJob: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const { setJob } = jobSlice.actions;
export default jobSlice.reducer;
