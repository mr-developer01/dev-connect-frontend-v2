import { Route, Routes } from "react-router";
import LandingPage from "../pages/LandingPage";
import ButtonAppBar from "../ui/ButtonAppBar";
import UserRoute from "./protectedRoutes/UserRoute";
import UserProfile from "../core/UserProfile";
import Connects from "../core/Connects";
import { Container } from "@mui/material";
import UpdateUserProfile from "../pages/UpdateUserProfile";
import CreatePost from "../core/CreatePost";

const AppRoute = () => {
  return (
    <>
      <ButtonAppBar />
      <Container>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route element={<UserRoute />}>
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/connects" element={<Connects />} />
            <Route path="/user/profile" element={<UpdateUserProfile />} />
            <Route path="/create-post" element={<CreatePost />} />
          </Route>
        </Routes>
      </Container>
    </>
  );
};

export default AppRoute;
