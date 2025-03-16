import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleModel } from "../../store/slices/toggleSlice";
import BasicModal from "./BasicModal";
import { Link } from "react-router";
import { Container, Stack } from "@mui/material";
import AnchorTemporaryDrawer from "./AnchorTemporaryDrawer";
import { useToggleDrawer } from "./utils/useToggleDrawer";

export default function ButtonAppBar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  const { dispatchAction } = useToggleDrawer();
  return (
    <>
      <BasicModal />
      <AnchorTemporaryDrawer />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{bgcolor: '#fff', color: '#000'}}>
          <Container sx={{maxWidth: {md: "98%"}}}>
            <Toolbar disableGutters>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                <Link to="/">Commit.dev</Link>
              </Typography>
              {user ? (
                <Stack
                  direction="row"
                  sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "30rem",
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{ alignItems: "center", flex: 4, gap: 4 }}
                  >
                    <Link to="/posts">Posts</Link>
                    <Link to="/connections">Connections</Link>
                    <Link to="/create-post">Create Post</Link>
                  </Stack>
                  <Typography
                    variant="body1"
                    sx={{ flex: 1, textAlign: "end", cursor: "pointer" }}
                    onClick={() => dispatchAction("right", true)}
                    noWrap
                  >
                    Hello, {user.name}
                  </Typography>
                </Stack>
              ) : (
                <Button
                  color="inherit"
                  onClick={() => dispatch(toggleModel(true))}
                  sx={{border: '1px solid #4B21FF', px: 4}}
                >
                  Login
                </Button>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
}
