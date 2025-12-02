import React from "react";
import { Box, Typography } from "@mui/material";

export default function HeroSection({ image }) {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: 300, md: 400 },
        width: "100%",
        overflow: "hidden",
        borderRadius: 3,
      }}
    >
      <Box
        component="img"
        src={image}
        alt="Our Services"
        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
      />

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0,0,0,0.5)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textAlign: "center",
          px: 3,
        }}
      >
        <Typography variant="h2" fontWeight={700} sx={{ mb: 2 }}>
          Our Services
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 700 }}>
          Explore our premium limousine services designed to make your journey stylish, comfortable, and unforgettable.
        </Typography>
      </Box>
    </Box>
  );
}
