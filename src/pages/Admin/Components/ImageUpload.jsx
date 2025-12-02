// src/components/ImageUpload.jsx
import { useState } from "react";
import { Box, Button } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { vehicleImageService } from "../../../services/vehicleService";

const ImageUpload = ({ vehicleId, onImagesUpdate }) => {
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('images', file);
      });

      const response = await vehicleImageService.uploadImages(vehicleId, formData);
      onImagesUpdate(response.images);
      event.target.value = ''; // Reset file input
    } catch (error) {
      console.error('Error uploading images:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id={`image-upload-${vehicleId}`}
        multiple
        type="file"
        onChange={handleImageUpload}
        disabled={uploading}
      />
      <label htmlFor={`image-upload-${vehicleId}`}>
        <Button
          variant="outlined"
          component="span"
          startIcon={<PhotoCamera />}
          disabled={uploading}
          fullWidth
        >
          {uploading ? 'Uploading...' : 'Upload Images'}
        </Button>
      </label>
    </Box>
  );
};

export default ImageUpload;