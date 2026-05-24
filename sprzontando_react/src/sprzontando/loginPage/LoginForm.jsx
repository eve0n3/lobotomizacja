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
import { LOGIN_RESET_LOCATION } from "../../../utils/consts";

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

    if (response.message === "użytkownik zbanowany") {
      setMessage(`Twoje konto jest zbanowane do:${response.ban_end}`);
    } else if (response.type === "password") {
      setMessage(response.message);
    } else {
      setIsPopupOpen(true);
    }
    } else {
      navigate("/");
    }
      setLoading(false);
  };
  const handlePasswordReset = () => {
    navigate(LOGIN_RESET_LOCATION);
    return;
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
              onClick={() => handlePasswordReset()}
              textAlign={"right"}
            >
              Zapomniałeś hasła?
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
            <Button
              variant="outlined"
              className="login-text"
              onClick={() => navigate("/register")}
              textalign={"right"}
            >
              Nie masz konta? Załóż je!
            </Button>
          </form>
        </Grid>
      </Container>
      <VerificationPopup
        isPopupOpen={isPopupOpen}
        email={email}
        navigateLocation={"/successVerification"}
      />
    </>
  );
}

export default LoginForm;
