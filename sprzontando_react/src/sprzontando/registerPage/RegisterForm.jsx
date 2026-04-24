import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../../api/registerUser";
import "../../styles/App.css";
import VerificationPopup from "./VerificationPopup";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [emailHelper, setEmailHelper] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [repeatPasswordHelper, setRepeatPasswordHelper] = useState("");
  const [username, setUsername] = useState("");
  const [usernameHelper, setUsernameHelper] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const validateData = () => {
    if (password === repeatPassword) return true;
    setRepeatPasswordHelper("Hasla nie sa identyczne.");
    return false;
  };

  const setErrorMessage = (result) => {
    const messages = Array.isArray(result.message)
      ? result.message
      : [result.message || "Rejestracja nie powiodla sie."];

    messages.forEach((item) => {
      if (String(item).toLowerCase().includes("email")) {
        setEmailHelper(item);
      } else if (String(item).toLowerCase().includes("nazwa")) {
        setUsernameHelper(item);
      } else {
        setMessage(item);
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setEmailHelper("");
    setUsernameHelper("");

    if (!validateData()) return;

    setLoading(true);
    const result = await registerUser({ email, username, password });

    if (result.success) {
      setIsPopupOpen(true);
    } else {
      setErrorMessage(result);
    }
    setLoading(false);
  };

  return (
    <>
      <Container>
        <Grid>
          <form onSubmit={handleSubmit} className="login-form">
            <TextField
              className="login-input"
              onChange={(e) => setEmail(e.target.value)}
              label="email"
              type="email"
              helperText={emailHelper}
              error={!!emailHelper}
              required
            />
            <TextField
              className="login-input"
              onChange={(e) => setUsername(e.target.value)}
              label="nazwa uzytkownika"
              helperText={usernameHelper}
              error={!!usernameHelper}
              required
            />
            <TextField
              className="login-input"
              onChange={(e) => setPassword(e.target.value)}
              label="haslo"
              type="password"
              required
            />
            <TextField
              className="login-input"
              onChange={(e) => {
                setRepeatPassword(e.target.value);
                setRepeatPasswordHelper("");
              }}
              label="powtorz haslo"
              type="password"
              required
              helperText={repeatPasswordHelper}
              error={!!repeatPasswordHelper}
            />
            {message && <Typography>{message}</Typography>}
            <Typography className="login-text" onClick={() => navigate("/login")}>
              Zaloguj sie
            </Typography>
            <Button
              className="login-button"
              type="submit"
              variant="contained"
              disabled={
                loading || !email || !password || !repeatPassword || !username
              }
              startIcon={loading && <CircularProgress size={20} />}
            >
              Zatwierdz
            </Button>
          </form>
        </Grid>
      </Container>
      <VerificationPopup
        isPopupOpen={isPopupOpen}
        email={email}
        navigateLocation="/successRegister"
      />
    </>
  );
}

export default RegisterForm;
