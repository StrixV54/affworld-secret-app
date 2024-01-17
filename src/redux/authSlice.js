import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setting user as authentic for whole app
    userIsAuthentic: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    // resetting everything back to initialState
    resetAuth: (state) => {
      state = { ...initialState };
    },
  },
});

export const { userIsAuthentic, resetAuth } = authSlice.actions;

export default authSlice.reducer;
