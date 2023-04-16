import { createSlice } from "@reduxjs/toolkit";

export const businessSlice = createSlice({
  name: "business",
  initialState: {
    business: {},
    isLogin: false,
    token: "",
    choose: {},
  },
  reducers: {
    registerSuccess: (state, action) => {
      state.business = action.payload.other;
      state.isLogin = true;
      state.token = action.payload.token;
    },
    setBusiness: (state, action) => {
      state.choose = action.payload;
    },
    logoutBusiness: (state) => {
      state.business = {};
      state.isLogin = false;
      state.token = "";
    },
  },
});

export const { registerSuccess, logoutBusiness, setBusiness } =
  businessSlice.actions;
export default businessSlice.reducer;
