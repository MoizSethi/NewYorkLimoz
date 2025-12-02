import { Box, Typography, Button } from "@mui/material";

export default function CTASection() {
  return (
    <Box
      sx={{
        mt: 14,
        textAlign: "center",
        py: 10,
        borderRadius: 4,
        background: (theme) =>
          `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
        color: "white",
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
        Ready to Book Your Ride?
      </Typography>

      <Typography variant="body1" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
        Experience the perfect combination of comfort, style, and reliability.
        Book now and let us take care of your travel.
      </Typography>

      <Button
        variant="contained"
        size="large"
        sx={{
          bgcolor: "secondary.main",
          px: 4,
          py: 1.5,
          fontSize: "1.1rem",
          borderRadius: 3,
          "&:hover": { bgcolor: "secondary.dark" },
        }}
        href="/reservation"
      >
        Book Now
      </Button>
    </Box>
  );
}
