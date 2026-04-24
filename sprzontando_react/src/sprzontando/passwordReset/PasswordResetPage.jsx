import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { LOGIN_LOCATION } from "../../../utils/consts";
import {
  confirmPasswordReset,
  requestPasswordReset,
} from "../../api/passwordResetApi";

function PasswordResetPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleRequestCode = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    const result = await requestPasswordReset(email);
    if (result.success) {
      setMessage(result.message || "Kod zostal wyslany.");
      setStep("code");
    } else {
      setError(result.message || "Nie udalo sie wyslac kodu.");
    }
    setLoading(false);
  };

  const handleConfirm = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    if (password !== repeatPassword) {
      setError("Hasla nie sa identyczne.");
      setLoading(false);
      return;
    }

    const result = await confirmPasswordReset({
      email,
      kod: code,
      haslo: password,
    });

    if (result.success) {
      setMessage(result.message || "Haslo zostalo zmienione.");
      setTimeout(() => navigate(LOGIN_LOCATION), 800);
    } else {
      setError(result.message || "Nie udalo sie zmienic hasla.");
    }
    setLoading(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Reset hasla
        </Typography>
        <Stack
          component="form"
          spacing={2}
          onSubmit={step === "email" ? handleRequestCode : handleConfirm}
        >
          {message && <Alert severity="success">{message}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={step === "code"}
            required
          />
          {step === "code" && (
            <>
              <TextField
                label="Kod z emaila"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                inputProps={{ maxLength: 4 }}
                required
              />
              <TextField
                label="Nowe haslo"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <TextField
                label="Powtorz nowe haslo"
                type="password"
                value={repeatPassword}
                onChange={(event) => setRepeatPassword(event.target.value)}
                required
              />
            </>
          )}
          <Button
            variant="contained"
            type="submit"
            disabled={
              loading ||
              !email ||
              (step === "code" && (!code || !password || !repeatPassword))
            }
            startIcon={loading && <CircularProgress size={20} />}
          >
            {step === "email" ? "Wyslij kod" : "Zmien haslo"}
          </Button>
          <Button onClick={() => navigate(LOGIN_LOCATION)}>Wroc do logowania</Button>
        </Stack>
      </Paper>
    </Container>
  );
}

export default PasswordResetPage;
