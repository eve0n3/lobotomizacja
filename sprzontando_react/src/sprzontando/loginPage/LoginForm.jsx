import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { submitLogin } from "../../api/submitLogin";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const loginData = { email, password };
    setLoading(true);

    const result = await submitLogin(loginData);

    if (!result.success) {
      setMessage(result.message);
    } else {
      navigate("/offerts");
    }
    setLoading(false);
  };

  return (
    <Container>
      <Grid>
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            label="email"
            type="email"
          ></TextField>
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            label="hasło"
            type="password"
          ></TextField>
          {message && <Typography>{message}</Typography>}

          <Button
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
  );
}

export default LoginForm;
