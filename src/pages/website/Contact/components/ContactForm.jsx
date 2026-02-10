import { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  IconButton,
  Paper,
  Divider,
  CircularProgress,
  Alert
} from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import InstagramIcon from "@mui/icons-material/Instagram";

import { styles } from "./contactStyles";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("https://api.newyorklimoz.net//api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess("Your message has been sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={styles.root}>
      <Typography variant="h4" align="center" sx={styles.heading}>
        Contact Us
      </Typography>

      <Typography variant="body1" align="center" sx={styles.subheading}>
        Feel free to reach out for any inquiries or feedback. We are here to help!
      </Typography>

      <Grid container spacing={4} sx={styles.gridContainer}>
        {/* Contact Form */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={styles.formContainer}>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Your Name"
                name="name"
                margin="normal"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <TextField
                fullWidth
                label="Your Email"
                name="email"
                type="email"
                margin="normal"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <TextField
                fullWidth
                label="Your Message"
                name="message"
                margin="normal"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
              />

              <Divider sx={{ my: 2 }} />

              {success && <Alert severity="success">{success}</Alert>}
              {error && <Alert severity="error">{error}</Alert>}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={styles.submitBtn}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Send Message"}
              </Button>
            </form>
          </Paper>
        </Grid>

        {/* Map */}
        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={styles.mapContainer}>
            <Box sx={styles.mapBox}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1262501.5027993445!2d144.06337495859374!3d-37.02062499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65bcb3e447b15%3A0x5045675218ce7e0!2sVictoria%2C%20Australia!5e0!3m2!1sen!2s!4v1690000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Victoria Map"
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Social Icons */}
      <Box sx={styles.socialRow}>
        <IconButton><FacebookIcon /></IconButton>
        <IconButton><TwitterIcon /></IconButton>
        <IconButton><GoogleIcon /></IconButton>
        <IconButton><InstagramIcon /></IconButton>
      </Box>
    </Box>
  );
}
