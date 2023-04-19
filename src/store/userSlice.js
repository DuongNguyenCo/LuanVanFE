import { createSlice } from "@reduxjs/toolkit";

export const userSlile = createSlice({
  name: "user",
  initialState: {
    candidate: {},
    isLogin: false,
    token: "",
  },
  reducers: {
    registerSuccess: (state, action) => {
      state.candidate = action.payload.other;
      state.isLogin = true;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.candidate = {};
      state.isLogin = false;
      state.token = "";
    },
  },
});

export const { registerSuccess, logoutUser } = userSlile.actions;
export default userSlile.reducer;
