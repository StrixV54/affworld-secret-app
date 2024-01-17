import {
  Grid,
  Button,
  TextField,
  Link,
  Box,
  Typography,
  Container,
  Divider,
} from "@mui/material";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { signInWithGoogleAPI, signUpAPI } from "../firebase/api";
import Loading from "./LoadingPage";
import { FcGoogle } from "react-icons/fc";
import { firebaseAuth } from "../firebase/config";
import React, { useEffect, useState } from "react";

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    //checks current state of auth locally
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) navigate("/");

      //just to persist loading effect for sometime
      setTimeout(() => setIsLoading(false), 500);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    // prevent default effect of submit allover webpage
    event.preventDefault();
    setIsLoading(true);
    // get all input fields data with FormData function
    const data = new FormData(event.currentTarget);

    const userInfo = {
      email: data.get("email"),
      password: data.get("password"),
      first: data.get("firstName"),
      last: data.get("lastName"),
    };

    // navigate("/fill-info", { state: userInfo });
    signUpAPI(userInfo)
      // .then(() => navigate("/signin"))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGoogleBtn = () => {
    setIsLoading(true);
    // Sign In using Google OAuth
    signInWithGoogleAPI().finally(() => {
      setIsLoading(false);
      // firebaseAuth.signOut();
    });
  };

  //loading window for sometime meanwhile check auth
  return isLoading ? (
    <Loading message="Just loading to Say Hello !!" />
  ) : (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Button
          fullWidth
          variant="outlined"
          onClick={handleGoogleBtn}
          sx={{ mt: 3, mb: 2, py: 1.0, backgroundColor: "#0e171d" }}
        >
          <FcGoogle style={{ height: 30, width: 30, marginRight: "8px" }} />
          Google
        </Button>
        <Divider flexItem>OR</Divider>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                color="primary"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end" mt={3}>
            <Grid item>
              <Link component={ReactRouterLink} to="/signin">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
