import { Route, Routes } from "react-router";
import LandingPage from "../pages/LandingPage";
import ButtonAppBar from "../ui/ButtonAppBar";
import UserRoute from "./protectedRoutes/UserRoute";
import UserProfile from "../core/UserProfile";
import Connects from "../core/Connects";
import { Container } from "@mui/material";
import UpdateUserProfile from "../pages/UpdateUserProfile";
import CreatePostPage from "../pages/CreatePostPage";
import Posts from "../pages/Posts";

const AppRoute = () => {
  return (
    <>
      <ButtonAppBar />
      <Container sx={{maxWidth: {md: "98%"}}}>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route element={<UserRoute />}>
            <Route path="/posts" element={<Posts />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/connects" element={<Connects />} />
            <Route path="/user/profile" element={<UpdateUserProfile />} />
            <Route path="/create-post" element={<CreatePostPage />} />
          </Route>
        </Routes>
      </Container>
    </>
  );
};

export default AppRoute;
