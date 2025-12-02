import React from "react";
import { Box, Typography, Grid, useTheme } from "@mui/material";
import {
  DirectionsCarFilled,
  SupportAgent,
  LocationOn,
  MiscellaneousServices,
} from "@mui/icons-material";

const features = [
  {
    icon: <DirectionsCarFilled sx={{ fontSize: 40, color: "#fbbf24" }} />,
    title: "Luxury Cars",
    desc: "Our magnificent collection of top-of-the-line vehicles can accommodate any budget.",
  },
  {
    icon: <SupportAgent sx={{ fontSize: 40, color: "#fbbf24" }} />,
    title: "24/7 Support",
    desc: "We offer premier cab service across New York and the Tri-State area anytime you need.",
  },
  {
    icon: <LocationOn sx={{ fontSize: 40, color: "#fbbf24" }} />,
    title: "Lots Of Location",
    desc: "We offer premier cab service across New York and the Tri-State area.",
  },
  {
    icon: <MiscellaneousServices sx={{ fontSize: 40, color: "#fbbf24" }} />,
    title: "Additional Services",
    desc: "We provide 100% customized transportation services to meet your demands.",
  },
];

const WhyChooseUs = () => {
  const theme = useTheme();

  return (
    <Box sx={{ py: 10, maxWidth: "1400px", mx: "auto", px: { xs: 3, md: 6 } }}>
      {/* Section Title */}
      <Typography
        variant="h6"
        sx={{
          textAlign: "center",
          color: theme.palette.secondary.main,
          letterSpacing: 2,
          fontWeight: 500,
          mb: 1,
        }}
      >
        WHY CHOOSE US
      </Typography>

      <Typography
        variant="h3"
        sx={{
          textAlign: "center",
          fontWeight: 700,
          mb: 2,
        }}
      >
        OUR ADVANTAGES
      </Typography>

      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          maxWidth: "900px",
          mx: "auto",
          mb: 8,
          color: theme.palette.text.secondary,
          lineHeight: 1.7,
        }}
      >
        BREAK 2 THE BORDER has a large choice of premium and standard cars and
        always strives to make your travel experience safe, pleasant, reliable,
        and convenient.
      </Typography>

      {/* Content Grid */}
      <Grid
  container
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 4, // ✅ controlled space between columns
  }}
>
  {/* Left Features */}
  <Grid
    item
    xs={12}
    md={4}
    sx={{
      width: { md: "25%" }, // ✅ exact width
    }}
  >
    <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {features.slice(0, 2).map((item, i) => (
        <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          {item.icon}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              {item.desc}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Grid>

  {/* Center Car */}
  <Grid
    item
    xs={12}
    md={4}
    sx={{
      width: { md: "40%" }, // ✅ exact width
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Box
      component="img"
      src="https://break2theborder.com/wp-content/uploads/2022/12/xtsbanner2.png"
      alt="Luxury Car"
      sx={{
        width: "100%",
        maxWidth: "460px",
      }}
    />
  </Grid>

  {/* Right Features */}
  <Grid
    item
    xs={12}
    md={4}
    sx={{
      width: { md: "25%" }, // ✅ exact width
    }}
  >
    <Box sx={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {features.slice(2, 4).map((item, i) => (
        <Box key={i} sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          {item.icon}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              {item.desc}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  </Grid>
</Grid>

    </Box>
  );
};

export default WhyChooseUs;
