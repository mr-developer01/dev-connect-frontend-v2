import { CssBaseline } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { addUser, selectUser } from "./store/slices/userSlice";
import securedFetch from "./utils/securedFetch";
import AppRoute from "./components/routes/AppRoute";
import { BrowserRouter } from "react-router";

const App = () => {
  const [cookies] = useCookies(["user"]);
  const dispatch = useAppDispatch();
  const something = useAppSelector(selectUser)
  console.log(something, "Something selected")

  useEffect(() => {
    if (cookies?.user) {
      securedFetch(
        "https://dev-connect-service.onrender.com/api/users/profile",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies?.user}`,
          },
        }
      ).then(async (data) => {
        const jsonData = await data.json();
        dispatch(
          addUser({
            name: jsonData.name,
            email: jsonData.email,
            _id: jsonData._id,
          })
        );
      });
    }
  }, [cookies.user, dispatch]);

  return (
    <BrowserRouter>
      <CssBaseline />
      <AppRoute />
    </BrowserRouter>
  );
};

export default App;
