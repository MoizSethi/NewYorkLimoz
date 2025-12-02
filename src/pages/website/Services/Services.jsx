import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import servicesService from "../../../services/service";

import HeroSection from "./components/HeroSection";
import ServicesGrid from "./components/ServicesGrid";

export const BASE_URL = "http://localhost:3000";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1502877338535-766e1452684a";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await servicesService.getAllServices();
      setServices(data);
    } catch (err) {
      console.error("Failed to fetch services:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <Typography>Loading services...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
      <HeroSection image={HERO_IMAGE} />

      <ServicesGrid
        services={services}
        fallbackImage={HERO_IMAGE}
      />
    </Box>
  );
}
