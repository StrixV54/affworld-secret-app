import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSecretAPI, getSecretsAPI } from "../firebase/api";
import toast from "react-hot-toast";
import { Link as ReactRouterLink } from "react-router-dom";
import Loading from "../pages/LoadingPage";
import { changeMode } from "../redux/themeSlice";
import { useTheme } from "@emotion/react";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const theme = useTheme();
  const user = useSelector((state) => state.auth.user);
  const [secretsList, setSecretsList] = useState(null);
  const hasSecret =
    secretsList?.filter((item) => item.uid === user.uid).length === 1;
  const [isChanged, setIsChanged] = useState(false);

  const addSecret = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const textValue = formData.get("secret");

    let isConfirmed = true;
    if (hasSecret) {
      isConfirmed = window.confirm(
        "You already have a secret, like to overwrite?"
      );
    }

    if (textValue && isConfirmed) {
      addSecretAPI(user?.uid, textValue).then(() => {
        toast.success("Secret Added Successfully");
        setIsChanged(true);
      });
    } else alert("Nothing Changed");
  };

  useEffect(() => {
    getSecretsAPI()
      .then((res) => {
        setSecretsList(res);
      })
      .finally(() => {
        setIsChanged(false);
        setIsLoading(false);
      });
  }, [isChanged]);

  if (isLoading) return <Loading message="Fetching Secrets!!" />;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: 2,
        p: 2,
      }}
      maxWidth={{ md: "600px", xs: "100%" }}
    >
      <Box
        component={"div"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography component={"h4"}>Hi, {user?.displayName}</Typography>
        <Box component={"div"} sx={{ display: "flex", gap: 2 }}>
          <Link
            onClick={() => dispatch(changeMode())}
            sx={{
              cursor: "pointer",
              padding: "4px 24px",
              borderRadius: "20px",
              bgcolor: "#d2d2d2",
              color: "black",
              textDecoration: "none",
            }}
          >
            Theme
          </Link>
          <Link
            component={ReactRouterLink}
            to="/signout"
            sx={{
              padding: "4px 24px",
              borderRadius: "20px",
              bgcolor: "#e0e0e0",
              color: "black",
              textDecoration: "none",
            }}
          >
            SignOut
          </Link>
        </Box>
      </Box>

      {hasSecret && (
        <Typography component={"span"} fontSize={"1.5rem"} fontWeight={"bold"}>
          You have a Secret already Uploaded!!!
        </Typography>
      )}
      <Box
        component={"form"}
        sx={{
          bgcolor: theme?.palette?.background?.paper,
          p: 2,
          borderRadius: "0.4rem",
          gap: 2,
        }}
        onSubmit={addSecret}
      >
        <Typography>Add a Secret</Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          multiline
          minRows={4}
          placeholder="Enter your secret..."
          id="secret"
          name="secret"
          autoComplete="secret"
          autoFocus
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
      <Typography component={"h6"} mt={4}>
        Uploaded Secrets:
      </Typography>
      <Grid container sx={{ gap: 2 }}>
        {secretsList?.length > 0 &&
          secretsList.map((item, idx) => (
            <Grid
              item
              xs={12}
              key={idx}
              sx={{
                display: "flex",
                flexDirection: "column",
                px: 4,
                py: 2,
                bgcolor: theme?.palette?.background?.gridItem,
                borderRadius: "2rem",
              }}
            >
              <Box
                component={"div"}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  component={"span"}
                  fontSize={"0.8rem"}
                  fontWeight={"bold"}
                >
                  {item.uid === user?.uid
                    ? `You (Your Secret)`
                    : `Anonymous User`}
                </Typography>
                <Typography component={"span"} fontSize={"1rem"} my={1}>
                  {item?.secret}
                </Typography>
              </Box>
              <Typography
                component={"span"}
                fontSize={"0.8rem"}
                sx={{ opacity: 0.7 }}
              >
                {item?.time}
              </Typography>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
