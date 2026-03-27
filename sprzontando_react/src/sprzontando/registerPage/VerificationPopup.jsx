import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { popupModal } from "../../styles/popUp.styles";
import Typography from "@mui/material/Typography";

function VerificationPopup({ isPopupOpen, setIsPopupOpen, username }) {
  const [code, setCode] = useState("");

  const handleClose = () => {
    //setIsPopupOpen(false);
    navigate("/successRegister");
  };
  const verifyUserInDb = async () => {
    console.log("werifikuje sie");
  };
  return (
    <Modal open={isPopupOpen} onClose={handleClose}>
      <Box sx={popupModal}>
        <Typography>Wprowadź kod wysłany na email</Typography>
        <TextField
          onChange={(e) => {
            setCode(e.target.value);
            e.target.value.length === 4 && verifyUserInDb();
          }}
          inputProps={{
            maxLength: 4,
          }}
          label="Kod weryfikacyjny"
        ></TextField>
      </Box>
    </Modal>
  );
}

export default VerificationPopup;
