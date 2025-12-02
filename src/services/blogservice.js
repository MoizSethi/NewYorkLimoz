import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

// Get all blogs
const getBlogs = async () => {
  const res = await API.get("/blogs");
  return res.data; // { success: true, data: [...] }
};

// Get single blog by ID
const getBlogById = async (id) => {
  const res = await API.get(`/blogs/${id}`);
  return res.data; // { success: true, data: {...} }
};

// Create blog
const createBlog = async (formData) => {
  const res = await API.post("/blogs", formData);
  return res.data;
};

// Update blog
const updateBlog = async (id, formData) => {
  const res = await API.put(`/blogs/${id}`, formData);
  return res.data;
};

// Helpers (optional)
const parseBlogData = (blog) => ({
  id: blog.id,
  title: blog.title,
  category: blog.category,
  excerpt: blog.excerpt,
  content: blog.content,
  cover: blog.cover_image,
  tags: JSON.parse(blog.tags || "[]"),
  status: blog.status,
});

const formatBlogData = (form) => ({
  title: form.title,
  excerpt: form.excerpt,
  category: form.category,
  content: form.content,
  cover_image: form.cover,
  tags: form.tags,
  status: form.status,
});

export const blogService = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  parseBlogData,
  formatBlogData,
};
