import React from "react";
import { Grid, Box, useTheme, alpha } from "@mui/material";
import BlogHero from "./components/BlogHero";
import BlogFilters from "./components/BlogFilters";
import BlogGrid from "./components/BlogGrid";
import BlogSidebar from "./components/BlogSidebar";
import useBlogFilters from "./hooks/useBlogFilters";
import { MOCK_BLOGS } from "./mockBlogs";

export default function Blogs() {
  const theme = useTheme();
  const glass = {
    background: alpha(theme.palette.background.paper, 0.5),
    backdropFilter: "blur(10px)",
    borderRadius: 3,
    border: `1px solid ${alpha(theme.palette.text.primary, 0.06)}`
  };

  const {
    query, setQuery,
    category, setCategory,
    sort, setSort,
    page, setPage,
    categories,
    visible,
    pageCount
  } = useBlogFilters(MOCK_BLOGS);

  return (
    <Box>
      <BlogHero />

      <BlogFilters
        query={query} setQuery={setQuery}
        category={category} setCategory={setCategory}
        sort={sort} setSort={setSort}
        categories={categories}
      />

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <BlogGrid
            visible={visible}
            page={page}
            setPage={setPage}
            pageCount={pageCount}
            glass={glass}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <BlogSidebar glass={glass} blogs={MOCK_BLOGS} />
        </Grid>
      </Grid>
    </Box>
  );
}
