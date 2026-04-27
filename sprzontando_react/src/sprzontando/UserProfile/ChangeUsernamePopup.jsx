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
import { changeUserUsernameInDb } from "../../api/changeUserUsernameInDb";
import CloseIcon from "@mui/icons-material/Close";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { LOGIN_LOCATION } from "../../../utils/consts";

function ChangeUsernamePopup({ isUsernamePopupOpen, setIsUsernamePopupOpen }) {
  const [isOpen, setIsOpen] = useState(isUsernamePopupOpen);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const loggedUserId = getLoggedUserId();
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(isUsernamePopupOpen);
  }, [isUsernamePopupOpen]);
  if (loggedUserId === null) {
    navigate(LOGIN_LOCATION);
    return null;
  }

  const handleClose = () => {
    setIsOpen(false);
    setIsUsernamePopupOpen(false);
    setError(null);
  };
  const editUserCookie = (username) => {
    Cookies.set(
      "loggedas",
      JSON.stringify({ id: loggedUserId, username: username }),
    );
  };

  const changeUsername = async () => {
    setError(null);
    setIsLoading(true);
    const response = await changeUserUsernameInDb(loggedUserId, username);
    if (!response.success) {
      setError(response.message);
      setIsLoading(false);
    } else {
      editUserCookie(username);
      setIsOpen(false);
      setIsLoading(false);

      setIsUsernamePopupOpen(false);
      window.location.reload();
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={popupModal}>
        <form
          onSubmit={(e) => {
            changeUsername();
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
            <Typography variant="h5">Zmiana nazwy użytkownika</Typography>

            <TextField
              onChange={(e) => setUsername(e.target.value)}
              label="nowa nazwa użytkownika"
              disabled={isLoading}
              fullWidth
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || !username}
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

export default ChangeUsernamePopup;
