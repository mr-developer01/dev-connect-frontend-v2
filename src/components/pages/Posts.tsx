import { Grid2, Stack, Typography } from "@mui/material";
import Blog from "../core/Blog";
import Featured from "../core/Featured";

const Posts = () => {
  return (
    <>
      <Featured />
      <Stack px={8} pb={8}>
        <Typography variant="h5" mt={3}>
          Recent blog posts
        </Typography>
        <Grid2 container rowSpacing={5} columnSpacing={3} sx={{ mt: 3 }}>
          <Grid2 size={4}>
            <Blog />
          </Grid2>
          <Grid2 size={4}>
            <Blog />
          </Grid2>
          <Grid2 size={4}>
            <Blog />
          </Grid2>
          <Grid2 size={4}>
            <Blog />
          </Grid2>
          <Grid2 size={4}>
            <Blog />
          </Grid2>
          <Grid2 size={4}>
            <Blog />
          </Grid2>
          <Grid2 size={4}>
            <Blog />
          </Grid2>
          <Grid2 size={4}>
            <Blog />
          </Grid2>
          <Grid2 size={4}>
            <Blog />
          </Grid2>
          <Grid2 size={4}>
            <Blog />
          </Grid2>
          <Grid2 size={4}>
            <Blog />
          </Grid2>
        </Grid2>
      </Stack>
    </>
  );
};

export default Posts;
