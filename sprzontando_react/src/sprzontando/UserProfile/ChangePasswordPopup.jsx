import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { popupModal } from "../../styles/popUp.styles";
import Typography from "@mui/material/Typography";

import CircularProgress from "@mui/material/CircularProgress";

import { getLoggedUserId } from "../../../utils/utilis";
import { flexCenteredColumn } from "../../styles/AppStyle";
import { IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { changeUserPasswordInDb } from "../../api/changeUserPasswordInDb";

function ChangePasswordPopup({ isPassPopupOpen, setIsPassPopupOpen }) {
  const [isOpen, setIsOpen] = useState(isPassPopupOpen);
  const [isLoading, setIsLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const [error, setError] = useState(null);
  const loggedUserId = getLoggedUserId();

  useEffect(() => {
    setIsOpen(isPassPopupOpen);
  }, [isPassPopupOpen]);
  const handleClose = () => {
    setIsOpen(false);
    setIsPassPopupOpen(false);
    setError(null);
    setMessage(null);
  };

  const changePassword = async () => {
    setError(null);
    setIsLoading(true);
    const response = await changeUserPasswordInDb(
      loggedUserId,
      oldPassword,
      newPassword,
    );
    if (!response.success) {
      setMessage(null);
      setError(response.message);
      setIsLoading(false);
    } else {
      setIsLoading(false);

      setMessage("Pomyślnie zmieniono hasło");
    }
  };
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={popupModal}>
        <form
          onSubmit={(e) => {
            changePassword();
            e.preventDefault();
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Stack spacing={2} sx={flexCenteredColumn}>
            <Typography variant="h5">Zmiana hasła</Typography>

            <TextField
              onChange={(e) => setOldPassword(e.target.value)}
              type="password"
              label="stare hasło"
              fullWidth
              disabled={isLoading || message}
            />
            <TextField
              onChange={(e) => setNewPassword(e.target.value)}
              type="password"
              label="nowe hasło"
              fullWidth
              disabled={isLoading || message}
            />
            {error && <Typography color="error">{error}</Typography>}
            {message && <Typography color="success">{message}</Typography>}
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || !oldPassword || !newPassword || message}
              startIcon={isLoading && <CircularProgress size={20} />}
            >
              Zatwierdź
            </Button>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}

export default ChangePasswordPopup;
