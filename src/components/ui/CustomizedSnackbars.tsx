import * as React from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleSnack } from "../../store/slices/toggleSlice";

export default function CustomizedSnackbars() {
    const snack = useAppSelector(state => state.toggle.snack)
    const dispatch = useAppDispatch()
    console.log(snack)

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    // setOpen(false);
    dispatch(toggleSnack(false))
  };

  return (
    <div>
      <Snackbar open={snack} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          This is a success Alert inside a Snackbar!
        </Alert>
      </Snackbar>
    </div>
  );
}
