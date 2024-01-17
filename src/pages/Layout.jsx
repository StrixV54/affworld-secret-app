import { useEffect, useState } from "react";
import { firebaseAuth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import Loading from "./LoadingPage";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import React from "react";
import HomePage from "../components/HomeBox";
import { getUserDetailsAPI } from "../firebase/api";
import { userIsAuthentic } from "../redux/authSlice";

export default function HomeLayout() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate("/signin");
        return;
      }
      //Fetch user detail
      const userInfo = await getUserDetailsAPI(user.uid);
      dispatch(userIsAuthentic(userInfo));
      setIsLoading(false);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return isLoading ? (
    <Loading message="Checking Login !!" />
  ) : (
    <Box
      sx={{
        display: "flex",
        flexGrow: 1,
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
        overflow: "scroll",
      }}
    >
      <HomePage />
    </Box>
  );
}
