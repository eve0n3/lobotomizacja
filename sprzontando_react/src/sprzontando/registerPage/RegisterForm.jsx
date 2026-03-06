import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { submitLogin } from "../../api/submitLogin";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { registerUser } from "../../api/registerUser";
import "../../styles/App.css"

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const validateData = (password, repeat) => {
    if (password === repeat) {
      return true;
    } else {
      setMessage("Oba hasła muszą być identyczne");
      return false;
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

      setMessage(result.message);

      setLoading(false);
    }
  };

  return (
    <Container>
      <Grid>
        
        <form onSubmit={handleSubmit} className="login-form">

          <TextField
            className="login-input"
            onChange={(e) => setEmail(e.target.value)}
            label="email"
            type="email"
          ></TextField>
          <TextField
            className="login-input"
            onChange={(e) => setUsername(e.target.value)}
            label="nazwa użytkownika"
            type="username"
          ></TextField>
          <TextField
            className="login-input"
            onChange={(e) => setPassword(e.target.value)}
            label="hasło"
            type="password"
          ></TextField>
          <TextField
            className="login-input"
            onChange={(e) => setRepeatPassword(e.target.value)}
            label="powtórz hasło"
            type="password"
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
