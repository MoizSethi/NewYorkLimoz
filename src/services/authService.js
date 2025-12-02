// src/services/authService.js
import axios from "axios";

const API_BASE = "http://localhost:3000/api";

// Create a reusable axios instance
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // allows cookies if backend uses them
});

// ⛳ Register User
export const registerUser = async (data) => {
  const res = await api.post("/register", data);
  return res.data;
};

// 🎟 Login User
export const loginUser = async (data) => {
  const res = await api.post("/login", data);

  // Auto-store token & user
  localStorage.setItem("token", res.data.token);
  localStorage.setItem("user", JSON.stringify(res.data.user));

  return res.data;
};

// 🧭 Get Current User (from localStorage)
export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// 🚪 Logout (just clears localStorage)
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};
