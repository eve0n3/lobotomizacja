import Container from "@mui/material/Container";
import LoginForm from "./LoginForm";
import Typography from "@mui/material/Typography";

import "../../styles/App.css";
import Button from "@mui/material/Button";

import { useState } from "react";
import { CircularProgress, TextField } from "@mui/material";
import ResetPasswordPopup from "./ResetPasswordPopup";
import { sendResetPasswordEmail } from "../../api/sendResetPasswordEmail";

function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    setLoading(true);

    const response = await sendResetPasswordEmail(email);
    console.log(response);
    if (!response.success) {
      setMessage(response.message);
    } else {
      setIsPopupOpen(true);
    }
    setLoading(false);
  };
  return (
    <div className="login-page">
      <Container maxWidth="sm" className="login-container">
        <Typography variant="h4">Zmiana hasła</Typography>
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <TextField
              className="login-input"
              onChange={(e) => setEmail(e.target.value)}
              label="email"
              type="email"
            ></TextField>
          </div>
          <div>
            <TextField
              className="login-input"
              onChange={(e) => setPassword(e.target.value)}
              label="hasło"
              type="password"
            ></TextField>
          </div>
          <Typography color="error">{message}</Typography>
          <Button
            className="login-button"
            type="submit"
            variant="contained"
            disabled={loading || !email || !password}
            startIcon={loading && <CircularProgress size={20} />}
          >
            Zmień hasło
          </Button>
        </form>
      </Container>
      <ResetPasswordPopup
        isPopupOpen={isPopupOpen}
        email={email}
        password={password}
      />
    </div>
  );
}

export default ResetPasswordPage;
