"use client";

import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Alert,
  Divider,
} from "@mui/material";
import { FaPlus, FaMinus, FaUser, FaSuitcase, FaClock, FaChild } from "react-icons/fa";

let map, pickupMarker, dropoffMarker, directionsRenderer, directionsService;

export default function ReservationFirstSection({ onNext }) {
  const [serviceType, setServiceType] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [luggage, setLuggage] = useState(0);
  const [hours, setHours] = useState(1);
  const [childSeats, setChildSeats] = useState(0);
  const [multipleStops, setMultipleStops] = useState([]);
  const [returnDifferentLocation, setReturnDifferentLocation] = useState(false);
  const [distanceKm, setDistanceKm] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const mapRef = useRef(null);

  // Initialize Map
  useEffect(() => {
    if (!window.google?.maps?.places) return;

    map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 40.7128, lng: -74.006 },
      zoom: 13,
    });

    directionsService = new window.google.maps.DirectionsService();
    directionsRenderer = new window.google.maps.DirectionsRenderer({ suppressMarkers: true });
    directionsRenderer.setMap(map);

    const pickupInput = document.getElementById("pickup-location");
    const dropoffInput = document.getElementById("dropoff-location");

    new window.google.maps.places.Autocomplete(pickupInput);
    new window.google.maps.places.Autocomplete(dropoffInput);
  }, []);

  const Counter = ({ label, value, setValue, icon }) => (
    <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
      <Typography variant="body2" fontWeight="bold" mb={1}>
        {label}
      </Typography>

      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Button
          variant="outlined"
          size="small"
          onClick={() => setValue(Math.max(0, value - 1))}
        >
          <FaMinus />
        </Button>

        <Box display="flex" alignItems="center" gap={1}>
          {icon}
          <Typography variant="h6">{value}</Typography>
        </Box>

        <Button
          variant="outlined"
          size="small"
          onClick={() => setValue(value + 1)}
        >
          <FaPlus />
        </Button>
      </Box>
    </Paper>
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!serviceType || !pickupDate || !pickupTime) {
      setErrorMessage("Please fill all required fields");
      return;
    }

    onNext({
      serviceType,
      pickupDate,
      pickupTime,
      pickupLocation,
      dropoffLocation,
      passengers,
      luggage,
      hours,
      childSeats,
      distanceKm,
    });
  };

  return (
    <Box sx={{ py: 6, background: "#F7F7F7" }}>
      <Box sx={{ maxWidth: 1200, mx: "auto", px: 2 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={2}>
          Book Your Ride
        </Typography>

        <Grid container spacing={4}>
          {/* ================= Form ================= */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
              <Typography variant="h6" mb={2}>
                Trip Details
              </Typography>

              {errorMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {errorMessage}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                {/* Service Type */}
                <TextField
                  label="Service Type"
                  fullWidth
                  select
                  required
                  sx={{ mb: 2 }}
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                >
                  <MenuItem value="hourly">Hourly / As Directed</MenuItem>
                  <MenuItem value="from_airport">From Airport</MenuItem>
                  <MenuItem value="to_airport">To Airport</MenuItem>
                  <MenuItem value="tour">Tour</MenuItem>
                </TextField>

                {/* Date and Time */}
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="date"
                      label="Pickup Date"
                      fullWidth
                      required
                      InputLabelProps={{ shrink: true }}
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="time"
                      label="Pickup Time"
                      fullWidth
                      required
                      InputLabelProps={{ shrink: true }}
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                    />
                  </Grid>
                </Grid>

                {/* Pickup */}
                <TextField
                  sx={{ mt: 2 }}
                  label="Pickup Location"
                  id="pickup-location"
                  fullWidth
                  required
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                />

                {/* Dropoff */}
                <TextField
                  sx={{ mt: 2 }}
                  label="Dropoff Location"
                  id="dropoff-location"
                  fullWidth
                  required
                  value={dropoffLocation}
                  onChange={(e) => setDropoffLocation(e.target.value)}
                />

                {/* Counters */}
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} sm={4}>
                    <Counter
                      label="Passengers"
                      value={passengers}
                      setValue={setPassengers}
                      icon={<FaUser />}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Counter
                      label="Luggage"
                      value={luggage}
                      setValue={setLuggage}
                      icon={<FaSuitcase />}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Counter
                      label="Hours"
                      value={hours}
                      setValue={setHours}
                      icon={<FaClock />}
                    />
                  </Grid>
                </Grid>

                {/* Child Seats */}
                <Paper
                  elevation={1}
                  sx={{ p: 2, mt: 2, borderRadius: 2, bgcolor: "#FFF4E5" }}
                >
                  <Typography mb={1}>
                    <FaChild /> Child Seats
                  </Typography>

                  <Counter
                    label="Seats"
                    value={childSeats}
                    setValue={setChildSeats}
                    icon={<FaChild />}
                  />
                </Paper>

                <FormControlLabel
                  sx={{ mt: 2 }}
                  control={
                    <Checkbox
                      checked={returnDifferentLocation}
                      onChange={() =>
                        setReturnDifferentLocation(!returnDifferentLocation)
                      }
                    />
                  }
                  label="Return to a different location"
                />

                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  sx={{
                    bgcolor: "orange",
                    mt: 2,
                    p: 1.5,
                    fontWeight: "bold",
                    "&:hover": { bgcolor: "#d65b00" },
                  }}
                >
                  Continue to Vehicle Selection
                </Button>
              </form>
            </Paper>
          </Grid>

          {/* ================= Map ================= */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" mb={1}>
                Route Map
              </Typography>

              <Typography variant="body2" mb={2}>
                Enter pickup & dropoff locations to preview your route.
              </Typography>

              <Box
                ref={mapRef}
                sx={{
                  width: "100%",
                  height: 400,
                  borderRadius: 2,
                  border: "1px solid #ccc",
                }}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
