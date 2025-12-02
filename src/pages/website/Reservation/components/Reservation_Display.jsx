"use client";
import React from "react";
import { Box, Typography, Container } from "@mui/material";

export default function ReservationDisplay() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 250, sm: 300, md: 400, lg: 450 },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src="/about_bg.jpg"
        alt="About Background"
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />

      {/* Dark Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "rgba(0,0,0,0.6)",
          zIndex: 1,
        }}
      />

      {/* Content */}
      <Container sx={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <Typography
          variant="body2"
          sx={{ color: "orange", fontSize: { xs: "10px", sm: "14px" } }}
        >
          <span style={{ color: "white" }}>Home</span> / Reservation
        </Typography>

        <Typography
          variant="h3"
          sx={{
            mt: 1,
            fontWeight: "bold",
            color: "white",
            fontSize: { xs: "24px", sm: "32px", md: "40px" },
          }}
        >
          Reservation
        </Typography>
      </Container>
    </Box>
  );
}
