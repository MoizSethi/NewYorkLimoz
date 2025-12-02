import React from "react";
import { Box, Typography, Grid, TextField, Button, IconButton, Link, useTheme } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        mt: 10,
        p: { xs: 4, md: 6 },
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Grid container spacing={4}>
        {/* Logo & About */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            MyBrand
          </Typography>
          <Typography variant="body2">
            We provide modern web solutions to help your business grow and reach its full potential.
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Quick Links
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Link href="#home" color="inherit" underline="hover">Home</Link>
            <Link href="#about" color="inherit" underline="hover">About</Link>
            <Link href="#services" color="inherit" underline="hover">Services</Link>
            <Link href="#contact" color="inherit" underline="hover">Contact</Link>
          </Box>
        </Grid>

        {/* Social Media */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Follow Us
          </Typography>
          <Box>
            <IconButton color="inherit"><Facebook /></IconButton>
            <IconButton color="inherit"><Twitter /></IconButton>
            <IconButton color="inherit"><Instagram /></IconButton>
            <IconButton color="inherit"><LinkedIn /></IconButton>
          </Box>
        </Grid>

        {/* Newsletter */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Newsletter
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
            <TextField
              variant="filled"
              size="small"
              placeholder="Your email"
              sx={{
                bgcolor: theme.palette.mode === 'light' ? '#fff' : '#1e293b',
                borderRadius: 1,
                flex: 1,
              }}
            />
            <Button variant="contained" color="secondary" sx={{ mt: { xs: 1, sm: 0 } }}>
              Subscribe
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Footer Bottom */}
      <Box sx={{ textAlign: "center", mt: 5, pt: 2 }}>
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} MyBrand. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
