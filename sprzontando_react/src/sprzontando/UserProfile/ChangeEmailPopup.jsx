import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { popupModal } from "../../styles/popUp.styles";
import Typography from "@mui/material/Typography";

import CircularProgress from "@mui/material/CircularProgress";
import { changeUserEmailInDb } from "../../api/changeUserEmailInDb";
import { getLoggedUserId } from "../../../utils/utilis";
import { flexCenteredColumn } from "../../styles/AppStyle";
import { IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function ChangeEmailPopup({ isEmailPopupOpen, setIsEmialPopupOpen }) {
  const [isOpen, setIsOpen] = useState(isEmailPopupOpen);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const loggedUserId = getLoggedUserId();

  useEffect(() => {
    setIsOpen(isEmailPopupOpen);
  }, [isEmailPopupOpen]);
  const handleClose = () => {
    setIsOpen(false);
    setIsEmialPopupOpen(false);
    setError(null);
  };

  const changeEmail = async () => {
    setError(null);
    setIsLoading(true);
    const response = await changeUserEmailInDb(loggedUserId, email);
    if (!response.success) {
      setError(response.message);
      setIsLoading(false);
    } else {
      setIsOpen(false);
      setIsLoading(false);
      setIsEmialPopupOpen(false);
      window.location.reload();
    }
  };
  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={popupModal}>
        <form
          onSubmit={(e) => {
            changeEmail();
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
            <Typography variant="h5">Zmiana adresu email</Typography>

            <TextField
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              label="nowy email"
              disabled={isLoading}
              fullWidth
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || !email}
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

export default ChangeEmailPopup;
