import { Grid, Pagination, Box } from "@mui/material";
import BlogCard from "./BlogCard";

export default function BlogGrid({ visible, page, setPage, pageCount, glass }) {
  return (
    <>
      <Grid container spacing={3}>
        {visible.map((b) => (
          <Grid item xs={12} sm={6} key={b.id}>
            <BlogCard blog={b} glass={glass} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination count={pageCount} page={page} onChange={(_, v) => setPage(v)} />
      </Box>
    </>
  );
}
