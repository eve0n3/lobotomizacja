import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useCallback, useEffect, useState } from "react";
import { popupModal } from "../../styles/popUp.styles";
import Typography from "@mui/material/Typography";
import { verifyUserInDb } from "../../api/verifyUserInDb";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

function VerificationPopup({ isPopupOpen, email, navigateLocation }) {
  const [code, setCode] = useState("");
  const [isOpen, setIsOpen] = useState(isPopupOpen);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    console.log("a");
    setIsOpen(false);
    navigate(navigateLocation);
  }, [navigate, navigateLocation]);

  useEffect(() => {
    setError(null);
    if (code.length !== 4) return;

    const verify = async () => {
      setIsLoading(true);

      const response = await verifyUserInDb({ email, kod: code });
      response.success ? handleClose() : setError(response.message);

      setIsLoading(false);
    };

    verify();
  }, [code, email, handleClose]);

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

export default VerificationPopup;
