import { Box, Grid2, Stack, Typography } from "@mui/material";
import Featured from "../core/Featured";
import Blog from "../core/Blog";

const LandingPage = () => {
  return (
    <>
      <Featured />
      <Stack px={8}>
        <Typography variant="h5" mt={3}>
          Recent blog posts
        </Typography>
        <Grid2 container spacing={2}>
          <Grid2 size={4}>
            <Blog />
          </Grid2>
        </Grid2>
      </Stack>
    </>
  );
};

export default LandingPage;
