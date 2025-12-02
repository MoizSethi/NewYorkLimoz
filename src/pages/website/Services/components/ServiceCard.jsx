import React from "react";
import { Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import { motion } from "framer-motion";
import { BASE_URL } from "../Services";

export default function ServiceCard({ service, index, fallbackImage }) {
  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      sx={{ borderRadius: 3, overflow: "hidden", position: "relative" }}
    >
      <CardMedia
        component="img"
        image={service.image ? `${BASE_URL}${service.image}` : fallbackImage}
        alt={service.title}
        sx={{ height: 200, objectFit: "cover" }}
      />

      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          bgcolor: "rgba(0,0,0,0.35)",
        }}
      />

      <CardContent
        sx={{
          position: "absolute",
          bottom: 0,
          color: "white",
          zIndex: 5,
        }}
      >
        <Typography variant="h6" fontWeight={700} mb={1}>
          {service.title}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
          {service.description}
        </Typography>
        <Button variant="contained" size="small" sx={{ textTransform: "none" }}>
          Read More
        </Button>
      </CardContent>
    </Card>
  );
}
