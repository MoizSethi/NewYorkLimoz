// src/pages/website/Rates/components/HourlyRates.jsx
import { useState, useMemo } from "react";
import {
  Box, Grid, Typography, Card, CardContent, CardMedia,
  Button, FormControl, InputLabel, Select, MenuItem,
  IconButton, Dialog, DialogContent,
  useTheme, useMediaQuery
} from "@mui/material";
import { Check, People, Luggage, AccessTime, ZoomIn } from "@mui/icons-material";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const HourlyRates = ({ vehicles, prices }) => {
  const [selectedHours, setSelectedHours] = useState(2);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Memoize data for performance
  const hourlyData = useMemo(() => {
    return vehicles
      .map(vehicle => {
        const hourlyPrice = prices.find(
          price =>
            price.vehicle_id === vehicle.vehicle_id &&
            price.serviceType === "hourly" &&
            price.isActive
        );

        // Build image URL safely
        let imageUrl = "/no-image.jpg";
        let allImages = [];

        if (vehicle.images && vehicle.images.length > 0) {
          const defaultImg = vehicle.images.find(img => img.is_default);
          const selectedImg = defaultImg || vehicle.images[0];
          
          // Construct proper image URL
          if (selectedImg.image_url) {
            imageUrl = selectedImg.image_url.startsWith('/') 
              ? `${BASE_URL}${selectedImg.image_url}`
              : `${BASE_URL}/${selectedImg.image_url}`;
          }
          
          // Prepare all images for gallery
          allImages = vehicle.images.map(img => ({
            ...img,
            fullUrl: img.image_url.startsWith('/') 
              ? `${BASE_URL}${img.image_url}`
              : `${BASE_URL}/${img.image_url}`
          }));
        }

        return {
          ...vehicle,
          hourlyPrice,
          imageUrl,
          allImages
        };
      })
      .filter(v => v.hourlyPrice);
  }, [vehicles, prices]);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

  const calculateTotal = (hourlyPrice) =>
    hourlyPrice ? hourlyPrice.totalPrice * selectedHours : 0;

  const getFeatures = (v) => [
    v.usbPowerOutlets && "USB Power",
    v.coloredAccentLights && "Ambient Lighting",
    v.deluxeAudioSystem && "Premium Audio",
    v.rearHeatACControls && "Dual Climate Control",
    v.eleganceStylish && "Luxury Interior",
    v.extraLegroomComfortable && "Extra Legroom",
  ].filter(Boolean).slice(0, 4);

  const handleImageClick = (imageUrl, vehicle) => {
    setSelectedImage({ imageUrl, vehicle });
    setImageDialogOpen(true);
  };

  const handleImageError = (e) => {
    console.log('Image failed to load:', e.target.src);
    e.target.src = '/no-image.jpg';
  };

  const hourOptions = [2, 3, 4, 5, 6, 8, 10, 12, 24];

  if (!hourlyData.length) {
    return (
      <Box textAlign="center" py={8}>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          No hourly rates available right now.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please check back later.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {/* Image Dialog */}
      <Dialog 
        open={imageDialogOpen} 
        onClose={() => setImageDialogOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          {selectedImage && (
            <>
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.vehicle.name}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  display: 'block'
                }}
                onError={handleImageError}
              />
              <Box sx={{ p: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h5" gutterBottom fontWeight={600}>
                  {selectedImage.vehicle.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {selectedImage.vehicle.description || 'Premium luxury vehicle for your hourly transportation needs'}
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Top Banner - Using theme colors */}
      <Card sx={{ 
        background: theme.palette.mode === 'light' 
          ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
          : `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
        color: "white", 
        mb: 6,
        borderRadius: 2,
      }}>
        <CardContent sx={{ textAlign: "center", py: 6 }}>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              fontSize: isMobile ? '2rem' : '2.5rem'
            }}
          >
            🕒 Hourly Service
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              opacity: 0.9, 
              fontWeight: 500,
              fontSize: isMobile ? '1rem' : '1.25rem',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Minimum booking: 2 hours — All inclusive pricing with no hidden fees
          </Typography>
        </CardContent>
      </Card>

      {/* Hour Selector */}
      <Card sx={{ mb: 6, borderRadius: 2, bgcolor: 'background.paper' }}>
        <CardContent sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          py: 4,
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 3 : 0
        }}>
          <Box display="flex" alignItems="center" gap={2}>
            <AccessTime sx={{ color: 'primary.main', fontSize: 32 }} />
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 600, color: 'primary.main' }}>
                Select Hours
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Choose your preferred duration
              </Typography>
            </Box>
          </Box>

          <FormControl sx={{ minWidth: 140 }}>
            <InputLabel>Hours</InputLabel>
            <Select
              value={selectedHours}
              label="Hours"
              onChange={e => setSelectedHours(e.target.value)}
              size="medium"
            >
              {hourOptions.map(h => (
                <MenuItem key={h} value={h}>
                  {h} {h === 1 ? "hour" : "hours"}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {/* Fleet List */}
      <Grid container spacing={3}>
        {hourlyData.map(vehicle => {
          const features = getFeatures(vehicle);
          const totalPrice = calculateTotal(vehicle.hourlyPrice);
          const hourlyRate = vehicle.hourlyPrice.totalPrice;
          
          return (
            <Grid item xs={12} md={6} lg={4} key={vehicle.vehicle_id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease-in-out",
                  borderRadius: 2,
                  overflow: 'hidden',
                  bgcolor: 'background.paper',
                  "&:hover": {
                    boxShadow: theme.shadows[8],
                    transform: "translateY(-4px)"
                  }
                }}
              >
                {/* Image Section */}
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={vehicle.imageUrl}
                    alt={vehicle.name}
                    onError={handleImageError}
                    sx={{ 
                      objectFit: "cover",
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)'
                      }
                    }}
                  />
                  
                  {/* Zoom Button */}
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'background.paper',
                      '&:hover': {
                        bgcolor: 'background.default'
                      }
                    }}
                    onClick={() => handleImageClick(vehicle.imageUrl, vehicle)}
                  >
                    <ZoomIn />
                  </IconButton>
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  {/* Vehicle Name */}
                  <Typography 
                    variant="h5" 
                    textAlign="center" 
                    sx={{ 
                      fontWeight: 600, 
                      mb: 2,
                      color: 'primary.main'
                    }}
                  >
                    {vehicle.name}
                  </Typography>

                  {/* Price Section */}
                  <Box textAlign="center" mb={3}>
                    <Typography
                      variant="h4"
                      color="secondary.main"
                      sx={{ fontWeight: 700, lineHeight: 1 }}
                    >
                      {formatCurrency(totalPrice)}
                    </Typography>

                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ fontWeight: 500, mt: 1 }}
                    >
                      {selectedHours} hours — all inclusive
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ display: 'block', mt: 0.5 }}
                    >
                      {formatCurrency(hourlyRate)} / hour
                    </Typography>
                  </Box>

                  {/* Specs */}
                  <Box 
                    display="flex" 
                    justifyContent="center" 
                    gap={3} 
                    mb={2}
                    sx={{ 
                      py: 1.5,
                      bgcolor: 'background.default',
                      borderRadius: 1
                    }}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <People sx={{ color: 'primary.main' }} />
                      <Typography variant="body2" fontWeight={500}>
                        {vehicle.seats} seats
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Luggage sx={{ color: 'primary.main' }} />
                      <Typography variant="body2" fontWeight={500}>
                        {vehicle.luggageCapacity} bags
                      </Typography>
                    </Box>
                  </Box>

                  {/* Features */}
                  {features.length > 0 && (
                    <Box mb={2}>
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          fontWeight: 600, 
                          mb: 1,
                          color: 'text.primary'
                        }}
                      >
                        Premium Features:
                      </Typography>
                      <Grid container spacing={0.5}>
                        {features.map((f, i) => (
                          <Grid item xs={6} key={i}>
                            <Box display="flex" alignItems="center" gap={0.5}>
                              <Check sx={{ fontSize: 16, color: "secondary.main" }} />
                              <Typography variant="body2" fontSize="0.8rem">
                                {f}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}

                  {/* Included Section */}
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: 'primary.50',
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'primary.100'
                    }}
                  >
                    <Typography variant="caption" fontWeight={600} display="block" color="primary.dark">
                      ✅ ALL INCLUDED:
                    </Typography>
                    <Typography variant="caption" color="primary.dark">
                      Professional Driver • Fuel • Insurance • Taxes • Tolls
                    </Typography>
                  </Box>
                </CardContent>

                {/* Button */}
                <Box sx={{ p: 3, pt: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    href={`/reservation?vehicle=${vehicle.vehicle_id}&hours=${selectedHours}&type=hourly`}
                    sx={{
                      py: 1.5,
                      fontWeight: 500,
                      borderRadius: 1,
                      bgcolor: 'secondary.main',
                      '&:hover': {
                        bgcolor: 'secondary.dark'
                      }
                    }}
                  >
                    Book {selectedHours} Hours
                  </Button>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Pricing Note */}
      <Box 
        sx={{ 
          mt: 6, 
          p: 3, 
          bgcolor: 'background.default', 
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'primary.100'
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
          💡 Pricing Information
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          • Minimum booking: 2 hours
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          • Rates include all taxes, fees, and gratuity
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Additional waiting time may apply beyond the booked duration
        </Typography>
      </Box>
    </Box>
  );
};

export default HourlyRates;