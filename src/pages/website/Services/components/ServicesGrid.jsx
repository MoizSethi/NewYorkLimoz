import React from "react";
import { Grid } from "@mui/material";
import ServiceCard from "./ServiceCard";

export default function ServicesGrid({ services, fallbackImage }) {
  return (
    <Grid container spacing={3}>
      {services.map((service, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={service.id}>
          <ServiceCard
            service={service}
            index={index}
            fallbackImage={fallbackImage}
          />
        </Grid>
      ))}
    </Grid>
  );
}
