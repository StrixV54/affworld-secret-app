import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { getDesignTokens } from "./material-ui/theme";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SignOut from "./pages/SignOut";
import Layout from "./pages/Layout";
import * as React from "react";
import ErrorPage from "./pages/ErrorPage";

export default function App() {
  const mode = useSelector((state) => state.theme.mode);

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          errorElement: <ErrorPage />,
          children: [
            {
              path: "/signin",
              Component: SignIn,
            },
            {
              path: "/signup",
              Component: SignUp,
            },
            {
              path: "/signout",
              Component: SignOut,
            },
            {
              path: "/",
              Component: Layout,
            },
          ],
        },
      ]),
    []
  );

  useEffect(() => {
    localStorage.setItem("affworld-thememode-cache", mode);
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      {/* Provides CSS RESET */}
      <CssBaseline />

      <RouterProvider router={router} />

      {/* React-Toaster */}
      <Toaster />
    </ThemeProvider>
  );
}
