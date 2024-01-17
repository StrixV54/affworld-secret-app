import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import themeSlice from "./themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeSlice,
  },
});