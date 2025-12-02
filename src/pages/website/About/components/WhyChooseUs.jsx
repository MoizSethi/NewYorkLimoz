import { Box, Typography, Grid, Card, CardContent } from "@mui/material";

const FEATURES = [
  {
    title: "Professional Chauffeurs",
    desc: "Experienced, well-trained drivers ensuring safe and comfortable journeys.",
  },
  {
    title: "Luxury Fleet Options",
    desc: "Choose from business-class sedans, SUVs, vans, and premium vehicles.",
  },
  {
    title: "24/7 Customer Support",
    desc: "Round-the-clock assistance for bookings, emergencies, and travel planning.",
  },
  {
    title: "Affordable Premium Service",
    desc: "Luxury experience at competitive rates with transparent pricing.",
  },
];

export default function WhyChooseUs() {
  return (
    <Box sx={{ mt: 14 }}>
      <Typography
        variant="h3"
        sx={{ textAlign: "center", fontWeight: 700, mb: 8, color: "primary.main" }}
      >
        Why Choose Us
      </Typography>

      <Grid container spacing={4}>
        {FEATURES.map((item, idx) => (
          <Grid item xs={12} md={3} key={idx}>
            <Card
              sx={{
                height: "100%",
                borderRadius: 4,
                textAlign: "center",
                p: 2,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 6, transform: "translateY(-6px)" },
              }}
            >
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {item.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
