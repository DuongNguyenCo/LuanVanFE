import { createSlice } from "@reduxjs/toolkit";

export const checkSlice = createSlice({
  name: "check",
  initialState: {
    loading: false,
    error: false,
    errMsg: "",
  },
  reducers: {
    setMsg: (state, action) => {
      state.errMsg = action.payload.errMsg;
    },
    loading: (state) => {
      state.loading = true;
    },
    success: (state) => {
      state.loading = false;
    },
    error: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { loading, error, success, setMsg } = checkSlice.actions;
export default checkSlice.reducer;
