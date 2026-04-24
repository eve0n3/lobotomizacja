import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LOGIN_LOCATION } from "../../../utils/consts";
import { getLoggedUserId, setLoggedUser } from "../../../utils/utilis";
import { getUserProfile, updateUserProfile } from "../../api/userProfileApi";

function UserProfile() {
  const navigate = useNavigate();
  const userId = getLoggedUserId();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [createdAt, setCreatedAt] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      navigate(LOGIN_LOCATION);
      return;
    }

    const loadProfile = async () => {
      const result = await getUserProfile(userId);
      if (result.success) {
        setForm({
          username: result.data.nazwa || "",
          email: result.data.email || "",
          password: "",
        });
        setCreatedAt(result.data.utworzenie || "");
        setRole(result.data.rola || "user");
      } else {
        setError(result.message || "Nie udalo sie pobrac profilu.");
      }
      setLoading(false);
    };

    loadProfile();
  }, [navigate, userId]);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    setMessage("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    const result = await updateUserProfile({
      user_id: userId,
      username: form.username,
      email: form.email,
      password: form.password,
    });

    if (result.success) {
      setMessage(result.message || "Profil zapisany.");
      setForm((prev) => ({ ...prev, password: "" }));
      setLoggedUser({
        id: result.data.id,
        username: result.data.nazwa,
        email: result.data.email,
        role: result.data.rola,
      });
    } else {
      setError(
        Array.isArray(result.message)
          ? result.message.join(" ")
          : result.message || "Nie udalo sie zapisac profilu.",
      );
    }
    setSaving(false);
  };

  if (loading) return <CircularProgress />;

  return (
    <Grid container justifyContent="center">
      <Grid item size={{ xs: 12, md: 7 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h4" sx={{ mb: 1 }}>
            Moj profil
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Konto od: {createdAt || "brak danych"} | rola: {role}
          </Typography>
          <Stack component="form" spacing={2} onSubmit={handleSubmit}>
            {message && <Alert severity="success">{message}</Alert>}
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              label="Nazwa uzytkownika"
              value={form.username}
              onChange={handleChange("username")}
              required
              fullWidth
            />
            <TextField
              label="Email"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              required
              fullWidth
            />
            <TextField
              label="Nowe haslo"
              type="password"
              value={form.password}
              onChange={handleChange("password")}
              helperText="Zostaw puste, jezeli nie chcesz zmieniac hasla."
              fullWidth
            />
            <Button
              variant="contained"
              type="submit"
              disabled={saving || !form.username || !form.email}
              startIcon={saving && <CircularProgress size={20} />}
            >
              Zapisz
            </Button>
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default UserProfile;
