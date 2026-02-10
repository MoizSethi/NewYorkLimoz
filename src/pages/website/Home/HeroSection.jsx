import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import heroImg from "../../../assets/hero.webp";

const rates = [
  { label: "Hourly", rate: "From $80" },
  { label: "12 To 60 Passengers", rate: "Check Rates" },
  { label: "JFK Airport", rate: "From $120" },
  { label: "Newark Airport", rate: "From $110" },
  { label: "LGA Airport", rate: "From $115" },
  { label: "Limo Bar with Moet $150", rate: "Order" },
];

const HeroSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: { xs: "100vh", md: "90vh" },
        display: "flex",
        alignItems: "center",
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
      }}
    >
      {/* Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.75), rgba(0,0,0,0.35))",
        }}
      />

      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "1400px",
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 4, md: 6 },
        }}
      >
        {/* Responsive layout wrapper */}
        <Box
          sx={{
            display: "flex",
            gap: { xs: 3, md: 4 },
            flexDirection: { xs: "column", md: "row" },
            alignItems: { xs: "stretch", md: "center" },
          }}
        >
          {/* RATES */}
          <Box
            sx={{
              // Desktop: left column
              width: { md: 300 },
              // Mobile: horizontal scroll row
              display: "flex",
              flexDirection: { xs: "row", md: "column" },
              gap: 1.5,
              overflowX: { xs: "auto", md: "visible" },
              pb: { xs: 1, md: 0 },
              pr: { xs: 0, md: 0 },
              "&::-webkit-scrollbar": { height: 6 },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(255,255,255,0.25)",
                borderRadius: 999,
              },
            }}
          >
            {rates.map((item, index) => (
              <Box
                key={index}
                onClick={() => navigate("/rates")}
                sx={{
                  flex: { xs: "0 0 auto", md: "unset" },
                  minWidth: { xs: 220, sm: 240, md: "unset" },
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  bgcolor: "rgba(0,0,0,0.55)",
                  backdropFilter: "blur(3px)",
                  borderRadius: 2,
                  px: 1.5,
                  py: 1.25,
                  cursor: "pointer",
                  transition: "0.25s",
                  border: "1px solid rgba(255,255,255,0.12)",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.12)",
                    transform: { md: "translateY(-2px)" },
                  },
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "0.9rem", md: "0.9rem" },
                    fontWeight: 500,
                    mr: 1,
                  }}
                >
                  {item.label}
                </Typography>

                <Paper
                  elevation={3}
                  sx={{
                    px: 1.75,
                    py: 0.6,
                    borderRadius: 1.5,
                    bgcolor: "#fff",
                    color: "#000",
                    fontWeight: 800,
                    fontSize: "0.75rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.rate}
                </Paper>
              </Box>
            ))}
          </Box>

          {/* CENTER CONTENT */}
          <Box
            sx={{
              flex: 1,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 1.5,
                fontSize: {
                  xs: "1.8rem",
                  sm: "2.2rem",
                  md: "3rem",
                  lg: "3.4rem",
                },
                lineHeight: 1.15,
                textShadow: "0 3px 10px rgba(0,0,0,0.6)",
              }}
            >
              Premium Black Car Services in NYC
            </Typography>

            <Typography
              variant="h6"
              sx={{
                maxWidth: 820,
                mb: { xs: 2.5, md: 4 },
                fontSize: { xs: "1rem", sm: "1.05rem", md: "1.2rem" },
                lineHeight: 1.7,
                px: { xs: 0.5, sm: 0 },
                textShadow: "0 2px 6px rgba(0,0,0,0.55)",
              }}
            >
              Chauffeur-driven luxury black cars for every occasion. Airport
              pickups, hourly rides, and daily rentals — guaranteed elegance and
              comfort.
            </Typography>

            {/* BOOKING FORM */}
            <Paper
              elevation={6}
              sx={{
                width: "100%",
                maxWidth: 720,
                mx: "auto",
                bgcolor: theme.palette.background.paper,
                borderRadius: 3,
                p: { xs: 2, sm: 3, md: 4 },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  mb: 2,
                  fontWeight: 800,
                  textAlign: "left",
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                }}
              >
                Book Your Ride
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField label="Pick-up Location" fullWidth size="small" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField label="Drop-off Location" fullWidth size="small" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Date"
                    type="date"
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Time"
                    type="time"
                    fullWidth
                    size="small"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      py: 1.6,
                      fontWeight: 900,
                      fontSize: { xs: "0.95rem", sm: "1rem" },
                      mt: 0.5,
                      borderRadius: 2,
                    }}
                    onClick={() => navigate("/reservation")}
                  >
                    Check Availability
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
