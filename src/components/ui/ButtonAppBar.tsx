import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleModel } from "../../store/slices/toggleSlice";
import BasicModal from "./BasicModal";
import { Link } from "react-router";
import { Stack } from "@mui/material";
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
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
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
                  <Link to="/posts">Posts</Link>
                </Stack>
                <Typography
                  variant="h5"
                  sx={{ flex: 1, textAlign: "end", cursor: "pointer" }}
                  onClick={() => dispatchAction("right", true)}
                >
                  {user.name}
                </Typography>
              </Stack>
            ) : (
              <Button
                color="inherit"
                onClick={() => dispatch(toggleModel(true))}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
