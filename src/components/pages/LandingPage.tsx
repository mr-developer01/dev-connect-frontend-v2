import { Button, Grid2, Stack, Typography } from "@mui/material";
import Featured from "../core/Featured";
import Blog from "../core/Blog";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../store/hooks";
import { toggleModel } from "../../store/slices/toggleSlice";
import { API_KEYS } from "../../api/keys";
import securedFetch from "../../utils/securedFetch";
import { useEffect } from "react";
import { addUser } from "../../store/slices/userSlice";

const LandingPage = () => {
  const [cookies] = useCookies(["user"]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const navigate = useNavigate()

  // console.log(`${import.meta.env.VITE_HOST_URL}${API_KEYS.PROFILE}`);

  useEffect(() => {
    if (cookies?.user) {
      securedFetch(`${import.meta.env.VITE_HOST_URL}${API_KEYS.USER}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies?.user}`,
        },
      }).then(async (data) => {
        const jsonData = await data.json();
        dispatch(
          addUser({
            name: jsonData.name,
            email: jsonData.email,
            _id: jsonData._id,
          })
        );
        navigate('/posts')
      });
    }
  }, [cookies.user, dispatch, navigate]);
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
        <Stack sx={{ mt: 4 }} alignItems={"center"}>
          <Button
            variant="outlined"
            onClick={() => {
              if (cookies.user) {
                navigate("/posts");
              } else {
                dispatch(toggleModel(true));
              }
            }}
          >
            Explore More
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default LandingPage;
