import { Container, CssBaseline } from "@mui/material";
import ButtonAppBar from "./components/ui/ButtonAppBar";
import BasicModal from "./components/ui/BasicModal";
import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { addUser } from "./store/slices/userSlice";
import securedFetch from "./utils/securedFetch";

const App = () => {
  const [cookies] = useCookies(["user"]);
  const dispatch = useAppDispatch();

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
    <>
      <CssBaseline />
      <BasicModal />
      <ButtonAppBar />
      <Container>{/* <AuthForm /> */}</Container>
    </>
  );
};

export default App;
