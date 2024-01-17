import { Container, Typography } from "@mui/material";
import { RotateLoader } from "react-spinners";
import React from "react";

export default function Loading({ message }) {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <RotateLoader color="#36d7b7" size={20} />
      <Typography variant="h6" mt={10}>
        {message || ""}
      </Typography>
    </Container>
  );
}
