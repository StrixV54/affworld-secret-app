import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Link,
  Divider,
} from "@mui/material";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { signInAPI, signInWithGoogleAPI } from "../firebase/api";
import Loading from "./LoadingPage";
import { FcGoogle } from "react-icons/fc";
import { firebaseAuth } from "../firebase/config";
import React from "react";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // checks current state of auth locally
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if (user) navigate("/");
      // just to persist loading effect for sometime
      setTimeout(() => setIsLoading(false), 500);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (event) => {
    // prevent default effect of submit allover webpage
    event.preventDefault();
    // setIsLoading(true);

    // get all input fields data with FormData function
    const data = new FormData(event.currentTarget);
    const userInfo = {
      email: data.get("email"),
      password: data.get("password"),
    };
    signInAPI(userInfo.email, userInfo.password)
      // .then(() => navigate("/"))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGoogleBtn = () => {
    setIsLoading(true);
    // Sign In using Google OAuth
    signInWithGoogleAPI().finally(() => {
      setIsLoading(false);
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
        justifyContent: "center",
        height: "100vh",
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
          Sign in
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
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
          >
            Sign In
          </Button>
          <Grid
            container
            mt={3}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
            }}
          >
            <Grid item xs>
              <Link to="/" component={ReactRouterLink}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                to="/signup"
                id="sign-in-button"
                component={ReactRouterLink}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
