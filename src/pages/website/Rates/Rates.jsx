// src/pages/website/Rates/Rates.jsx
import { useState, useEffect, useCallback } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import axios from "axios";
import HourlyRates from "./components/HourlyRates";
import DailyRates from "./components/DailyRates";

const API_BASE_URL = "https://api.newyorklimoz.net/api"; // ✅ no trailing slash

function Rates() {
  const [vehicles, setVehicles] = useState([]);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();

  const getActiveTab = () => {
    if (location.pathname.includes("/rates/daily")) return 1;
    return 0;
  };

  const fetchVehicleImages = async (vehicleId) => {
    try {
      // IMPORTANT: keep this endpoint exactly as your backend expects
      const res = await axios.get(`${API_BASE_URL}/vehicles/${vehicleId}/images`);
      // supports either: { images: [...] } OR [...]
      return res.data?.images || res.data || [];
    } catch (err) {
      console.warn(`Could not load images for vehicle ${vehicleId}`, err);
      return [];
    }
  };

  const fetchVehiclesWithImages = async () => {
    const vehiclesRes = await axios.get(`${API_BASE_URL}/vehicles`);
    const vehiclesData = vehiclesRes.data || [];

    const vehiclesWithImages = await Promise.all(
      vehiclesData.map(async (v) => {
        const images = await fetchVehicleImages(v.vehicle_id);
        return { ...v, images };
      })
    );

    return vehiclesWithImages;
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [vehiclesWithImages, pricesRes] = await Promise.all([
        fetchVehiclesWithImages(),
        axios.get(`${API_BASE_URL}/prices`),
      ]);

      setVehicles(vehiclesWithImages);
      setPrices(pricesRes.data?.prices || []);
    } catch (err) {
      console.error("Error fetching rates:", err);
      setError("Failed to load rates data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="420px">
        <CircularProgress size={56} />
        <Typography variant="h6" sx={{ ml: 2 }}>
          Loading rates...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Box textAlign="center">
          <Button variant="contained" onClick={fetchData} sx={{ mt: 2 }}>
            Try Again
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 8, bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" component="h1" sx={{ fontWeight: 800, mb: 2 }}>
            Our Rates
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ maxWidth: 650, mx: "auto", lineHeight: 1.7 }}
          >
            Choose from our premium fleet of vehicles with transparent, all-inclusive pricing.
            No hidden fees, no surprises.
          </Typography>
        </Box>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 6 }}>
          <Tabs
            value={getActiveTab()}
            centered
            sx={{
              "& .MuiTab-root": {
                fontSize: "1.05rem",
                fontWeight: 700,
                py: 2,
                px: 4,
                minWidth: 200,
                textTransform: "none",
              },
              "& .MuiTabs-indicator": { height: 3, borderRadius: "3px 3px 0 0" },
            }}
          >
            <Tab label="🕒 Hourly Rates" component={Link} to="/rates" />
            <Tab label="📅 Daily Rates" component={Link} to="/rates/daily" />
          </Tabs>
        </Box>

        {/* Content */}
        <Routes>
          <Route path="/" element={<HourlyRates vehicles={vehicles} prices={prices} />} />
          <Route path="/daily" element={<DailyRates vehicles={vehicles} prices={prices} />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default Rates;
