import React, { useMemo } from "react";
import {
  Box,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Stack,
  Typography,
  Divider,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Alert,
} from "@mui/material";
import VehiclePicker from "./VehiclePicker";

function money(n) {
  if (n == null || Number.isNaN(Number(n))) return "—";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(n));
}

function Section({ title, subtitle, children }) {
  return (
    <Box sx={{ mb: 2.5 }}>
      <Stack spacing={0.25} sx={{ mb: 1.5 }}>
        <Typography variant="subtitle1" fontWeight={900}>
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        ) : null}
      </Stack>
      {children}
    </Box>
  );
}

export default function ReservationForm({
  step,
  form,
  errors,
  loading,
  onChange,
  onBack,
  onNext,
  onAutoNext,
  onSubmit,
}) {
  const SERVICE_TYPES = useMemo(
    () => ["Point to Point", "Hourly / As Directed", "Airport Transfer", "Wedding", "Corporate"],
    []
  );

  const isHourly = form.serviceType === "Hourly / As Directed";

  const hasVehicle = !!form.vehicleId && !!form.vehicleType;
  const hasPrice = form.selectedPrice != null && !Number.isNaN(Number(form.selectedPrice));

  const handleDurationChange = (val) => {
    onChange("durationHours", val);

    // ✅ live hourly total (only if we have hourlyPrice from VehiclePicker)
    const hours = Number(val);
    const hourly = Number(form.hourlyPrice);

    if (!isHourly) return;

    if (
      !Number.isNaN(hours) &&
      hours > 0 &&
      !Number.isNaN(hourly) &&
      hourly > 0
    ) {
      onChange("selectedPrice", Number((hourly * hours).toFixed(2)));
    } else {
      // if invalid hours, keep selectedPrice as-is (don’t wipe user’s selection)
      // optionally you can set null:
      // onChange("selectedPrice", null);
    }
  };

  return (
    <Paper
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* =========================
          STEP 0: TRIP
      ========================= */}
      {step === 0 ? (
        <Box>
          <Stack sx={{ mb: 2 }} spacing={0.5}>
            <Typography variant="h6" fontWeight={950}>
              Trip Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Pickup, drop-off and service options.
            </Typography>
          </Stack>

          {/* Service / Schedule */}
          <Section title="Service & Schedule">
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  label="Service Type"
                  value={form.serviceType}
                  onChange={(e) => onChange("serviceType", e.target.value)}
                  error={!!errors.serviceType}
                  helperText={errors.serviceType || " "}
                >
                  {SERVICE_TYPES.map((s) => (
                    <MenuItem key={s} value={s}>
                      {s}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  type="date"
                  fullWidth
                  label="Pickup Date"
                  value={form.pickupDate}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => onChange("pickupDate", e.target.value)}
                  error={!!errors.pickupDate}
                  helperText={errors.pickupDate || " "}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <TextField
                  type="time"
                  fullWidth
                  label="Pickup Time"
                  value={form.pickupTime}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => onChange("pickupTime", e.target.value)}
                  error={!!errors.pickupTime}
                  helperText={errors.pickupTime || " "}
                />
              </Grid>
            </Grid>
          </Section>

          {/* Locations */}
          <Section title="Locations">
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Pickup Location"
                  placeholder="Address, hotel, airport..."
                  value={form.pickupLocation}
                  onChange={(e) => onChange("pickupLocation", e.target.value)}
                  error={!!errors.pickupLocation}
                  helperText={errors.pickupLocation || " "}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                {isHourly ? (
                  <Box>
                    <TextField
                      fullWidth
                      label="Duration"
                      value={form.durationHours}
                      onChange={(e) => handleDurationChange(e.target.value)}
                      error={!!errors.durationHours}
                      helperText={errors.durationHours || "Example: 3"}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">hours</InputAdornment>,
                      }}
                    />

                    {/* ✅ Estimated Total (Hourly) */}
                    <Typography sx={{ mt: 0.75 }} variant="body2" color="text.secondary">
                      Estimated Total: <b>{money(form.selectedPrice)}</b>
                    </Typography>

                    {/* helpful hint */}
                    {!form.hourlyPrice ? (
                      <Typography sx={{ mt: 0.25 }} variant="caption" color="text.secondary">
                        Pick a vehicle in the next step to enable live hourly pricing.
                      </Typography>
                    ) : null}
                  </Box>
                ) : (
                  <TextField
                    fullWidth
                    label="Drop-off Location"
                    placeholder="Address, hotel, airport..."
                    value={form.dropoffLocation}
                    onChange={(e) => onChange("dropoffLocation", e.target.value)}
                    error={!!errors.dropoffLocation}
                    helperText={errors.dropoffLocation || " "}
                  />
                )}
              </Grid>
            </Grid>
          </Section>

          {/* People + Bags */}
          <Section title="Passengers & Luggage">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  fullWidth
                  label="Passengers"
                  value={form.passengers}
                  onChange={(e) => onChange("passengers", e.target.value)}
                  error={!!errors.passengers}
                  helperText={errors.passengers || " "}
                  inputProps={{ min: 1 }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  fullWidth
                  label="Luggage"
                  value={form.luggage}
                  onChange={(e) => onChange("luggage", e.target.value)}
                  helperText=" "
                  inputProps={{ min: 0 }}
                />
              </Grid>
            </Grid>
          </Section>

          {/* Options */}
          <Section title="Options" subtitle="Select any additional services you need.">
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                border: "1px dashed",
                borderColor: "divider",
              }}
            >
              {/* New row layout */}
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.returnTrip}
                        onChange={(e) => onChange("returnTrip", e.target.checked)}
                      />
                    }
                    label="Return Trip"
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.isAirport}
                        onChange={(e) => onChange("isAirport", e.target.checked)}
                      />
                    }
                    label="Airport Details"
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.meetGreet}
                        onChange={(e) => onChange("meetGreet", e.target.checked)}
                      />
                    }
                    label="Meet & Greet"
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.childSeat}
                        onChange={(e) => onChange("childSeat", e.target.checked)}
                      />
                    }
                    label="Child Seat"
                  />
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form.boosterSeat}
                        onChange={(e) => onChange("boosterSeat", e.target.checked)}
                      />
                    }
                    label="Booster Seat"
                  />
                </Grid>
              </Grid>
            </Box>
          </Section>

          {/* Conditional: Return Trip */}
          {form.returnTrip ? (
            <Section title="Return Trip">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type="date"
                    fullWidth
                    label="Return Date"
                    value={form.returnDate}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => onChange("returnDate", e.target.value)}
                    error={!!errors.returnDate}
                    helperText={errors.returnDate || " "}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    type="time"
                    fullWidth
                    label="Return Time"
                    value={form.returnTime}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => onChange("returnTime", e.target.value)}
                    error={!!errors.returnTime}
                    helperText={errors.returnTime || " "}
                  />
                </Grid>
              </Grid>
            </Section>
          ) : null}

          {/* Conditional: Flight Details */}
          {form.isAirport ? (
            <Section title="Flight Details">
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Airline"
                    value={form.airline}
                    onChange={(e) => onChange("airline", e.target.value)}
                    error={!!errors.airline}
                    helperText={errors.airline || " "}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Flight Number"
                    value={form.flightNumber}
                    onChange={(e) => onChange("flightNumber", e.target.value)}
                    error={!!errors.flightNumber}
                    helperText={errors.flightNumber || " "}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Arrival Time"
                    placeholder="e.g. 6:30 PM"
                    value={form.arrivalTime}
                    onChange={(e) => onChange("arrivalTime", e.target.value)}
                    error={!!errors.arrivalTime}
                    helperText={errors.arrivalTime || " "}
                  />
                </Grid>
              </Grid>
            </Section>
          ) : null}

          {/* Helpful notice */}
          {!hasVehicle ? (
            <Alert severity="info" sx={{ mt: 2 }}>
              Next step: pick a vehicle to lock pricing and images.
            </Alert>
          ) : null}
        </Box>
      ) : null}

      {/* =========================
          STEP 1: VEHICLE PICKER
      ========================= */}
      {step === 1 ? (
        <Box>
          <Stack sx={{ mb: 2 }} spacing={0.5}>
            <Typography variant="h6" fontWeight={950}>
              Choose Vehicle
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Select a vehicle to see pricing clearly before continuing.
            </Typography>
          </Stack>

          {errors.vehicleType ? (
            <Alert severity="error" sx={{ mb: 1.5 }}>
              {errors.vehicleType}
            </Alert>
          ) : null}

          <VehiclePicker
            serviceType={form.serviceType}
            selectedVehicleId={form.vehicleId || null}
            onSelectVehicle={({ vehicleId, vehicleName, price, hourlyPrice, dailyPrice, imageUrl }) => {
              onChange("vehicleId", vehicleId);
              onChange("vehicleType", vehicleName);
              onChange("vehicleImage", imageUrl || "");

              // store base prices for live calculations
              onChange("hourlyPrice", hourlyPrice ?? null);
              onChange("dailyPrice", dailyPrice ?? null);

              // default selection price (for non-hourly, this is the best approximation)
              onChange("selectedPrice", price ?? null);

              // if already hourly and duration exists, recalc immediately
              if (form.serviceType === "Hourly / As Directed") {
                const h = Number(form.durationHours);
                const hr = Number(hourlyPrice);
                if (!Number.isNaN(h) && h > 0 && !Number.isNaN(hr) && hr > 0) {
                  onChange("selectedPrice", Number((hr * h).toFixed(2)));
                }
              }
            }}
            onSelected={() => {
              if (!loading) onAutoNext?.(); // auto advance
            }}
          />

          {/* Small selected price hint */}
          {hasVehicle ? (
            <Alert severity={hasPrice ? "success" : "warning"} sx={{ mt: 2 }}>
              Selected: <b>{form.vehicleType}</b> — Price: <b>{money(form.selectedPrice)}</b>
            </Alert>
          ) : (
            <Alert severity="info" sx={{ mt: 2 }}>
              Please select a vehicle to continue.
            </Alert>
          )}
        </Box>
      ) : null}

      {/* =========================
          STEP 2: PASSENGER
      ========================= */}
      {step === 2 ? (
        <Box>
          <Stack sx={{ mb: 2 }} spacing={0.5}>
            <Typography variant="h6" fontWeight={950}>
              Passenger Details
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Contact details for confirmation.
            </Typography>
          </Stack>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="First Name"
                value={form.firstName}
                onChange={(e) => onChange("firstName", e.target.value)}
                error={!!errors.firstName}
                helperText={errors.firstName || " "}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={form.lastName}
                onChange={(e) => onChange("lastName", e.target.value)}
                error={!!errors.lastName}
                helperText={errors.lastName || " "}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                value={form.email}
                onChange={(e) => onChange("email", e.target.value)}
                error={!!errors.email}
                helperText={errors.email || " "}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                value={form.phone}
                onChange={(e) => onChange("phone", e.target.value)}
                error={!!errors.phone}
                helperText={errors.phone || " "}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                minRows={4}
                label="Notes (Optional)"
                value={form.notes}
                onChange={(e) => onChange("notes", e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>
      ) : null}

      {/* =========================
          STEP 3: CONFIRM
      ========================= */}
      {step === 3 ? (
        <Box>
          <Typography variant="h6" fontWeight={950} sx={{ mb: 0.75 }}>
            Confirm & Submit
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Review summary and submit your reservation request.
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Alert severity="info">
            Once submitted, your request is sent to our team for confirmation.
          </Alert>
        </Box>
      ) : null}

      <Divider sx={{ my: 2.5 }} />

      <Stack direction="row" spacing={1.5} justifyContent="space-between">
        <Button
          variant="outlined"
          onClick={onBack}
          disabled={step === 0 || loading}
          sx={{ borderRadius: 2, px: 2.5 }}
        >
          Back
        </Button>

        {step < 3 ? (
          <Button
            variant="contained"
            onClick={onNext}
            disabled={loading}
            sx={{ borderRadius: 2, px: 3 }}
          >
            Next
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={onSubmit}
            disabled={loading}
            sx={{ borderRadius: 2, px: 3.25 }}
          >
            {loading ? "Submitting..." : "Submit Reservation"}
          </Button>
        )}
      </Stack>
    </Paper>
  );
}
