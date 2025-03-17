import { CssBaseline } from "@mui/material";
import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { addUser } from "./store/slices/userSlice";
import securedFetch from "./utils/securedFetch";
import AppRoute from "./components/routes/AppRoute";
import { BrowserRouter } from "react-router";
import { API_KEYS } from "./api/keys";

const App = () => {
  // const [cookies] = useCookies(["user"]);
  // const dispatch = useAppDispatch();
  // // const navigate = useNavigate()

  // console.log(`${import.meta.env.VITE_HOST_URL}${API_KEYS.PROFILE}`);

  // useEffect(() => {
  //   if (cookies?.user) {

  //     securedFetch(
  //       `${import.meta.env.VITE_HOST_URL}${API_KEYS.USER}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${cookies?.user}`,
  //         },
  //       }
  //     ).then(async (data) => {
  //       const jsonData = await data.json();
  //       dispatch(
  //         addUser({
  //           name: jsonData.name,
  //           email: jsonData.email,
  //           _id: jsonData._id,
  //         })
  //       );
  //       // navigate('/posts')
  //     });
  //   }
  // }, [cookies.user, dispatch]);

  return (
    <BrowserRouter>
      <CssBaseline />
      <AppRoute />
    </BrowserRouter>
  );
};

export default App;
