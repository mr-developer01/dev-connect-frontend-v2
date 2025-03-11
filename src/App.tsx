import { Container, CssBaseline } from "@mui/material";
import AuthForm from "./components/core/AuthForm";

const App = () => {
  return (
    <>
      <CssBaseline />
      <Container>
        <AuthForm />
      </Container>
    </>
  );
};

export default App;
