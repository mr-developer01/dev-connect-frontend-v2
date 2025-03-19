import { CssBaseline } from "@mui/material";
import { useAppDispatch } from "./store/hooks";
import { useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { addUser } from "./store/slices/userSlice";
import securedFetch from "./utils/securedFetch";
import AppRoute from "./components/routes/AppRoute";
import { BrowserRouter } from "react-router";
import { API_KEYS } from "./api/keys";
import { useCreateSocketConnection } from "./utils/socket";
import CustomizedSnackbars from "./components/ui/CustomizedSnackbars";
import { toggleSnack } from "./store/slices/toggleSlice";
import { setResMessage } from "./store/slices/apiResponseSlice";

const App = () => {
  const [cookies] = useCookies(["user"]);
  const dispatch = useAppDispatch();
  const socket = useCreateSocketConnection(cookies?.user);
  console.log(socket);

  const userRef = useRef(null);
  console.log(userRef.current);

  useEffect(() => {
    if (cookies?.user && socket) {
      securedFetch(`${import.meta.env.VITE_HOST_URL}${API_KEYS.USER}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies?.user}`,
        },
      }).then(async (data) => {
        const jsonData = await data.json();
        userRef.current = jsonData;
        dispatch(
          addUser({
            name: jsonData.name,
            email: jsonData.email,
            _id: jsonData._id,
          })
        );
      });

      socket.on("connect", () => {
        console.log("Connected to WebSocket");
      });

      socket.on("connect_error", (err) => {
        console.error("Connection error:", err);
        dispatch(setResMessage(`"Connection error:", ${err}`));
        dispatch(toggleSnack(true));
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket");
        dispatch(setResMessage("Disconnected from WebSocket"));
        dispatch(toggleSnack(true));
      });

      socket.on("new_post", ({ post, user: newUser }) => {
        if (newUser?._id !== userRef?.current?._id) {
          console.log(post, newUser);
          dispatch(setResMessage(`${newUser.name} just added a post`));
          dispatch(toggleSnack(true));
        }
      });
    }
  }, [cookies.user, dispatch, socket]);

  return (
    <>
      <CustomizedSnackbars />
      <BrowserRouter>
        <CssBaseline />
        <AppRoute />
      </BrowserRouter>
    </>
  );
};

export default App;
