// src/components/VehicleForm.jsx
import { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
  Button,
  Box
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const VehicleForm = ({ vehicle, onChange, onImagesChange }) => {
  const [previewImages, setPreviewImages] = useState([]);

  const features = [
    { key: "usbPowerOutlets", label: "USB Power Outlets" },
    { key: "coloredAccentLights", label: "Colored Accent Lights" },
    { key: "deluxeAudioSystem", label: "Deluxe Audio System" },
    { key: "forwardSeatingWithSeatBelts", label: "Forward Seating with Seat Belts" },
    { key: "rearHeatACControls", label: "Rear Heat/AC Controls" },
    { key: "eleganceStylish", label: "Elegance & Stylish" },
    { key: "extraLegroomComfortable", label: "Extra Legroom & Comfortable" }
  ];

  const handleChange = (field, value) => {
    onChange({
      ...vehicle,
      [field]: value
    });
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Preview images instantly
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);

    // Return files to parent (for API upload)
    if (onImagesChange) {
      onImagesChange(files);
    }
  };

  return (
    <Grid container spacing={2}>

      {/* Vehicle Name */}
      <Grid item xs={12}>
        <TextField
          label="Vehicle Name"
          fullWidth
          value={vehicle?.name || ""}
          onChange={(e) => handleChange("name", e.target.value)}
          required
        />
      </Grid>

      {/* Seats */}
      <Grid item xs={6}>
        <TextField
          label="Seats"
          type="number"
          fullWidth
          value={vehicle?.seats || ""}
          onChange={(e) => handleChange("seats", e.target.value)}
          required
        />
      </Grid>

      {/* Luggage */}
      <Grid item xs={6}>
        <TextField
          label="Luggage Capacity"
          type="number"
          fullWidth
          value={vehicle?.luggageCapacity || ""}
          onChange={(e) => handleChange("luggageCapacity", e.target.value)}
          required
        />
      </Grid>

      {/* Feature Title */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ mt: 1, mb: 1 }}>
          Features
        </Typography>
      </Grid>

      {/* Feature Switches */}
      {features.map((feature) => (
        <Grid item xs={12} key={feature.key}>
          <FormControlLabel
            control={
              <Switch
                checked={vehicle?.[feature.key] || false}
                onChange={(e) =>
                  handleChange(feature.key, e.target.checked)
                }
              />
            }
            label={feature.label}
          />
        </Grid>
      ))}

      {/* Image Upload */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ mt: 2 }}>
          Upload Vehicle Images
        </Typography>

        <input
          id="vehicle-image-upload"
          type="file"
          multiple
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageSelect}
        />

        <label htmlFor="vehicle-image-upload">
          <Button
            variant="outlined"
            component="span"
            startIcon={<PhotoCamera />}
            fullWidth
          >
            Select Images
          </Button>
        </label>

        {/* Preview */}
        {previewImages.length > 0 && (
          <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
            {previewImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="preview"
                width={80}
                height={80}
                style={{ borderRadius: 8, objectFit: "cover" }}
              />
            ))}
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default VehicleForm;
