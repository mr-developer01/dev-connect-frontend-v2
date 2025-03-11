import { Container, CssBaseline } from "@mui/material";
import ButtonAppBar from "./components/ui/ButtonAppBar";
import BasicModal from "./components/ui/BasicModal";
import { useState } from "react";

const App = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CssBaseline />
      <BasicModal open={open} setOpen={setOpen} />
      <ButtonAppBar setOpen={setOpen} />
      <Container>{/* <AuthForm /> */}</Container>
    </>
  );
};

export default App;
