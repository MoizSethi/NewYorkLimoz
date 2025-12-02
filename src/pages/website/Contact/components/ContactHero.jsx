import { Box, Typography } from "@mui/material";

export default function ContactHero() {
  return (
    <Box
      sx={{
        height: { xs: 250, md: 350 },
        backgroundImage:
          "url('https://images.unsplash.com/photo-1521791136064-7986c2920216')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        borderRadius: 3,
        mb: 6,
      }}
    >
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
          textAlign: "center",
          color: "white",
          px: 2,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
          Contact Us
        </Typography>
        <Typography variant="h6" sx={{ maxWidth: 700 }}>
          We're here to help you 24/7. Reach out for bookings, queries, or support.
        </Typography>
      </Box>
    </Box>
  );
}
