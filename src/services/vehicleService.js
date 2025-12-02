// src/services/vehicleService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No authentication token found");
  }
  return {
    headers: { 
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

// Vehicle CRUD operations
export const vehicleService = {
  // Get all vehicles
  getAllVehicles: async () => {
    const response = await axios.get(`${API_BASE_URL}/vehicles`);
    return response.data;
  },

  // Get vehicle by ID
  getVehicleById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/vehicles/${id}`);
    return response.data;
  },

  // Create new vehicle
  createVehicle: async (vehicleData) => {
    const response = await axios.post(`${API_BASE_URL}/vehicles`, vehicleData, getAuthHeaders());
    return response.data;
  },

  // Update vehicle
  updateVehicle: async (id, vehicleData) => {
    const response = await axios.put(`${API_BASE_URL}/vehicles/${id}`, vehicleData, getAuthHeaders());
    return response.data;
  },

  // Delete vehicle
  deleteVehicle: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/vehicles/${id}`, getAuthHeaders());
    return response.data;
  }
};

// Vehicle Images operations
export const vehicleImageService = {
  // Get all images for a vehicle
  getVehicleImages: async (vehicleId) => {
    const response = await axios.get(`${API_BASE_URL}/vehicles/${vehicleId}/images`);
    return response.data;
  },

  // Upload images
  uploadImages: async (vehicleId, formData) => {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_BASE_URL}/vehicles/${vehicleId}/images`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    return response.data;
  },

  // Set default image
  setDefaultImage: async (vehicleId, imageId) => {
    const response = await axios.patch(
      `${API_BASE_URL}/vehicles/${vehicleId}/images/${imageId}/default`,
      {},
      getAuthHeaders()
    );
    return response.data;
  },

  // Delete image
  deleteImage: async (vehicleId, imageId) => {
    const response = await axios.delete(
      `${API_BASE_URL}/vehicles/${vehicleId}/images/${imageId}`,
      getAuthHeaders()
    );
    return response.data;
  }
};

// Error handling utility
export const handleApiError = (error, defaultMessage) => {
  if (error.response?.status === 401) {
    return { 
      message: "Authentication failed. Please login again.", 
      type: "error",
      redirect: true 
    };
  } else if (error.response?.status === 403) {
    return { 
      message: "Access denied. Admin privileges required.", 
      type: "error" 
    };
  } else {
    return { 
      message: error.response?.data?.message || defaultMessage, 
      type: "error" 
    };
  }
};