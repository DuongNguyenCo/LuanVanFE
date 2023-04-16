import { createSlice } from "@reduxjs/toolkit";

export const postSlice = createSlice({
  name: "Post",
  initialState: {
    current: null,
  },
  reducers: {
    setPost: (state, action) => {
      state.current = action.payload;
    },
  },
});

export const { setPost } = postSlice.actions;
export default postSlice.reducer;
