import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

type TButtonAppBar = { setOpen: (arg: boolean) => void };

export default function ButtonAppBar({ setOpen }: TButtonAppBar) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Commit.dev
          </Typography>
          <Button color="inherit" onClick={() => setOpen(true)}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
