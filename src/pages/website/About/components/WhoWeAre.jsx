import { motion } from "framer-motion";
import { Box, Grid, Typography } from "@mui/material";

export default function WhoWeAre() {
  return (
    <Grid container spacing={8} alignItems="center">
      <Grid item xs={12} md={6}>{/* Image placeholder */}</Grid>

      <Grid item xs={12} md={6}>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
            Who We Are
          </Typography>

          <Typography variant="body1" sx={{ color: "text.secondary", lineHeight: 1.8 }}>
            We are a leading transportation and chauffeured car service provider,
            dedicated to offering premium vehicles, professionally trained drivers,
            and exceptional customer care. Whether you're traveling for business,
            leisure, or special events, our goal is to deliver a luxurious and seamless
            travel experience.
          </Typography>

          <Typography
            variant="body1"
            sx={{ mt: 2, color: "text.secondary", lineHeight: 1.8 }}
          >
            With a modern fleet, 24/7 customer support, and a commitment to safety
            and punctuality, we have become a trusted choice for thousands of
            customers.
          </Typography>
        </motion.div>
      </Grid>
    </Grid>
  );
}
