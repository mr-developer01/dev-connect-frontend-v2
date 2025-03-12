import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import AuthForm from "../core/AuthForm";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toggleModel } from "../../store/slices/toggleSlice";
import CustomizedSnackbars from "./CustomizedSnackbars";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
  bgcolor: "background.paper",
  boxShadow: 24,
};

export default function BasicModal() {
  const dispatch = useAppDispatch();
  const check = useAppSelector((state) => state.toggle.modal);
  const handleClose = () => {
    dispatch(toggleModel(false));
  };
  return (
    <Box>
      <Modal
        open={check}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <HighlightOffIcon
            sx={{
              position: "absolute",
              right: "2%",
              top: "4%",
              cursor: "pointer",
            }}
            onClick={() => dispatch(toggleModel(false))}
          />
          <CustomizedSnackbars />
          <AuthForm />
        </Box>
      </Modal>
    </Box>
  );
}
