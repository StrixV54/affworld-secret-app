import { createSlice } from "@reduxjs/toolkit";

const cachedTheme = localStorage.getItem("zuco-thememode-cache");

const initialState = {
  mode: (cachedTheme) || "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    // setting theme for whole app
    changeMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { changeMode } = themeSlice.actions;

export default themeSlice.reducer;
