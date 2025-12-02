// src/pages/website/Rates/Rates.jsx
import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { Box, Container, Typography, Tabs, Tab, CircularProgress, Alert } from "@mui/material";
import axios from "axios";
import HourlyRates from "./components/HourlyRates";
import DailyRates from "./components/DailyRates";

const API_BASE_URL = "http://localhost:3000/api";

function Rates() {
  const [vehicles, setVehicles] = useState([]);
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Determine active tab based on current route
  const getActiveTab = () => {
    if (location.pathname.includes("/daily-rates")) return 1;
    return 0; // Default to hourly rates
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Function to fetch images for a specific vehicle
  const fetchVehicleImages = async (vehicleId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/vehicles/${vehicleId}/images`);
      return response.data.images || [];
    } catch (error) {
      console.warn(`Could not load images for vehicle ${vehicleId}:`, error);
      return [];
    }
  };

  // Function to fetch all vehicles with their images
  const fetchVehiclesWithImages = async () => {
    try {
      const vehiclesRes = await axios.get(`${API_BASE_URL}/vehicles`);
      const vehiclesData = vehiclesRes.data || [];
      
      // Fetch images for each vehicle
      const vehiclesWithImages = await Promise.all(
        vehiclesData.map(async (vehicle) => {
          const images = await fetchVehicleImages(vehicle.vehicle_id);
          return {
            ...vehicle,
            images: images
          };
        })
      );
      
      return vehiclesWithImages;
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      throw error;
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [vehiclesWithImages, pricesRes] = await Promise.all([
        fetchVehiclesWithImages(),
        axios.get(`${API_BASE_URL}/prices`)
      ]);
      
      setVehicles(vehiclesWithImages);
      setPrices(pricesRes.data?.prices || []);
      
      // Log for debugging
      console.log("Vehicles with images:", vehiclesWithImages);
      vehiclesWithImages.forEach(vehicle => {
        console.log(`Vehicle ${vehicle.name}:`, vehicle.images?.length || 0, "images");
        if (vehicle.images?.length > 0) {
          console.log("First image URL:", vehicle.images[0].image_url);
        }
      });
      
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load rates data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
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
          <Button 
            variant="contained" 
            onClick={fetchData}
            sx={{ mt: 2 }}
          >
            Try Again
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 8, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box textAlign="center" mb={6}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 700, 
              color: 'primary.main',
              mb: 2
            }}
          >
            Our Rates
          </Typography>
          <Typography 
            variant="h6" 
            color="text.secondary" 
            sx={{ maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}
          >
            Choose from our premium fleet of vehicles with transparent, all-inclusive pricing. 
            No hidden fees, no surprises.
          </Typography>
        </Box>

        {/* Navigation Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 6 }}>
          <Tabs 
            value={getActiveTab()} 
            centered
            sx={{
              '& .MuiTab-root': {
                fontSize: '1.1rem',
                fontWeight: 600,
                py: 2,
                px: 4,
                minWidth: 200
              },
              '& .MuiTabs-indicator': {
                height: 3,
                borderRadius: '3px 3px 0 0'
              }
            }}
          >
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>🕒</span>
                  Hourly Rates
                </Box>
              }
              component={Link}
              to="/rates"
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span>📅</span>
                  Daily Rates
                </Box>
              }
              component={Link}
              to="/rates/daily"
            />
          </Tabs>
        </Box>

        {/* Page Content */}
        <Routes>
          <Route 
            path="/" 
            element={
              <HourlyRates 
                vehicles={vehicles} 
                prices={prices} 
              />
            } 
          />
          <Route 
            path="/daily" 
            element={
              <DailyRates 
                vehicles={vehicles} 
                prices={prices} 
              />
            } 
          />
        </Routes>
      </Container>
    </Box>
  );
}

export default Rates;