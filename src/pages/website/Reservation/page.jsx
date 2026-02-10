import React, { useMemo, useState } from "react";
import { Box, Grid, Paper, Stepper, Step, StepLabel, Typography, Alert } from "@mui/material";
import ReservationForm from "./components/ReservationForm";
import ReservationSummary from "./components/ReservationSummary";

import { buildReservationPayload } from "./services/reservation.utils";
import { submitReservation } from "./services/reservation.api";
import { validateStep } from "./services/reservation.validation"; // optional (below)

export default function ReservationPage() {
  const steps = useMemo(() => ["Vehicle", "Trip", "Passenger", "Confirm"], []);
  const [activeStep, setActiveStep] = useState(0);

  const [form, setForm] = useState({
    vehicleId: null,
    selectedPrice: null,
    vehicleImage: "",
    hourlyPrice: null,
    dailyPrice: null,
    serviceType: "",
    pickupDate: "",
    pickupTime: "",
    pickupLocation: "",
    dropoffLocation: "",
    durationHours: "",
    returnTrip: false,
    returnDate: "",
    returnTime: "",
    passengers: 1,
    luggage: 0,
    vehicleType: "",

    meetGreet: false,
    childSeat: false,
    boosterSeat: false,

    isAirport: false,
    airline: "",
    flightNumber: "",
    arrivalTime: "",

    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, ok: false, message: "" });

  const onChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const goNext = () => {
  const { ok, nextErrors } = validateStep(activeStep, form);
  setErrors(nextErrors);
  if (!ok) return;
  setActiveStep((s) => Math.min(s + 1, steps.length - 1));
};

  const goBack = () => setActiveStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
  // now submit only on step 3
  const { ok, nextErrors } = validateStep(activeStep, form);
  setErrors(nextErrors);
  if (!ok) return;

    const payload = buildReservationPayload(form);

    try {
      setStatus({ loading: true, ok: false, message: "" });

      const result = await submitReservation(payload);

      setStatus({
        loading: false,
        ok: true,
        message: result?.message || "Reservation submitted successfully!",
      });

      setActiveStep(3);
    } catch (err) {
      // Map backend field errors to frontend fields
      if (err?.errors) setErrors((prev) => ({ ...prev, ...err.errors }));

      setStatus({
        loading: false,
        ok: false,
        message: err?.message || "Failed to submit reservation.",
      });
    }
  };
const goNextNoValidate = () => {
  setActiveStep((s) => Math.min(s + 1, steps.length - 1));
};

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight={900}>
          Reservation
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Book your ride in a few steps.
        </Typography>
      </Box>

      <Paper sx={{ p: { xs: 2, md: 3 }, borderRadius: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel sx={{ "& .MuiStepLabel-label": { fontWeight: 700 } }}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {status.message ? (
        <Alert severity={status.ok ? "success" : "error"} sx={{ mb: 2 }}>
          {status.message}
        </Alert>
      ) : null}

      <Grid container spacing={2.5}>
        <Grid item xs={12} lg={8}>
          <ReservationForm
  step={activeStep}
  form={form}
  errors={errors}
  loading={status.loading}
  onChange={onChange}
  onBack={goBack}
  onNext={goNext}
  onSubmit={handleSubmit}
  onAutoNext={goNextNoValidate}   // ✅ add this
/>

        </Grid>

        <Grid item xs={12} lg={4}>
          <ReservationSummary form={form} />
        </Grid>
      </Grid>
    </Box>
  );
}
