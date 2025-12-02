import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";

export default function HeroBanner() {
  return (
    <Box sx={{ textAlign: "center", mb: 12 }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-bold"
        style={{ color: "#1a365d" }}
      >
        About Our Company
      </motion.h1>

      <Typography
        variant="h6"
        sx={{ mt: 2, maxWidth: 700, mx: "auto", color: "text.secondary" }}
      >
        Premium chauffeured and self-drive car rental services ensuring luxury,
        comfort, and reliability for all your travel needs.
      </Typography>
    </Box>
  );
}
