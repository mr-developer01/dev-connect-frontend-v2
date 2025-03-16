import { Box, Stack, Typography } from "@mui/material";

const Blog = () => {
  return (
    <Stack spacing={2} sx={{ borderRadius: "10px", cursor: 'pointer' }}>
      <Box>
        <Box
          component="img"
          sx={{
            height: "400px",
            width: "100%",
            objectFit: "cover",
            borderRadius: "10px",
          }}
          alt="The house from the offer."
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
        />
      </Box>
      <Stack spacing={2}>
        <Typography variant="h4">Migrating to Linear 101</Typography>
        <Box>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
            itaque sapiente numquam corrupti, commodi recusandae.
          </Typography>
        </Box>
        <Stack direction={"row"} spacing={2} sx={{alignItems: 'center'}}>
          <Box
            sx={{
              width: "2rem",
              height: "2rem",
              borderRadius: "50%",
              overflow: "hidden",
            }}
          >
            <Box
              component="img"
              sx={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
              alt="The house from the offer."
              src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
            />
          </Box>
          <Typography>Jonathan Wills</Typography>
          <Box
            sx={{ width: ".5rem", height: ".5rem", borderRadius: "50%", bgcolor: 'black' }}
          ></Box>
          <Typography>19 Jan 2025</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Blog;
