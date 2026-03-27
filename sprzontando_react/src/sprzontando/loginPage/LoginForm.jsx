import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { submitLogin } from "../../api/submitLogin";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
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

    const loginData = { email, password };
    setLoading(true);

    const response = await submitLogin(loginData);

    if (!response.success) {
      response.type === "password"
        ? setMessage(response.message)
        : setIsPopupOpen(true);
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
            {message && <Typography>{message}</Typography>}
            <Typography
              className="login-text"
              onClick={() => navigate("/register")}
            >
              Załóż konto
            </Typography>
            <Button
              className="login-button"
              type="submit"
              variant="contained"
              disabled={loading || !email || !password}
              startIcon={loading && <CircularProgress size={20} />}
            >
              Zatwierdź
            </Button>
          </form>
        </Grid>
      </Container>
      <VerificationPopup
        isPopupOpen={isPopupOpen}
        email={email}
        navigateLocation={"/"}
      />
    </>
  );
}

export default LoginForm;
