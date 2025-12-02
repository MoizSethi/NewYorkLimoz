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

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "100vh", lg: "90vh" },
        display: "flex",
        alignItems: "center",
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "#fff",
      }}
    >
      {/* Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.4))",
        }}
      />

      <Box
        sx={{
          position: "relative",
          display: "flex",
          width: "100%",
          maxWidth: "1400px",
          mx: "auto",
          px: { xs: 2, md: 4 },
        }}
      >
        {/* LEFT SIDE RATE PANEL */}
        <Box
          sx={{
            width: { xs: "45%", md: "280px" },
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
          }}
        >
          {rates.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "rgba(0,0,0,0.55)",
                backdropFilter: "blur(3px)",
                borderRadius: "6px",
                p: 1.5,
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.15)",
                },
              }}
            >
              <Typography sx={{ fontSize: "0.9rem", fontWeight: 500 }}>
                {item.label}
              </Typography>

              <Paper
                elevation={3}
                sx={{
                  px: 2,
                  py: 0.6,
                  borderRadius: "5px",
                  bgcolor: "#fff",
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: "0.75rem",
                }}
              >
                {item.rate}
              </Paper>
            </Box>
          ))}
        </Box>

        {/* CENTER CONTENT + FORM */}
        <Box
          sx={{
            flex: 1,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: { xs: 4, md: 0 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              mb: 2,
              fontSize: { xs: "1.8rem", md: "2.8rem" },
              textShadow: "0 3px 8px rgba(0,0,0,0.5)",
            }}
          >
            Premium Black Car Services in NYC
          </Typography>

          <Typography
            variant="h6"
            sx={{
              maxWidth: "700px",
              mb: 4,
              fontSize: { xs: "1rem", md: "1.2rem" },
              lineHeight: 1.6,
              textShadow: "0 2px 4px rgba(0,0,0,0.4)",
            }}
          >
            Chauffeur-driven luxury black cars for every occasion. Airport
            pickups, hourly rides, and daily rentals — guaranteed elegance and
            comfort.
          </Typography>

          {/* FORM */}
          <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: 3,
            maxWidth: 650,
            mx: "auto",
            bgcolor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
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
                color="primary"
                fullWidth
                sx={{
                  py: 1.8,
                  fontWeight: "bold",
                  fontSize: "1rem",
                  mt: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                Check Availability
              </Button>
            </Grid>
          </Grid>
        </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;
