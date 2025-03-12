import * as React from "react";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleSnack } from "../../store/slices/toggleSlice";

export default function CustomizedSnackbars() {
  const snack = useAppSelector((state) => state.toggle.snack);
  const resMessage = useAppSelector((state) => state.apiResponse.resMessage);
  const error = useAppSelector((state) => state.apiResponse.error);
  const dispatch = useAppDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    // setOpen(false);
    dispatch(toggleSnack(false));
  };

  return (
    <div>
      <Snackbar open={snack} autoHideDuration={1500} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={error ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {resMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
