"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Button,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { fetchVehicles } from "../services/second_section_vehicle_selection";

export default function ReservationSecondStep({ onNext, onBack }) {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [imageIndex, setImageIndex] = useState({});

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    const data = await fetchVehicles();
    setVehicles(data);

    const init = {};
    data.forEach((v) => (init[v.id] = 0));
    setImageIndex(init);
  };

  const selectVehicle = (id) => {
    setSelectedVehicle(id === selectedVehicle ? null : id);
  };

  const nextStep = () => {
    if (!selectedVehicle) return alert("Select a vehicle first.");
    onNext(selectedVehicle);
  };

  const nextImage = (id, total) => {
    setImageIndex((prev) => ({
      ...prev,
      [id]: (prev[id] + 1) % total,
    }));
  };

  const prevImage = (id, total) => {
    setImageIndex((prev) => ({
      ...prev,
      [id]: (prev[id] - 1 + total) % total,
    }));
  };

  return (
    <Box sx={{ p: 3, bgcolor: "#F7F7F7", borderRadius: 2 }}>
      <Typography variant="h5" textAlign="center" mb={3}>
        Select Your Vehicle
      </Typography>

      <Button onClick={onBack} sx={{ mb: 2, color: "orange" }}>
        ← Back
      </Button>

      <Grid container spacing={3}>
        {vehicles.map((v) => {
          const images = JSON.parse(v.images || "[]");
          const currentImg = images[imageIndex[v.id]] || "/cars.jpeg";

          return (
            <Grid item xs={12} sm={6} md={4} key={v.id}>
              <Paper
                onClick={() => selectVehicle(v.id)}
                sx={{
                  p: 2,
                  border:
                    selectedVehicle === v.id ? "2px solid orange" : "1px solid #ccc",
                  borderRadius: 2,
                  cursor: "pointer",
                  transition: "0.2s",
                  "&:hover": { transform: "scale(1.03)" },
                }}
              >
                <Box
                  sx={{
                    height: 150,
                    bgcolor: "#eee",
                    borderRadius: 1,
                    backgroundImage: `url(${currentImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    mb: 2,
                    position: "relative",
                  }}
                >
                  {images.length > 1 && (
                    <>
                      <IconButton
                        sx={{ position: "absolute", top: "45%", left: 5 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage(v.id, images.length);
                        }}
                      >
                        ←
                      </IconButton>

                      <IconButton
                        sx={{ position: "absolute", top: "45%", right: 5 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage(v.id, images.length);
                        }}
                      >
                        →
                      </IconButton>
                    </>
                  )}
                </Box>

                <Typography variant="h6" fontWeight="bold">
                  {v.vehicleBrand} {v.vehicleModel}
                </Typography>

                <Typography variant="body2">Plate: {v.numberPlate}</Typography>
                <Typography variant="body2">Seats: {v.passengers}</Typography>
                <Typography variant="body2">Luggage: {v.luggage}</Typography>

                <Box mt={1}>
                  <Typography variant="h6" color="orange">
                    ${v.flat_rate} Flat
                  </Typography>
                  <Typography variant="body2">${v.pricePerKm}/km</Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Button
        variant="contained"
        fullWidth
        sx={{ bgcolor: "orange", mt: 3 }}
        onClick={nextStep}
      >
        Continue
      </Button>
    </Box>
  );
}
