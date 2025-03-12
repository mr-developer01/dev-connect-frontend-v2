import { Route, Routes } from "react-router";
import LandingPage from "../pages/LandingPage";
import ButtonAppBar from "../ui/ButtonAppBar";

const AppRoute = () => {
  return (
    <>
      <ButtonAppBar />
      <Routes>
        <Route index element={<LandingPage />} />
      </Routes>
    </>
  );
};

export default AppRoute;
