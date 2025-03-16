import { Box, Stack, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Featured = () => {
  return (
    <Stack
      direction={"row"}
      sx={{
        height: "80vh",
        backgroundImage:
          "url(https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?q=80&w=2083&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        mt: 2,
        color: "white",
        alignItems: "end",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <Box sx={{ bgcolor: "#00000034", px: 8, py: 6 }}>
        <Stack direction={"row"} spacing={8}>
          <Stack sx={{width: '55%', gap: 2}}>
            <Typography variant="h5">Featured</Typography>
            <Box>
              <Typography variant="h3">Breaking Into Product Design:</Typography>
              <Typography variant="h3">Advice from untitled Founder, Frankie</Typography>
            </Box>
            <Typography variant="body2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum nihil repellendus cumque adipisci tempora, temporibus culpa numquam quibusdam vero quas, aliquid odio nam exercitationem animi quo officia libero nulla mollitia, sed aspernatur neque reiciendis. Quasi similique neque ipsa suscipit reprehenderit qui, veritatis vitae corrupti officiis?
            </Typography>
          </Stack>
          <ArrowForwardIcon sx={{ fontSize: '4rem', cursor: 'pointer' }} />
        </Stack>
      </Box>
    </Stack>
  );
};

export default Featured;
