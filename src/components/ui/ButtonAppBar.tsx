import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleModel } from "../../store/slices/toggleSlice";

export default function ButtonAppBar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Commit.dev
          </Typography>
          {user ? (
            user.name
          ) : (
            <Button color="inherit" onClick={() => dispatch(toggleModel(true))}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
