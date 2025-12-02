import React from "react";
import Slider from "react-slick";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  useTheme,
} from "@mui/material";
import { PeopleAlt, WorkOutline } from "@mui/icons-material";
import { ArrowLeft, ArrowRight } from "lucide-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ✅ Vehicles Data
const vehicles = [
  {
    name: "Chevrolet Suburban SUV",
    rate: "$120.00 Airport Rate",
    img: "https://break2theborder.com/wp-content/uploads/2023/02/mayback-1-600x285.png",
    passengers: 6,
    luggage: 6,
  },
  {
    name: "Mercedes S580/S550",
    rate: "$186.00 Airport Rate",
    img: "https://break2theborder.com/wp-content/uploads/2023/02/Luxury-Lincoln-MKT-Black-Limousine.png",
    passengers: 3,
    luggage: 3,
  },
  {
    name: "Mercedes C Class",
    rate: "$164.00 Airport Rate",
    img: "https://break2theborder.com/wp-content/uploads/2023/02/Van.png",
    passengers: 3,
    luggage: 3,
  },
  {
    name: "Mercedes C Class",
    rate: "$164.00 Airport Rate",
    img: "https://break2theborder.com/wp-content/uploads/2023/02/Van.png",
    passengers: 3,
    luggage: 3,
  },
];

// ✅ Custom Arrow Buttons
const ArrowButton = ({ direction, onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      [direction === "left" ? "left" : "right"]: "-40px",
      width: 48,
      height: 48,
      bgcolor: "#ffffff",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
      cursor: "pointer",
      zIndex: 10,
      transition: "0.25s ease",
      "&:hover": { bgcolor: "#f3f4f6" },
    }}
  >
    {direction === "left" ? <ArrowLeft size={22} /> : <ArrowRight size={22} />}
  </Box>
);

const CarCarousel = () => {
  const theme = useTheme();

  /** ✅ RIGHT-TO-LEFT SMOOTH CAROUSEL **/
  const settings = {
    dots: true,
    infinite: true,
    rtl: true, // ← ✅ reverse movement (right to left)
    speed: 800, // ← smoother transition
    cssEase: "ease-in-out", // ← premium movement
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <ArrowButton direction="right" />,
    prevArrow: <ArrowButton direction="left" />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <Box sx={{ py: 12, maxWidth: "1280px", mx: "auto", px: 3 }}>
      {/* ✅ Section Heading */}
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          color: theme.palette.secondary.main,
          letterSpacing: 2,
        }}
      >
        WE PROVIDE UPDATED CAR
      </Typography>

      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontWeight: 700,
          mb: 7,
        }}
      >
        NEWLY ADDED VEHICLES
      </Typography>

      {/* ✅ Carousel */}
      <Box
        sx={{
          ".slick-slide": { padding: "0 15px" },
          ".slick-list": { margin: "0 -15px" },
        }}
      >
        <Slider {...settings}>
          {vehicles.map((car, index) => (
            <Card
              key={index}
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                border: "1px solid #e5e7eb",
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0px 15px 35px rgba(0,0,0,0.20)",
                  transform: "translateY(-6px)",
                },
              }}
            >
              {/* ✅ Car Image */}
              <Box
                sx={{
                  width: "100%",
                  height: 240,
                  bgcolor: "#f8fafc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="img"
                  src={car.img}
                  alt={car.name}
                  sx={{
                    width: "80%",
                    objectFit: "contain",
                    filter: "drop-shadow(0px 4px 10px rgba(0,0,0,0.25))",
                  }}
                />
              </Box>

              {/* ✅ Car Details */}
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  {car.name}
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.secondary.main,
                    fontWeight: 600,
                    mt: 1,
                  }}
                >
                  {car.rate}
                </Typography>

                <Box sx={{ height: 1, bgcolor: "#e5e7eb", my: 2 }} />

                {/* ✅ Passenger & Luggage Info */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: "#6b7280",
                    fontSize: "0.95rem",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PeopleAlt color="primary" fontSize="small" />
                    {car.passengers} Passengers
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <WorkOutline color="primary" fontSize="small" />
                    {car.luggage} Luggage
                  </Box>
                </Box>

                {/* ✅ Book Button */}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 3,
                    py: 1.5,
                    borderRadius: 2,
                    bgcolor: theme.palette.primary.main,
                    "&:hover": { bgcolor: theme.palette.primary.dark },
                  }}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default CarCarousel;
