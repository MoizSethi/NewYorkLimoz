import React, { useState } from "react";
import { Box, Grid, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BlogCard from "./components/BlogCard";

// Mock data
const MOCK_BLOGS = new Array(5).fill(0).map((_, i) => ({
  id: i + 1,
  title: `Sample Blog ${i + 1}`,
  excerpt: "This is a sample excerpt.",
  category: ["Travel", "Guides", "Tips"][i % 3],
  cover: `https://picsum.photos/seed/blog-${i}/400/200`,
  date: new Date(),
  content: "",
}));

export default function Blog() {
  const [blogs, setBlogs] = useState(MOCK_BLOGS);
  const navigate = useNavigate();

  // Navigate to Article page for adding new blog
  const handleAdd = () => {
    navigate("/dashboard/blog/article/new");
  };

  // Navigate to Article page for editing a blog
  const handleEdit = (blog) => {
    navigate(`/dashboard/blog/article/${blog.id}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="flex-end" mb={3}>
        <Button variant="contained" onClick={handleAdd}>
          Add New Blog
        </Button>
      </Stack>

      <Grid container spacing={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog.id}>
            <BlogCard blog={blog} onEdit={() => handleEdit(blog)} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}