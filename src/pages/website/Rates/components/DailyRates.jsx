// src/pages/website/Rates/components/DailyRates.jsx
import { useState, useMemo } from "react";
import {
  Box, Grid, Typography, Card, CardContent, CardMedia,
  Chip, Button, IconButton, Dialog, DialogContent,
  useTheme, useMediaQuery
} from "@mui/material";
import { 
  Check, People, Luggage, Star, ZoomIn, 
  Event, Business, Celebration, Tour 
} from "@mui/icons-material";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const DailyRates = ({ vehicles, prices }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageDialogOpen, setImageDialogOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Memoize data for performance
  const dailyData = useMemo(() => {
    return vehicles
      .map(vehicle => {
        const dailyPrice = prices.find(
          price => price.vehicle_id === vehicle.vehicle_id && 
          price.serviceType === 'daily' && 
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
          dailyPrice,
          imageUrl,
          allImages
        };
      })
      .filter(item => item.dailyPrice);
  }, [vehicles, prices]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getFeatures = (vehicle) => {
    const features = [];
    if (vehicle.usbPowerOutlets) features.push("USB Power");
    if (vehicle.coloredAccentLights) features.push("Ambient Lighting");
    if (vehicle.deluxeAudioSystem) features.push("Premium Audio");
    if (vehicle.rearHeatACControls) features.push("Dual Climate Control");
    if (vehicle.eleganceStylish) features.push("Luxury Interior");
    if (vehicle.extraLegroomComfortable) features.push("Extra Legroom");
    return features.slice(0, 4);
  };

  const calculateSavings = (dailyPrice) => {
    const hourlyEquivalent = (dailyPrice.baseRate / 10) * 8;
    return Math.max(0, hourlyEquivalent - dailyPrice.totalPrice);
  };

  const handleImageClick = (imageUrl, vehicle) => {
    setSelectedImage({ imageUrl, vehicle });
    setImageDialogOpen(true);
  };

  const handleImageError = (e) => {
    console.log('Image failed to load:', e.target.src);
    e.target.src = '/no-image.jpg';
  };

  if (dailyData.length === 0) {
    return (
      <Box textAlign="center" py={8}>
        <Typography variant="h5" color="text.secondary" gutterBottom>
          No daily rates available at the moment.
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please check back later or contact us for custom pricing.
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
                  {selectedImage.vehicle.description || 'Premium luxury vehicle for your daily transportation needs'}
                </Typography>
              </Box>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Info Banner - Using theme colors */}
      <Card sx={{ 
        background: theme.palette.mode === 'light' 
          ? `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`
          : `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
        color: 'white', 
        mb: 6,
        borderRadius: 2,
        overflow: 'hidden',
      }}>
        <CardContent sx={{ textAlign: 'center', py: 6 }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              fontSize: isMobile ? '2rem' : '2.5rem'
            }}
          >
            📅 Daily Service
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              opacity: 0.9, 
              fontWeight: 400,
              fontSize: isMobile ? '0.8rem' : '1rem',
              maxWidth: 800,
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Perfect for full-day events, corporate travel, and weddings. 
            Minimum 10 hours with 30% business discount included!
          </Typography>
        </CardContent>
      </Card>

      {/* Vehicles Grid */}
      <Grid container spacing={3}>
        {dailyData.map((vehicle) => {
          const savings = calculateSavings(vehicle.dailyPrice);
          const features = getFeatures(vehicle);
          const originalPrice = vehicle.dailyPrice.baseRate / 0.7;
          
          return (
            <Grid item xs={12} md={6} lg={4} key={vehicle.vehicle_id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'all 0.3s ease-in-out',
                  borderRadius: 2,
                  overflow: 'hidden',
                  bgcolor: 'background.paper',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: theme.shadows[8]
                  }
                }}
              >
                {/* Image Section */}
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    height="220"
                    image={vehicle.imageUrl}
                    alt={vehicle.name}
                    onError={handleImageError}
                    sx={{
                      objectFit: 'cover',
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

                  {/* Savings Badge */}
                  {savings > 0 && (
                    <Chip
                      icon={<Star />}
                      label={`Save ${formatCurrency(savings)}`}
                      color="secondary"
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        fontWeight: 600,
                        bgcolor: 'secondary.main',
                        color: 'white'
                      }}
                    />
                  )}
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  {/* Vehicle Header */}
                  <Box textAlign="center" mb={2}>
                    <Typography 
                      variant="h5" 
                      component="h3" 
                      sx={{ 
                        fontWeight: 600,
                        color: 'primary.main',
                        mb: 1
                      }}
                    >
                      {vehicle.name}
                    </Typography>
                    
                    {/* Price Section */}
                    <Box sx={{ mb: 2 }}>
                      <Typography 
                        variant="h4" 
                        component="div" 
                        sx={{ 
                          fontWeight: 700,
                          color: 'secondary.main',
                          lineHeight: 1
                        }}
                      >
                        {formatCurrency(vehicle.dailyPrice.totalPrice)}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ fontWeight: 500, mt: 0.5 }}
                      >
                        per day • 10+ hours
                      </Typography>
                      <Box sx={{ mt: 0.5 }}>
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{ textDecoration: 'line-through', mr: 1 }}
                        >
                          {formatCurrency(originalPrice)}
                        </Typography>
                        <Typography 
                          variant="caption" 
                          color="secondary.main"
                          sx={{ fontWeight: 600 }}
                        >
                          You save 30%
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Vehicle Specs */}
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
                        {features.map((feature, index) => (
                          <Grid item xs={6} key={index}>
                            <Box display="flex" alignItems="center" gap={0.5}>
                              <Check sx={{ fontSize: 16, color: 'secondary.main' }} />
                              <Typography variant="body2" fontSize="0.8rem">
                                {feature}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}

                  {/* Service Benefits */}
                  <Box 
                    sx={{ 
                      bgcolor: 'primary.50', 
                      p: 2, 
                      borderRadius: 1,
                      border: '1px solid',
                      borderColor: 'primary.100'
                    }}
                  >
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        fontWeight: 600,
                        color: 'primary.dark',
                        display: 'block',
                        mb: 0.5
                      }}
                    >
                      🎯 PERFECT FOR:
                    </Typography>
                    <Typography variant="caption" color="primary.dark">
                      Corporate Events • Weddings • Full Day Tours • Business Travel
                    </Typography>
                  </Box>
                </CardContent>

                {/* Action Button */}
                <Box sx={{ p: 3, pt: 0 }}>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    size="large"
                    component="a"
                    href={`/reservation?vehicle=${vehicle.vehicle_id}&type=daily`}
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
                    Book Daily Service
                  </Button>
                </Box>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Benefits Section */}
      <Box sx={{ mt: 8 }}>
        <Typography 
          variant="h4" 
          textAlign="center" 
          gutterBottom 
          sx={{ 
            fontWeight: 600,
            mb: 4,
            color: 'primary.main'
          }}
        >
          Why Choose Daily Service?
        </Typography>
        <Grid container spacing={3}>
          {[
            {
              icon: <Event sx={{ fontSize: 40 }} />,
              title: "10+ Hours Coverage",
              description: "Full-day service perfect for events, tours, and business meetings with complete flexibility.",
              color: "primary"
            },
            {
              icon: <Business sx={{ fontSize: 40 }} />,
              title: "30% Business Discount",
              description: "Exclusive discount automatically applied to all daily bookings. Best value guaranteed.",
              color: "secondary"
            },
            {
              icon: <Celebration sx={{ fontSize: 40 }} />,
              title: "Special Event Ready",
              description: "Perfect for weddings, anniversaries, and celebrations with premium vehicles.",
              color: "primary"
            },
            {
              icon: <Tour sx={{ fontSize: 40 }} />,
              title: "City Tour Package",
              description: "Explore the city at your own pace with our full-day tour package.",
              color: "secondary"
            }
          ].map((benefit, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 2,
                  bgcolor: 'background.paper'
                }}
              >
                <Box 
                  sx={{ 
                    color: `${benefit.color}.main`,
                    mb: 2
                  }}
                >
                  {benefit.icon}
                </Box>
                <Typography 
                  variant="h6" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 600,
                    color: 'text.primary'
                  }}
                >
                  {benefit.title}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ lineHeight: 1.5 }}
                >
                  {benefit.description}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default DailyRates;