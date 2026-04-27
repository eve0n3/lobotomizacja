import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { popupModal } from "../../styles/popUp.styles";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { verifyPasswordResetInDb } from "../../api/verifyPasswordResetInDb";
import { SUCCESS_PASSWORD_RESET_LOCATION } from "../../../utils/consts";

function ResetPasswordPopup({ isPopupOpen, email, password }) {
  const [code, setCode] = useState("");
  const [isOpen, setIsOpen] = useState(isPopupOpen);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsOpen(false);
    navigate(SUCCESS_PASSWORD_RESET_LOCATION);
  };

  useEffect(() => {
    setError(null);
    if (code.length !== 4) return;

    const verify = async () => {
      setIsLoading(true);

      const response = await verifyPasswordResetInDb(email, code, password);
      response.success ? handleClose() : setError(response.message);

      setIsLoading(false);
    };

    verify();
  }, [code]);

  useEffect(() => {
    setIsOpen(isPopupOpen);
  }, [isPopupOpen]);

  return (
    <Modal open={isOpen}>
      <Box sx={popupModal}>
        <Typography>Wprowadź kod wysłany na email</Typography>
        <TextField
          onChange={(e) => setCode(e.target.value)}
          inputProps={{ maxLength: 4 }}
          label="Kod weryfikacyjny"
          disabled={isLoading}
          error={error !== null}
          helperText={error}
        />
        {isLoading && <CircularProgress />}
      </Box>
    </Modal>
  );
}

export default ResetPasswordPopup;
