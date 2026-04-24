import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RESET_PASSWORD_LOCATION } from "../../../utils/consts";
import { submitLogin } from "../../api/submitLogin";
import VerificationPopup from "../registerPage/VerificationPopup";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    setLoading(true);
    const response = await submitLogin({ email, password });

    if (!response.success) {
      if (response.type === "verification") {
        setIsPopupOpen(true);
      } else {
        setMessage(response.message || "Logowanie nie powiodlo sie.");
      }
    } else {
      navigate("/");
    }
    setLoading(false);
  };

  return (
    <>
      <Container>
        <Grid>
          <form onSubmit={handleSubmit} className="login-form">
            <div>
              <TextField
                className="login-input"
                onChange={(e) => setEmail(e.target.value)}
                label="email"
                type="email"
              />
            </div>
            <div>
              <TextField
                className="login-input"
                onChange={(e) => setPassword(e.target.value)}
                label="haslo"
                type="password"
              />
            </div>
            {message && <Typography>{message}</Typography>}
            <Typography
              className="login-text"
              onClick={() => navigate("/register")}
            >
              Zaloz konto
            </Typography>
            <Typography
              className="login-text"
              onClick={() => navigate(RESET_PASSWORD_LOCATION)}
            >
              Nie pamietasz hasla?
            </Typography>
            <Button
              className="login-button"
              type="submit"
              variant="contained"
              disabled={loading || !email || !password}
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
        navigateLocation="/successVerification"
      />
    </>
  );
}

export default LoginForm;
