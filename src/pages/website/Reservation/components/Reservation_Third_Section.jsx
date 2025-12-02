'use client';

import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  Divider,
} from "@mui/material";

import {
  loginUser,
  registerUser,
  registerGuest,
} from "../services/final_step_login_and_registration";
import { createRide } from "../services/reservation_first_section_service";

export default function ReservationFinalStep({ onBack, onProceed, rideData }) {
  const [showRegister, setShowRegister] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [rideCreated, setRideCreated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [guestForm, setGuestForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleLogin = async () => {
    try {
      const loginRes = await loginUser(loginForm);

      if (loginRes.success) {
        const userId = loginRes.user.id;

        const { guest_id, ...cleanedData } = rideData;

        const ridePayload = {
          ...cleanedData,
          userId: userId,
        };

        await createRide(ridePayload);

        setIsLoggedIn(true);
        setRideCreated(true);
        onProceed();
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(registerForm);
      setRegistrationSuccess(true);

      setTimeout(() => {
        setShowRegister(false);
        setRegistrationSuccess(false);
      }, 1500);
    } catch (err) {}
  };

  const handleGuestCheckout = async () => {
    try {
      const guestRes = await registerGuest(guestForm);

      if (guestRes.success) {
        const ridePayload = {
          ...rideData,
          guest_id: guestRes.id,
        };

        await createRide(ridePayload);
        setRideCreated(true);
        onProceed();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
      <Button
        onClick={onBack}
        sx={{ mb: 2, color: "primary.main", fontSize: "0.9rem" }}
      >
        ← Back to Vehicle Selection
      </Button>

      <Grid container spacing={4}>
        {/* LOGIN / REGISTER */}
        <Grid item xs={12} md={6}>
          {!showRegister ? (
            <Box component="form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
              <Typography variant="h5" fontWeight="600">
                Login
              </Typography>

              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2, py: 1.5 }}
              >
                Login
              </Button>

              {error && (
                <Typography color="error" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}

              <Typography sx={{ mt: 2 }}>
                Don’t have an account?{" "}
                <Button variant="text" onClick={() => setShowRegister(true)}>
                  Register now
                </Button>
              </Typography>
            </Box>
          ) : (
            <Box
              component="form"
              onSubmit={handleRegister}
              sx={{
                opacity: registrationSuccess ? 0.3 : 1,
                transition: "0.5s",
              }}
            >
              <Typography variant="h5" fontWeight="600">
                Register
              </Typography>

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="First Name"
                    fullWidth
                    required
                    value={registerForm.first_name}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        first_name: e.target.value,
                      })
                    }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Last Name"
                    fullWidth
                    required
                    value={registerForm.last_name}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        last_name: e.target.value,
                      })
                    }
                  />
                </Grid>
              </Grid>

              <TextField
                label="Email"
                type="email"
                fullWidth
                required
                sx={{ mt: 2 }}
                value={registerForm.email}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, email: e.target.value })
                }
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                required
                sx={{ mt: 2 }}
                value={registerForm.password}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, password: e.target.value })
                }
              />

              <TextField
                label="Phone Number"
                type="tel"
                fullWidth
                required
                sx={{ mt: 2 }}
                value={registerForm.phone}
                onChange={(e) =>
                  setRegisterForm({ ...registerForm, phone: e.target.value })
                }
              />

              <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }}>
                Register
              </Button>

              {registrationSuccess && (
                <Typography sx={{ mt: 2 }} color="primary">
                  Registration Successful!
                </Typography>
              )}
            </Box>
          )}
        </Grid>

        {/* GUEST CHECKOUT */}
        <Grid item xs={12} md={6}>
          <Divider sx={{ display: { xs: "block", md: "none" }, mb: 2 }} />

          <Typography variant="h5" fontWeight="600" sx={{ mb: 2 }}>
            Continue as Guest
          </Typography>

          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            value={guestForm.name}
            onChange={(e) =>
              setGuestForm({ ...guestForm, name: e.target.value })
            }
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={guestForm.email}
            onChange={(e) =>
              setGuestForm({ ...guestForm, email: e.target.value })
            }
          />

          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            value={guestForm.phone}
            onChange={(e) =>
              setGuestForm({ ...guestForm, phone: e.target.value })
            }
          />

          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3, py: 1.5 }}
            onClick={handleGuestCheckout}
          >
            Continue to Payment
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
