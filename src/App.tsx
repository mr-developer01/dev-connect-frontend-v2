import { Container, CssBaseline } from "@mui/material";
import ButtonAppBar from "./components/ui/ButtonAppBar";
import BasicModal from "./components/ui/BasicModal";

const App = () => {

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
