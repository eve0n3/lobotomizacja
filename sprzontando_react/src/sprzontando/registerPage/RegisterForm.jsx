import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { registerUser } from "../../api/registerUser";
import "../../styles/App.css";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const validateData = (password, repeat) => {
    if (password === repeat) {
      return true;
    } else {
      setRepeatPasswordHelper("hasła nie są identyczne");
      return false;
    }
    // TO DO długosć hasła złożonosć (opcjonalne)
  };
  const setHelper = (message) => {
    message.forEach((mes) => {
      if (mes == "Ten adres Email jest zajęty") {
        setEmailHelper(mes);
      } else {
        setUsernameHelper(mes);
      }
    });
  };
  const setErrorMessage = (result) => {
    switch (result.status) {
      case 400:
        setHelper(result.message);

        break;
      case 503:
        setMessage();
        break;

      default:
        setMessage();
        break;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    const isCorrect = validateData(password, repeatPassword);

    if (isCorrect) {
      const registerData = { email, username, password };
      setLoading(true);

      const result = await registerUser(registerData);

      !result.success ? setErrorMessage(result) : handleSuccessRegister();

      setLoading(false);
    }
  };
  const handleSuccessRegister = () => {
    navigate("/successRegister");
  };

  return (
    <Container>
      <Grid>
        <form onSubmit={handleSubmit} className="login-form">
          <TextField
            className="login-input"
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailHelper("");
            }}
            label="email"
            type="email"
            helperText={emailHelper}
            required
          ></TextField>
          <TextField
            className="login-input"
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameHelper("");
            }}
            label="nazwa użytkownika"
            type="username"
            helperText={usernameHelper}
            required
          ></TextField>
          <TextField
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
            label="hasło"
            type="password"
            required
          ></TextField>
          <TextField
            className="login-input"
            onChange={(e) => {
              setRepeatPassword(e.target.value);
              setRepeatPasswordHelper("");
            }}
            label="powtórz hasło"
            type="password"
            required
            helperText={repeatPasswordHelper}
          ></TextField>
          {message && <Typography>{message}</Typography>}
          <Typography className="login-text" onClick={() => navigate("/login")}>
            Zaloguj się
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
            Zatwierdź
          </Button>
        </form>
      </Grid>
    </Container>
  );
}

export default RegisterForm;
