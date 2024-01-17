export const getDesignTokens = (mode) => ({
  palette: getPaletteTheme[mode],
});

const getPaletteTheme = {
  light: {
    mode: "light",
    background: {
      paper: "#d7d7d7",
      gridItem: "#bdd3e2",
    },
  },
  dark: {
    mode: "dark",
    background: {
      paper: "#3e3e3e",
      gridItem: "#293360",
    },
  },
};
